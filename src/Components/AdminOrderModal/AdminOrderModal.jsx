import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import DeliveryTimeline from "../DeliveryTimeline/DeliveryTimeline";
import { BASE_URL } from "../../url";

export default function AdminOrderModal({ order, user, onClose }) {
  const [, setProducts] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    fetch(`${BASE_URL}/orders/${order._id}`)
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, [order]);

  // on récupère les infos de l'utilisateur qui a passé la commande, notament la billingAddress
  useEffect(() => {
    fetch(`${BASE_URL}/users/${order.user}`)
      .then((response) => response.json())
      .then((data) => setUserDetails(data));
  }, [order]);

  const [billingAddress, setBillingAddress] = useState({});
  useEffect(() => {
    fetch(`${BASE_URL}/users/${order.user}`)
      .then((response) => response.json())
      .then((data) => setBillingAddress(data.billingAddress));
  }, [order]);

  return (
    <div className={styles["admin-order-modal"]}>
      <button className={styles["close-button"]} onClick={onClose}>
        X
      </button>
      <h2>Commande n°{order._id}</h2>

      {/* Intégration de la timeline */}
      <DeliveryTimeline status={order.status} />
      <h4>
        Date de commande : {new Date(order.orderDate).toLocaleDateString()}
      </h4>
      {/* <h3>Statut de la commande : {order.status}</h3> */}
      <h3>
        Client : {userDetails.lastName} {userDetails.firstName}
      </h3>
      <h4>Entreprise : {userDetails.company}</h4>
      <h4>
        Adresse de facturation : {billingAddress.street}, {billingAddress.zip}{" "}
        {billingAddress.city}, {billingAddress.country}
      </h4>
      <h4>
        Adresse de livraison : {order.deliveryAddress.street},{" "}
        {order.deliveryAddress.zip} {order.deliveryAddress.city},{" "}
        {order.deliveryAddress.country}
      </h4>

      <table>
        <thead>
          <tr>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>{item.priceAtOrderTime.toFixed(2)} €</td>
              <td>{(item.priceAtOrderTime * item.quantity).toFixed(2)} €</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Méthode de livraison : {order.delivery.method}</h3>
      <h3>Frais de livraison : {order.delivery.fee.toFixed(2)} €</h3>
      <h3>Méthode de paiement : {order.payment.method}</h3>
      <h3>
        Paiement : {order.payment.paid ? "Payé" : "En attente de paiement"}
      </h3>

      <p>Total de la commande : {order.totalAmount.toFixed(2)} €</p>
    </div>
  );
}
