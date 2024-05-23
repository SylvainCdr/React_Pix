import React, { useEffect } from "react";
import "./style.scss";
import { partners } from "../../Components/HomepagePartners/PartnersData";
import AOS from "aos";

const Partners = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  return (
    <div className="partners-container">
      <div className="partners-section1">
        <div className="partners-intro">
          <h1>Nos partenaires</h1>
          <p>
            Découvrez nos partenaires de confiance, leaders mondiaux en sécurité
            et surveillance. Chez Pixecurity, nous nous engageons à vous fournir
            les meilleures solutions disponibles, grâce à des collaborations
            avec des entreprises innovantes et réputées.
          </p>
          <p>
          Chaque partenaire apporte son expertise et ses technologies de pointe, couvrant une vaste gamme de besoins : surveillance IP, gestion vidéo, contrôle d'accès et bien plus. Nos partenaires offrent des solutions avancées pour protéger vos biens et garantir votre tranquillité d'esprit.
          </p>
          <p>
          Parcourez notre galerie pour en savoir plus sur ces entreprises et leurs produits. Nous sommes fiers de travailler avec ces acteurs majeurs pour vous offrir des solutions de sécurité de la plus haute qualité.
          </p>
          <p>
          Bienvenue chez Pixecurity, où votre sécurité est notre priorité.
          </p>
        </div>

        <div className="partner-img"></div>
      </div>

      {partners.map((partner, index) => (
        <div
          key={index}
          className={`partners-section2 ${index % 2 === 0 ? "left" : "right"}`}
        >
          <div className="partner-logo">
            <a href={partner.website} target="_blank" rel="noreferrer">
              <img data-aos="zoom-in" src={partner.logo} alt={partner.name} />
            </a>
          </div>
          <div data-aos="flip-down" className="partner-info">
            {/* <h2>{partner.name}</h2> */}
            <p>{partner.description}</p>
            <a href={partner.website} target="_blank" rel="noreferrer">
              {partner.website}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Partners;
