import React, { useEffect } from "react";
import styles from "./style.module.scss";
import { partners } from "../../Components/HomepagePartners/PartnersData";
import AOS from "aos";

const Partners = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  // Group partners by domain
  const groupedPartners = partners.reduce((acc, partner) => {
    (acc[partner.domain] = acc[partner.domain] || []).push(partner);
    return acc;
  }, {});

  return (
    <div className={styles["partners-container"]}>
      <div className={styles["partners-section1"]}>
        <div className={styles["partners-intro"]}>
          <h1>Nos partenaires</h1>
          <p>
            Découvrez nos partenaires de confiance, leaders mondiaux en sécurité
            et surveillance. Chez Pixecurity, nous nous engageons à vous fournir
            les meilleures solutions disponibles, grâce à des collaborations
            avec des entreprises innovantes et réputées.
          </p>
          <p>
            Chaque partenaire apporte son expertise et ses technologies de
            pointe, couvrant une vaste gamme de besoins : surveillance IP,
            gestion vidéo, contrôle d'accès et bien plus. Nos partenaires
            offrent des solutions avancées pour protéger vos biens et garantir
            votre tranquillité d'esprit.
          </p>
          <p>
            Parcourez notre galerie pour en savoir plus sur ces entreprises et
            leurs produits. Nous sommes fiers de travailler avec ces acteurs
            majeurs pour vous offrir des solutions de sécurité de la plus haute
            qualité.
          </p>
          <p>
            Bienvenue chez Pixecurity, où votre sécurité est notre priorité.
          </p>
        </div>

        <div data-aos="fade-left" className={styles["partner-img"]}></div>
      </div>

      {Object.keys(groupedPartners).map((domain, domainIndex) => (
        <div key={domainIndex} className={styles["domain-title"]}>
          <h2>{domain}</h2>
          {groupedPartners[domain].map((partner, partnerIndex) => (
            <div
              key={partnerIndex}
              className={`${styles["partners-section2"]} ${partnerIndex % 2 === 0 ? styles.left : styles.right}`}
            >
              <div className={styles["partner-logo"]}>
                <a href={partner.website} target="_blank" rel="noreferrer">
                  <img
                    data-aos="zoom-in"
                    src={partner.logo}
                    alt={partner.name}
                  />
                </a>
              </div>
              <div className={styles["partner-info"]}>
                <p>{partner.description}</p>
                <a href={partner.website} target="_blank" rel="noreferrer">
                  {partner.website}
                </a>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Partners;
