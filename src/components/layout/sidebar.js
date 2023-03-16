import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { auth } from "../../services/user-services";
import { useAuth } from "../../hooks/use-auth";
import { Link } from "react-router-dom";
import User from "../user/user";

export default function SideBar() {

  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const { authData, setAuth } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    const authDataJson = await auth({username, password});
    setAuth(authDataJson);
  }

  const logout = () => {
    setAuth(null);
  }


  return (
    <div className="sidebar">
      {!authData ?
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
          <br/>
          <Link to={"/register"}>Sign-up</Link>
        </form>
        :
        <div>
          <User user={authData.user}/>
          <br/>
          <br/>
          <Button variant="contained" color="primary" onClick={() => logout()}>Logout</Button>
        </div>
      }
    </div>
  )
}
