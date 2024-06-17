import React, { useState, useEffect } from "react";
import styles from "./style.module.scss";
import useCart from "@/Components/useCart";
import { BASE_URL } from "@/url";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

export default function EditUserCart() {
  const params = useParams();
  const userId = params?.id;
  const router = useRouter();
  const { cart, addToCart, fetchCart, removeFromCart } = useCart();

  const [user, setUser] = useState({});
  const [availableProducts, setAvailableProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [localCart, setLocalCart] = useState([]);
  const [totalWithTaxAndShipping, setTotalWithTaxAndShipping] = useState(0);
  const [totalHT, setTotalHT] = useState(0);
  const [tva, setTva] = useState(0);

  const TAX_RATE = 0.2; // Example VAT rate of 20%
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

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  useEffect(() => {
    const calculateTotals = () => {
      const subtotal = localCart.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
      );
      const calculatedTva = subtotal * TAX_RATE;
      const totalWithTax = subtotal + calculatedTva;
      const totalWithTaxAndShipping = totalWithTax + SHIPPING_COST;

      setTotalHT(subtotal);
      setTva(calculatedTva);
      setTotalWithTaxAndShipping(totalWithTaxAndShipping);
    };

    calculateTotals();
  }, [localCart]);

  const handleAddProduct = () => {
    if (!selectedProductId) return;

    const selectedProduct = availableProducts.find(
      (product) => product._id === selectedProductId
    );

    const newProduct = {
      ...selectedProduct,
      quantity: 1,
      product_id: selectedProductId,
      isNew: true, // Ajout de cette propriété pour marquer le produit comme nouveau
    };

    setLocalCart([...localCart, newProduct]);
  };

  const handleQuantityChange = (productId, newValue) => {
    if (newValue >= 1) {
      const updatedCart = localCart.map((product) =>
        product.product_id === productId
          ? { ...product, quantity: newValue }
          : product
      );
      setLocalCart(updatedCart);
    }
  };

  const handlePriceChange = (productId, newValue) => {
    if (newValue >= 0) {
      const updatedCart = localCart.map((product) =>
        product.product_id === productId ? { ...product, price: newValue } : product
      );
      setLocalCart(updatedCart);
    }
  };

  const saveChangesToServer = async () => {
    try {
      for (const product of localCart) {
        if (product.isNew) {
          // Ajouter le nouveau produit au panier sur le serveur
          const response = await fetch(`${BASE_URL}/users/${userId}/add-cart/${product.product_id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              product_id: product.product_id,
              name: product.name,
              ref: product.ref,
              quantity: product.quantity,
              price: product.price,
              image: product.image,
            }),
          });
          if (!response.ok) {
            throw new Error("Failed to add product to cart");
          }
        } else {
          // Mettre à jour la quantité et le prix des produits existants
          const response = await fetch(`${BASE_URL}/users/${userId}/edit-cart/${product.product_id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              quantity: product.quantity,
              price: product.price,
            }),
          });
          if (!response.ok) {
            throw new Error("Failed to update cart");
          }
        }
      }
    } catch (error) {
      console.error("Error saving changes:", error);
      setError("Erreur lors de l'enregistrement des modifications");
    }
  };

  const handleSaveChanges = async () => {
    await saveChangesToServer();
    router.push("/admin/paniers");
  };

  const handleRemoveProduct = (productId) => {
    const updatedCart = localCart.filter(
      (product) => product.product_id !== productId
    );
    setLocalCart(updatedCart);
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className={styles["editUserCart-container"]}>
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
          {localCart.map((product, index) => (
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
                    handleQuantityChange(product.product_id, parseInt(e.target.value))
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  step="0.01"
                  value={product.price}
                  onChange={(e) =>
                    handlePriceChange(product.product_id, parseFloat(e.target.value))
                  }
                />
              </td>
              <td>{(product.quantity * product.price).toFixed(2)} €</td>
              <td>
                <button
                  onClick={() => handleRemoveProduct(product.product_id)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles["cart-summary"]}>
        <p>Total (HT) : {totalHT.toFixed(2)} €</p>
        <p>TVA (20%) : {tva.toFixed(2)} €</p>
        <p>Frais de port : {SHIPPING_COST.toFixed(2)} €</p>
        <p>Total (TTC) : {totalWithTaxAndShipping.toFixed(2)} €</p>
      </div>
      <div className={styles["add-select"]}>
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
      <button onClick={handleSaveChanges} className={styles["update-cart-btn"]}>
        Enregistrer les modifications
      </button>
    </div>
  );
}
