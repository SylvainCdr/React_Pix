import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import useCart from "../../../Components/useCart";
import { BASE_URL } from "../../../url";

export default function EditUserCart() {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const {
    cart,

    addToCart,
    fetchCart,
    editQuantity,
    editPrice,
    removeFromCart,
  } = useCart(); // Utilisation du hook useCart

  const [user, setUser] = useState({});
  const [availableProducts, setAvailableProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [totalWithTaxAndShipping, setTotalWithTaxAndShipping] = useState(0);
  const [totalHT, setTotalHT] = useState(0);
  const [tva, setTva] = useState(0);

  const TAX_RATE = 0.20; // Example VAT rate of 20%
  const SHIPPING_COST = 20; // Example fixed shipping cost

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCart(userId); // Utilisation de fetchCart du hook useCart

        const userResponse = await fetch(`${BASE_URL}/users/${userId}`);
        const userData = await userResponse.json();
        setUser(userData);

        const productsResponse = await fetch(`${BASE_URL}/products`);
        const productsData = await productsResponse.json();
        setAvailableProducts(productsData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Erreur lors de la récupération des données");
        setLoading(false);
      }
    };

    if (loading) {
      // Ne récupère les produits que si loading est true
      fetchData();
    }
  }, [userId, fetchCart, loading]); // Dépendances du useEffect

 // useEffect pour calculer le total TTC du panier
  useEffect(() => {
    const calculateTotals = () => {
      const subtotal = cart.reduce((sum, product) => sum + product.price * product.quantity, 0);
      const calculatedTva = subtotal * TAX_RATE;
      const totalWithTax = subtotal + calculatedTva;
      const totalWithTaxAndShipping = totalWithTax + SHIPPING_COST;

      setTotalHT(subtotal);
      setTva(calculatedTva);
      setTotalWithTaxAndShipping(totalWithTaxAndShipping);
    };

    calculateTotals();
  }, [cart]);

  const handleAddProduct = () => {
    if (!selectedProductId) return;

    const selectedProduct = availableProducts.find(
      (product) => product._id === selectedProductId
    );

    addToCart(
      userId,
      selectedProductId,
      selectedProduct.name,
      selectedProduct.ref,
      1, // Quantity: you can set it to 1 or change it as needed
      selectedProduct.price,
      selectedProduct.image
    );
  };

  // Fonction pour modifier la quantité d'un produit dans le panier et ou le prix
  const handleQuantityChange = (product, newValue) => {
    if (newValue >= 1) {
      editQuantity(userId, product.product_id, newValue);
    }
  };

  const handlePriceChange = (product, newValue) => {
    if (newValue >= 1) {
      editPrice(userId, product.product_id, newValue);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles['editUserCart-container']}>
      <h1>Modification du panier de {user.name || userId}</h1>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((product, index) => (
            <tr key={product.product_id || index}>
              <td>
                <img src={product.image} alt="" />
              </td>
              <td>{product.name}</td>
              <td>
                <input
                  type="number"
                  value={product.quantity}
                  onChange={(e) =>
                    handleQuantityChange(product, e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  value={product.price}
                  onChange={(e) => handlePriceChange(product, e.target.value)}
                />
              </td>
              <td>{(product.quantity * product.price).toFixed(2)} €</td>
              <td>
                <button
                  onClick={() => removeFromCart(userId, product.product_id)}
                >
                  Supprimer
                </button>{" "}
                {/* Utilisation de removeFromCart fourni par useCart */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles['cart-summary']}>
        <p>Total (HT) : {totalHT.toFixed(2)} €</p>
        <p>TVA (20%) : {tva.toFixed(2)} €</p>
        <p>Frais de port : {SHIPPING_COST.toFixed(2)} €</p>
        <p>Total (TTC) : {totalWithTaxAndShipping.toFixed(2)} €</p>
      </div>
      <div className={styles['add-select']}>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          <option key="" value="">
            Sélectionner un produit
          </option>
          {availableProducts.map((product) => (
            <option key={product._id} value={product._id}>
              {product.name}
            </option>
          ))}
        </select>
        <button onClick={handleAddProduct}>Ajouter au panier</button>
      </div>
      <button onClick={() => navigate("/admin/paniers")} className={styles['update-cart-btn']}>
        Enregistrer les modifications
      </button>
    </div>
  );
  }
  