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
        const eventTime = DateTime.fromISO(event.end_time);
        return (
          <div id={event.id} className="event-info" onClick={() => openEvent(event.id)}>
            <p>{event.crypto}:</p>
            <p><CalendarTodayIcon className="dateTime"/>{eventTime.toSQLDate()}</p>
            <p><AccessTimeIcon className="dateTime"/>{eventTime.toFormat("HH:mm")}</p>
          </div>
        )
      })}
    </>
  )
}
