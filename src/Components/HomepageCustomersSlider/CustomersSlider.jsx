import React from "react";
import "./style.scss";

export default function CustomersSlider() {
  const images = ["aphp.png", "argenteuil.png", "channel.png", "coquide.png", "dps.png", "foliateam.png", "foncia.png", "genelec.png", "itq.png", "ministere-aff.png", "ministere-int.png", "ministere-just.png", "onet.png", "pml.png", "primion.png", "securitas.png", "terideal.png"]

  return (
    <div className="slider">
      <h1>Ils nous ont fait confiance :</h1>
      <div className="slide-track">
        {images.map((image, index) => (
          <div className="slide" key={index}>
            <img src={`assets/customersSlider/${image}`} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
