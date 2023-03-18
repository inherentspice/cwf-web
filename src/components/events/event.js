import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, Link } from "react-router-dom";
import { useFetchEvent } from "../../hooks/fetch-event";
import { useAuth } from "../../hooks/use-auth";
import User from "../user/user";
import { TextField, Box, Button } from "@mui/material";
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import { placeBet } from "../../services/event-services";
import { NotificationManager } from "react-notifications";
import { textFieldStyling } from "../layout/mui-styles";

export default function Event({}) {

  const { id } = useParams();
  const { authData } = useAuth();
  const [ data, loading, error] = useFetchEvent(authData.token, id);
  const [ event, setEvent ] = useState(null);
  const [ eventTime, setEventTime ] = useState(null);
  const [ pricePrediction, setPricePrediction ] = useState(null);

  useEffect(() => {
    setEvent(data);
    if (data?.time) {
      const format = "yyyy-MM-dd'T'HH:mm:ss'Z'"
      setEventTime(DateTime.fromFormat(data.time, format));
    }
  }, [data]);

  const sendBet = async () => {
    try {
      const bet = await placeBet(authData.token, {price_end: pricePrediction, event: event.id})
      if (bet) {
        event.bets.push(bet.result)
        setPricePrediction(null);
      }
      NotificationManager.success(bet.message)
    } catch (err) {
      console.log(err);
      NotificationManager.error("Something went wrong placing your bet. Remember: you can't change your bet once placed.");
    }
  }


  if (error) return <h1>Error</h1>;

  if (loading) return <h1>Loading...</h1>

  return (
    <>
      {event && eventTime &&
        <div>
          <Link to={`/details/${event.group}`}><ArrowBackIcon/></Link>
          <h2>{event.crypto}</h2>
          <p>Starting Price: ${event.price_start}</p>
          <p>Current Price: </p>
          <p>Ending Price: {event.price_end ? `$${event.price_end}` : ""}</p>
          <h3>
            <CalendarTodayIcon className="dateTime"/>{eventTime.toSQLDate()}
            <AccessTimeIcon className="dateTime"/>{eventTime.toFormat("HH:mm")}
          </h3>
          <hr/>
          { event && event.bets && event.bets.map(bet => {
            return <div key={bet.id} className="bets">
              <User user={bet.user}/>
              <h4>${bet.price_end}</h4>
              <h4>Points: </h4>
            </div>
          })}
          <hr/>
          <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
            <CurrencyBitcoinIcon sx={{ color: 'action.active', mr: 1, my: 0.5, color: 'white'}} />
            <TextField
              label="Price Prediction"
              variant="standard"
              sx={textFieldStyling}
              type="number"
              onChange={ e => setPricePrediction(e.target.value)}
            />
          </Box>
          <Button variant="contained" color="secondary" onClick={() => sendBet()} disabled={!pricePrediction}>Predict</Button>
        </div>
      }
    </>
  )
}
