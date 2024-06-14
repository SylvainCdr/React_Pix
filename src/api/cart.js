import { BASE_URL } from "../url";

export const editQuantity = async (userId, productId, quantity) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/${userId}/edit-cart/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      },
    );
    if (response.ok) {
      fetchCart(userId);
    } else {
      console.error(
        "Erreur lors de la modification du panier:",
        response.status,
      );
    }
  } catch (error) {
    console.error("Erreur réseau lors de la modification du panier:", error);
  }
};

export const editPrice = async (userId, productId, price) => {
  try {
    const response = await fetch(
      `${BASE_URL}/users/${userId}/edit-cart/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ price }),
      },
    );
    if (response.ok) {
      fetchCart(userId);
    } else {
      console.error(
        "Erreur lors de la modification du prix du produit:",
        response.status,
      );
    }
  } catch (error) {
    console.error(
      "Erreur réseau lors de la modification du prix du produit:",
      error,
    );
  }
};
