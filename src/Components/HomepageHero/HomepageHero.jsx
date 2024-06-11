import React, { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import { NavLink } from "react-router-dom";
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
      <div className={styles['homepageHero-container']}>
        <div className={styles['hero-left']}>
          <h2 
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            Smarter. <br /> Safer.
          </h2>
        </div>
  
        <div className={styles['hero-right']}>
          <h1 
            data-aos="fade-up"
            data-aos-duration="3000"
          >
            Confiez votre sûreté à l'intelligence de Pixecurity
          </h1>
          <NavLink to="/boutique">
            <button>Visiter la boutique</button>
          </NavLink>
        </div>
        
        {/* <video ref={videoRef} id="video-background" loop playsInline autoPlay>
          <source src="assets/hero4.mp4" type="video/mp4" />
        </video> */}
      </div>
    );
  
}