import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";

export default function HomepageSkills() {
  return (
    <div className={styles["skills-container"]}>
      <div data-aos="fade-down" className={styles["skills-card"]}>
        <img
          src="https://t3.ftcdn.net/jpg/00/86/09/02/240_F_86090219_AgQYqc6e5WTemRT4gUBm9nWGfz3dmBan.jpg"
          alt=""
        />
        <h3>Vidéoprotection</h3>
        <p>
          L'analyse d'image doit permettre de gagner du temps et de simplifier
          l'experience utilisateur sans être une usine à gaz. Notre savoir faire
          nous permet de vous proposer les meilleurs produits.{" "}
        </p>
        <div className={styles["bottom"]}>
          <Link href="/notre-expertise#videoprotection">
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div data-aos="fade-down" className={styles["skills-card"]}>
        <img
          src="https://as2.ftcdn.net/v2/jpg/06/23/47/61/1000_F_623476120_sxpUbL24Q2bltwWFyFnW2I36C04iZijQ.jpg"
          alt=""
        />
        <h3>Analyse d'image</h3>
        <p>
          Protections des biens et des personnes, levée de doutes et bien plus
          encore... Pixecurity sélectionne pour vous les meilleures solutions du
          marché : Caméras visibles, thermiques, mobiles, fish-eye...
        </p>
        <div className={styles["bottom"]}>
          <Link href="/notre-expertise#analyse">
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div data-aos="fade-down" className={styles["skills-card"]}>
        <img
          src="https://as1.ftcdn.net/v2/jpg/03/98/81/82/1000_F_398818257_AeMd0j9behzSLR4VHU8i7u2eEGqjoaao.jpg"
          alt=""
        />
        <h3>Contrôle d'accès</h3>
        <p>
          Suivi, gestion, traçabilité, protection des personnes. Pixecurity
          complète son offre pour vous proposer une solution globale avec les
          leaders du marché.
        </p>
        <div className={styles["bottom"]}>
          <Link href="/notre-expertise#access">
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div data-aos="fade-down" className={styles["skills-card"]}>
        <img
          src="https://as1.ftcdn.net/v2/jpg/05/29/73/10/1000_F_529731004_UaoYV7jskuWv59UBAW379oNlvB7eFSXQ.jpg"
          alt=""
        />
        <h3>Cloud et objets connectés</h3>
        <p>
          Tout objet connecté est aujourd'hui un capteur de sureté devient
          exploitable depuis n'importe quelle interface utilisateur. Pixecurity
          vous propose des solutions innovantes et intélligentes permettant de
          les traiter.
        </p>
        <div className={styles["bottom"]}>
          <Link href="/notre-expertise#cloud">
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div data-aos="fade-down" className={styles["skills-card"]}>
        <img
          src="https://as2.ftcdn.net/v2/jpg/07/21/03/59/1000_F_721035927_13iHfiOZwRdje1j2DhAKmNJXHysZI5B2.jpg"
          alt=""
        />
        <h3>Réseaux SI / Stockage</h3>
        <p>
          Le traitement, le transport et l'exploitation doivent être garantis
          par une expertise métier. Les ingénieurs Pixecurity vous assurent un
          dimensionnement optimal des réseaux, du stockage, des ressources
          informatiques.
        </p>
        <div className={styles["bottom"]}>
          <Link href="/notre-expertise#network">
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>

      <div data-aos="fade-down" className={styles["skills-card"]}>
        <img
          src="https://as1.ftcdn.net/v2/jpg/04/37/45/56/1000_F_437455634_qQLUUFaON7O4I3PATKsFsBIhfrHAf6BM.jpg"
          alt=""
        />
        <h3>Ingénierie</h3>
        <p>
          Notre équipe d'ingénieurs geeks vous propose un accompagnement Niveau
          2-Niveau 3 sur vos systèmes de sureté. Avant vente, suivi de projet,
          mise en service, maintenance, livrables documentaires...
        </p>
        <div className={styles["bottom"]}>
          {/* <Link to="/notre-expertise#engineering">EN SAVOIR PLUS</Link> */}
        </div>
      </div>
    </div>
  );
}
