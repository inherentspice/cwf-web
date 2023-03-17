import React, { useState } from "react";
import { DateTime } from "luxon";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useParams } from "react-router-dom";
import { useFetchEvent } from "../../hooks/fetch-event";
import { useAuth } from "../../hooks/use-auth";

export default function Event({events}) {

  const { id } = useParams();
  const { authData } = useAuth();
  const [ data, loading, error] = useFetchEvent(authData.token, id);
  const [ event, setEvent ] = useState(null);

  return (
    <>
      <h3>Event:</h3>
    </>
  )
}
