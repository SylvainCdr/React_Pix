import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer-container">
      <div className="section-1">
        <img src="/assets/logo-dark.svg" alt="" />
        <p>
          Pixecurity est un fournisseur de solutions de sureté intelligentes :
          Vidéosurveillance, analyse d'image, contrôle d'accès, réseaux/stockage
          des données, hypervision...
        </p>
      </div>
      <div className="section-2">
        <h4>Plan du site </h4>

        <ul>
          {/* <Link ><li>Accueil</li></Link>
          <Link><li>Catalogue</li> </Link>
          <Link><li>Notre expertise</li></Link>
          <Link><li>A propos</li></Link>
          <Link><li>Contact </li></Link> */}

          <Link to="/">
            <li>Accueil</li>
          </Link>
          <Link to="/boutique">
            <li>Boutique</li>
          </Link>
          <Link to="/notre-expertise">
            <li>Notre expertise</li>
          </Link>
          <Link to="/a-propos">
            <li>Qui sommes-nous ?</li>
          </Link>
          <Link to="/contact">
            <li>Contact</li>
          </Link>
          <Link to="/inscription">
            <li>Se connecter</li>
          </Link>
        </ul>
      </div>

      <div className="section-3">
        <h4>Nous contacter </h4>
        <ul>
          <li>
            <i className="fa-solid fa-envelope"></i>
            <a href="mailto:pixecurity@pixecurity.com">
              pixecurity@pixecurity.com
            </a>
          </li>
          <li>
            <i className="fa-solid fa-phone"></i>(+33) 1 39 60 98 82
          </li>
          <li>
            <i className="fa-solid fa-location-dot"></i> 38 Rue Jean Mermoz
            <br /> 78600 Maisons-Laffitte
          </li>
          <li>
            <i className="fa-brands fa-linkedin"></i>
            <a href="https://www.linkedin.com/company/pixecurity/">Linkedin</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
