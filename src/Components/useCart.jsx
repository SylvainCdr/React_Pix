import { useState, useEffect } from 'react';

//Hook pour gérer le panier
const useCart = () => {
  const [cart, setCart] = useState([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);





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


  

const editQuantity = (userId, productId, quantity) => {
  fetch(`http://localhost:3001/users/${userId}/edit-cart/${productId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ quantity }),
  })
    .then((response) => {
      if (response.ok) {
        fetchCart(userId);
      } else {
        console.error('Error updating cart:', response.status);
      }
    })
    .catch((error) => {
      console.error('Network error while updating cart:', error);
    });
};




// Ajout d'un produit au panier
const addToCart = async (userId, productId, productName, productRef, quantity, productPrice, productImage) => {
  try {
    setIsAddingToCart(true);

    // Vérifier si le produit existe déjà dans le panier
    const existingProductIndex = cart.findIndex(product => product.product_id === productId);
    console.log('existingProductIndex:', existingProductIndex);
    console.log('Cart before update:', cart);

    if (existingProductIndex !== -1) {
      console.log('Product already exists. Removing from cart...');
      // Si le produit existe, supprimer l'objet du panier
      await removeFromCart(userId, productId);

      // Ajouter un nouvel objet avec la nouvelle quantité
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;

      // Mettre à jour le panier localement
      setCart(updatedCart);
      console.log('Cart after update:', updatedCart);

      // Ajouter un nouvel objet avec la nouvelle quantité au panier côté serveur
      await fetch(`http://localhost:3001/users/${userId}/add-cart/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          name: productName,
          ref: productRef,
          quantity: updatedCart[existingProductIndex].quantity,
          price: productPrice,
          image: productImage,
        }),
      });
    } else {
      console.log('Product does not exist. Adding to cart...');
      // Si le produit n'existe pas, ajouter un nouvel objet au panier
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
          price: productPrice,
          image: productImage,
        }),
      });

      if (!response.ok) {
        console.error("Erreur lors de l'ajout du produit au panier");
      } else {
        // Mettre à jour le panier localement
        fetchCart(userId);
      }
    }
  } catch (error) {
    console.error('Erreur réseau:', error);
  } finally {
    setIsAddingToCart(false);
  }
};








// Suppression d'un produit du panier
const removeFromCart = (userId, productId) => {
  // Assuming that you have a backend API endpoint to handle cart removal
  // Make a request to your backend to remove the product from the user's cart
  fetch(`http://localhost:3001/users/${userId}/delete-cart/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        // If the removal was successful, update the local cart state
        setCart((prevCart) => prevCart.filter((product) => product.product_id !== productId));
      } else {
        console.error('Error removing product from cart:', response.status);
      }
    })
    .catch((error) => {
      console.error('Network error while removing product from cart:', error);
    });
};



return { cart, isAddingToCart, addToCart, fetchCart, editQuantity, removeFromCart };
};


export default useCart;
