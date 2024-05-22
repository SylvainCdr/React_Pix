import React from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";

export default function HomepagePartners() {


    return (

  <div className="partners-container">
    <div className="partners-img">
      {Array.from({ length: 12 }).map((_, index) => (
        <div className="partners">
          <img
            key={index}
            src={`../assets/suppliers/partner${index + 1}.png`}
            alt=""
          />
        </div>
      ))}
    </div>
    <div className="partners-text">
      <h2>Nos partenaires</h2>
      <h3>L'excellence du marché à votre service</h3>
      <p>
        Qu'il s'agisse de caméras visibles, thermiques, de systèmes de gestion
        vidéo, ou d'IP... Les ingénieurs de Pixecurity s'engagent à sélectionner
        pour vous les produits les plus performants, parfaitement adaptés à
        votre projet.
      </p>

      <NavLink to="/partenaires">
        <button>En savoir plus</button>
      </NavLink>
    </div>
  </div>
);
}
