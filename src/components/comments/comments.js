import React from "react";
import Comment from "./comment";

export default function Comments({group}) {

  const getUser = userId => {
    return group.members.find(member => member.user.id === userId).user;
  }
  return (
    <div>
      <hr/>
      <h1>Comments:</h1>
      {group.comments.map(comment => {
        return <Comment comment={comment} user={getUser(comment.user)}/>
      })}
    </div>
  )
}
