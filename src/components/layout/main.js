import React from "react";
import GroupList from "../group/group-list"
import GroupDetails from "../group/group-details";
import Register from "../user/register";
import Event from "../events/event";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import Account from "../user/account";

export default function Main() {

  const { authData } = useAuth();

  return (
    <div className="main">
      <Routes>
        <Route exact path="/" element={<GroupList/>}/>
        <Route path="/details/:id" element={<GroupDetails/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/event/:id" element={<Event/>}/>
      </Routes>
    </div>
  )
}
