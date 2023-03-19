import BackgroundImage from "../../assets/about-image.png"
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
    <div className="about-cont">
      <div className="bio-instructions-cont">
        <div className="landing-info-cont">
          <h1>Re-Imagining Web3 Engagement</h1>
          <p>
          Welcome to Crypto With Friends, the premier web3 crypto gambling platform where users can showcase their analytical prowess and compete to guess the future prices of various cryptocurrencies.
          Our mission is to create a thrilling and engaging experience for crypto enthusiasts, traders, and gamblers alike, as they pit their skills against one another in a battle of wit and fortune.
          </p>
          <Button variant="outlined" color="secondary" onClick={() => signUpClick()}>Sign-Up</Button>
        </div>
        <div className="about-instructions-cont">
          <h2>Step-by-step</h2>
          <ol>
            <li>Browse through our list of available cryptocurrencies and choose the one you'd like to predict.</li>
            <li>Join an existing group or create a new one to compete with others.</li>
            <li>Place your prediction for the future price of the selected cryptocurrency.</li>
            <li>Monitor the progress of the competition and see how your predictions stack up against others in your group.</li>
            <li>Winners will be determined based on the accuracy of their predictions</li>
          </ol>
        </div>
      </div>
      <div className="info-cont">
        <div className="about-info-cont">
          <h2>Community</h2>
          <p>
          Crypto With Friends offers a unique experience by allowing users to join or create custom groups where they can compete with friends, colleagues, or even complete strangers.
          By fostering a sense of community and rivalry, Crypto With Friends enhances the excitement of predicting the volatile and ever-changing crypto market.
          </p>
        </div>
        <div className="about-info-cont">
          <h2>Interactive</h2>
          <p>
            Whether you're a seasoned crypto trader, a casual gambler, or just looking for a fun and interactive way to engage with the crypto community, Crypto With Friends is the platform for you.
            Sign up today and put your forecasting skills to the test!
          </p>
          <div className="button-cont">
            <Button variant="contained" color="primary">Go to Groups</Button>
            <Button variant="contained" color="secondary">Our Mission Statement</Button>
          </div>
        </div>
      </div>

      <img src={BackgroundImage} alt="Background image" className="about-background"/>
    </div>
  )
}
