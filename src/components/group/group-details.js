import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchGroup } from "../../hooks/fetch-group";
import { useAuth } from "../../hooks/use-auth";
import { DateTime } from "luxon";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import User from "../user/user";
import { Button } from "@mui/material";
import { joinGroup, leaveGroup } from "../../services/group-services";

export default function GroupDetails() {

  const { id } = useParams();
  const { authData } = useAuth();
  const [ data, loading, error] = useFetchGroup(id);
  const [ group, setGroup ] = useState(null);
  const [ inGroup, setInGroup ] = useState(false);
  const [ isAdmin, setIsAdmin ] = useState(false);

  useEffect(() => {
    if (data?.members) {
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

  if (error) return <h1>Error</h1>;

  if (loading) return <h1>Loading...</h1>

  return (
    <div>
      <Link to="/">Back</Link>
      {group &&
        <>
          <h1>Details here for {group.name}: {group.location}</h1>
          <h2>{group.description}</h2>
          {inGroup ?
            <Button onClick={() => leaveHere()} variant="contained" color="primary">Leave Group</Button> :
            <Button onClick={() => joinHere()} variant="contained" color="primary">Join Group</Button>
          }


          <h3>Events:</h3>
          {group.events.map((event) => {
            const format = "yyyy-MM-dd'T'HH:mm:ss'Z'"
            const eventTime = DateTime.fromFormat(event.time, format);

            return (
              <div id={event.id}>
                <p>{event.crypto}</p>
                <p>
                  <CalendarTodayIcon className="dateTime"/>{eventTime.toSQLDate()}
                  <AccessTimeIcon className="dateTime"/>{eventTime.toFormat("HH:mm")}</p>
              </div>
            )
          })}
          <h3>Members:</h3>
          {group.members.map((member) => {

            return (
              <div id={member.id} className="member-container">
                <User user={member.user}/>
                <p>{member.points}pts</p>
              </div>
            )
          })}
        </>
      }
    </div>
  )
}
