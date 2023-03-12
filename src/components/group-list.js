import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGroups } from "../services/group-services";

export default function GroupList() {

  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const groupJson = await getGroups();
        setGroups(groupJson);
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
        {groups && Array.from(groups).map((group) => {
          return (
            <Link key={group.id} to={`/details/${group.id}`}>
              <p>{group.name}: {group.location}</p>
            </Link>
          )
        })}
    </div>
  );
}
