import React, { useEffect } from "react";
import styles from "./style.module.scss";
import AOS from "aos";

function Expertise() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
  }, []);

  return (
    <div className={styles["expertise-container"]}>
      {/* <h1>Des experts avant tout</h1> */}

      <div className={styles.hero}>
        <div data-aos="fade-right" className={styles.title}>
          <h1>
            Notre Expertise : <br /> Votre protection, notre engagement
          </h1>
          <h2>Une sécurité complète</h2>
          <p className={styles.description}>
            Avec Pixecurity, votre sûreté est entre de bonnes mains à chaque
            étape, de la conception à la certification.
          </p>
        </div>
      </div>
      <div className={styles.forces}>
        <i className="fa-regular fa-circle-check" data-aos="zoom-in"></i>
        <li>
          Des outils électroniques de pointe, taillés sur mesure pour répondre à
          vos besoins.
        </li>
        <i className="fa-regular fa-circle-check" data-aos="zoom-in"></i>
        <li>
          Une plateforme de gestion de projets élaborée en interne, offrant une
          interaction aisée avec nos experts.
        </li>

        <i className="fa-regular fa-circle-check" data-aos="zoom-in"></i>
        <li>
          Des solutions de développement sur mesure, conçues spécialement pour
          vous.
        </li>
        <i className="fa-regular fa-circle-check" data-aos="zoom-in"></i>
        <li>
          Des mesures de cybersécurité avancées pour une protection optimale.
        </li>
        <i className="fa-regular fa-circle-check" data-aos="zoom-in"></i>
        <li>
          La délivrance de certifications de conformité par nos consultants
          spécialisés.
        </li>
      </div>

      <div className={styles["slides-section"]} id="videoprotection">
        <h2>Vidéoprotection </h2>
        <div className={styles["slide-container"]}>
          <div className={styles.slide} data-aos="slide-up">
            <img
              src="https://www.pixecurity.com/wp-content/uploads/2021/04/skills-camera-visible.jpg"
              alt=""
            />
            <h4>Caméras visibles</h4>
            <h3>La caméra tout-terrain </h3>
            <p>
              De jour comme de nuit les caméras visibles sont exploitées pour de
              la détection, de la reconaissance ainsi que pour de
              l'identification. <br />
              Pixecurity travaille avec les meilleurs fabricants pour cette
              typologie de caméras.
            </p>
          </div>

          <div className={styles.slide} data-aos="slide-up">
            <img
              src="https://www.pixecurity.com/wp-content/uploads/2021/04/videoprotection.png"
              alt=""
            />
            <h4>Caméras Thermiques</h4>
            <h3>Augmenter les contrastes</h3>
            <p>
              Les caméras thermiques sont là pour augmenter un maximum les
              contrastes entre l'objet que l'on souhaite détecter et identifier
              et l'environnement dans lequel il se situe. Une préanalyse
              spécifique et poussée permet de sélectionner au plus juste la
              caméra thermique idéale.
            </p>
          </div>

          <div className={styles.slide} data-aos="slide-up">
            <img
              src="https://www.pixecurity.com/wp-content/uploads/2021/04/skills-camera-specifique.jpg"
              alt=""
            />
            <h4>Caméras spécifiques</h4>
            <h3>A chaque situation sa caméra</h3>
            <p>
              Détection de gaz, caméras embarquées, milieux ATEX, mobiles,
              fish-eye... A chaque environnement sa caméra spécifique.
            </p>
          </div>
        </div>
      </div>

      <div className={styles["slides-section"]} id="analyse">
        <h2>Analyse d'image</h2>
        <div className={styles["slide-container"]}>
          <div className={styles.slide} data-aos="slide-up">
            <img
              src="https://www.pixecurity.com/wp-content/uploads/2021/04/skills-analyse-temps-reel.jpg"
              alt=""
            />
            <h4>Solutions d'analyse en temps réel</h4>
            <h3>Augmentez l'intelligence</h3>
            <p>
              Pixecurity travaille en partenariat avec des logiciels permettant
              la détection d'intrusion, de colis abandonnés, de comptage, de
              machine-learning...
            </p>
          </div>

          <div className={styles.slide} data-aos="slide-up">
            <img
              src="https://www.pixecurity.com/wp-content/uploads/2021/04/analyse-image.png"
              alt=""
            />
            <h4>Solutions d'analyse a posteriori</h4>
            <h3>Gagnez du temps</h3>
            <p>
              la colorimétrie, la recherche d'individus, d'objets, de véhicules,
              de plaques d'immatriculation, lors d'investigations poussées par
              le client.
            </p>
          </div>

          <div className={styles.slide} data-aos="slide-up">
            <img
              src="https://www.pixecurity.com/wp-content/uploads/2021/04/skills-business-intelligence.jpg"
              alt=""
            />
            <h4>Analyse et Business Intelligence</h4>
            <h3>Allez plus loin</h3>
            <p>
              Mise en place d'outils statistiques sur les taux de fréquentation,
              analyse comportementale, gestion des visiteurs, de la clientèle...
            </p>
          </div>
        </div>
      </div>

      <div className={styles["slides-section"]} id="access">
        <h2>Contrôle d'accès</h2>
        <div className={styles["slide-container"]}>
          <div className={styles.slide} data-aos="slide-up">
            <img
              src="https://www.pixecurity.com/wp-content/uploads/2021/04/skills-controle-acces.jpg"
              alt=""
            />
            <h4>Gestion des portes et des accès</h4>
            <h3>Un contrôle d'accès VIP</h3>
            <p>
              Depuis tout l'environnement du point d'accès jusqu'à la typologie
              du badge, Pixecurity s'entoure de partenaires qualifiés Niveau 3
              sur les solutions : Til, Primion, Nedap.{" "}
            </p>
          </div>

          <div className={styles.slide} data-aos="slide-up">
            <img
              src="https://www.pixecurity.com/wp-content/uploads/2021/04/controle-acces.png"
              alt=""
            />
            <h4>Architecture sécurisée (ANSSI)</h4>
            <h3>Gagnez du temps</h3>
            <p>
              Un design réfléchi Pixecurity met en place l'architecture
              physique, logicielle et logique pour rester en conformité avec les
              recommandations de la RGPD ainsi que celles de l'ANSSI.{" "}
            </p>
          </div>

          <div className={styles.slide} data-aos="slide-up">
            <img
              src="https://www.pixecurity.com/wp-content/uploads/2021/04/skills-full-integration.jpg"
              alt=""
            />
            <h4>Solution Full-integrée (Hypervision)</h4>
            <h3>Une solution unique</h3>
            <p>
              Pixecurity propose une solution vidéo / contrôle d'accès
              full-intégrée via des partenaires travaillant sur une philosophie
              ouverte (Milestone, Til).{" "}
            </p>
          </div>
        </div>
      </div>

      <div className={styles["slides-section"]} id="cloud">
        <h2>Cloud et objets connectés</h2>
        <div className={styles["slide-container"]}>
          <div className={styles.slide} data-aos="slide-up">
            <img
              src="https://www.pixecurity.com/wp-content/uploads/2021/04/skills-cloud.jpg"
              alt=""
            />
            <h4>Solutions de sureté full-cloud</h4>
            <h3>Une architecture vidéo et contrôle d'accès full-cloud</h3>
            <p>
              La transition vers le full-cloud est amorcée, Pixecurity propose
              une solution vidéo/contrôle d'accès packagée full-cloud permettant
              de palier les coûts de stockage, de réseau, de matériel
              informatique. La solution est proposée en achat unique ou en mode
              SAS.
            </p>
          </div>

          <div className={styles.slide} data-aos="slide-up">
            <img
              src="https://www.pixecurity.com/wp-content/uploads/2021/04/cloud.png"
              alt=""
            />
            <h4>Gestion de projet Pixecurity en full-cloud</h4>
            <h3>Pixplatform</h3>
            <p>
              Le monde à changé : la gestion de projet comme le travail se fait
              à distance. Pixecurity vous propose un outil performant, en cloud,
              pour suivre en temps réel vos affaires, vos livraisons... votre
              philosophie de sureté.
            </p>
          </div>

          <div className={styles.slide} data-aos="slide-up">
            <img
              src="https://www.pixecurity.com/wp-content/uploads/2021/04/skills-objets-connectes.jpg"
              alt=""
            />
            <h4>Objets connectés</h4>
            <h3>Données et rapidité</h3>
            <p>
              La 5G est arrivée, en passant par le drone, les téléphones, les
              télécommandes BIM, la récuperation de data n'à jamais eté aussi
              facile et rapide. Pixecurity les exploite pour vous et les met en
              musique.
            </p>
          </div>
        </div>
      </div>

      <div className={styles["slides-section"]} id="network">
        <h2>réseaux, si, stockage</h2>
        <div className={styles["slide-container"]}>
          <div className={styles.slide} data-aos="slide-up">
            <img
              src="https://www.pixecurity.com/wp-content/uploads/2021/04/skills-reseaux.jpg"
              alt=""
            />
            <h4>Réseaux</h4>
            <h3>Un savoir-faire à la française</h3>
            <p>
              En physique : Pixecurity possède les plus hautes certifications
              réseau (Cisco) permettant de vous garantir une sécurisation d'un
              bout à l'autre de la chaîne jusqu'à vous amener vers des
              conformités cyber-sécurité. En cloud : Pixecurity met un point
              d'honneur à garantir la sécurisation des données de ses clients
              via un cloud souverain (OVH).
            </p>
          </div>

          <div className={styles.slide} data-aos="slide-up">
            <img
              src="https://www.pixecurity.com/wp-content/uploads/2021/04/reseau-stockage.png"
              alt=""
            />
            <h4>Systèmes d'Information</h4>
            <h3>L'environnement c'est vous</h3>
            <p>
              Toute la gestion de votre système d'information en serveur ou en
              mode poste client est paramétrée et configurée selon vos
              pré-requis (active directory, choix matériel).
            </p>
          </div>

          <div className={styles.slide} data-aos="slide-up">
            <img
              src="https://www.pixecurity.com/wp-content/uploads/2021/04/skills-stockage.jpg"
              alt=""
            />
            <h4>Stockage</h4>
            <h3>Vers l'infini et le Peta</h3>
            <p>
              Que ce soit en capacité ou en typologie de stockage (DAS, NAS,
              SAN), sécurisation des RAID (1, 5, 10), redondance à chaud ou à
              froid (miroir, grappe) Pixecurity certifie son expertise en la
              matière.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expertise;
