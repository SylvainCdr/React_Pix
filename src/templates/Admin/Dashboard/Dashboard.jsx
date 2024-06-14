import styles from "./style.module.scss";
import React, { useState, useEffect } from "react";
import AdminNav from "@/Components/AdminNav/AdminNav";
import { BASE_URL } from "@/url";

export default function Dashboard() {
  const [newUsers, setNewUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalSubCategories, setTotalSubCategories] = useState(0);
  const [newOrders, setNewOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [amountAverage, setAmountAverage] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [, setUserFavorites] = useState([]);
  const [, setTopFavorites] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        const reversedData = data.reverse();
        setNewUsers(reversedData.slice(0, 6));
        setTotalUsers(data.length);
      });
  }, []);

  // on compte le nombre de catégories et subcatégories existantes dans la collection products
  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        let categories = [];
        let subcategories = [];

        setTotalProducts(data.length);

        data.forEach((product) => {
          if (!categories.includes(product.category)) {
            categories.push(product.category);
          }
          if (!subcategories.includes(product.subcategory)) {
            subcategories.push(product.subcategory);
          }
        });

        setTotalCategories(categories.length);
        setTotalSubCategories(subcategories.length);
      });
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/allOrders`)
      .then((res) => res.json())
      .then((data) => {
        const reversedData = data.reverse();
        setNewOrders(reversedData.slice(0, 6));
        setTotalOrders(reversedData.length);
        setAmountAverage(
          data.reduce((acc, order) => acc + order.totalAmount, 0) / data.length
        );
        setConversionRate(data.length / totalUsers);

        // Chercher le nom des utilisateurs pour chaque commande
        const userIds = data.map((order) => order.user);
        Promise.all(
          userIds.map((userId) =>
            fetch(`${BASE_URL}/users/${userId}`).then((res) => res.json())
          )
        ).then((userNames) => {
          const ordersWithNames = data.map((order, index) => ({
            ...order,
            userName: `${userNames[index].lastName} ${userNames[index].firstName}`,
          }));
          setNewOrders(ordersWithNames.slice(0, 6));
        });
      });
  }, [totalUsers]);

  useEffect(() => {
    fetch(`${BASE_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        let favorites = [];
        data.forEach((user) => {
          user.favorites.forEach((favorite) => {
            favorites.push(favorite);
          });
        });
        console.log("tous les favorites enregistrés:", favorites);

        setUserFavorites(favorites);

        // si plusieurs objects on le meme Name on les regroupe
        const groupedFavorites = favorites.reduce((acc, favorite) => {
          if (!acc[favorite.name]) {
            acc[favorite.name] = 1;
          } else {
            acc[favorite.name]++;
          }
          return acc;
        }, {});

        console.log("groupedFavorites:", groupedFavorites);

        // on trie les produits par nombre de likes
        const sortedFavorites = Object.entries(groupedFavorites).sort(
          (a, b) => b[1] - a[1]
        );

        console.log("sortedFavorites:", sortedFavorites);

        setTopFavorites(sortedFavorites.slice(0, 6));
      });
  }, []);
  return (
    <div className={styles["admin-dashboard-container"]}>
      <div className={styles["admin-nav"]}>
        <AdminNav />
      </div>
      <div className={styles["admin-dashboard"]}>
        <h1>ESPACE ADMINISTRATION</h1>
        <div className={styles.top}>
          <div className={styles["recap-users"]}>
            <h2>
              Total utilisateurs inscrits : <br />
              <br />
              <span>{totalUsers}</span>
            </h2>
            <h2>
              {" "}
              Taux de conversion (inscription/achat) :<br />
              <br />
              <span>{(conversionRate * 100).toFixed(2)} %</span>
            </h2>
            <h3>6 derniers utilisateurs inscrits : </h3>
            <table>
              <thead>
                <tr>
                  <th>Date d'inscription</th>
                  <th>Utilisateur</th>
                  <th>Entreprise</th>
                </tr>
              </thead>
              <tbody>
                {newUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{new Date(user.created).toLocaleDateString()}</td>
                    <td>
                      {user.lastName} {user.firstName}
                    </td>
                    <td>{user.company}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles["recap-orders"]}>
            <h2>
              Total commandes passées : <br />
              <br />
              <span>{totalOrders} </span>
            </h2>
            <h2>
              Montant moyen des commandes :<br />
              <br />
              <span>{amountAverage.toFixed(2)} €</span>
            </h2>

            <h3>6 dernières commandes : </h3>

            <table>
              <thead>
                <tr>
                  <th>Date de commande</th>
                  <th>Client</th>
                  <th>N° commande</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {newOrders.map((order) => (
                  <tr key={order.id}>
                    <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                    <td>{order.userName}</td>{" "}
                    <td>{order._id.slice(0, 6)}...</td>
                    <td>{order.totalAmount.toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles["recap-products"]}>
            <h2>
              Total catégories enregistrées :<br />
              <br />
              <span>{totalCategories}</span>
            </h2>
            <h2>
              Total sous-catégories enregistrées :<br />
              <br />
              <span>{totalSubCategories}</span>
            </h2>
            <h2>
              Total produits enregistrés : <br />
              <br />
              <span>{totalProducts}</span>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}
