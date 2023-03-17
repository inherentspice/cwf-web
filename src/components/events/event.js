import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useParams } from "react-router-dom";
import { useFetchEvent } from "../../hooks/fetch-event";
import { useAuth } from "../../hooks/use-auth";
import User from "../user/user";

export default function Event({}) {

  const { id } = useParams();
  const { authData } = useAuth();
  const [ data, loading, error] = useFetchEvent(authData.token, id);
  const [ event, setEvent ] = useState(null);
  const [ eventTime, setEventTime ] = useState(null);

  useEffect(() => {
    setEvent(data);
    if (data?.time) {
      const format = "yyyy-MM-dd'T'HH:mm:ss'Z'"
      setEventTime(DateTime.fromFormat(data.time, format));
    }
  }, [data]);

  if (error) return <h1>Error</h1>;

  if (loading) return <h1>Loading...</h1>

  return (
    <>
      {event && eventTime &&
        <div>
          <h2>{event.crypto}</h2>
          <p>Starting Price: ${event.price_start}</p>
          <p>Current Price: </p>
          <p>Ending Price: {event.price_end ? `$${event.price_end}` : ""}</p>
          <h3>
            <CalendarTodayIcon className="dateTime"/>{eventTime.toSQLDate()}
            <AccessTimeIcon className="dateTime"/>{eventTime.toFormat("HH:mm")}
          </h3>
          <hr/>
          { event && event.bets && event.bets.map(bet => {
            return <div key={bet.id} className="bets">
              <User user={bet.user}/>
              <h4>${bet.price_end}</h4>
              <h4>Points: </h4>
            </div>
          })}
        </div>
      }
    </>
  )
}
