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
  const [orders, setOrders] = useState([]);

  const { getFavorites, removeFromFavorites, checkFavorite, addToFavorites } =
    useFavorites();
  const { addToCart } = useCart();

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

  // Récupération des commandes comportant un champs avec l'id de l'utilisateur
  useEffect(() => {
   

    fetch(`http://localhost:3001/orders?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des commandes :", error);
      });
  }, [userId]);

  return (
    <div className="user-account-container">
      <div className="user-menu">
        <aside className="user-account-nav">
          <h2>MENU</h2>
          <ul>
            <NavLink
              className="active"
              onClick={() => handleTabClick("favoris")}
            >
              <li>Mes Produits Favoris</li>
            </NavLink>
            <NavLink className="active" onClick={() => handleTabClick("infos")}>
              <li>Mes informations</li>
            </NavLink>

            <NavLink
              className="active"
              onClick={() => handleTabClick("commandes")}
            >
              <li>Mes commandes</li>
            </NavLink>
          </ul>
        </aside>
      </div>

      <div className="user-dashboard">
        <h3>
          {selectedTab === "favoris" && "Mes produits favoris"}
          {selectedTab === "infos" && "Mes informations"}
          {selectedTab === "commandes" && "Mes commandes"}
        </h3>

        {selectedTab === "infos" && (
          <div className="user-infos">
            <div className="grid-infos">
              <div className="perso">
                <p>Nom : {userData.lastName}</p>
                <p>Prénom : {userData.firstName}</p>
                <p>Entreprise : {userData.company}</p>
                <p>
                  {" "}
                  Date d'inscription :{" "}
                  {new Date(userData.created).toLocaleDateString()}
                </p>
                {userData.discount !== 0 && (
                  <p>Remise accordée : {userData.discount}%</p>
                )}
              </div>
              <div className="address">
                <p>Adresse : {userData.billingAddress.street}</p>
                <p>Ville : {userData.billingAddress.city}</p>
                <p>Code postal : {userData.billingAddress.zip}</p>
                <p>Pays : {userData.billingAddress.country}</p>
              </div>
              <div className="contact">
                <p>Email : {userData.email}</p>
                <p>Téléphone : {userData.phone}</p>
              </div>
            </div>
            <button>
              <NavLink to="/edit-account">Modifier mes informations</NavLink>
            </button>
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

        {selectedTab === "commandes" && (
          <div className="user-orders">
            {orders.length > 0 ? (
              orders.map((order) => {
                return (
                  <div className="order" key={order._id}>
                    <table>
                      <thead>
                        <tr>
                          <th>N° de commande</th>
                          <th>Date</th>
                          <th>Produits</th>
                          <th>Total</th>
                          <th>Statut</th>
                          <th>Détails</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{order._id}</td>

                          <td>
                            {order.orderDate
                              ? new Date(order.orderDate).toLocaleDateString()
                              : "Date inconnue"}
                          </td>

                          <td>
                            {order.items.map((product) => (
                              <p key={product._id}>
                                {product.name} <span>x {product.quantity}</span>
                              </p>
                            ))}
                          </td>
                          {/* // Calcul du total de la commande, on arrondi à 2 chiffres après la virgule */}
                          <td> {order.totalAmount.toFixed(2)} € </td>
                          <td>{order.status}</td>
                          <td>
                          <NavLink to={`/mon-compte/commande/${order._id}`}>
                            <button>
                              
                                Voir
                            </button>
                              </NavLink>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })
            ) : (
              <p>Vous n'avez pas encore de commandes.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
