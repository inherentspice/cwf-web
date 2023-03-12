import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getGroup } from "../services/group-services";
import { useFetchGroup } from "../hooks/fetch-group";

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
      {group && <h1>Details here for {group.name} {id}</h1>}
    </div>
  )
}
