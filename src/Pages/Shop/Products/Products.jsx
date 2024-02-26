import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import "./style.scss";
import ShopNav from "../../../Components/ShopNav/ShopNav";
import slugify from "slugify";

const Products = () => {
  const { category, subcategory } = useParams();
  const [products, setProducts] = useState([]);
  const location = useLocation();

const [searchResults, setSearchResults] = useState([]);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);




   // créer une fonction pour gérer la recherche
   const handleSearch = (e) => {
    setSearch(e.target.value);

    if (e.target.value.length > 0) {
      setSearching(true);

      // Rechercher des produits correspondant à la requête
      fetch(`http://localhost:3001/search?query=${e.target.value}`)
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data);
          setSearching(false);
        })
        .catch((error) => {
          console.error("Erreur lors de la recherche de produits :", error);
          setSearching(false);
        });
    } else {
      setSearchResults([]);
    }
  };

  // Créez une fonction pour gérer le changement de la recherche
  const handleSearchChange = (results) => {
    setSearchResults(results);
  };


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
            <ShopNav onSearchChange={handleSearchChange} searchResults={searchResults} />

      <div className="products-title">
        <h1>{category} </h1>
      </div>

      <div className="products-grid">
  {searching && <p>Recherche en cours...</p>}

  {(searchResults.length > 0 ? searchResults : products).map((item) => (
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
  );
};

export default Products;
