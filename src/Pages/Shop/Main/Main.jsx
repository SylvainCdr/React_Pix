import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import ShopNav from "../../../Components/ShopNav/ShopNav";

function Catalogue() {

  
  return (
    <div className="main-shop">
      <ShopNav />

      <div className="hero-shop">
        <img src="assets/heroShop.png" alt="" />

        <div className="hero-shop__title">
          <h2>Vous voulez bénéficier de réductions exclusives ?</h2>
          <h1>Créez un compte !</h1>
          <p>
            Nous vous recontacterons dans les plus brefs délais pour définir
            votre discount
          </p>
          <Link to="/register">
            <button>S'inscrire</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Catalogue;
