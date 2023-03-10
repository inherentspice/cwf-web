import React from "react";
import './App.css';
import GroupList from "./components/group-list";
import Header from "./components/header";
import SideBar from "./components/sidebar";
import Main from "./components/main";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <Header/>
        <div>
          <SideBar/>
          <Main/>
        </div>
      </header>
    </div>
  );
}

export default App;
