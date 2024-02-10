import React from "react";
import "./style.scss";

function Footer() {
  return (
    <div className="footer">
      <div className="col-4 m-3">
        <img src="/assets/logo-dark.svg" alt="" />
        <p>
          Pixecurity est un fournisseur de solutions de sureté intelligentes :
          Vidéosurveillance, analyse d'image, contrôle d'accès, réseaux/stockage
          des données, hypervision... et bien plus encore.
        </p>
      </div>
      <div className="col-4 m-3">
        <p>Plan du site </p>
        <br />
        <ul>
          <li>Accueil</li>
          <li>Catalogue</li>
          <li>Notre expertise</li>
          <li>A propos</li>
          <li>Contact </li>
        </ul>
      </div>

      <div className="col-4 m-3">
        <p>Nous contacter </p>
        <br />
        <ul>
          <li>
            {" "}
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
            78600 Maisons-Laffitte
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
