import React, { useState, useEffect } from "react";
import "./style.scss";

export default function AdminCartModal({ cart, user, contact, onClose }) {

 


  return (
    <div className="cartModal-container">
      <div className="cart-modal">
        <div className="close">
          <button className="close-button" onClick={onClose}>
            x
          </button>
        </div>
        <h2>Détails du Panier de {user.username}</h2>
        <h3>Contact : {cart.contact}</h3>
        <p>Dernière mise à jour :   
  {cart.cart.length > 0 ? 
    new Date(cart.cart.reduce((latest, product) => {
      const productDate = new Date(product.created);
      return productDate > latest ? productDate : latest;
    }, new Date(0))).toLocaleDateString('fr-FR') : 
    'Aucune date'}
</p>
        <ul>
          {cart.cart.map((product, index) => (
            <li key={index}>
              <p>Produit : {product.name}</p>
              <p>Quantité : {product.quantity}</p>
              <p>Prix : {product.price}€</p>
            </li>
          ))}
        </ul>
        <h4>
          Total :{" "}
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
