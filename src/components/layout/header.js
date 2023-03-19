import React from "react";
import Logo from "../../assets/logo-frame.png"
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header">
      {/* <img src={Logo} alt="Crypto With Friends Logo" height="150"/> */}
      <Link to="/">Crypto With Friends</Link>
      <nav className="nav">
        <Link to="/about">about</Link>
        <Link to="/mission">mission</Link>
        <Link to="/group-list">groups</Link>
        <Link to="/register">sign-up</Link>
      </nav>
    </div>
  )
}
