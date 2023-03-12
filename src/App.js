import React from "react";
import './App.css';
import Header from "./components/header";
import SideBar from "./components/sidebar";
import Main from "./components/main";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Header/>
          <div className="general-content">
            <SideBar/>
            <Main/>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
