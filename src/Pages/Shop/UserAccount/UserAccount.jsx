import React, { useState, useEffect } from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";
import useFavorites from "../../../Components/useFavorites";
import ProductCard from "../../../Components/ProductCard/ProductCard";

export default function UserAccount() {
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  const userId = userData._id;
  const [products, setProducts] = useState([]);
  const [selectedTab, setSelectedTab] = useState("infos");
  const { getFavorites, removeFromFavorites, checkFavorite, addToFavorites } = useFavorites();

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const favorites = await getFavorites(userId);
      console.log("Favorites Data:", favorites);
      setProducts(favorites);
    };
    fetchFavorites();
  }, [userId]);

  const handleRemoveFromFavorites = async (productId) => {
    console.log("Removing product with ID:", productId);

    const response = await removeFromFavorites(userId, productId);

    if (response) {
      console.log("Product removed successfully from the server!");

      // Utilisez un nouvel état en filtrant les produits avec le produit supprimé
      setProducts(products.filter((product) => product._id !== productId));
    } else {
      console.log("Product removal failed!");
    }
  };
  
  

  return (
    <>
      <h1>Mon compte</h1>
      <p>Bienvenue sur votre compte</p>

      <div className="user-account-container">
        <div className="user-menu">
          <aside className="user-account-nav">
            <h2>MENU</h2>
            <ul>
              <NavLink activeClassName="active" onClick={() => handleTabClick("infos")}>
                <li>Mes informations</li>
              </NavLink>

              <NavLink activeClassName="active" onClick={() => handleTabClick("favoris")}>
                <li>Mes Produits Favoris</li>
              </NavLink>

              <NavLink activeClassName="active" onClick={() => handleTabClick("commandes")}>
                <li>Mes commandes</li>
              </NavLink>
            </ul>
          </aside>
        </div>

        <div className="user-dashboard">
          <h2>
            {selectedTab === "infos" && "Mes informations"}
            {selectedTab === "favoris" && "Mes produits favoris"}
            {selectedTab === "commandes" && "Mes commandes"}
          </h2>
          {selectedTab === "favoris" && (
            <div className="favorites-grid">
               {products.map((item) => (
              <ProductCard product = {item} key={item._id}
              // handleRemoveFromFavorites={handleRemoveFromFavorites}
             checkFavorite={getFavorites}
              // removeFromFavorites={removeFromFavorites}
              handleRemoveFromFavorites={removeFromFavorites}
              removeFromFavorites={handleRemoveFromFavorites}
              
              />


          ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
