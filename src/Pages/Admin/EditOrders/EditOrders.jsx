import React, { useState, useEffect } from "react";
import "./style.scss";
import Swal from "sweetalert2";

export default function EditOrders() {
  const [order, setOrder] = useState({});
  const [user, setUser] = useState({});
  const [status, setStatus] = useState("");
  const [billingAddress, setBillingAddress] = useState({});
  const [deliveryAddress, setDeliveryAddress] = useState({});
  const [delivery, setDelivery] = useState({});
  const [payment, setPayment] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const orderId = window.location.pathname.split("/").pop();

  useEffect(() => {
    fetch(`http://localhost:3001/orders/${orderId}`)
      .then((response) => response.json())
      .then((data) => setOrder(data));
  }, [orderId]);

  useEffect(() => {
    fetch(`http://localhost:3001/users/${order.user}`)
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
    fetch(`http://localhost:3001/orders/${orderId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user,
        deliveryAddress,
        delivery,
        payment,
        totalAmount,
        status,
      }),
    })
      .then((response) => response.json())
      .then((data) => console.log(data));

    //alert sweet alert et redirection
    {
      Swal.fire({
        title: "Statut modifié avec succès !",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        window.location.href = "/admin/commandes";
      });
    }
  };

  return (
    <div className="edit-orders">
      <h2>Modifier la commande n°{orderId}</h2>
      <h4>
        Date de commande : {new Date(order.orderDate).toLocaleDateString()}
      </h4>
      <h4>
        Client : {user.lastName} {user.firstName}
      </h4>
      <h4>Entreprise : {user.company}</h4>
      <h4>Email : {user.email}</h4>
      <h4>Téléphone : {user.phone}</h4>
      <h4>
        Adresse de facturation :{" "}
        {billingAddress
          ? `${billingAddress.street}, ${billingAddress.zip} ${billingAddress.city}, ${billingAddress.country}`
          : "Adresse de facturation non disponible"}
      </h4>
      <h4>
        Adresse de livraison :{" "}
        {deliveryAddress
          ? `${deliveryAddress.street}, ${deliveryAddress.zip} ${deliveryAddress.city}, ${deliveryAddress.country}`
          : "Adresse de livraison non disponible"}
      </h4>
      <h4>Méthode de livraison : {delivery && delivery.method}</h4>
      <h4>Frais de livraison : {delivery && delivery.fee && delivery.fee.toFixed(2)} €</h4>
      <h4>Méthode de paiement : {payment && payment.method}</h4>
      <h4>
        Paiement : {payment && payment.paid ? "Payé" : "En attente de paiement"}
      </h4>

      <h4>Total de la commande : {order && order.totalAmount && order.totalAmount.toFixed(2)} €</h4>

      <form onSubmit={handleSubmit}>
        <h4>Adresse de facturation :</h4>
        <label html="billingAddress">Numéro et rue</label>
        <input
          type="text"
          id="billingAddress"
          value={billingAddress && billingAddress.street}
          onChange={(event) =>
            setBillingAddress({ ...billingAddress, street: event.target.value })
          }
        />
        <label html="billingAddress">Code postal</label>
        <input
          type="text"
          id="zip"
          value={billingAddress && billingAddress.zip}
          onChange={(event) =>
            setBillingAddress({ ...billingAddress, zip: event.target.value })
          }
        />
        <label html="billingAddress">Ville</label>
        <input
          type="text"
          id="city"
          value={billingAddress && billingAddress.city}
          onChange={(event) =>
            setBillingAddress({ ...billingAddress, city: event.target.value })
          }
        />
        <label html="billingAddress">Pays</label>
        <input
          type="text"
          id="country"
          value={billingAddress && billingAddress.country}
          onChange={(event) =>
            setBillingAddress({ ...billingAddress, country: event.target.value })
          }
        />

<h4>Adresse de livraison :</h4>
        <label html="deliveryAddress">Numéro et rue</label>
        <input
          type="text"
          id="deliveryAddress"
          value={deliveryAddress && deliveryAddress.street}
          onChange={(event) =>
            setDeliveryAddress({ ...deliveryAddress, street: event.target.value })
          }
        />
        <label html="deliveryAddress">Code postal</label>
        <input
          type="text"
          id="zip"
          value={deliveryAddress && deliveryAddress.zip}
          onChange={(event) =>
            setDeliveryAddress({ ...deliveryAddress, zip: event.target.value })
          }
        />
        <label html="deliveryAddress">Ville</label>
        <input
          type="text"
          id="city"
          value={deliveryAddress && deliveryAddress.city}
          onChange={(event) =>
            setDeliveryAddress({ ...deliveryAddress, city: event.target.value })
          }
        />
        <label html="deliveryAddress">Pays</label>
        <input
          type="text"
          id="country"
          value={deliveryAddress && deliveryAddress.country}
          onChange={(event) =>
            setDeliveryAddress({ ...deliveryAddress, country: event.target.value })
          }
        />

        {/* <label htmlFor="deliveryMethod">Méthode de livraison</label>
        <select
          id="deliveryMethod"
          value={delivery.method}
          onChange={(event) =>
            setDelivery({ ...delivery, method: event.target.value })
          }
        >
            <option value="standard">Standard</option>
            <option value="express">Express</option>
        </select> */}
        {/* <label htmlFor="deliveryFee">Frais de livraison</label>
        <input
          type="number"
          id="deliveryFee"
          value={delivery.fee.toFixed(2)} 
          onChange={(event) =>
            setDelivery({ ...delivery, fee: event.target.value })
          }
        /> */}

    


        <label htmlFor="status">Statut de la commande</label>
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
  );
}
