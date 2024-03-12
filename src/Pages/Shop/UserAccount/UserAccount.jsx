import React, { useState, useEffect } from "react";
import "./style.scss";
import { NavLink, useNavigate } from "react-router-dom";
import useFavorites from "../../../Components/useFavorites";
import ProductCard from "../../../Components/ProductCard/ProductCard";
import useCart from "../../../Components/useCart";

export default function UserAccount() {
  const userDataString = localStorage.getItem("user");
  const userData = JSON.parse(userDataString);
  const userId = userData._id;
  const [selectedTab, setSelectedTab] = useState("favoris");
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const { getFavorites, removeFromFavorites, checkFavorite, addToFavorites} = useFavorites();
  const {addToCart } = useCart();

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, favoritesData] = await Promise.all([
          fetch("http://localhost:3001/products").then((res) => res.json()),
          getFavorites(userId),
        ]);

        setProducts(productsData);
        setFavorites(favoritesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleProductClick = (productId) => {
    const product = products.find((item) => item._id === productId);
    const product_id = product?.product_id;

    if (product_id) {
      navigate(`/product/${product_id}`);
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
              <NavLink
                activeClassName="active"
                onClick={() => handleTabClick("favoris")}
              >
                <li>Mes Produits Favoris</li>
              </NavLink>
              <NavLink
                activeClassName="active"
                onClick={() => handleTabClick("infos")}
              >
                <li>Mes informations</li>
              </NavLink>


              <NavLink
                activeClassName="active"
                onClick={() => handleTabClick("commandes")}
              >
                <li>Mes commandes</li>
              </NavLink>
            </ul>
          </aside>
        </div>

        <div className="user-dashboard">
          <h2>
            {selectedTab === "favoris" && "Mes produits favoris"}
            {selectedTab === "infos" && "Mes informations"}
            {selectedTab === "commandes" && "Mes commandes"}
          </h2>

        
            
            {selectedTab === "infos" && (
              <div className="user-infos">
                <p>
                  <strong>Nom:</strong> {userData.lastName}
                </p>
                <p>
                  <strong>Prénom:</strong> {userData.firstName}
                </p>
                <p>Entreprise: {userData.company}</p>
                <p>
                  <strong>Email:</strong> {userData.email}
                </p>
                <p> Date d'inscription: {userData.created.split("T")[0]}</p> 

                {userData.discount !== 0 && (
                  <p>
                    <strong>Remise accordée :</strong> {userData.discount}%
                  </p>
                )}
                
                
              </div>
            )}

{selectedTab === "favoris" && (
          <div className="user-favorites">
           
            <div className="favorites-grid">
              {favorites.length > 0 ? (
                favorites.map((favorite) => {
                  const product = products.find(
                    (item) => item._id === favorite.product_id
                  );

                  return (
                    <ProductCard
                      key={favorite.product_id}
                      product={product}
                      addToCart={addToCart}
                      addToFavorites={addToFavorites}
                      checkFavorite={checkFavorite}
                      removeFromFavorites={removeFromFavorites}
                      handleProductClick={handleProductClick}
                    />
                  );
                })
              ) : (
                <p>Vous n'avez pas encore de produits favoris.</p>
              )}
            </div>  

            </div>
          )}
          </div>



     
      </div>
    </>
  );
}
