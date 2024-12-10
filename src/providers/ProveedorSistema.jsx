/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { SolicitudInformacionDelSistema } from "../api/authSistema";
import { SistemaContext } from "../context/SistemaContext";

export const ProveedorSistema = ({ children }) => {
  const [cargandoInfSistema, establecerCargandoInfSistema] = useState(true);
  const [infSistema, establecerInfSistema] = useState(null);
  const [obtenerInfSistemaNuevamente, establecerObtenerInfSistemaNuevamente] =
    useState(false);

  // COMPROBAR SI TIENE UN COOKIE
  useEffect(() => {
    async function ObtenerInfSistema() {
      try {
        const res = await SolicitudInformacionDelSistema();
        establecerInfSistema(res.data);
        establecerCargandoInfSistema(false);
      } catch (error) {
        console.log(error);
      }
    }
    ObtenerInfSistema();
  }, [obtenerInfSistemaNuevamente]);

  return (
    <SistemaContext.Provider
      value={{
        infSistema,
        cargandoInfSistema,
        obtenerInfSistemaNuevamente,
        establecerObtenerInfSistemaNuevamente,
      }}
    >
      {children}
    </SistemaContext.Provider>
  );
};
