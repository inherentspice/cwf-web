import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { postComment } from "../../services/group-services";
import Comment from "./comment";

export default function Comments({group}) {

  const { authData } = useAuth();

  const [ newComment, setNewComment ] = useState("");

  const getUser = userId => {
    return group.members.find(member => member.user.id === userId).user;
  }

  const sendComment = async () => {
    try {
      const response = await postComment(authData.token, newComment, group.id, authData.user.id);
      setNewComment("");
      group.comments.unshift(response);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div>
      <hr/>
      <h1>Comments:</h1>
      <TextField
        label="New Comment"
        multiline
        fullWidth
        rows={4}
        variant="outlined"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button onClick={() => sendComment()} disabled={!newComment} variant="contained" color="secondary">Send Comment</Button>
      <br/>
      {group.comments.map(comment => {
        return <Comment comment={comment} user={getUser(comment.user)}/>
      })}
    </div>
  )
}
