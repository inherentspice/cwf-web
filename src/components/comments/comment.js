import React from "react";
import User from "../user/user";

export default function Comment({comment, user}) {
  return (
    <div>
      <User user={user}/>
      <p>{comment.description}</p>
    </div>
  )
}
