
import React, { useState, useCallback } from "react";

const useFavorites = () => {
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);
  const [isInFavorites, setIsInFavorites] = useState(false);

  const addToFavorites = async (
    userId,
    productId,
    productName,
    productPrice
  ) => {
    try {
      setIsAddingToFavorites(true);

      const response = await fetch(
        `http://localhost:3001/users/${userId}/add-favorite`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product_id: productId,
            name: productName,
            price: productPrice,
          }),
        }
      );

      if (response.ok) {
        console.log("Produit ajouté aux favoris avec succès!");
        setIsInFavorites(true);
        return true;
      } else {
        console.error("Erreur lors de l'ajout du produit aux favoris");
        return false;
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      return false;
    } finally {
      setIsAddingToFavorites(false);
    }
  };

  const checkFavorite = useCallback(async (userId, productId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/check-favorite/${productId}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log("Check Favorite Response Data:", data); // Add this line for debugging
        return data.isInFavorites;
      } else {
        console.error("Error checking favorites:", response.statusText);
        return false;
      }
    } catch (error) {
      console.error("Error network issue during checkFavorite:", error);
      return false;
    }
  }, []);

  const removeFromFavorites = async (userId, productId) => {
    try {
      setIsAddingToFavorites(true);

      const response = await fetch(
        `http://localhost:3001/users/${userId}/remove-favorite/${productId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        console.log("Produit retiré des favoris avec succès!");
        setIsInFavorites(false);
        return true;
      } else {
        console.error("Erreur lors du retrait du produit des favoris");
        return false;
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
      return false;
    } finally {
      setIsAddingToFavorites(false);
    }
  };

  return {
    addToFavorites,
    checkFavorite,
    isInFavorites,
    removeFromFavorites,
  };
};

export default useFavorites;
