import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./style.scss";
import ShopNav from "../../../Components/ShopNav/ShopNav";
import slugify from "slugify";
import Search from "../Search/Search";

function Catalogue() {

  const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  // créer une fonction pour gérer la recherche
  const handleSearch = (e) => {
    setSearch(e.target.value);

    if (e.target.value.length > 0) {
      setSearching(true);

      // Rechercher des produits correspondant à la requête
      fetch(`http://localhost:3001/search?query=${e.target.value}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data);
          setSearching(false);
        })
        .catch((error) => {
          console.error("Erreur lors de la recherche de produits :", error);
          setSearching(false);
        });
    } else {
      setSearchResults([]);
    }
  };



  
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
