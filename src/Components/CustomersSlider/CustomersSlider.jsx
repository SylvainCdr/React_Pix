import React from "react";
import "./style.scss";

export default function CustomersSlider() {
  const images = ["chanel.svg", "RATP.svg", "SG.png", "vinci.svg","foncia.svg","borealis.svg","securitas.svg", "DPS.png", "CA.svg","bouygues.svg"];

  return (
    <div className="slider">
      <div className="slide-track">
        {images.map((image, index) => (
          <div className="slide" key={index}>
            <img src={`assets/customers/${image}`} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
