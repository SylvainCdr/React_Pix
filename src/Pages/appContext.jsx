import { createContext, useContext, useState } from "react";

// NB : ON INSTALLE LE PACKAGE "use-local-storage" POUR STOCKER L'UTILISATEUR DANS LE LOCAL STORAGE

// Création du contexte
const Context = createContext();

// Provider pour le contexte
export const Provider = Context.Provider;

// Hook pour récupérer le contexte
export function useAppContext() {
  return useContext(Context);
}

// Hook pour récupérer l'utilisateur connecté   
export function useUser() {
  const { user } = useAppContext();
  return user;
}

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};


