import { toast } from "sonner";

import {
  ESTILOS_SUCCESS,
  // ESTILOS_INFO,
  ESTILOS_WARNING,
  ESTILOS_ERROR,
} from "./SonnerEstilos";

export const ManejarRespuestasDelServidor = ({ status, data: message }) => {
  switch (status) {
    // ESTA ES PARA EXITOSO (SUCCESS)
    case 200:
      return toast.success(message, {
        style: ESTILOS_SUCCESS,
      });
    // ESTA ES PARA NO INTERPRETADO (BAD REQUEST)
    case 400:
      return toast.error(message, {
        style: ESTILOS_WARNING,
      });
    // ESTA ES PARA NO AUTORIZADO (UNAUTHORIZED)
    case 401:
      return toast.error(message, {
        style: ESTILOS_WARNING,
      });
    // ESTA ES PARA DATOS NO EXISTENTES (NOT FOUND)
    case 404:
      return toast.error(message, {
        style: ESTILOS_WARNING,
      });
    // ESTA ES PARA DATOS EXISTENTES (CONFLICT)
    case 409:
      return toast.error(message, {
        style: ESTILOS_WARNING,
      });
    // ESTA ES PARA ERROR DEL SERVIDOR (INTERNAL SERVER ERROR)
    case 500:
      return toast.error(message, {
        style: ESTILOS_ERROR,
      });
    default:
      return toast.error(
        "Lo sentimos, ha ocurrido un error inesperado, por favor vuelve a intentarlo.",
        {
          style: ESTILOS_ERROR,
        }
      );
  }
};
