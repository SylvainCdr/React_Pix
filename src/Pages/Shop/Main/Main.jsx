import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import ShopNav from "../../../Components/ShopNav/ShopNav";
import ShopSearch from "../../../Components/ShopSearch/ShopSearch";
import Aos from "aos";
import "aos/dist/aos.css"; // Import des styles d'AOS
import ShopCarousel from "../../../Components/ShopCarousel/ShopCarousel";

function Catalogue() {
  const [searchResults, setSearchResults] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        const iproProducts = data.filter(product => product.brand === "Vivotek");
        setProducts(iproProducts);
      })
      .catch((err) => {
        setError("Erreur lors du chargement des produits.");
        console.error(err);
      });
  }, []);


  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        const categories = data.map((product) => product.category);
        const subcategories = data.map((product) => product.subcategory);
        console.log(categories);
        console.log(subcategories);
      })
      .catch((err) => {
        setError("Erreur lors du chargement des produits.");
        console.error(err);
      });
  }, []);


  return (
    <div className="shop-container">
      <ShopNav />
      <ShopSearch setSearchResults={setSearchResults} />

      {searchResults.length === 0 && (
        <div className="shop-hero">
          <img data-aos="fade-down-left" src="assets/heroShop.png" alt="" />
          <div className="hero-shop__title">
            <h2>Vous voulez bénéficier de réductions exclusives ?</h2>
            <h1>Créez un compte !</h1>
            <p>
              Nous vous recontacterons dans les plus brefs délais pour définir
              votre discount
            </p>
            <Link to="/inscription">
              <button>S'inscrire</button>
            </Link>
          </div>
        </div>
      )}


     


      <div className="products-carousel">
       <ShopCarousel products={products} />
       
      </div>
      
    </div>

  );
}

export default Catalogue;
