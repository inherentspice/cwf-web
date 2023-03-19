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

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.members) {
      data.members.sort((a, b) => b.points - a.points);

      if (authData?.user) {
        setInGroup(!!data.members.find(member => member.user.id === authData.user.id))
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
    <div className="group-event-cont">
      <Link to={"/group-list"}><ArrowBackIcon/></Link>
      {group &&
        <>
          <div className="group-details-cont">
            <h1>{group.name}: {group.location}</h1>
            <h2>Description: {group.description}</h2>
            <div className="button-cont-alt">
              {inGroup ?
                <Button onClick={() => leaveHere()} variant="outlined" color="secondary">Leave Group</Button> :
                <Button onClick={() => joinHere()} variant="outlined" color="secondary">Join Group</Button>
              }

              <Button onClick={() => addEvent()} variant="contained" color="secondary">Add Event</Button>
            </div>
          </div>
          <div>
            <EventList events={group.events}/>
          </div>
          <div>
            <h3>Members:</h3>
            <div className="member-list-cont">
              {group.members.map((member) => {

                return (
                  <div id={member.id} className="member-container">
                    <User user={member.user}/>
                    <p>{member.points | 0}pts</p>
                  </div>
                )
              })}
            </div>
          </div>
          <Comments group={group}/>
        </>
      }
    </div>
  )
}
