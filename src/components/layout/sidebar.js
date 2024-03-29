import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import { auth } from "../../services/user-services";
import { useAuth } from "../../hooks/use-auth";
import { Link, useNavigate} from "react-router-dom";
import User from "../user/user";
import { textFieldStyling } from "./mui-styles";

export default function SideBar() {

  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const { authData, setAuth } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    const authDataJson = await auth({username, password});
    setAuth(authDataJson);
  }

  const logout = () => {
    setAuth(null);
    navigate("/");
  }

  const account = () => {
    navigate("/account");
  }

  return (
    <div className="sidebar">
      {!authData ?
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
          <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
            <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5, color: 'white'}} />
            <TextField
              id="input-with-sx"
              label="Username"
              variant="standard"
              sx={textFieldStyling}
              onChange={ e => setUsername(e.target.value)}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
            <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5, color: 'white'}} />
            <TextField
              id="input-with-sx"
              label="Password"
              variant="standard"
              sx={textFieldStyling}
              type="password"
              onChange={ e => setPassword(e.target.value)}
            />
          </Box>
          </div>
          <div className="login-submit-cont">
            <Button variant="contained" color="primary" type="submit">Login</Button>
            <Link to={"/register"}>Sign-up</Link>
          </div>
        </form>
        :
        <div>
          <User user={authData.user}/>
          <br/>
          <br/>
          <div className="user-actions-cont">
            <Button variant="contained" color="primary" onClick={() => logout()}>Logout</Button>
            <Button variant="contained" color="primary" onClick={() => account()}>My Account</Button>
          </div>

        </div>
      }
    </div>
  )
}
