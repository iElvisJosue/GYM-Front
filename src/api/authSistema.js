import axios from "./axios";

// SOLICITUD PARA OBTENER LA INFORMACION DEL SISTEMA
export const SolicitudInformacionDelSistema = (data) =>
  axios.get("/sistema/InformacionDelSistema", data);
