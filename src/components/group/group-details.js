import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFetchGroup } from "../../hooks/fetch-group";
import { useAuth } from "../../hooks/use-auth";
import User from "../user/user";
import { Button } from "@mui/material";
import { joinGroup, leaveGroup } from "../../services/group-services";
import Comments from "../comments/comments";
import EventList from "../events/event-list";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function GroupDetails() {

  const { id } = useParams();
  const { authData } = useAuth();
  const [ data, loading, error] = useFetchGroup(id);
  const [ group, setGroup ] = useState(null);
  const [ inGroup, setInGroup ] = useState(false);
  const [ isAdmin, setIsAdmin ] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.members) {
      data.members.sort((a, b) => b.points - a.points);

      if (authData?.user) {
        setInGroup(!!data.members.find(member => member.user.id === authData.user.id))
        setIsAdmin(data.members.find(member => member.user.id === authData.user.id)?.admin)
      }
    }
    setGroup(data);
  }, [data]);

  const joinHere = async () => {
    try {
      const joinedGroup = await joinGroup({user: authData.user.id, group: group.id});
      console.log(joinedGroup);
    } catch (err) {
      console.log(err);
    }
  }

  const leaveHere = async () => {
    try {
      const leftGroup = await leaveGroup({user: authData.user.id, group: group.id});
      console.log(leftGroup);
    } catch (err) {
      console.log(err);
    }
  }

  const addEvent = async () => {
    navigate("/event-form", {state: group})
  }

  if (error) return <h1>Error</h1>;

  if (loading) return <h1>Loading...</h1>

  return (
    <div>
      <Link to={"/"}><ArrowBackIcon/></Link>
      {group &&
        <>
          <h1>Details here for {group.name}: {group.location}</h1>
          <h2>{group.description}</h2>
          {inGroup ?
            <Button onClick={() => leaveHere()} variant="contained" color="primary">Leave Group</Button> :
            <Button onClick={() => joinHere()} variant="contained" color="primary">Join Group</Button>
          }

          {isAdmin && <Button onClick={() => addEvent()} variant="contained" color="primary">Add Event</Button>}

          <EventList events={group.events}/>

          <h3>Members:</h3>
          {group.members.map((member) => {

            return (
              <div id={member.id} className="member-container">
                <User user={member.user}/>
                <p>{member.points | 0}pts</p>
              </div>
            )
          })}
          <Comments group={group}/>
        </>
      }
    </div>
  )
}
