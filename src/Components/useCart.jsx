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


// route : router.put("/users/:id/edit-cart/:productId", addCart);

// backend function : 
// const editCart = async (req, res) => {
//   const userId = req.params.id;
//   const productId = req.params.productId;
//   const { quantity } = req.body;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Trouver l'index de l'élément dans le panier
//     const cartIndex = user.cart.findIndex((item) => item.product_id.toString() === productId);

//     if (cartIndex === -1) {
//       return res.status(404).json({ message: "Product not found in the cart" });
//     }

//     // Mettre à jour la quantité dans le panier
//     user.cart[cartIndex].quantity = quantity;

//     // Mettre à jour la date de modification du panier
//     user.cart[cartIndex].updated = Date.now();

//     // Mettre à jour le document utilisateur avec la nouvelle version du panier
//     await User.findOneAndUpdate(
//       { _id: userId, "cart.product_id": productId },
//       { $set: { "cart.$.quantity": quantity, "cart.$.updated": Date.now() } },
//       { new: true }
//     );

//     res.json(user.cart);
//   } catch (error) {
//     console.error("Error updating cart:", error);
//     res.status(500).json({ message: "Error updating cart" });
//   }
// };

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



return { cart, isAddingToCart, addToCart, fetchCart, editQuantity, removeFromCart, prices, images };
};


export default useCart;
