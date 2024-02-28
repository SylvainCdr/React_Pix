import { createContext, useContext } from "react";

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



