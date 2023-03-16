import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetchGroup } from "../../hooks/fetch-group";
import { DateTime } from "luxon";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import User from "../user/user";

export default function GroupDetails() {

  const { id } = useParams();

  const [ data, loading, error] = useFetchGroup(id);
  const [ group, setGroup ] = useState(null);

  useEffect(() => {
    setGroup(data);
  }, [data]);

  if (error) return <h1>Error</h1>;

  if (loading) return <h1>Loading...</h1>

  return (
    <div>
      <Link to="/">Back</Link>
      {group &&
        <>
          <h1>Details here for {group.name}: {group.location}</h1>
          <h2>{group.description}</h2>

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
