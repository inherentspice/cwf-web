import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Button, TextField, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import { auth, changePassword, uploadProfilePic } from "../../services/user-services";
import { NotificationManager } from "react-notifications";
import { textFieldStyling, selectStyling } from "../layout/mui-styles";


export default function Account() {

  const { authData, setAuth } = useAuth();
  const [ color, setColor ] = useState("");
  const [ oldPassword, setOldPassword ] = useState("");
  const [ newPassword, setNewPassword ] = useState("");
  const [ newPasswordConfirm, setNewPasswordConfirm] = useState("");

  const passMatch = () => {
    return newPassword === newPasswordConfirm;
  }

  const changeProfileBackground = async e => {
    e.preventDefault();
    const uploadData = {image: color}
    const uploaded = await uploadProfilePic(authData.token, authData.user.id, uploadData);
    if (uploaded) {
      setAuth(prevState => {
        const updatedAuthData = {
          ...prevState,
          user: {
            ...prevState.user,
            profile: {
              ...prevState.user.profile,
              image: color
            }
          }
        };

        return updatedAuthData;
      });
    } else {
      NotificationManager.error("Error uploading image")
    }
  }

  console.log(authData);

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

        <h1>Change your profile background</h1>
        <form className="register-form" onSubmit={changeProfileBackground}>
          <FormControl sx={selectStyling} variant="outlined" style={{ marginBottom: "16px", width: "190px" }}>
            <InputLabel>Profile Background</InputLabel>
            <Select
              value={color}
              onChange={e => setColor(e.target.value)}
              label="Color"
              sx={textFieldStyling}
              variant="filled"
              inputProps={{
                name: 'graph-color',
                id: 'graph-color',
              }}
            >
              <MenuItem value="#01D3D2">blue</MenuItem>
              <MenuItem value="#90ee90">green</MenuItem>
              <MenuItem value="#ffc400">yellow</MenuItem>
              <MenuItem value="#F06292">pink</MenuItem>
              <MenuItem value="#D8A3DC">purple</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">Change Background</Button>
        </form>
        <h1>Change your password</h1>
        <form className="register-form" onSubmit={changePass}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
              <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5, color: 'white'}} />
              <TextField
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
