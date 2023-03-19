import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { TextField, Box, Button } from "@mui/material";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { createEvent } from "../../services/event-services";
import { useAuth } from "../../hooks/use-auth";
import { NotificationManager } from "react-notifications";
import { datePickerStyling, textFieldStyling } from "../layout/mui-styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { postGroup } from "../../services/group-services";


export default function GroupForm() {

  const navigate = useNavigate();

  const [ name, setName ] = useState("");
  const [ location, setLocation ] = useState("");
  const [ description, setDescription ] = useState("");

  const { authData } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const dataToSend = {
        name,
        location,
        description
      }
      const eventData = await postGroup(authData.token, dataToSend);
      if (eventData) {
        NotificationManager.success("Event Created")
        navigate("/")
      } else {
        NotificationManager.error("Error creating group")
      }
    } catch (err) {
      NotificationManager.error("Error creating group")
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
          <TextField
            label="Group Name"
            variant="standard"
            sx={textFieldStyling}
            type="text"
            onChange={ (e) => setName(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
          <TextField
            label="Location"
            variant="standard"
            sx={textFieldStyling}
            type="text"
            onChange={ (e) => setLocation(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
          <TextField
            label="Description"
            variant="standard"
            sx={textFieldStyling}
            type="text"
            onChange={ (e) => setDescription(e.target.value)}
          />
        </Box>
        <Button variant="contained" color="secondary" type="submit">Create Event</Button>
      </form>
    </>
  )
}
