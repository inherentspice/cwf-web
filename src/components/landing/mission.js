import BackgroundImage from "../../assets/mission-image.png"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const groupClick = () => {
    navigate("/");
  }

  return (
    <div className="mission-cont">
      <div className="landing-info-cont">
        <h1>Community Through Crypto</h1>
        <p>
          At Crypto With Friends, our mission is to empower individuals through a unique combination of fun, education, and an immersive glimpse into the future of finance.
          We strive to create a platform that sparks curiosity and fosters continuous learning while providing an entertaining and engaging environment.
          Our vision is to become the go-to destination for crypto enthusiasts, gamblers, and novices alike, as they embark on a journey to uncover the immense potential of digital currencies and the underlying blockchain technology.
        </p>
        <p>
          In the pursuit of this mission, we are committed to cultivating a strong community spirit that encourages collaboration, friendly competition, and knowledge sharing.
          We believe that by fostering meaningful connections and providing opportunities for users to learn from each other, we can elevate the collective understanding of the complex and rapidly evolving world of cryptocurrencies.
          Our platform is designed to be accessible and enjoyable for everyone, regardless of their background or experience level, ensuring that the doors of the future are wide open for all.
        </p>
        <p>
          As we look towards the future, Crypto With Friends will continue to innovate and adapt to the ever-changing landscape of digital finance.
          We will actively seek out new opportunities to expand our offerings, integrate emerging technologies, and create even more engaging experiences for our users.
          With a steadfast dedication to fun, education, and the future, we aim to inspire our users to embrace the exciting possibilities that lie ahead with confidence and enthusiasm.
          Together, we will navigate the uncharted waters of the crypto economy and shape a more connected, informed, and prosperous tomorrow.
        </p>
        <Button variant="contained" color="secondary" onClick={() => groupClick()}>Play</Button>
      </div>
      <img src={BackgroundImage} alt="Background image" className="mission-background"/>
    </div>
  )
}
