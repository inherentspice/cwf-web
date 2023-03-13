import React, { useState } from "react";
import { Button, TextField, InputAdornment, Box } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { auth } from "../services/user-services";


export default function SideBar() {

  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    const authData = await auth({username, password});
    console.log(authData);
  }


  return (
    <div className="sidebar">
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5, color: 'white'}} />
          <TextField
            id="input-with-sx"
            label="Username"
            variant="standard"
            sx={{
              "& .MuiInputLabel-root": {
                color: "white",
                opacity: .9,
              }
            }}
            onChange={ e => setUsername(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
          <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5, color: 'white'}} />
          <TextField
            id="input-with-sx"
            label="Password"
            variant="standard"
            sx={{
              "& .MuiInputLabel-root": {
                color: "white",
                opacity: .9,
              }
            }}
            type="password"
            onChange={ e => setPassword(e.target.value)}
          />
        </Box>
        <Button variant="contained" color="primary" type="submit">Login</Button>
      </form>
    </div>
  )
}
