import { createContext, useContext } from "react";

const Context = createContext();

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



