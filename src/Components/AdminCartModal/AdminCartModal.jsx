import React from "react";
import styles from "./style.module.scss";

export default function AdminCartModal({ cart, user, contact, onClose }) {
  const TAX_RATE = 0.2; // Example VAT rate of 20%
  const SHIPPING_COST = 20; // Example fixed shipping cost

  const subtotal = cart.cart.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  const tva = subtotal * TAX_RATE;
  const totalWithTax = subtotal + tva;
  const totalWithTaxAndShipping = totalWithTax + SHIPPING_COST;

  return (
    <div className={styles["cartModal-container"]}>
      <div className={styles["cart-modal"]}>
        <div className={styles.close}>
          <button className={styles["close-button"]} onClick={onClose}>
            x
          </button>
        </div>
        <h2>Détails du Panier de {user.username}</h2>
        <h3>Contact : {cart.contact}</h3>
        <p>
          Dernière mise à jour :
          {cart.cart.length > 0
            ? new Date(
                cart.cart.reduce((latest, product) => {
                  const productDate = new Date(product.created);
                  return productDate > latest ? productDate : latest;
                }, new Date(0)),
              ).toLocaleDateString("fr-FR")
            : "Aucune date"}
        </p>

        <table>
          <thead>
            <tr>
              <th>Produit</th>
              <th>Quantité</th>
              <th>Prix</th>
            </tr>
          </thead>
          <tbody>
            {cart.cart.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}€</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles["cart-summary"]}>
          <p>Sous-total (HT) : {subtotal.toFixed(2)} €</p>
          <p>TVA (20%) : {tva.toFixed(2)} €</p>
          <p>Frais de port : {SHIPPING_COST.toFixed(2)} €</p>
          <p>Total (TTC) : {totalWithTaxAndShipping.toFixed(2)} €</p>
        </div>
      </div>
    </div>
  );
}
