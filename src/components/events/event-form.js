import { Link, useParams, useLocation } from "react-router-dom";
import { TextField, Box } from "@mui/material";
import { pink, purple } from "@mui/material/colors";

export default function EventForm() {

  const location = useLocation();

  return (
    <>
    <h1>Event Form for group {location.state.id}</h1>
    <hr/>
      <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
        {/* <CurrencyBitcoinIcon sx={{ color: 'action.active', mr: 1, my: 0.5, color: 'white'}} /> */}
        <TextField
          label="Price Prediction"
          variant="standard"
          sx={{
            "& > *": {
              color: "white",
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
            }
          }}
          type="number"
          onChange={ () => {}}
        />
      </Box>
    </>
  )
}
