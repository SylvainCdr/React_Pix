import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import ShopNav from "../../../Components/ShopNav/ShopNav";
import ShopSearch from "../../../Components/ShopSearch/ShopSearch";
import Aos from "aos";
import "aos/dist/aos.css"; // Import des styles d'AOS
import ShopProductsCarousel from "../../../Components/ShopProductsCarousel/ShopProductsCarousel";
import ShopHeroCarousel from "../../../Components/ShopHeroCarousel/ShopHeroCarousel";
import { BASE_URL } from "../../../url";

function Catalogue() {
  const [searchResults, setSearchResults] = useState([]);
  const [carouselProducts, setCarouselProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        const iproProducts = data.filter(
          (product) => product.brand === "Vivotek"
        );
        setCarouselProducts(iproProducts);
      })
      .catch((err) => {
        setError("Erreur lors du chargement des produits.");
        console.error(err);
      });
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
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
    <div className={styles["shop-container"]}>
      <ShopNav />
      <ShopSearch setSearchResults={setSearchResults} />

      {searchResults.length === 0 && (
        <div className={styles["shop-hero-carousel"]}>
          <ShopHeroCarousel />
        </div>
      )}

      <div data-aos="fade-up" className={styles["shop-categories"]}>
        <Link to="/boutique/Caméras">
          <div className={styles.category}>
            <h3>Caméras</h3>
            <img
              src="https://images.unsplash.com/photo-1585206031650-9e9a7c87dcfe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Caméras"
            />
          </div>
        </Link>

        <Link to="/boutique/Réseau">
          <div  className={styles.category}>
            <h3>Réseaux</h3>
            <img
              src="https://images.unsplash.com/photo-1561233835-f937539b95b9?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Réseaux"
            />
          </div></Link>

          <Link to="/boutique/Logiciels">
          <div className={styles.category}>
            <h3>Logiciels</h3>
            <img
              src="https://images.unsplash.com/photo-1635514874042-beb98fd8ea43?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Logiciels"
            />
          </div>
        </Link>

        <Link to="/boutique/Autres">
          <div  className={styles.category}>
            <h3>Autres</h3>
            <img
              src="https://images.unsplash.com/photo-1591808216268-ce0b82787efe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Autres"
            />
          </div>
        </Link>
      </div>

      <div className={styles["products-carousel"]}>
        <h4>Découvrez nos produits Vivotek </h4>
        <ShopProductsCarousel carouselProducts={carouselProducts} />
      </div>
    </div>
  );
}

export default Catalogue;
