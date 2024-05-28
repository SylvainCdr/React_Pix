import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

export default function HomepageSkills() {
  return (
    <div className="skills-container">
      <div data-aos="fade-down" className="skills-card">
        <img
          src="https://images.unsplash.com/photo-1603559062568-c1f32a56087d?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <h3>Vidéoprotection</h3>
        <p>
          L'analyse d'image doit permettre de gagner du temps et de simplifier
          l'experience utilisateur sans être une usine à gaz. Notre savoir faire
          nous permet de vous proposer les meilleurs produits.{" "}
        </p>
        <Link to="/notre-expertise#videoprotection">EN SAVOIR PLUS</Link>
      </div>

      <div data-aos="fade-down" className="skills-card">
        <img
          src="https://images.unsplash.com/photo-1708807472445-d33589e6b090?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <h3>Analyse d'image</h3>
        <p>
          Protections des biens et des personnes, levée de doutes et bien plus
          encore... Pixecurity sélectionne pour vous les meilleures solutions du
          marché : Caméras visibles, thermiques, mobiles, fish-eye...{" "}
        </p>
        <Link to="/notre-expertise#analyse">EN SAVOIR PLUS</Link>
      </div>

      <div data-aos="fade-down" className="skills-card">
        <img
          src="https://images.unsplash.com/photo-1585079374502-415f8516dcc3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <h3>Contrôle d'accès</h3>
        <p>
          Suivi, gestion, traçabilité, protection des personnes. Pixecurity
          complète son offre pour vous proposer une solution globale avec les
          leaders du marché.
        </p>
        <Link to="/notre-expertise#access">EN SAVOIR PLUS</Link>
      </div>

      <div data-aos="fade-down" className="skills-card">
        <img
          src="https://images.unsplash.com/photo-1667984390538-3dea7a3fe33d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <h3>Cloud et objets connectés</h3>
        <p>
          Tout objet connecté est aujourd'hui un capteur de sureté devient
          exploitable depuis n'importe quelle interface utilisateur. Pixecurity
          vous propose des solutions innovantes et intélligentes permettant de
          les traiter.
        </p>
        <Link to="/notre-expertise#cloud">EN SAVOIR PLUS</Link>
      </div>

      <div data-aos="fade-down" className="skills-card">
        <img
          src="https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <h3>Réseaux SI / Stockage</h3>
        <p>
          Le traitement, le transport et l'exploitation doivent être garantis
          par une expertise métier. Les ingénieurs Pixecurity vous assurent un
          dimensionnement optimal des réseaux, du stockage, des ressources
          informatiques.
        </p>
        <Link to="/notre-expertise#network">EN SAVOIR PLUS</Link>
      </div>

      <div data-aos="fade-down" className="skills-card">
        <img
          src="https://images.unsplash.com/photo-1581091870619-835cee86e759?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <h3>Ingénierie</h3>
        <p>
          Notre équipe d'ingénieurs geeks vous propose un accompagnement Niveau
          2-Niveau 3 sur vos systèmes de sureté. Avant vente, suivi de projet,
          mise en service, maintenance, livrables documentaires...
        </p>
        {/* <Link to="/notre-expertise#engineering">EN SAVOIR PLUS</Link> */}
      </div>
    </div>
  );
}
