import React, { useState, useEffect } from "react";

export default function GroupList() {

  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const groupData = await fetch("http://127.0.0.1:8000/api/groups");
        const groupJson = await groupData.json();
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
          return <p key={group.id}>{group.name}: {group.location}</p>
        })}
    </div>
  );
}
