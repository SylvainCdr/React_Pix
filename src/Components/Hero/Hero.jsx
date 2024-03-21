import React, { useEffect, useRef } from "react";
import "./style.scss";


export default function Hero() {
    const videoRef = useRef(null);
  
    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, []); // Le tableau vide signifie que cela ne s'exécute qu'une seule fois au montage du composant

    return (

        <div className="hero">
        <div className="hero__video"></div>
        <video ref={videoRef} id="video-background" loop playsInline autoPlay>
          <source src="assets/hero3.mp4" type="video/mp4" />
        </video>
        <div className="hero__title">
          <h1>
            Smarter <span>. </span>Safer <span>. </span>
          </h1>
        </div>
        </div>
    );

    };
