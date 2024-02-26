import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./style.scss";
import ShopNav from "../../../Components/ShopNav/ShopNav";
import slugify from "slugify";
import Search from "../../../Components/Search/Search";

const Products = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);

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
              <div className="product-card" key={item._id}>
                <div className="card-title">
                  <h2>{item.name}</h2>
                </div>
                <img src={item.image} alt={item.name} className="card-img" />
                <p className="card-price">
                  {item.price} € <span>TTC</span>
                </p>
                <p>{item.brand}</p>
                <div className="buttons">
                  <button className="button-see">
                    <Link to={`/product/${item._id}`}>Voir le produit</Link>
                  </button>
                  <button className="button-cart">
                    <i className="fa-solid fa-cart-plus"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
