import React, { useEffect, useState } from "react";
import "./style.scss";
import useCart from "../../../Components/useCart";
import { NavLink, useNavigate } from "react-router-dom";
import AOS from "aos";

export default function Cart() {
  const { fetchCart, editQuantity, removeFromCart, cart } = useCart();
  
  const navigate = useNavigate();
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shippingCost, setShippingCost] = useState(9.9);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    const userData = JSON.parse(userDataString);
    const userId = userData._id;
    fetchCart(userId);
  }, []);

  useEffect(() => {
    const discount = JSON.parse(localStorage.getItem("user")).discount;
    const calculatedSubTotal = cart.reduce((acc, product) => {
      const discountedPrice = product.price ; // Appliquer le rabais au prix du produit
      return acc + product.quantity * discountedPrice;
    }, 0);
    setSubTotal(calculatedSubTotal);
    setTax(calculatedSubTotal * 0.2);
    setTotalAmount(
      calculatedSubTotal + calculatedSubTotal * 0.2 + shippingCost
    );
  }, [cart]);

  const handleOrder = () => {
    navigate("./commande");
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // Condition pour afficher un message si le panier est vide
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h1>Panier</h1>
        <div className="empty-cart-message">
          <p>Vous n'avez pas encore de produits dans votre panier.</p>
          <NavLink to="/catalogue"> <button>Visiter la boutique</button></NavLink>
        </div>
      </div>
    );
  }

  return (
    <div  className="cart-container">
      <h1>Panier</h1>

      <div className="shopping-cart">
        <div className="column-labels">
          <label className="product-image">Image</label>
          <label className="product-details">Produit</label>
          {/* // si dicount alors on affiche le rabais */}
          <label className="product-price">Prix HT </label>
          {/* // si dicount alors on affiche le rabais */}
          <label className="product-quantity">Quantité</label>
          <label className="product-removal">Supprimer</label>
          <label className="product-line-price">Total HT</label>
        </div>

        {cart.map((product, index) => (
          <div className="product" key={index}>
            <div className="product-image">
              <img src={product.image} alt="" />
            </div>
            <div className="product-details">
              <div className="product-title">
                {product.name}
                <p>Réf : {product.ref}</p>
              </div>
              <p className="product-description">{product.description}</p>
            </div>
            {JSON.parse(localStorage.getItem("user")).discount > 0 && (
              <div className="discount-badge">
                {" "}
                - {JSON.parse(localStorage.getItem("user")).discount} %
              </div>
            )}
            {/* // si discont alors le prix base est barré et le prix avec rabais est affiché */}
            {JSON.parse(localStorage.getItem("user")).discount > 0 ? (
              <div className="product-price">
                <span className="base-price">{product.price.toFixed(2)} €</span>
                
              </div>
            ) : (
              <div className="product-price">{product.price.toFixed(2)} €</div>
            )}
            {/* <div className='product-price'>{product.price.toFixed(2)} €</div> */}
            <div className="product-quantity">
            <input
  type="number"
  value={product.quantity}
  onChange={(e) => {
    const newValue = parseInt(e.target.value);
    // Vérifier si la nouvelle valeur est supérieure ou égale à zéro
    if (newValue >= 0) {
      const userDataString = localStorage.getItem("user");
      const userData = JSON.parse(userDataString);
      const userId = userData._id;
      editQuantity(userId, product.product_id, newValue);
    }
  }}
/>
            </div>
            <div className="product-removal">
              <button
                className="remove-product"
                onClick={() => {
                  const userDataString = localStorage.getItem("user");
                  const userData = JSON.parse(userDataString);
                  const userId = userData._id;
                  removeFromCart(userId, product.product_id);
                }}
              >
                Supprimer
              </button>
            </div>
            <div className="product-line-price">
              {(
                product.quantity * product.price).toFixed(2)}
              €
            </div>{" "}
            {/* Appliquer le rabais au total du produit */}
          </div>
        ))}

        <div className="totals">
          <div className="totals-item">
            <label>Sous-total</label>
            <div className="totals-value" id="cart-subtotal">
              {subTotal.toFixed(2)} €
            </div>
          </div>
          <div className="totals-item">
            <label>TVA (20%)</label>
            <div className="totals-value" id="cart-tax">
              {tax.toFixed(2)} €
            </div>
          </div>
          <div className="totals-item">
            <label>Frais de livraison</label>
            <div className="totals-value" id="cart-shipping">
              {shippingCost.toFixed(2)} €
            </div>
          </div>
          <div className="totals-item totals-item-total">
            <label>Total</label>
            <div className="totals-value" id="cart-total">
              {totalAmount.toFixed(2)} €
            </div>
          </div>
        </div>

        <button onClick={handleOrder} className="checkout">
          Commander
        </button>
      </div>
    </div>
  );
}
