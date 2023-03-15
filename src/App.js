import React from "react";
import './App.css';
import Header from "./components/header";
import SideBar from "./components/sidebar";
import Main from "./components/main";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./hooks/use-auth";

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
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
