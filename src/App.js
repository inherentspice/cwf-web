import React from "react";
import './App.css';
import 'react-notifications/lib/notifications.css';
import Header from "./components/layout/header";
import SideBar from "./components/layout/sidebar";
import Main from "./components/layout/main";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/use-auth";
import {NotificationContainer, NotificationManager} from 'react-notifications';

function App() {

  const user = JSON.parse(localStorage.getItem("cwf-user"));

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider user={user}>
        <div className="App">
          <Router>
            <Header/>
            <div className="general-content">
              <SideBar/>
              <Main/>
            </div>
          </Router>
        </div>
        <NotificationContainer/>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
