import React, { useState, useEffect } from "react";
import "./style.scss";

export default function AdminCartModal({ cart, user, contact, onClose }) {
  return (
    <div className="cartModal-container">
      <div className="modal-content">
        <div className="close">
          <button className="close-button" onClick={onClose}>
            x
          </button>
        </div>
        <h2>Détails du Panier</h2>
        <h3>Client: {user.username}</h3>
        <h3>Contact: {cart.contact}</h3>
        <ul>
          {cart.cart.map((product, index) => (
            <li key={index}>
              <p>Produit: {product.name}</p>
              <p>Quantité: {product.quantity}</p>
              <p>Prix: {product.price}€</p>
            </li>
          ))}
        </ul>
        <h4>
          Total:{" "}
          {cart.cart.reduce(
            (acc, product) => acc + product.price * product.quantity,
            0
          )}
          €
        </h4>
      </div>
    </div>
  );
}
