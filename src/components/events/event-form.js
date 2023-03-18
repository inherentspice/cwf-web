import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { TextField, Box, Button } from "@mui/material";
import { pink } from "@mui/material/colors";
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';


export default function EventForm() {

  const location = useLocation();

  const [ crypto, setCrypto ] = useState("");
  const [ priceStart, setPriceStart ] = useState(null);
  const [ eventEnd, setEventEnd ] = useState(new Date());

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(crypto, priceStart, eventEnd);
  }

  return (
    <>
      <h1>Event Form for group {location.state.id}</h1>
      <hr/>
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
          <TextField
            label="Cryptocurrency"
            variant="standard"
            sx={{
              "& *": {
                color: "white !important",
                textAlign: "center",
                fontSize: "1.2rem"
              },
              "& label": {
                color: "white"
              },
              "& label.Mui-focused": {
                color: pink[500]
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: pink[300]
              },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: pink[400]
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: pink[500]
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  color: "white",
                  borderColor: pink[500]
                },
                "&:hover fieldset": {
                  borderColor: pink[500]
                },
                "&.Mui-focused fieldset": {
                  borderColor: pink[500]
                }
              },
              "label": {
                color: "white"
              }
            }}
            type="text"
            onChange={ (e) => setCrypto(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
          <TextField
            label="Current Price"
            variant="standard"
            sx={{
              "& *": {
                color: "white !important",
                textAlign: "center",
                fontSize: "1.2rem"
              },
              "& label": {
                color: "white"
              },
              "& label.Mui-focused": {
                color: pink[500]
              },
              "& .MuiInput-underline:before": {
                borderBottomColor: pink[300]
              },
              "& .MuiInput-underline:hover:before": {
                borderBottomColor: pink[400]
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: pink[500]
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  color: "white",
                  borderColor: pink[500]
                },
                "&:hover fieldset": {
                  borderColor: pink[500]
                },
                "&.Mui-focused fieldset": {
                  borderColor: pink[500]
                }
              },
              "label": {
                color: "white"
              }
            }}
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
                sx={{
                  "& *": {
                    color: "white",
                    textAlign: "center",
                    fontSize: "1.2rem",
                    cursor: "pointer"
                  },
                  "& label": {
                    color: "white"
                  },
                  "& label.Mui-focused": {
                    color: pink[100]
                  },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: pink[100]
                  },
                  "& .MuiInput-underline:hover:before": {
                    borderBottomColor: pink[100]
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: pink[100]
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      color: "white",
                      borderColor: pink[100]
                    },
                    "&:hover fieldset": {
                      borderColor: pink[100]
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: pink[300]
                    }
                  },
                  "input": {
                    color: "white"
                  }
            }} />
            </DemoItem>
          </DemoContainer>
        </LocalizationProvider>
        <Button variant="contained" color="primary" type="submit">Create Event</Button>
      </form>
    </>
  )
}
