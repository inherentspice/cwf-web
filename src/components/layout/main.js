import React from "react";
import GroupList from "../group/group-list"
import GroupDetails from "../group/group-details";
import Register from "../user/register";
import Event from "../events/event";
import EventForm from "../events/event-form";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";
import Account from "../user/account";
import Landing from "../landing/landing";
import About from "../landing/about";
import Mission from "../landing/mission";
import GroupForm from "../group/group-form";

export default function Main() {

  return (
    <div className="main">
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route exact path="/group-list" element={<GroupList/>}/>
        <Route path="/details/:id" element={<GroupDetails/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/event/:id" element={<Event/>}/>
        <Route path="/event-form" element={<EventForm/>}/>
        <Route path="/group-form" element={<GroupForm/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/mission" element={<Mission/>}/>
      </Routes>
    </div>
  )
}
