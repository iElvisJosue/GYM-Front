import { createContext, useContext } from "react";

// CREAAMOS EL CONTEXTO
export const SistemaContext = createContext();

export const useSistema = () => {
  const context = useContext(SistemaContext);
  if (!context) {
    throw new Error("useSistema debería ser usado dentro de Proveedor SISTEMA");
  }
  return context;
};
