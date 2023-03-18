import React from "react";
import { DateTime } from "luxon";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";


export default function EventList({events}) {

  const navigate = useNavigate();

  const openEvent = eventId => {
    navigate(`/event/${eventId}`);
  }
  return (
    <>
      <h3>Events:</h3>
      {events && events.map((event) => {
        const format = "yyyy-MM-dd'T'HH:mm:ss'Z'"
        const eventTime = DateTime.fromFormat(event.time, format);

        return (
          <div id={event.id} onClick={() => openEvent(event.id)}>
            <p>{event.crypto}
            &nbsp; : &nbsp;
              <CalendarTodayIcon className="dateTime"/>{eventTime.toSQLDate()}
              <AccessTimeIcon className="dateTime"/>{eventTime.toFormat("HH:mm")}</p>
          </div>
        )
      })}
    </>
  )
}
