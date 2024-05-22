import React, { useEffect } from "react";
import "./style.scss";
import HomepageCustomersSlider from "../../Components/HomepageCustomersSlider/HomepageCustomersSlider";
import Hero from "../../Components/HomepageHero/HomepageHero";
import { NavLink } from "react-router-dom";
import AOS from "aos";
import HomepageCountUp from "../../Components/HomepageCountUp/HomepageCountUp";
import HomepagePartners from "../../Components/HomepagePartners/HomepagePartners";


export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  return (
    <div className="homepage-container">
      <Hero />

      <div className="section-1">
        <div className="section-1__img">
          <video src="../../assets "></video>
        </div>

        <div className="section-1__intro">
          <p>
            La <strong>sécurité</strong> ne dépend plus de la force brute, mais
            de <strong>l'intelligence</strong>. <br /> Chez{" "}
            <strong>Pixecurity</strong>, nous sommes les fournisseurs de
            systèmes de <strong>sûreté</strong> intelligents. <br />
            Notre <strong>mission</strong> : vous accompagner avec les{" "}
            <strong>meilleurs</strong> produits et des{" "}
            <strong>solutions</strong> sur-mesure, repensant la sécurité selon
            vos besoins.
            {/* Une approche innovante pour la protection de vos données
              personnelles : Avec Pixecurity, bénéficiez d'une panoplie d'outils
              électroniques, d'une plateforme de gestion de projets exclusive
              pour une interaction fluide avec nos experts, des développements
              sur mesure, et la mise en œuvre de solutions cyber. Nos
              consultants délivrent des certifications de conformité en matière
              de compliance, couvrant l'ensemble de la chaîne de valeur de la
              sûreté. Pixecurity, votre fournisseur de solutions de sûreté 3.0,
              repense votre sécurité numérique */}
          </p>
          <div data-aos="flip-down" className="icons">
            <img src="../assets/icons/ico3.png" alt="" />
            <img src="../assets/icons/ico2.png" alt="" />
            <img src="../assets/icons/ico1.png" alt="" />
            <img src="../assets/icons/ico4.png" alt="" />
          </div>
        </div>
      </div>

      <div className="section-2">
        <div className="section-2__offer">
          <div className="title">
            <h2>Une offre pensée autrement</h2>
          </div>
          <div className="description">
            <p>
              La protection de vos données personnelles certifiée Pixecurity
              c'est : la fourniture d'outils électroniques, une plateforme de
              gestion de projets réalisée en propre pour faciliter l'interaction
              avec nos experts, des développements spécifiques et sur mesure, la
              mise en place de solutions cyber. Des certifications de
              conformités delivrées par nos consultants sur du compliance :
              Pixecurity couvre toute la haute chaine de valeur de la sureté.
              Pixecurity est le fournisseur de solutions de sureté 3.0
            </p>
          </div>
          {/* <button>
            <NavLink to="#">Notre process</NavLink>{" "}
          </button> */}
        </div>
      </div>
      <div className="section-3">
        <div data-aos="zoom-in-down" className="skills-card">
          <img
            src="https://www.svgrepo.com/show/144416/security-camera.svg"
            alt=""
          />
          <h3>Vidéoprotection</h3>
          <p>
            L'analyse d'image doit permettre de gagner du temps et de simplifier
            l'experience utilisateur sans être une usine à gaz. Notre savoir
            faire nous permet de vous proposer les meilleurs produits.{" "}
          </p>
          <a href="">EN SAVOIR PLUS</a>
        </div>

        <div data-aos="zoom-in-up" className="skills-card">
          <img src="https://www.svgrepo.com/show/97887/search.svg" alt="" />
          <h3>Analyse d'image</h3>
          <p>
            Protections des biens et des personnes, levée de doutes et bien plus
            encore... Pixecurity sélectionne pour vous les meilleures solutions
            du marché : Caméras visibles, thermiques, mobiles, fish-eye...{" "}
          </p>
          <a href="">EN SAVOIR PLUS</a>
        </div>

        <div data-aos="zoom-in-down" className="skills-card">
          <img src="https://www.svgrepo.com/show/5385/padlock.svg" alt="" />
          <h3>Contrôle d'accès</h3>
          <p>
            Suivi, gestion, traçabilité, protection des personnes. Pixecurity
            complète son offre pour vous proposer une solution globale avec les
            leaders du marché.
          </p>
          <a href="">EN SAVOIR PLUS</a>
        </div>

        <div data-aos="zoom-in-down" className="skills-card">
          <img
            src="https://www.svgrepo.com/show/474401/cloud-database.svg"
            alt=""
          />
          <h3>Cloud et objets connectés</h3>
          <p>
            Tout objet connecté est aujourd'hui un capteur de sureté devient
            exploitable depuis n'importe quelle interface utilisateur.
            Pixecurity vous propose des solutions innovantes et intélligentes
            permettant de les traiter.
          </p>
          <a href="">EN SAVOIR PLUS</a>
        </div>

        <div data-aos="zoom-in-up" className="skills-card">
          <img src="https://www.svgrepo.com/show/135113/seatbelt.svg" alt="" />
          <h3>Réseaux SI / Stockage</h3>
          <p>
            Le traitement, le transport et l'exploitation doivent être garantis
            par une expertise métier. Les ingénieurs Pixecurity vous assurent un
            dimensionnement optimal des réseaux, du stockage, des ressources
            informatiques.
          </p>
          <a href="">EN SAVOIR PLUS</a>
        </div>

        <div data-aos="zoom-in-down" className="skills-card">
          <img src="https://www.svgrepo.com/show/35101/target.svg" alt="" />
          <h3>Ingénierie</h3>
          <p>
            Notre équipe d'ingénieurs geeks vous propose un accompagnement
            Niveau 2-Niveau 3 sur vos systèmes de sureté. Avant vente, suivi de
            projet, mise en service, maintenance, livrables documentaires...
          </p>
          <a href="">EN SAVOIR PLUS</a>
        </div>
      </div>

      <div className="section-4">
        <div className="section-4__text">
          <h2>Qui sommes nous ?</h2>
          <p>
            Des ingénieurs avant-gardistes. Des experts 3.0, natifs du
            numérique, spécialisés dans le BTP, les réseaux, les technologies du
            bâtiment, et toujours à l'affût des dernières avancées
            technologiques. Ce sont de véritables artisans de la sûreté,
            déterminés à dénicher les solutions les plus adaptées à vos
            exigences.
          </p>
          <NavLink to="/a-propos">
            {" "}
            <button>Notre équipe</button>{" "}
          </NavLink>
        </div>
        <div className="section-4__img"></div>
      </div>

      <HomepageCountUp />

<HomepagePartners />
  
      <HomepageCustomersSlider />
    </div>
  );
}
