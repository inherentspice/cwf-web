import { useState, useEffect } from "react";
import { getGroup } from "../services/group-services";


export function useFetchGroup(groupId) {
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const data = await getGroup(groupId);
        setGroup(data);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    getData();
  }, [groupId])

  return [group, loading, error]

}
