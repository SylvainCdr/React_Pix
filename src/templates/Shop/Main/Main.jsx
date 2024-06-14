import React, { useEffect } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import ShopNav from "@/Components/ShopNav/ShopNav";
import ShopSearch from "@/Components/ShopSearch/ShopSearch";
import Aos from "aos";
import "aos/dist/aos.css"; // Import des styles d'AOS
import ShopProductsCarousel from "@/Components/ShopProductsCarousel/ShopProductsCarousel";


function Catalogue({ products }) {
  const carouselProducts = products?.filter((product) => product.brand === "Vivotek");

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <div className={styles["shop-container"]}>
      <ShopNav />
      <ShopSearch />

      <div data-aos="fade-up" className={styles["shop-categories"]}>
        <Link href="/boutique/Caméras">
          <div className={styles.category}>
            <h3>Caméras</h3>
            <img
              src="https://images.unsplash.com/photo-1585206031650-9e9a7c87dcfe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Caméras"
            />
          </div>
        </Link>

        <Link href="/boutique/Réseau">
          <div className={styles.category}>
            <h3>Réseaux</h3>
            <img
              src="https://images.unsplash.com/photo-1561233835-f937539b95b9?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Réseaux"
            />
          </div>
        </Link>

        <Link href="/boutique/Logiciels">
          <div className={styles.category}>
            <h3>Logiciels</h3>
            <img
              src="https://images.unsplash.com/photo-1635514874042-beb98fd8ea43?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Logiciels"
            />
          </div>
        </Link>

        <Link href="/boutique/Autres">
          <div className={styles.category}>
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
