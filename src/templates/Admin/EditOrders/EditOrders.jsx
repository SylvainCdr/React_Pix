import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import Swal from "sweetalert2";
import { BASE_URL } from "@/url";
import { useParams } from "next/navigation";

export default function EditOrders() {
  const [order, setOrder] = useState({});
  const [user, setUser] = useState({});
  const [status, setStatus] = useState("");
  const [billingAddress, setBillingAddress] = useState({});
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [delivery, setDelivery] = useState({});
  const [payment, setPayment] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const params = useParams();
  const orderId = params?.id;

  useEffect(() => {
    fetch(`${BASE_URL}/orders/${orderId}`)
      .then((response) => response.json())
      .then((data) => setOrder(data));
  }, [orderId]);

  useEffect(() => {
    fetch(`${BASE_URL}/users/${order.user}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        setBillingAddress(data.billingAddress);
      });
  }, [order]);

  useEffect(() => {
    setDeliveryAddress(order.deliveryAddress);
    setDelivery(order.delivery);
    setPayment(order.payment);
    setTotalAmount(order.totalAmount);
    setStatus(order.status);
  }, [order]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Ici, vous construisez un nouvel objet pour l'utilisateur,
    // en conservant toutes ses propriétés intactes mais en mettant à jour billingAddress.
    const updatedUser = {
      ...user, // Ceci copie toutes les propriétés actuelles de l'utilisateur
      billingAddress, // Ceci remplace l'ancienne billingAddress par la nouvelle
    };

    fetch(`${BASE_URL}/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: user._id, // Assurez-vous que cela correspond à ce que votre backend attend
        deliveryAddress,
        delivery,
        payment,
        totalAmount,
        status,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    fetch(`${BASE_URL}/users/${user._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser), // Envoyez l'objet utilisateur mis à jour
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    // alert sweet alert et redirection
    Swal.fire({
      title: "Commande modifiée avec succès !",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    }).then(() => {
      window.location.href = "/admin/commandes";
    });
  };

  return (
    <div className={styles["edit-order-container"]}>
      <h2>Modification - Commande n°{orderId}</h2>
      <h3>
        Date de commande : {new Date(order.orderDate).toLocaleDateString()}
      </h3>

      <div className={styles["edit-order-form"]}>
        <div className={styles["section-1"]}>
          <h4>
            Client : {user.lastName} {user.firstName}
          </h4>
          <h4>Entreprise : {user.company}</h4>
          <h4>Email : {user.email}</h4>
          <h4>Téléphone : {user.phone}</h4>

          <h4>Méthode de livraison : {delivery && delivery.method}</h4>
          <h4>
            Frais de livraison :{" "}
            {delivery && delivery.fee && delivery.fee.toFixed(2)} €
          </h4>
          <h4>Méthode de paiement : {payment && payment.method}</h4>
          <h4>
            Paiement :{" "}
            {payment && payment.paid ? "Payé" : "En attente de paiement"}
          </h4>

          <h4>
            Total de la commande :{" "}
            {order && order.totalAmount && order.totalAmount.toFixed(2)} €
          </h4>
        </div>

        <div className={styles["section-2"]}>
          <form onSubmit={handleSubmit}>
            <h4>Adresse de facturation :</h4>
            <label htmlFor="billingAddress">Numéro et rue</label>
            <input
              type="text"
              id="billingAddress"
              value={billingAddress && billingAddress.street}
              onChange={(event) =>
                setBillingAddress({
                  ...billingAddress,
                  street: event.target.value,
                })
              }
            />
            <label htmlFor="billingAddress">Code postal</label>
            <input
              type="text"
              id="zip"
              value={billingAddress && billingAddress.zip}
              onChange={(event) =>
                setBillingAddress({
                  ...billingAddress,
                  zip: event.target.value,
                })
              }
            />
            <label htmlFor="billingAddress">Ville</label>
            <input
              type="text"
              id="city"
              value={billingAddress && billingAddress.city}
              onChange={(event) =>
                setBillingAddress({
                  ...billingAddress,
                  city: event.target.value,
                })
              }
            />
            <label htmlFor="billingAddress">Pays</label>
            <input
              type="text"
              id="country"
              value={billingAddress && billingAddress.country}
              onChange={(event) =>
                setBillingAddress({
                  ...billingAddress,
                  country: event.target.value,
                })
              }
            />

            <h4>Adresse de livraison :</h4>
            <label htmlFor="deliveryAddress">Numéro et rue</label>
            <input
              type="text"
              id="deliveryAddress"
              value={deliveryAddress && deliveryAddress.street}
              onChange={(event) =>
                setDeliveryAddress({
                  ...deliveryAddress,
                  street: event.target.value,
                })
              }
            />
            <label htmlFor="deliveryAddress">Code postal</label>
            <input
              type="text"
              id="zip"
              value={deliveryAddress && deliveryAddress.zip}
              onChange={(event) =>
                setDeliveryAddress({
                  ...deliveryAddress,
                  zip: event.target.value,
                })
              }
            />
            <label htmlFor="deliveryAddress">Ville</label>
            <input
              type="text"
              id="city"
              value={deliveryAddress && deliveryAddress.city}
              onChange={(event) =>
                setDeliveryAddress({
                  ...deliveryAddress,
                  city: event.target.value,
                })
              }
            />
            <label htmlFor="deliveryAddress">Pays</label>
            <input
              type="text"
              id="country"
              value={deliveryAddress && deliveryAddress.country}
              onChange={(event) =>
                setDeliveryAddress({
                  ...deliveryAddress,
                  country: event.target.value,
                })
              }
            />

            <label className={styles.h4} htmlFor="status">
              Statut de la commande
            </label>
            <select
              id="status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="pending">En attente</option>
              <option value="shipped">Expédiée</option>
              <option value="delivered">Livrée</option>
            </select>
            <button type="submit">Enregistrer</button>
          </form>
        </div>
      </div>
    </div>
  );
}
