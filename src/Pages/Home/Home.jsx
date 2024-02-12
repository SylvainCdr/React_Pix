import React, { useEffect, useRef } from "react";
import "./style.scss";
import CustomersSlider from "../../Components/CustomersSlider/CustomersSlider";
import Hero from "../../Components/Hero/Hero";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="main">
      <Hero />

      <div className="section-1">
        <div className="section-1__intro">
          {/* <h2>Notre force</h2> */}
          <p>
            La <strong>sécurité</strong> ne dépend plus de la force brute, mais
            de <strong>l'intelligence</strong>. Chez <strong>Pixecurity</strong>
            , nous sommes les fournisseurs de systèmes de{" "}
            <strong>sûreté</strong> intelligents. <br />
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
        </div>

        <div className="section-1__shop">
          <h2>Découvrez nos produits</h2>
          <p>
            Nous proposons une sélection de produits spécialement pensés pour
            répondre à vos besoins. Profitez des conseils et services Pixecurity{" "}
          </p>
          <button>
            <NavLink to="/Produits">Voir le catalogue </NavLink>{" "}
          </button>
        </div>
      </div>

      <div className="section-2">
        <div className="section-2__force">
          <h2>Notre force</h2>
          <h3>Une offre pensée autrement</h3>
          <p>
            La protection de vos données personnelles certifiée Pixecurity c'est
            : la fourniture d'outils électroniques, une plateforme de gestion de
            projets réalisée en propre pour faciliter l'interaction avec nos
            experts, des développements spécifiques et sur mesure, la mise en
            place de solutions cyber. Des certifications de conformités
            delivrées par nos consultants sur du compliance : Pixecurity couvre
            toute la haute chaine de valeur de la sureté. Pixecurity est le
            fournisseur de solutions de sureté 3.0
          </p>
          <button>
            <NavLink to="#">Notre process</NavLink>{" "}
          </button>
        </div>
        <div className="section-2__contact">
          <h2>Contactez-nous</h2>
          <p>
            Vous avez une question ? Vous souhaitez en savoir plus sur nos
            services ? N'hésitez pas à nous contacter, nous serons ravis de vous
            répondre.
          </p>
          <button>Nous contacter</button>
        </div>
      </div>
      <div className="section-3">
        <CustomersSlider />
      </div>
    </div>
  );
}
