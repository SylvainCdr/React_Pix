import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./style.scss";
import useCart from "../../../Components/useCart";

export default function EditUserCart() {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const {
    cart,
    totalAmount,
    isAddingToCart,
    addToCart,
    fetchCart,
    editQuantity,
    editPrice,
    removeFromCart,
    cartItemsCount,
    setCartItemsCount,
  } = useCart(); // Utilisation du hook useCart

  const [availableProducts, setAvailableProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCart(userId); // Utilisation de fetchCart du hook useCart

        const productsResponse = await fetch("http://localhost:3001/products");
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
    <div className="editUserCart-container">
      <h1>Modification du panier de {userId}</h1>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Produit</th>
            <th>Quantité</th>
            <th>Prix</th>
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
      <div className="add-select">
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
      <button onClick={() => navigate("/admin/paniers")} className="update-cart-btn">
        Enregistrer les modifications
      </button>
    </div>
  );
}
