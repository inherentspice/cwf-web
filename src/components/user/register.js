import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAuth } from "../../hooks/use-auth";
import { Button, TextField, Box } from "@mui/material";
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { register } from "../../services/user-services";
import { auth } from "../../services/user-services";

export default function Register() {

  const { setAuth} = useAuth();
  const [ username, setUsername ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ passwordConfirm, setPasswordConfirm ] = useState("");
  const [ email, setEmail ] = useState("");

  const navigate = useNavigate();

  const passMatch = () => {
    return password === passwordConfirm;
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (passMatch()) {
      const regData =  await register({username, email, password, profile: {bio: ""}});
      if (regData) {
        const authDataJson = await auth({username, password});
        setAuth(authDataJson);
        navigate("/account");
      }
    } else {
      console.log("nope")
    }
  }

  return (
    <div>
      <Link to={"/"}>Back</Link>
      <h1>Sign-up</h1>
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
                },
                "input": {
                  color: "white"
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
                },
                "input": {
                  color: "white"
                }
              }}
              type="password"
              onChange={ e => setPassword(e.target.value)}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
            <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5, color: 'white'}} />
            <TextField
              id="input-with-sx"
              label="Confirm Password"
              variant="standard"
              sx={{
                "& .MuiInputLabel-root": {
                  color: "white",
                  opacity: .9,
                },
                "input": {
                  color: "white"
                }
              }}
              type="password"
              onChange={ e => setPasswordConfirm(e.target.value)}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5, color: 'white'}} />
            <TextField
              id="input-with-sx"
              label="Email"
              variant="standard"
              sx={{
                "& .MuiInputLabel-root": {
                  color: "white",
                  opacity: .9,
                },
                "input": {
                  color: "white"
                }
              }}
              onChange={ e => setEmail(e.target.value)}
            />
          </Box>
          <Button variant="contained" color="primary" type="submit">Sign-up</Button>
          <br/>
        </form>
    </div>
  )
}
