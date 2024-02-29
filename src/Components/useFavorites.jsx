// useFavorites.js

import { useState } from 'react';

const useFavorites = () => {
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);

  const addToFavorites = async (userId, productId, productName, productPrice) => {
    try {
      setIsAddingToFavorites(true);

      const response = await fetch(`http://localhost:3001/users/${userId}/add-favorite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          product_id: productId,
          name: productName,
          price: productPrice,
        }),
      });

      if (response.ok) {
        console.log('Produit ajouté aux favoris avec succès!');
      } else {
        console.error('Erreur lors de l\'ajout du produit aux favoris');
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    } finally {
      setIsAddingToFavorites(false);
    }
  };

  return {
    addToFavorites,
    isAddingToFavorites,
  };
};

export default useFavorites;
