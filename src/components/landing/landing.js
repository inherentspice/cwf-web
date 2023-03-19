import BackgroundImage from "../../assets/background-image.png"
import CallToActionIcon from '@mui/icons-material/CallToAction';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const signUpClick = () => {
    navigate("/register");
  }

  const aboutClick = () => {
    navigate("/about");
  }

  const missionClick = () => {
    navigate("/mission");
  }

  return (
    <div className="landing-page-cont">
      <img src={BackgroundImage} alt="Background image"className="landing-background"/>
      <div className="landing-info-cont">
        <h1>Crypto With Friends</h1>
        <h2>Bet Crypto Social</h2>
        <p>
          Crypto With Friends is the ultimate platform for cryptocurrency enthusiasts to have fun while playing and learning about the world of cryptocurrencies.
          The platform allows players to bet on the price of different cryptocurrencies without using actual money.
          Instead, players use their wits and compete against each other in a safe and friendly environment.
          The concept behind Crypto With Friends is to create a space where players can enjoy the thrill of trading cryptocurrencies without the financial risks.
        </p>
        <div className="landing-breakaway-cont">
          <ul className="breakaway-list">
            <li>Bitcoin</li>
            <li>Ethereum</li>
            <li>Doge</li>
            <li>Polkadot</li>
          </ul>
          <div className="button-cont">
            <Button variant="outlined" color="secondary" onClick={() => signUpClick()}>Sign-Up</Button>
            <Button variant="contained" color="secondary" onClick={() => missionClick()}>Mission</Button>
          </div>

        </div>
        <div className="landing-breakaway-small-cont">
          <CallToActionIcon/>
          <p>Find Out More</p>
          <Button variant="contained" color="secondary" onClick={() => aboutClick()}>About</Button>
        </div>
      </div>
    </div>
  )
}
