import React, { useEffect, useState } from "react";
import styles from "./style.module.scss"; // Import des styles CSS Modules
import useCart from "../../../Components/useCart";
import { NavLink, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css"; // Import des styles d'AOS
import ShopProductsCarousel from "../../../Components/ShopProductsCarousel/ShopProductsCarousel";
import { BASE_URL } from "../../../url";

export default function Cart() {
  const { fetchCart, editQuantity, removeFromCart, cart } = useCart();
  const navigate = useNavigate();
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [shippingCost] = useState(20);
  const [totalAmount, setTotalAmount] = useState(0);
  const [carouselProducts, setCarouselProducts] = useState([]);
  const [, setError] = useState(null);

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
      // const discount = JSON.parse(userDataString).discount;
      const calculatedSubTotal = cart.reduce((acc, product) => {
        const discountedPrice = product.price; // Appliquer le rabais au prix du produit
        return acc + product.quantity * discountedPrice;
      }, 0);
      setSubTotal(calculatedSubTotal);
      setTax(calculatedSubTotal * 0.2);
      setTotalAmount(
        calculatedSubTotal + calculatedSubTotal * 0.2 + shippingCost,
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
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        const randomProducts = data
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);
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
      <div className={styles["cart-container"]}>
        <h1>Panier</h1>
        <div className={styles["empty-cart-message"]}>
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
    <div className={styles["cart-container"]}>
      <div className={styles["cart-content"]}>
        <h1>Panier</h1>
        <div className={styles["shopping-cart"]}>
          <div className={styles["column-labels"]}>
            <label className={styles["product-image"]}>Image</label>
            <label className={styles["product-details"]}>Produit</label>
            <label className={styles["product-price"]}>Prix HT</label>
            <label className={styles["product-quantity"]}>Quantité</label>
            <label className={styles["product-removal"]}>Supprimer</label>
            <label className={styles["product-line-price"]}>Total HT</label>
          </div>

          {cart.map((product, index) => (
            <div className={styles["product"]} key={index}>
              <div className={styles["product-image"]}>
                <img
                  src={
                    product.image && product.image.startsWith("http")
                      ? product.image
                      : `${BASE_URL}${product.image}`
                  }
                  alt={product.name}
                />
              </div>
              <div className={styles["product-details"]}>
                <div className={styles["product-title"]}>
                  {product.name}
                  <p>Réf : {product.ref}</p>
                </div>
                <p className={styles["product-description"]}>
                  {product.description}
                </p>
              </div>
              {JSON.parse(localStorage.getItem("user"))?.discount > 0 && (
                <div className={styles["discount-badge"]}>
                  - {JSON.parse(localStorage.getItem("user")).discount} %
                </div>
              )}
              {JSON.parse(localStorage.getItem("user"))?.discount > 0 ? (
                <div className={styles["product-price"]}>
                  <span className={styles["base-price"]}>
                    {product.price.toFixed(2)} €
                  </span>
                </div>
              ) : (
                <div className={styles["product-price"]}>
                  {product.price.toFixed(2)} €
                </div>
              )}
              <div className={styles["product-quantity"]}>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    handleQuantityChange(product, parseInt(e.target.value))
                  }
                />
              </div>
              <div className={styles["product-removal"]}>
                <a
                  className={styles["remove-product"]}
                  onClick={() => handleRemoveFromCart(product)}
                >
                  Supprimer
                </a>
              </div>
              <div className={styles["product-line-price"]}>
                {(product.quantity * product.price).toFixed(2)} €
              </div>
            </div>
          ))}

          <div className={styles["totals"]}>
            <div className={styles["totals-item"]}>
              <label>Sous-total</label>
              <div className={styles["totals-value"]} id="cart-subtotal">
                {subTotal.toFixed(2)} €
              </div>
            </div>
            <div className={styles["totals-item"]} id="cart-tax">
              <label>TVA (20%)</label>

              <div className={styles["totals-value"]} id="cart-tax">
                {tax.toFixed(2)} €
              </div>
            </div>
            <div className={styles["totals-item"]} id="cart-shipping">
              <label>Frais de livraison</label>
              <div className={styles["totals-value"]} id="cart-shipping">
                {shippingCost.toFixed(2)} €
              </div>
            </div>
            <div
              className={`${styles["totals-item"]} ${styles["totals-item-total"]}`}
              id="cart-total"
            >
              <label>Total</label>
              <div className={styles["totals-value"]} id="cart-total">
                {totalAmount.toFixed(2)} €
              </div>
            </div>
          </div>

          <button onClick={handleOrder} className={styles["checkout"]}>
            Commander
          </button>
        </div>
      </div>
    </div>
  );
}
