import React from "react";
import './App.css';
import GroupList from "./components/group-list";
import Header from "./components/header";
import SideBar from "./components/sidebar";
import Main from "./components/main";

function App() {

  return (
    <div className="App">
      <Header/>
      <div className="general-content">
        <SideBar/>
        <Main/>
      </div>
    </div>
  );
}

export default App;
