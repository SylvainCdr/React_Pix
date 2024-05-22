import React, { useEffect, useRef } from "react";
import "./style.scss";
import { NavLink as Navlink } from "react-router-dom";
import AOS from "aos";

export default function HomepageHero() {
  const videoRef = useRef(null);

  // useEffect(() => {
  //   if (videoRef.current) {
  //     videoRef.current.play();
  //   }
  // }, []); // Le tableau vide signifie que cela ne s'exécute qu'une seule fois au montage du composant

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }
  , []);

  return (
    <div className="hero-container">
      <div className="background">
        <div className="left">
          <h1 data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">
            Smarter. <br /> Safer.
          </h1>
        </div>

        <div className="right">
          {/* <img src="../assets/hero.jpg" alt="hero" /> */}
          <h2 data-aos="fade-up"
     data-aos-duration="3000">Confiez votre sûreté à <br /> l'intelligence de Pixecurity</h2>
          <Navlink to="/contact"><button>Nous contacter</button></Navlink>

        </div>
        
      </div>
      {/* <video ref={videoRef} id="video-background" loop playsInline autoPlay>
        <source src="assets/hero4.mp4" type="video/mp4" />
      </video> */}
    </div>
  );
}
