import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import ShopNav from "../../../Components/ShopNav/ShopNav";
import Search from "../../../Components/Search/Search";
import Aos from "aos";


function Catalogue() {
  const [searchResults, setSearchResults] = useState([]);

useEffect(() => {
  Aos.init({duration: 2000});
}
,[])

  return (
    <div  className="main-shop">
      <ShopNav />
      <Search setSearchResults={setSearchResults} />

    

      {searchResults.length === 0 && (
        <div  className="hero-shop">
          <img data-aos="fade-down-left" src="assets/heroShop.png" alt="" />

          <div  className="hero-shop__title">
            <h2 >Vous voulez bénéficier de réductions exclusives ?</h2>
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
      )}
    </div>
  );
}

export default Catalogue;
