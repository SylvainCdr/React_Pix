import { useState, useEffect } from "react";
import { BASE_URL } from "../url";
import { useGetUser } from "./useGetUser";

const useCart = () => {
  // États du panier
  const [cart, setCart] = useState([]); // Contient les produits dans le panier
  const [isCartFetched, setIsCartFetched] = useState(false); // Indique si le panier a été récupéré depuis le serveur
  const [isAddingToCart, setIsAddingToCart] = useState(false); // Indique si un produit est en cours d'ajout au panier

  const user = useGetUser();
  // Récupération de l'ID utilisateur depuis le stockage local
  const userId = user?._id;

  // État du nombre total d'articles dans le panier
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Calcul du montant total du panier
  const totalAmount = cart.reduce(
    (acc, product) => acc + product.quantity * product.price * 1.2 + 9.9,
    0
  );

  // Fonction pour récupérer le panier depuis le serveur
  const fetchCart = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/cart`);
      if (response.ok) {
        const data = await response.json();
        setCart(data);
        setIsCartFetched(true);
      } else {
        console.error("Réponse du serveur:", response.status);
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    }
  };

  // Fonction pour modifier la quantité d'un produit dans le panier
  const editQuantity = async (userId, productId, quantity) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/${userId}/edit-cart/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity }),
        }
      );
      if (response.ok) {
        fetchCart(userId);
      } else {
        console.error(
          "Erreur lors de la modification du panier:",
          response.status
        );
      }
    } catch (error) {
      console.error("Erreur réseau lors de la modification du panier:", error);
    }
  };

  // Fonction pour modifier le prix d'un produit dans le panier
  const editPrice = async (userId, productId, price) => {
    try {
      const response = await fetch(
        `${BASE_URL}users/${userId}/edit-cart/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ price }),
        }
      );
      if (response.ok) {
        fetchCart(userId);
      } else {
        console.error(
          "Erreur lors de la modification du prix du produit:",
          response.status
        );
      }
    } catch (error) {
      console.error(
        "Erreur réseau lors de la modification du prix du produit:",
        error
      );
    }
  };

  // Fonction pour ajouter un produit au panier
  const addToCart = async (
    userId,
    productId,
    productName,
    productRef,
    quantity,
    productPrice,
    productImage
  ) => {
    try {
      setIsAddingToCart(true);
      const discount = JSON.parse(localStorage.getItem("user"))?.discount;
      const discountedPrice = productPrice - (productPrice * discount) / 100;
      const existingProductIndex = cart.findIndex(
        (product) => product.product_id === productId
      );

      let url = `${BASE_URL}/users/${userId}/add-cart/${productId}`;
      let method = "POST";
      let body = {
        product_id: productId,
        name: productName,
        ref: productRef,
        quantity: quantity,
        price: discountedPrice,
        image: productImage,
      };

      if (existingProductIndex !== -1) {
        await removeFromCart(userId, productId);
        const updatedCart = [...cart];
        updatedCart[existingProductIndex].quantity += quantity;
        setCart(updatedCart);
        url = `${BASE_URL}/users/${userId}/add-cart/${productId}`;
        method = "POST";
        body = {
          product_id: productId,
          name: productName,
          ref: productRef,
          quantity: updatedCart[existingProductIndex].quantity,
          price: discountedPrice,
          image: productImage,
        };
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error("Erreur lors de l'ajout du produit au panier");
      } else {
        fetchCart(userId);
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Fonction pour supprimer un produit du panier
  const removeFromCart = async (userId, productId) => {
    try {
      const response = await fetch(
        `${BASE_URL}/users/${userId}/delete-cart/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        setCart((prevCart) =>
          prevCart.filter((product) => product.product_id !== productId)
        );
      } else {
        console.error(
          "Erreur lors de la suppression du produit du panier:",
          response.status
        );
      }
    } catch (error) {
      console.error(
        "Erreur réseau lors de la suppression du produit du panier:",
        error
      );
    }
  };

  // Récupération du panier une seule fois au chargement du composant
  useEffect(() => {
    if (userId && !isCartFetched) {
      fetchCart(userId);
    }
  }, [userId, isCartFetched]);

  // Retourne les fonctions et états du hook
  return {
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
  };
};

export default useCart;
