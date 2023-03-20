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
import { placeBet, setEndPrice } from "../../services/event-services";
import { NotificationManager } from "react-notifications";
import { textFieldStyling } from "../layout/mui-styles";
import Charts from "./charts";

export default function Event({}) {

  const { id } = useParams();
  const { authData } = useAuth();
  const [ data, loading, error] = useFetchEvent(authData.token, id);
  const [ event, setEvent ] = useState(null);
  const [ eventStartTime, setEventStartTime ] = useState(null);
  const [ eventEndTime, setEventEndTime ] = useState(null);
  const [ isFuture, setIsFuture ] = useState(false);
  const [ timeDifference, setTimeDifference ] = useState(null);
  const [ pricePrediction, setPricePrediction ] = useState(null);
  const [ priceEnd, setPriceEnd ] = useState(null);
  const [ currentPrice, setCurrentPrice ] = useState(null);

  useEffect(() => {
    setEvent(data);
    if (data?.time) {
      const format = "yyyy-MM-dd'T'HH:mm:ss'Z'"
      const startTime = DateTime.fromFormat(data.time, format)
      const endTime = DateTime.fromISO(data.end_time);
      setEventStartTime(startTime);
      setEventEndTime(endTime)
      const now = DateTime.now();
      setIsFuture(endTime > now);
      setTimeDifference(endTime.toRelative())
    }
  }, [data]);

  useEffect(() => {
    if (event) fetchCurrentPrice();
  }, [event])

  const fetchCurrentPrice = async () => {
    const coinId = event.crypto.toLowerCase();
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`
    );

    const data = await response.json();
    console.log(data)
    setCurrentPrice(data[coinId].usd);
  };

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

  const sendEndPrice = async () => {
    try {
      const eventData = await setEndPrice(authData.token, {price_end: priceEnd, event: event.id})
      if (eventData) {
        setEvent(eventData)
        NotificationManager.success("End price has been set.")
      }
    } catch (err) {
      NotificationManager.error("Something went wrong setting the end price.");
    }
  }


  if (error) return <h1>Error</h1>;

  if (loading) return <h1>Loading...</h1>

  return (
    <div className="event-cont">
      {event && <Link to={`/details/${event.group}`}><ArrowBackIcon/></Link>}
      {event && eventStartTime &&
        <>
          <div className="group-details-cont event-detail-cont">
            <h2>{event.crypto}</h2>
            <p>Starting Price: ${event.price_start}</p>
            <p>Current Price: ${currentPrice}</p>
            <p>Ending Price: {event.price_end ? `$${event.price_end}` : ""}</p>
            <h3>Start Time:
              <CalendarTodayIcon className="dateTime"/>{eventStartTime.toSQLDate()}
              <AccessTimeIcon className="dateTime"/>{eventStartTime.toFormat("HH:mm")}
            </h3>
            <h3> End Time:
              <CalendarTodayIcon className="dateTime"/>{eventEndTime.toSQLDate()}
              <AccessTimeIcon className="dateTime"/>{eventEndTime.toFormat("HH:mm")}
            </h3>
            <h3>Ending: {timeDifference}</h3>
          </div>
          <div>
            { event && event.bets && event.bets.map(bet => {
              return <div key={bet.id} className="bets">
                <User user={bet.user}/>
                <h4>${bet.price_end}</h4>
                <h4>Points: {bet.points}</h4>
              </div>
            })}
            { isFuture ?
              <div>
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
                <Button variant="contained" onClick={() => sendBet()} color="secondary" disabled={!pricePrediction}>Place Bet</Button>
              </div> :
              <div>
                <hr/>

                <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                  <CurrencyBitcoinIcon sx={{ color: 'action.active', mr: 1, my: 0.5, color: 'white'}} />
                  <TextField
                    label="Ending Price"
                    variant="standard"
                    sx={textFieldStyling}
                    type="number"
                    onChange={ e => setPriceEnd(e.target.value)}
                  />
                </Box>
                <Button variant="contained" onClick={() => sendEndPrice()} color="secondary" disabled={!priceEnd}>Set Ending Price</Button>
              </div>
              }
              <Charts coin={event.crypto}/>
            </div>
        </>
      }
    </div>
  )
}
