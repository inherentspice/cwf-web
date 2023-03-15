import React from "react";
import Logo from "../../assets/logo-frame.png"

export default function Header() {
  return (
    <div className="header">
      <img src={Logo} alt="Crypto With Friends Logo" height="150"/>
    </div>
  )
}
