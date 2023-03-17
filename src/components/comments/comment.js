import { Typography } from "@mui/material";
import React from "react";
import User from "../user/user";

export default function Comment({comment, user}) {
  return (
    <div className="comment-cont">
      <User user={user}/>
      <div className="dialog-box">
        <div className="dialog-body">
          <span className="tip">&nbsp;</span>
          <div className="body-message">
            <span>{comment.description}</span>
          </div>
        </div>
        <Typography variant="p" className="time">
          {comment.time.split('T')[0]} &nbsp;{comment.time.split('T')[1].substring(0, 5)}
        </Typography>
      </div>
    </div>
  )
}
