import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./style.scss";
import ShopNav from "../../../Components/ShopNav/ShopNav";
import slugify from "slugify";

const Products = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    console.log("Category:", category);
    console.log("Subcategory:", subcategory);

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

      <div className="products-title">
        <h1>{category} </h1>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
              <div className="card-title">
                <h2>{product.name}</h2>
              </div>
              <img
                src={product.image}
                alt={product.name}
                className="card-img"
              />
              <p className="card-price">{product.price} € <span>TTC</span></p>
              <p>{product.brand}</p>
              <div className="buttons">
                <button className="button-see">
                  <Link to={`/product/${product._id}`}>Voir le produit</Link>
                </button>
                <button className="button-cart">
                  <i class="fa-solid fa-cart-plus"></i>
                </button>
              </div>
            </div>
    
        ))}
      </div>
    </div>
  );
};

export default Products;
