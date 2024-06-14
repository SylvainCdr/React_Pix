import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import AdminOrderModal from "../../../Components/AdminOrderModal/AdminOrderModal";
import { NavLink } from "react-router-dom";
import { BASE_URL } from "../../../url";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState({});
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/allOrders`)
      .then((response) => response.json())
      .then((data) => {
        // Trier les commandes par date de commande, de la plus récente à la plus ancienne
        const sortedOrders = data.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate),
        );
        setOrders(sortedOrders);
      });
  }, []);

  useEffect(() => {
    const userIds = orders.map((order) => order.user);
    userIds.forEach((userId) => {
      fetch(`${BASE_URL}/users/${userId}`)
        .then((response) => response.json())
        .then((userData) => {
          setUsers((prevUsers) => ({
            ...prevUsers,
            [userId]: userData,
          }));
        });
    });
  }, [orders]);

  // Au clic sur "Détails", on met à jour l'ID de la commande sélectionnée
  const handleDetails = (orderId) => {
    setSelectedOrderId(orderId);
  };
  return (
    <div className={styles["admin-orders"]}>
      <h1>Commandes</h1>

      {/* Si aucune commande n'est trouvée, on affiche un message */}
      {orders.length === 0 && <p>Aucune commande trouvée</p>}

      {/* Tableau des commandes */}

      <table>
        <thead>
          <tr>
            <th>Numéro de commande</th>
            <th>Date</th>
            <th>Client</th>
            <th>Montant</th>
            <th>Statut</th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>
                {order.orderDate &&
                  new Date(order.orderDate).toLocaleDateString()}
              </td>
              <td>
                {users[order.user]?.company} ({users[order.user]?.lastName}{" "}
                {users[order.user]?.firstName}){" "}
              </td>
              <td>{order.totalAmount.toFixed(2)} €</td>
              <td>{order.status}</td>
              <td>
                {/* Au clic sur "Détails", on appelle la fonction handleDetails avec l'ID de la commande */}
                <button onClick={() => handleDetails(order._id)}>
                  Détails
                </button>
              </td>
              <td>
                <NavLink to={`/admin/commande/modification/${order._id}`}>
                  <button className={styles["modify-btn"]}>Modifier</button>{" "}
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Le modal s'affiche seulement si selectedOrderId est défini */}
      {selectedOrderId && (
        <AdminOrderModal
          order={orders.find((order) => order._id === selectedOrderId)}
          user={users[selectedOrderId]}
          onClose={() => setSelectedOrderId(null)}
        />
      )}
    </div>
  );
}
