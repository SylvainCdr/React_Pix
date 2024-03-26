import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./style.scss";
import ShopNav from "../../../Components/ShopNav/ShopNav";
import Search from "../../../Components/Search/Search";
import useFavorites from "../../../Components/useFavorites";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import useCart from "../../../Components/useCart";
import Aos from "aos";



const Products = () => {

  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const { addToFavorites, removeFromFavorites, checkFavorite } = useFavorites();
  const { addToCart } = useCart();
  const [userId, setUserId] = useState("");

  
  useEffect(() => {
    const fetchProducts = async () => {
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
      }
    };

    fetchProducts();
  }, [location.pathname, category, subcategory]);


  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);



  return (
    <div className="products-container">
      <ShopNav />
      <Search setSearchResults={setSearchResults} />

      {searchResults.length === 0 && (
        <div className="products">
          <div className="products-title">
            <h1>{category} </h1>
          </div>

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
