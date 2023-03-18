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


export default function EventForm() {

  const location = useLocation();
  const navigate = useNavigate();

  const [ crypto, setCrypto ] = useState("");
  const [ priceStart, setPriceStart ] = useState(null);
  const [ eventEnd, setEventEnd ] = useState(new Date());

  const { authData } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    const formattedTime = dayjs(eventEnd).format("YYYY-MM-DDTHH:mm")
    const formattedTimeNow = dayjs(Date.now()).format("YYYY-MM-DDTHH:mm")
    try {
      const dataToSend = {
        crypto,
        time: formattedTimeNow,
        end_time: formattedTime,
        price_start: priceStart,
        group: location.state.id
      }
      const eventData = await createEvent(authData.token, dataToSend);
      if (eventData) {
        NotificationManager.success("Event Created")
        navigate(`/details/${location.state.id}`)
      } else {
        NotificationManager.error("Error created event")
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <Link to={`/details/${location.state.id}`}><ArrowBackIcon/></Link>

      <h1>Event Form for group {location.state.id}</h1>
      <hr/>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
          <TextField
            label="Cryptocurrency"
            variant="standard"
            sx={textFieldStyling}
            type="text"
            onChange={ (e) => setCrypto(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
          <TextField
            label="Current Price"
            variant="standard"
            sx={textFieldStyling}
            type="number"
            onChange={ (e) => setPriceStart(e.target.value)}
          />
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer
            components={[
              'MobileDateTimePicker',
            ]}
          >
            <DemoItem label="Event End Date/Time">
              <MobileDateTimePicker
                value={dayjs(eventEnd)}
                onChange={(e) => setEventEnd(dayjs(e))}
                sx={datePickerStyling} />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
        <Button variant="contained" color="primary" type="submit">Create Event</Button>
      </form>
    </>
  )
}
