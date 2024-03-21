import React, { useEffect } from "react";
import "./style.scss";

import AOS from "aos";

function Expertise() {
  useEffect(() => {
    AOS.init({
      duration: 2300,
    });
  }, []);

  return (
    <div className="expertise-container">
      <div className="hero">
        <img src="assets/security3.jpeg" alt="" />
        <div className="text">
          <h1>
            La protection de vos données personnelles certifiée Pixecurity c'est
            : <br />
            la fourniture d'outils électroniques, une plateforme de gestion de
            projets réalisée en propre pour faciliter l'interaction avec nos
            experts, des développements spécifiques et sur mesure, la mise en
            place de solutions cyber. Des certification de conformités délivrées
            par nos consultants sur du compliance : <br /> <br />
            Pixecurity couvre toute la haute chaine de valeur de la sureté.
          </h1>
        </div>
      </div>

      <h2>Vidéoprotection</h2>
      <div className="slides-section">
        <div className="slide" data-aos="fade-right">
          <img
            src="https://www.pixecurity.com/wp-content/uploads/2021/04/skills-camera-visible.jpg"
            alt=""
          />
          <h4>Caméras visibles</h4>
          <h3>La caméra tout-terrain </h3>
          <p>
            De jour comme de nuit les caméras visibles sont exploitées pour de
            la détection, de la reconaissance ainsi que pour de l'
            <identification className="br"></identification>
            Pixecurity travaille avec les meilleurs fabricants pour cette
            typologie de caméras.
          </p>
        </div>

        <div className="slide" data-aos="slide-up">
          <img
            src="https://www.pixecurity.com/wp-content/uploads/2021/04/videoprotection.png"
            alt=""
          />
          <h4>Caméras Thermiques</h4>
          <h3>Augmenter les contrastes</h3>
          <p>
            Les caméras thermiques sont là pour augmenter un maximum les
            contrastes entre l'objet que l'on souhaite détecter et identifier et
            l'environnement dans lequel il se situe. Une préanalyse spécifique
            et poussée permet de sélectionner au plus juste la caméra thermique
            idéale.
          </p>
        </div>

        <div className="slide" data-aos="fade-left">
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

      <h2>Analyse d'image</h2>
      <div className="slides-section">
        <div className="slide" data-aos="fade-right">
          <img
            src="https://www.pixecurity.com/wp-content/uploads/2021/04/skills-analyse-temps-reel.jpg"
            alt=""
          />
          <h4>Solutions d'analyse en temps réel</h4>
          <h3>Augmentez l'intelligence</h3>
          <p>
            Pixecurity travaille en partenariat avec des logiciels permettant la
            détection d'intrusion, de colis abandonnés, de comptage, de
            machine-learning...
          </p>
        </div>

        <div className="slide" data-aos="slide-up">
          <img
            src="https://www.pixecurity.com/wp-content/uploads/2021/04/analyse-image.png"
            alt=""
          />
          <h4>Solutions d'analyse a posteriori</h4>
          <h3>Gagnez du temps</h3>
          <p>
            la colorimétrie, la recherche d'individus, d'objets, de véhicules,
            de plaques d'immatriculation, lors d'investigations poussées par le
            client.
          </p>
        </div>

        <div className="slide" data-aos="fade-left">
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

      <h2>Contrôle d'accès</h2>
      <div className="slides-section">
        <div className="slide" data-aos="fade-right">
          <img
            src="https://www.pixecurity.com/wp-content/uploads/2021/04/skills-controle-acces.jpg"
            alt=""
          />
          <h4>Gestion des portes et des accès</h4>
          <h3>Un contrôle d'accès VIP</h3>
          <p>
            Depuis tout l'environnement du point d'accès jusqu'à la typologie du
            badge, Pixecurity s'entoure de partenaires qualifiés Niveau 3 sur
            les solutions : Til, Primion, Nedap.{" "}
          </p>
        </div>

        <div className="slide" data-aos="slide-up">
          <img
            src="https://www.pixecurity.com/wp-content/uploads/2021/04/controle-acces.png"
            alt=""
          />
          <h4>Architecture sécurisée (ANSSI)</h4>
          <h3>Gagnez du temps</h3>
          <p>
            Un design réfléchi Pixecurity met en place l'architecture physique,
            logicielle et logique pour rester en conformité avec les
            recommandations de la RGPD ainsi que celles de l'ANSSI.{" "}
          </p>
        </div>

        <div className="slide" data-aos="fade-left">
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

      <h2>Cloud et objets connectés</h2>
      <div className="slides-section">
        <div className="slide" data-aos="fade-right">
          <img
            src="https://www.pixecurity.com/wp-content/uploads/2021/04/skills-cloud.jpg"
            alt=""
          />
          <h4>Solutions de sureté full-cloud</h4>
          <h3>Une architecture vidéo et contrôle d'accès full-cloud</h3>
          <p>
            La transition vers le full-cloud est amorcée, Pixecurity propose une
            solution vidéo/contrôle d'accès packagée full-cloud permettant de
            palier les coûts de stockage, de réseau, de matériel informatique.
            La solution est proposée en achat unique ou en mode SAS.
          </p>
        </div>

        <div className="slide" data-aos="slide-up">
          <img
            src="https://www.pixecurity.com/wp-content/uploads/2021/04/cloud.png"
            alt=""
          />
          <h4>Gestion de projet Pixecurity en full-cloud</h4>
          <h3>Pixplatform</h3>
          <p>
            Le monde à changé : la gestion de projet comme le travail se fait à
            distance. Pixecurity vous propose un outil performant, en cloud,
            pour suivre en temps réel vos affaires, vos livraisons... votre
            philosophie de sureté.
          </p>
        </div>

        <div className="slide" data-aos="fade-left">
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
{/* 
      <div class="item" data-aos="fade-right">
        3
      </div>
      <div class="item" data-aos="fade-left">
        4
      </div>

      <div class="item" data-aos="zoom-in">
        5
      </div>
      <div class="item" data-aos="zoom-out">
        6
      </div>

      <div class="item" data-aos="slide-up">
        7
      </div>

      <div class="item" data-aos="flip-up">
        8
      </div>
      <div class="item" data-aos="flip-down">
        9
      </div>
      <div class="item" data-aos="flip-right">
        10
      </div>
      <div class="item" data-aos="flip-left">
        11
      </div>
      <div class="item" data-aos="fade-up">
        1
      </div>

      <div class="item" data-aos="fade-down">
        2
      </div> */}

    
    </div>
  );
}

export default Expertise;
