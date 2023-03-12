import React from "react";
import GroupList from "./group-list"
import GroupDetails from "./group-details";
import { Routes, Route } from "react-router-dom";

export default function Main() {
  return (
    <div className="main">
      <Routes>
        <Route exact path="/" element={<GroupList/>}/>
        <Route path="/details/:id" element={<GroupDetails/>}/>
      </Routes>
    </div>
  )
}
