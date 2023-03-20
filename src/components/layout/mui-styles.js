import { pink } from "@mui/material/colors";

export const textFieldStyling = {
  "& *": {
    color: "white !important",
    textAlign: "center",
    fontSize: "1.2rem"
  },
  "& label": {
    color: pink[500]
  },
  "& label.Mui-focused": {
    color: `${pink[500]} !important`
  },
  "& .MuiInput-underline:before": {
    borderBottomColor: pink[300]
  },
  "& .MuiInput-underline:hover:before": {
    borderBottomColor: `${pink[400]} !important`
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: pink[500]
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      color: pink[500],
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
  },
  "& .MuiSelect-select": {
    color: 'white',
  },
}

export const datePickerStyling = {
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
}

export const selectStyling = {
  '& .MuiInputLabel-root': {
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiSelect-select': {
      color: 'white',
    },
  },
}
