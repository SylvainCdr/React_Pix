import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import ShopNav from "../../../Components/ShopNav/ShopNav";
import ShopSearch from "../../../Components/ShopSearch/ShopSearch";
import ShopAside from "../../../Components/ShopAside/ShopAside";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import useFavorites from "../../../Components/useFavorites";
import useCart from "../../../Components/useCart";
import PropagateLoader from "react-spinners/PropagateLoader";
import { BASE_URL } from "../../../url";

// Import the CSS module
import styles from "./style.module.scss";

const Products = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const { addToFavorites, removeFromFavorites, checkFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [userId] = useState("");

  const override = {
    size: "15px",
    margin: "0 auto",
    borderColor: "red",
  };

  const [loading, setLoading] = useState(true);
  const [color] = useState("#ff9c3fc0");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true before starting the fetch
      const apiUrl = subcategory
        ? `${BASE_URL}/products?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`
        : `${BASE_URL}/products?category=${encodeURIComponent(category)}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      } finally {
        setLoading(false); // Set loading to false after the fetch is done
      }
    };

    fetchProducts();
  }, [location.pathname, category, subcategory]);

  return (
    <div className={styles["products-container"]}>
      <ShopNav />

      <ShopSearch setSearchResults={setSearchResults} />

      {loading && (
        <div className={styles["sweet-loading"]}>
          <PropagateLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={20}
            aria-label="Grid Loader"
            data-testid="loader"
          />
        </div>
      )}

      {searchResults.length === 0 && (
        <div className={styles["aside-products"]}>
          <ShopAside setFilteredProducts={setProducts} subcategory={subcategory} category={category} />

          <div className={styles["products-grid"]}>
            {products.map((item) => (
              <ProductCard
                key={item._id}
                product={item}
                userId={userId}
                addToFavorites={addToFavorites}
                removeFromFavorites={removeFromFavorites}
                checkFavorite={checkFavorite}
                addToCart={addToCart}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
