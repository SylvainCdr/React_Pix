import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { partners } from "../../Components/HomepagePartners/PartnersData";

export default function HomepagePartners() {
  return (
    <div className={styles["homepagePartners-container"]}>
      <div className={styles["partners-logo"]}>
        {partners.map((partner, index) => (
          <a
            key={index}
            href={partner.website}
            target="_blank"
            rel="noreferrer"
          >
            <img src={partner.logo} alt={partner.name} />
          </a>
        ))}
      </div>
      <div className={styles["partners-text"]}>
        <h2>Nos partenaires</h2>
        <h3>L'excellence du marché à votre service</h3>
        <p>
          Qu'il s'agisse de caméras visibles, thermiques, de systèmes de gestion
          vidéo, ou d'IP... Les ingénieurs de Pixecurity s'engagent à
          sélectionner pour vous les produits les plus performants, parfaitement
          adaptés à votre projet.
        </p>
        <Link href="/partenaires">
          <button>En savoir plus</button>
        </Link>
      </div>
    </div>
  );
}
