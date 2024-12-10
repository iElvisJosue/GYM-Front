/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { toast } from "sonner";
import Cookies from "js-cookie";
import {
  SolicitudVerificarTokenUsuario,
  SolicitudIniciarSesionUsuario,
  SolicitudCerrarSesionUsuario,
} from "../api/authUsuarios";
import { UsuariosContext } from "../context/UsuariosContext";
import { ESTILOS_ERROR } from "../helpers/SonnerEstilos";

export const ProveedorUsuarios = ({ children }) => {
  const [cargandoInfUsuario, establecerCargandoInfUsuario] = useState(true);
  const [tieneCookie, establecerTieneCookie] = useState(false);
  const [infUsuario, establecerInfUsuario] = useState(null);

  const QuitarValoresDeUsuario = () => {
    establecerInfUsuario(null);
    establecerCargandoInfUsuario(false);
    establecerTieneCookie(false);
  };

  const EstablecerValoresDeUsuario = (res) => {
    establecerInfUsuario(res);
    establecerCargandoInfUsuario(false);
    establecerTieneCookie(true);
    return res;
  };

  useEffect(() => {
    async function ValidarCookie() {
      const cookies = Cookies.get();
      if (!cookies.TOKEN_DE_ACCESO_GYM) {
        console.log("NO HAY COOKIE :(");
        QuitarValoresDeUsuario();
        return;
      }
      try {
        const res = await SolicitudVerificarTokenUsuario({
          TOKEN_DE_ACCESO_GYM: cookies.TOKEN_DE_ACCESO_GYM,
        });
        if (res.data) {
          EstablecerValoresDeUsuario(res.data);
        }
      } catch (err) {
        QuitarValoresDeUsuario();
        return toast.error(err.response.data, {
          style: ESTILOS_ERROR,
        });
      }
    }
    ValidarCookie();
  }, []);

  const IniciarSesionUsuario = async (data) => {
    try {
      const res = await SolicitudIniciarSesionUsuario(data);
      if (!res.data) {
        return QuitarValoresDeUsuario();
      }
      Cookies.set("TOKEN_DE_ACCESO_GYM", res.data.TOKEN_DE_ACCESO_GYM, {
        expires: 1,
      });
      return EstablecerValoresDeUsuario(res.data);
    } catch (error) {
      QuitarValoresDeUsuario();
      return error;
    }
  };

  const CerrarSesionUsuario = async () => {
    try {
      const res = await SolicitudCerrarSesionUsuario();
      if (res.data) {
        return QuitarValoresDeUsuario();
      }
    } catch (error) {
      console.log(error);
      return QuitarValoresDeUsuario();
    }
  };

  return (
    <UsuariosContext.Provider
      value={{
        tieneCookie,
        infUsuario,
        cargandoInfUsuario,
        IniciarSesionUsuario,
        CerrarSesionUsuario,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
};
