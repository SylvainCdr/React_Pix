import React, { useEffect, useRef } from "react";
import "./style.scss";
import CustomersSlider from "../../Components/CustomersSlider/CustomersSlider";

export default function Home() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, []); // Le tableau vide signifie que cela ne s'exécute qu'une seule fois au montage du composant

  const customers = ["chanel.png", "ratp.png", "SG.png", "vinci.png"];

  return (
    <div className="main">
      <div className="hero">
        <div className="hero__video"></div>
        <video ref={videoRef} id="video-background" loop playsInline autoPlay>
          <source src="assets/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero__title">
          <h1>
            Smarter<span>.</span>Safer<span>.</span>
          </h1>
        </div>

        <div className="section-1">
          <div className="section-1__intro">
            <h2>Notre force</h2>
            <p>
              Une approche innovante pour la protection de vos données
              personnelles : Avec Pixecurity, bénéficiez d'une panoplie d'outils
              électroniques, d'une plateforme de gestion de projets exclusive
              pour une interaction fluide avec nos experts, des développements
              sur mesure, et la mise en œuvre de solutions cyber. Nos
              consultants délivrent des certifications de conformité en matière
              de compliance, couvrant l'ensemble de la chaîne de valeur de la
              sûreté. Pixecurity, votre fournisseur de solutions de sûreté 3.0,
              repense votre sécurité numérique
            </p>
          </div>

          <div className="section-1__shop">
            <h2>Découvrez nos produits</h2>
            <p>
              Nous proposons une sélection de produits spécialement pensés pour
              répondre à vos besoins. Profitez des conseils et services
              Pixecurity{" "}
            </p>
            <button>Voir le catalogue</button>
          </div>
        </div>

        <div className="section-2">
          <div className="section-2__services">
            <h2>Nos services</h2>
            <p>
              Nous vous proposons une large gamme de services pour répondre à
              vos besoins en matière de sécurité numérique. Nos experts vous
              accompagnent dans la mise en place de solutions adaptées à votre
              entreprise.
            </p>
            <button>Voir nos services</button>
          </div>
          <div className="section-2__contact">
            <h2>Contactez-nous</h2>
            <p>
              Vous avez une question ? Vous souhaitez en savoir plus sur nos
              services ? N'hésitez pas à nous contacter, nous serons ravis de
              vous répondre.
            </p>
            <button>Nous contacter</button>
          </div>
        </div>
        <div className="section-3">
         
          <CustomersSlider customers={customers} />
        </div>
      </div>
    </div>
  );
}
