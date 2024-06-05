import React, { useEffect, useState } from "react";
import "./style.scss";
import useCart from "../../../Components/useCart";
import { NavLink, useNavigate } from "react-router-dom";
import AOS from "aos";
import ShopProductsCarousel from "../../../Components/ShopProductsCarousel/ShopProductsCarousel";

export default function Cart() {
  const { fetchCart, editQuantity, removeFromCart, cart } = useCart();
  const navigate = useNavigate();
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shippingCost, setShippingCost] = useState(20);
  const [totalAmount, setTotalAmount] = useState(0);
  const [carouselProducts, setCarouselProducts] = useState([]);
  const [error, setError] = useState(null);

  // useEffect pour récupérer le panier de l'utilisateur grâce à son ID stocké dans le localStorage
  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData._id;
      fetchCart(userId);
    }
  }, []);

  // useEffect pour recalculer le sous-total, la TVA et le total
  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      const discount = JSON.parse(userDataString).discount;
      const calculatedSubTotal = cart.reduce((acc, product) => {
        const discountedPrice = product.price; // Appliquer le rabais au prix du produit
        return acc + product.quantity * discountedPrice;
      }, 0);
      setSubTotal(calculatedSubTotal);
      setTax(calculatedSubTotal * 0.2);
      setTotalAmount(
        calculatedSubTotal + calculatedSubTotal * 0.2 + shippingCost
      );
    }
  }, [cart]);

  const handleOrder = () => {
    navigate("./commande");
  };

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  // useEffect pour récupérer 10 produits random 
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => {
        const randomProducts = data.sort(() => 0.5 - Math.random()).slice(0, 10);
        setCarouselProducts(randomProducts);
      })
      .catch((err) => {
        setError("Erreur lors du chargement des produits.");
        console.error(err);
      });
  }, []);

  // Fonction pour modifier la quantité d'un produit dans le panier
  const handleQuantityChange = (product, newValue) => {
    if (newValue >= 1) {
      const userDataString = localStorage.getItem("user");
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        const userId = userData._id;
        editQuantity(userId, product.product_id, newValue);
      }
    }
  };

  // Fonction pour supprimer un produit du panier
  const handleRemoveFromCart = (product) => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData._id;
      removeFromCart(userId, product.product_id);
    }
  };

  // Condition pour afficher un message si le panier est vide
  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h1>Panier</h1>
        <div className="empty-cart-message">
          <p>Vous n'avez pas encore de produits dans votre panier.</p>
          <NavLink to="/boutique">
            <button>Visiter la boutique</button>
          </NavLink>
          <ShopProductsCarousel carouselProducts={carouselProducts} />
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-content">
        <h1>Panier</h1>
        <div className="shopping-cart">
          <div className="column-labels">
            <label className="product-image">Image</label>
            <label className="product-details">Produit</label>
            <label className="product-price">Prix HT</label>
            <label className="product-quantity">Quantité</label>
            <label className="product-removal">Supprimer</label>
            <label className="product-line-price">Total HT</label>
          </div>

          {cart.map((product, index) => (
            <div className="product" key={index}>
              <div className="product-image">
                <img
                  src={
                    product.image && product.image.startsWith("http")
                      ? product.image
                      : `http://localhost:3001${product.image}`
                  }
                  alt={product.name}
                />
              </div>
              <div className="product-details">
                <div className="product-title">
                  {product.name}
                  <p>Réf : {product.ref}</p>
                </div>
                <p className="product-description">{product.description}</p>
              </div>
              {JSON.parse(localStorage.getItem("user"))?.discount > 0 && (
                <div className="discount-badge">
                  - {JSON.parse(localStorage.getItem("user")).discount} %
                </div>
              )}
              {JSON.parse(localStorage.getItem("user"))?.discount > 0 ? (
                <div className="product-price">
                  <span className="base-price">{product.price.toFixed(2)} €</span>
                </div>
              ) : (
                <div className="product-price">{product.price.toFixed(2)} €</div>
              )}
              <div className="product-quantity">
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) => handleQuantityChange(product, parseInt(e.target.value))}
                />
              </div>
              <div className="product-removal">
                <a
                  className="remove-product"
                  onClick={() => handleRemoveFromCart(product)}
                >
                  Supprimer
                </a>
              </div>
              <div className="product-line-price">
                {(product.quantity * product.price).toFixed(2)} €
              </div>
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
    </div>
  );
}
