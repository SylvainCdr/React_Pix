import React, { useState, useEffect } from "react";
import "./style.scss";
import useCart from "../../../Components/useCart";

export default function Order() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const { cart, totalAmount } = useCart();

  //   const OrderSchema = new Schema({
  //     // Création d'une référence à l'utilisateur qui a passé la commande
  //     user: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'User',
  //       required: true
  //     },
  //     // Création d'un objet pour stocker l'adresse de livraison
  //     address: {
  //       street: { type: String, required: true },
  //       city: { type: String, required: true },
  //       zip: { type: String, required: true },
  //       country: { type: String, required: true },
  //     },
  //     // Création d'un objet pour stocker les produits commandés
  //     items: [{
  //       product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  //       quantity: { type: Number, required: true },
  //       priceAtOrderTime: { type: Number, required: true },
  //     }],
  //     delivery: {
  //       method: { type: String, required: true, enum: ['standard', 'express'] },
  //       fee: { type: Number, default: 0 },
  //     },
  //     // Création d'une date de commande
  //     orderDate: {
  //       type: Date,
  //       default: Date.now
  //     },
  //     // Création d'un statut pour la commande
  //     status: {
  //       type: String,
  //       enum: ['pending', 'shipped', 'delivered'],
  //       default: 'pending'
  //     },
  //     payment: {
  //       totalAmount: { type: Number, required: true },
  //       method: { type: String, required: true },
  //       paid: { type: Boolean, default: false },
  //     },
  //     // Création d'un total pour la commande
  //     total: { type: Number, required: true },
  //   });

  const [order, setOrder] = useState({
    user: user._id,
    address: { street: "", city: "", zip: "", country: "" },
    items: [],
    delivery: {
      method: "",
      fee: "9.90",
    },
    orderDate: new Date().toLocaleDateString(),

    status: "pending",
    payment: {
      method: "",
      paid: false,
    },
    totalAmount: "",
  });

  useEffect(() => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      items: cart.map((product) => ({
        product: product._id,
        name: product.name,
        ref: product.ref,
        quantity: product.quantity,
        priceAtOrderTime: product.price,
      })),
      totalAmount: totalAmount,
    }));
  }, [cart]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["street", "city", "zip", "country"].includes(name)) {
      setOrder((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else if (name === "deliveryMethod") {
      setOrder((prev) => ({
        ...prev,
        delivery: {
          ...prev.delivery,
          method: value,
        },
      }));
    } else if (name === "paymentMethod") {
      setOrder((prev) => ({
        ...prev,
        payment: {
          ...prev.payment,
          method: value,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        alert("Commande passée avec succès !");
        // Réinitialiser le formulaire après une commande réussie
        setOrder({
          ...order,
          address: {
            street: "",
            city: "",
            zip: "",
            country: "",
          },
          deliveryMethod: "",
          paymentMethod: "",
        });
      } else {
        alert("Échec de la commande. Veuillez réessayer.");
      }
    } catch (error) {
      console.error("Erreur lors de la soumission de la commande :", error);
    }
  };

  return (
    <div className="order-container">
      <h1>Commande</h1>
      <form onSubmit={handleSubmit}>
        <h2>Informations</h2>
        <div className="customer-infos">
          <div className="customer-details">
            <div className="name">
              Prénom :{" "}
              <input
                type="text"
                name="firstName"
                placeholder="Prénom"
                value={user.firstName}
                onChange={handleChange}
              />
              Nom :{" "}
              <input
                type="text"
                name="lastName"
                placeholder="Nom"
                value={user.lastName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="company"
                placeholder="Entreprise"
                value= {user.company}
                onChange={handleChange}
              />
            </div>
            Email :{" "}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={handleChange}
            />
            Téléphone :{" "}
            <input
              type="text"
              name="phone"
              placeholder="Téléphone"
              value={user.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <h2>Facturation & Livraison</h2>
        <div className="address-details">
          <div className="billing-address">
            <p>Adresse de facturation : </p>
            <input
              type="text"
              name="street"
              placeholder="Numéro et Rue"
              value={order.address.street}
              onChange={handleChange}
            />
            <input
              type="text"
              name="zip"
              placeholder="Code Postal"
              value={order.address.zip}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="Ville"
              value={order.address.city}
              onChange={handleChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Pays"
              value={order.address.country}
              onChange={handleChange}
            />
          </div>
        </div>

        <h2>Mode de livraison</h2>
        <div className="delivery-options">
          <select
            name="deliveryMethod"
            value={order.delivery.method}
            onChange={handleChange}
          >
            <option value="">Sélectionnez le mode de livraison</option>
            <option value="standard">Standard</option>
            <option value="express">Express</option>
          </select>
        </div>

        <h2>Moyen de paiement</h2>
        <div className="payment-options">
          <p>Sélectionnez votre moyen de paiement</p>

          <select
            name="paymentMethod"
            value={order.payment.method}
            onChange={handleChange}
          >
            <option value="">Sélectionnez le mode de paiement</option>
            <option value="carte">Carte</option>
            <option value="paypal">Paypal</option>
            <option value="virement">Virement</option>
          </select>
        </div>

        <button type="submit">Valider la commande</button>
      </form>
    </div>
  );
}
