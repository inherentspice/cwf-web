import React from "react";
import { DateTime } from "luxon";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export default function EventList({events}) {
  return (
    <>
      <h3>Events:</h3>
      {events && events.map((event) => {
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
    </>
  )
}
