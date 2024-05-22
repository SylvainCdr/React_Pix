import React from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";

export default function HomepagePartners() {

  // on importe tous les logos de nos partenaires depuis assets / partnersLogo

  const partners = [
    {
      name: "Bosch",
      logo: "assets/partnersLogo/bosch.png",
      website : "https://www.boschsecurity.com/fr/fr/",
      description : "Bosch Security Systems est un fournisseur mondial de solutions de sécurité et de communication."
    },
    {
      name: "Vivotek",
      logo: "assets/partnersLogo/vivotek.png",
      website : "https://www.vivotek.com/",
      description : "VIVOTEK Inc. est un fournisseur mondial de solutions de sécurité IP et de surveillance."
    },
    {
      name: "Briefcam",
      logo: "assets/partnersLogo/briefcam.png",
      website : "https://www.briefcam.com/",
        description : "BriefCam est le leader du marché de la vidéo intelligente."
    },
    {
      name : "til",
      logo : "assets/partnersLogo/til.png",
      website : "https://www.til-technologies.fr/fr/",
        description : "Til Technologies est un éditeur de logiciels spécialisé dans la gestion de la sécurité."
    },
    {
      name: "cisco",
      logo: "assets/partnersLogo/cisco.png",
      website : "https://www.cisco.com/",
      description : "Cisco est un leader mondial des technologies de l'information et de la communication."

    },
    {
      name : "i-PRO",
      logo : "assets/partnersLogo/ipro.png",
      website : "https://www.i-pro.com/",
        description : "i-PRO est une marque de Panasonic Corporation spécialisée dans les solutions de sécurité."
    },
    {
      name : "milestone",
      logo : "assets/partnersLogo/milestone.png",
      website : "https://www.milestonesys.com/",
        description : "Milestone Systems est un leader mondial des solutions de gestion vidéo."
    },
    {
      name: "Zyxel",
      logo: "assets/partnersLogo/zyxel.png",
      website : "https://www.zyxel.com/fr/fr/",
      description : "Zyxel Communications est un fournisseur mondial de solutions de réseaux."
    },
    {
      name : "primion",
      logo : "assets/partnersLogo/primion.png",
      website : "https://www.primion.de/",
        description : "Primion est un fournisseur mondial de solutions de contrôle d'accès et de gestion de temps."
    },
    {
      name : "technoAware",
      logo : "assets/partnersLogo/technoAware.png",
      website : "https://technoaware.org/",
        description : "TechnoAware est un fournisseur mondial de solutions de vidéosurveillance intelligente."
    },
    {
      name : "vuWall",
      logo : "assets/partnersLogo/vuWall.png",
      website : "https://vuwall.com/fr/"
    },
  ];
  



    return (

  <div className="partners-container">
    <div className="partners-img">
      
      {/* on map sur le tableau de nos partenaires pour afficher les logos et au clic sur le logo, on redirige vers le site du partenaire */}
      {partners.map((partner, index) => (
        <a key={index} href={partner.website} target="_blank" rel="noreferrer">
          <img src={partner.logo} alt={partner.name} />
        </a>
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
