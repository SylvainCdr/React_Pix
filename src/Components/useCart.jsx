import { useState, useEffect } from 'react';

//Hook pour gérer le panier
const useCart = () => {
  const [cart, setCart] = useState([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [prices, setPrices] = useState([]);
  const [images, setImages] = useState([]);

  // Ajout d'un produit au panier
  const addToCart = async (userId, productId, productName, productRef, quantity) => {
    try {
      setIsAddingToCart(true);

      const response = await fetch(`http://localhost:3001/users/${userId}/add-cart/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          name: productName,
          ref: productRef,
          quantity: quantity,
        }),
      });

      if (response.ok) {
        console.log('Produit ajouté au panier avec succès!');
        return true;
      } else {
        console.error("Erreur lors de l'ajout du produit au panier");
        return false;
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      return false;
    } finally {
      setIsAddingToCart(false);
    }
  };

  // Récupération du panier actuel de l'utilisateur
  const fetchCart = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/cart`);
      if (response.ok) {
        const data = await response.json();
        setCart(data);
      } else {
        console.error('Réponse du serveur:', response.status);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    }
  };

  // Récupération des prix actuels des produits
  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((res) => res.json())
      .then((data) => {
        setPrices(data.map((product) => product.price));
        setImages(data.map((product) => product.image));
      })
      .catch((error) => {
        console.error('Error fetching product prices:', error);
      });
  }, []);

  return { cart, isAddingToCart, addToCart, fetchCart, prices, images };
};

export default useCart;
