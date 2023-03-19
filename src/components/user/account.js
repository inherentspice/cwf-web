import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Button, TextField, Box } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { changePassword, uploadProfilePic } from "../../services/user-services";
import { NotificationManager } from "react-notifications";
import { textFieldStyling } from "../layout/mui-styles";


export default function Account() {

  const { authData } = useAuth();
  const [ image, setImage ] = useState();
  const [ oldPassword, setOldPassword ] = useState("");
  const [ newPassword, setNewPassword ] = useState("");
  const [ newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const passMatch = () => {
    return newPassword === newPasswordConfirm;
  }

  const uploadFile = async e => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("image", image, image.name);
    const uploaded = await uploadProfilePic(authData.token, authData.user.id, uploadData);
    if (uploaded) {
      NotificationManager.success("Image has been uploaded");
    } else {
      NotificationManager.error("Error uploading image")
    }
  }

  const changePass = async e => {
    e.preventDefault();
    if (passMatch()) {
      const passData =  await changePassword(
        {old_password: oldPassword, new_password: newPassword},
        authData.user.id,
        authData.token
      );
      if (passData) {
        NotificationManager.success("Password has been changed");
      }
    } else {
      NotificationManager.error("Passwords don't match")
    }
  }

  return (
    <div className="register-cont">
      <div className="sign-up-cont">

        <h1>Change your picture</h1>
        <form className="register-form" onSubmit={uploadFile}>
          <label>
            <p>Upload Profile Picture</p>
            <TextField type="file" onChange={e => setImage(e.target.files[0])} sx={textFieldStyling}></TextField>
          </label>
          <Button type="submit" variant="contained" color="primary">Upload File</Button>
        </form>
        <h1>Change your password</h1>
        <form className="register-form" onSubmit={changePass}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
              <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5, color: 'white'}} />
              <TextField
                id="input-with-sx"
                label="Old Password"
                variant="standard"
                sx={textFieldStyling}
                type="password"
                onChange={ e => setOldPassword(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
              <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5, color: 'white'}} />
              <TextField
                id="input-with-sx"
                label="New Password"
                variant="standard"
                sx={textFieldStyling}
                type="password"
                onChange={ e => setNewPassword(e.target.value)}
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
              <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5, color: 'white'}} />
              <TextField
                id="input-with-sx"
                label="Confirm New Password"
                variant="standard"
                sx={textFieldStyling}
                type="password"
                onChange={ e => setNewPasswordConfirm(e.target.value)}
              />
            </Box>
          <Button type="submit" variant="contained" color="primary">Change Password</Button>
      </form>
    </div>
  </div>
  )
}
