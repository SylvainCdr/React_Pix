import React, { useState, useEffect, CSSProperties } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./style.scss";
import ShopNav from "../../../Components/ShopNav/ShopNav";
import ShopSearch from "../../../Components/ShopSearch/ShopSearch";
import ShopAside from "../../../Components/ShopAside/ShopAside";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import useFavorites from "../../../Components/useFavorites";
import useCart from "../../../Components/useCart";
import PropagateLoader from "react-spinners/PropagateLoader";

const Products = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const { addToFavorites, removeFromFavorites, checkFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [userId, setUserId] = useState("");

  const override = {
    size: "15px",
    margin: "0 auto",
    borderColor: "red",
  };

  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState("#ff9c3fc0");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true before starting the fetch
      const apiUrl = subcategory
        ? `http://localhost:3001/products?category=${encodeURIComponent(
            category
          )}&subcategory=${encodeURIComponent(subcategory)}`
        : `http://localhost:3001/products?category=${encodeURIComponent(
            category
          )}`;

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
    <div className="products-container">
      <ShopNav />

      <ShopSearch setSearchResults={setSearchResults} />

      {loading && (
        <div className="sweet-loading">
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
        <div className="aside-products">
          <ShopAside
            setFilteredProducts={setProducts}
            subcategory={subcategory}
            category={category}
          />

          <div className="products-grid">
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
