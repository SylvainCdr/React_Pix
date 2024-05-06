import "./style.scss";
import React, { useState, useEffect } from "react";
import AdminNav from "../../../Components/AdminNav/AdminNav";

export default function Dashboard() {
  // on cherche les 10 derniers utilisateurs inscrits
  // on les affiche dans une liste
  // on affiche le nombre total d'utilisateurs inscrits
  // on affiche le nombre total de commandes passées
  // on affiche le nombre total de produits enregistrés
  // on affiche le nombre total de catégories enregistrées
  // on affiche le nombre total de commentaires enregistrés
  // on affiche le nombre total de messages reçus

  const [newUsers, setNewUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalSubCategories, setTotalSubCategories] = useState(0);
  const [newOrders, setNewOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [amountAverage, setAmountAverage] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [userFavorites, setUserFavorites] = useState([]);
  const [topFavorites, setTopFavorites] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => {
        const reversedData = data.reverse();
        setNewUsers(reversedData.slice(0, 6));
        setTotalUsers(data.length);
      });
  }, []);

  // on compte le nombre de catégories et subcatégories existantes dans la collection products
  useEffect(() => {
    fetch("http://localhost:3001/products")
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
    fetch("http://localhost:3001/allOrders")
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
            fetch(`http://localhost:3001/users/${userId}`).then((res) =>
              res.json()
            )
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

  // on va chercher le top 6 des produits les plus likés,
  // nous devons donc récupérer les favorites dans tous les objets utilisateurs
  // puis les compter pour chaque produit
  // puis les trier pour obtenir le top 6

  useEffect(() => {
    fetch("http://localhost:3001/users")
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
    <div class="admin-dashboard-container">
      <AdminNav />

      <div className="admin-dashboard">
        <h1>ESPACE ADMINISTRATION</h1>
        <div className="top">
          <div className="recap-users">
            <h2>
              Total utilisateurs inscrits : <span>{totalUsers}</span>
            </h2>
            <h2>
              {" "}
              Taux de conversion (inscription/achat) :
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

          <div className="recap-orders">
            <h2>
              Total commandes passées : <span>{totalOrders} </span>
            </h2>
            <h2>
              {" "}
              Montant moyen des commandes :{" "}
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
                    {/* Utilisez le nom de l'utilisateur */}
                    <td>{order._id}</td>
                    <td>{order.totalAmount.toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bottom">
          <div className="recap-products">
            <h2>
              Total catégories enregistrées : <span>{totalCategories}</span>
            </h2>
            <h2>
              Total sous-catégories enregistrées :{" "}
              <span>{totalSubCategories}</span>
            </h2>
            <h2>
              Total produits enregistrés : <span>{totalProducts}</span>
            </h2>
            {/* <h2>Top 6 des produits les plus likés :</h2>

            <table>
              <thead>
                <tr>
                  <th>Produit</th>
                  <th>Nombre de likes</th>
                </tr>
              </thead>
              <tbody>
                {topFavorites.map((favorite) => (
                  <tr key={favorite[0]}>
                    <td>{favorite[0]}</td>
                    <td>{favorite[1]}</td>
                  </tr>
                ))}
              </tbody>
            </table> */}
          </div>
        </div>
      </div>
    </div>
  );
}
