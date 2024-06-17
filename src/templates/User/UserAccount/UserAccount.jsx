import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import useFavorites from "@/Components/useFavorites";
import ProductCard from "@/Components/ProductCard/ProductCard";
import useCart from "@/Components/useCart";
import DeliveryTimeline from "@/Components/DeliveryTimeline/DeliveryTimeline";
import AOS from "aos";
import { BASE_URL } from "@/url";
import { useRouter } from "next/router";
import { useGetUser } from "@/Components/useGetUser";
import Link from "next/link";

export default function UserAccount() {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("favoris");
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);

  const { getFavorites, removeFromFavorites, checkFavorite, addToFavorites } =
    useFavorites();
  const { addToCart } = useCart();
  const user = useGetUser();
  const userId = user?._id;

  useEffect(() => {
    async function fetchUserData() {
      if (!userId) return;

      try {
        const [productsData, favoritesData] = await Promise.all([
          fetch(`${BASE_URL}/products`).then((res) => res.json()),
          getFavorites(userId),
        ]);

        setProducts(productsData);
        setFavorites(favoritesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchUserData();
  }, [userId, getFavorites]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`${BASE_URL}/orders?userId=${userId}`);
        const data = await response.json();
        const sortedOrders = data.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        );
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
      }
    };

    fetchOrders();
  }, [userId]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleProductClick = (productId) => {
    const product = products.find((item) => item._id === productId);
    const product_id = product?.product_id;
    if (product_id) {
      router.push(`/product/${product_id}`);
    }
  };

  if (!user) return null; // Ou affichez un message de chargement si nécessaire

  return (
    <div className={styles["user-account-container"]}>
      <div className={styles["user-menu"]}>
        <aside className={styles["user-account-nav"]}>
          <h2>Mon compte</h2>
         
            <button
              className={styles.active}
              onClick={() => handleTabClick("favoris")}
            >
            
                <i class="fa-solid fa-heart"></i>
              
            </button>
            <button
              className={styles.active}
              onClick={() => handleTabClick("infos")}
            >
           
                <i class="fa-solid fa-user-pen"></i>
              
            </button>
            <button
              className={styles.active}
              onClick={() => handleTabClick("commandes")}
            >
            
                <i class="fa-solid fa-basket-shopping"></i>
             
            </button>
         
        </aside>
      </div>

      <div className={styles["user-dashboard"]}>
        <h3>
          {selectedTab === "favoris" && "Mes produits favoris"}
          {selectedTab === "infos" && "Mes informations"}
          {selectedTab === "commandes" && "Mes commandes"}
        </h3>

        {selectedTab === "infos" && (
          <div data-aos="fade-up" className={styles["user-infos"]}>
            <div className={styles["grid-infos"]}>
              <div className={styles.perso}>
                <h4>Informations personnelles</h4>
                <p>Nom : {user.lastName}</p>
                <p>Prénom : {user.firstName}</p>
                <p>Entreprise : {user.company}</p>
                <p>
                  Date d'inscription :{" "}
                  {new Date(user.created).toLocaleDateString()}
                </p>
                {user.discount !== 0 && (
                  <p>Remise accordée : {user.discount}%</p>
                )}
              </div>
              <div className={styles.address}>
                <h4>Adresse de facturation</h4>
                <p>Adresse : {user.billingAddress.street}</p>
                <p>Ville : {user.billingAddress.city}</p>
                <p>Code postal : {user.billingAddress.zip}</p>
                <p>Pays : {user.billingAddress.country}</p>
              </div>
              <div className={styles.contact}>
                <h4>Informations de contact</h4>
                <p>Email : {user.email}</p>
                <p>Téléphone : {user.phone}</p>
              </div>
            </div>
            <Link href="/mon-compte/modification">
              <button>Modifier</button>
            </Link>
          </div>
        )}

        {selectedTab === "favoris" && (
          <div className={styles["user-favorites"]}>
            <div className={styles["favorites-grid"]}>
              {favorites.length > 0 ? (
                favorites.map((favorite) => {
                  const product = products.find(
                    (item) => item._id === favorite.product_id
                  );

                  return (
                    <div
                      data-aos="fade-up"
                      key={favorite.product_id}
                      className={styles.productCard}
                    >
                      <ProductCard
                        product={product}
                        addToCart={addToCart}
                        addToFavorites={addToFavorites}
                        checkFavorite={checkFavorite}
                        removeFromFavorites={removeFromFavorites}
                        handleProductClick={handleProductClick}
                      />
                    </div>
                  );
                })
              ) : (
                <div className={styles["no-favorites-orders-msg"]}>
                  <p>Vous n'avez pas encore de produits favoris.</p>
                  <Link href="/boutique">
                    <button>Visiter la boutique</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedTab === "commandes" && (
          <div data-aos="fade-up" className={styles["user-orders"]}>
            {orders.length > 0 ? (
              orders.map((order) => (
                <div className={styles.order} key={order._id}>
                  <table>
                    <thead>
                      <tr>
                        <th>N° de commande</th>
                        <th>Date</th>
                        <th className={styles.mobile}>Produits</th>
                        <th className={styles.mobile}>Total</th>
                        {/* <th>Statut</th> */}
                        <th>Détails</th>
                      </tr>
                      {/* // ajout d'une ligne pour afficher la timeline */}
                    </thead>
                    <tbody>
                      <tr>
                        <td>{order._id}</td>

                        <td>
                          {order.orderDate
                            ? new Date(order.orderDate).toLocaleDateString()
                            : "Date inconnue"}
                        </td>

                        <td className={styles.mobile}>
                          {order.items.map((product) => (
                            <p key={product._id}>
                              {product.name} <span>x {product.quantity}</span>
                            </p>
                          ))}
                        </td>
                        {/* // Calcul du total de la commande, on arrondi à 2 chiffres après la virgule */}
                        <td className={styles.mobile}>
                          {" "}
                          {order.totalAmount.toFixed(2)} €{" "}
                        </td>
                        {/* <td>{order.status}</td> */}
                        <td>
                          <Link href={`/mon-compte/commande/${order._id}`}>
                            <button>Voir</button>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="5">
                          <DeliveryTimeline status={order.status} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))
            ) : (
              <div className={styles["no-favorites-orders-msg"]}>
                <p>Vous n'avez pas encore de commandes.</p>
                <Link href="/boutique">
                  <button>Visiter la boutique</button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
