import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getGroup } from "../services/group-services";

export default function GroupDetails() {

  const { id } = useParams();

  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const groupJson = await getGroup(id);
        setGroup(groupJson);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (error) return <h1>Error</h1>;

  if (loading) return <h1>Loading...</h1>

  return (
    <div>
      <Link to="/">Back</Link>
      <h1>Details here for group {id}</h1>
    </div>
  )
}
