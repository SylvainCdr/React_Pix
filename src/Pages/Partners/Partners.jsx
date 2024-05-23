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
        Explorez notre réseau de partenaires de confiance, des entreprises
        renommées dans le domaine de la sécurité et de la surveillance. Chez
        Pixecurity, nous nous engageons à fournir à nos clients les meilleures
        solutions disponibles sur le marché, et nos partenaires jouent un rôle
        crucial dans la réalisation de cet engagement.{" "}
      </p>
      <p>
        Découvrez une sélection diversifiée de marques de premier plan, chacune
        apportant son expertise unique et ses technologies innovantes pour
        répondre à une variété de besoins en matière de sécurité. De la
        surveillance IP à la gestion vidéo, en passant par le contrôle d'accès
        et bien plus encore, nos partenaires offrent des solutions de pointe
        pour protéger vos biens et assurer votre tranquillité d'esprit.
      </p>
      <p>
        Explorez notre galerie de partenaires pour en apprendre davantage sur
        chaque entreprise, ses produits et ses services. Nous sommes fiers de
        collaborer avec ces leaders de l'industrie pour offrir à nos clients des
        solutions de sécurité de la plus haute qualité.{" "}
      </p>
      <p>
        Bienvenue dans l'univers de la sécurité et de la surveillance avec
        Pixecurity. Nous sommes là pour répondre à vos besoins et vous fournir
        les meilleures solutions possibles.
      </p>
      </div>

      <div className="partner-img">
      </div>

      </div>

  

      <div className="partners">
        {partners.map((partner, index) => (
          <div
            key={index}
            className={`partner ${index % 2 === 0 ? "left" : "right"}`}
          >
            <a href={partner.website} target="_blank" rel="noreferrer">
              <img data-aos="flip-down" src={partner.logo} alt={partner.name} />
            </a>
            <div className="partner-text">
              <h2>{partner.name}</h2>
              <p>{partner.description}</p>
              <a href={partner.website} target="_blank" rel="noreferrer">
                {partner.website}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
