import React, { useState } from "react";
import { Avatar } from '@mui/material';
import { pink } from '@mui/material/colors';

export default function User({user}) {
  const avatarStyle = {
    backgroundColor: user.profile?.image || "#F06292",
    width: "100px",
    height: "100px",
    fontSize: "2.5rem",
    boxShadow: `1px 1px 1px 1px ${pink[900]}`
  }

  return (
    <div className="user-cont">
        <Avatar
          sx={avatarStyle}
          alt="temporary user profile picture"
        >{user.username[0]}</Avatar>
      <h4 className="username">{user.username}</h4>
    </div>
  )
}
