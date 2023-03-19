import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getGroups } from "../../services/group-services";
import GroupListItem from "./group-list-item";
import BackgroundImage from "../../assets/group-image.png"


export default function GroupList() {

  const [groups, setGroups] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

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

  const newGroupClick = () => {
    navigate("/group-form");
  }
  return (
    <div className="group-list-cont">
      <Button className="new-group-btn" variant="contained" color="secondary" onClick={() => newGroupClick()}>Create Group +</Button>
        {groups && Array.from(groups).map((group) => {
          return <GroupListItem group={group} key={group.id}/>
        })}
      <img src={BackgroundImage} alt="Background image" className="group-background"/>
    </div>
  );
}
