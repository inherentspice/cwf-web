import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GroupIcon from '@mui/icons-material/Group';

export default function GroupListItem({group}) {

  return (
    <div className="group-list-item-cont">
      <Link to={`/details/${group.id}`}>
        <h3><span className="highlight">{group.name}:</span> {group.location}</h3>
      </Link>
      <div className="member-count-cont">
        <GroupIcon/> {group.num_members}
      </div>
    </div>
  );
}
