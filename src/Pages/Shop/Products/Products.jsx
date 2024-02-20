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
    <main className="container">
      <ShopNav />
      <div className="row">
        <div className="col-12">
          <h1>Nos produits</h1>
        </div>

        {products.map((product) => (
          <div className="col-3 mb-4" key={product._id}>
            <article className="card h-100">
              <div className="card-body">
                <div className="card-title">
                  <h2>{product.name}</h2>
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                />
                <p className="card-text">{product.name}</p>
                <p className="card-text">{product.price} €</p>
                <Link to={`/product/${product._id}`}>Voir le produit</Link>
              </div>
            </article>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Products;
