import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Button, TextField, Box } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { register, uploadProfilePic } from "../../services/user-services";

export default function Account() {

  const { authData } = useAuth();
  const [ image, setImage ] = useState();


  const uploadFile = async e => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("image", image, image.name);
    const profileData = await uploadProfilePic(authData.user.id, uploadData);
  }

  return (
    <div>
      <Link to={"/"}>Back</Link>
      <h1>Account</h1>
      <form onSubmit={uploadFile}>
        <label>
          <p>Upload Profile Picture</p>
          <TextField type="file" onChange={e => setImage(e.target.files[0])}></TextField>
        </label>
        <Button type="submit" variant="contained" color="primary">Upload File</Button>
      </form>
    </div>
  )
}
