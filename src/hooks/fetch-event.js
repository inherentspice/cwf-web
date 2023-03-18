import { useState, useEffect } from "react";
import { getEvent } from "../services/event-services";


export function useFetchEvent(token, eventId) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const data = await getEvent(token, eventId);
        setEvent(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    getData();
  }, [eventId])

  return [event, loading, error]

}
