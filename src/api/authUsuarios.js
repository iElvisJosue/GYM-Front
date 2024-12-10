import axios from "./axios";

// SOLICITUD PARA VERIFICAR EL TOKEN DE ACCESO DE UN USUARIO
export const SolicitudVerificarTokenUsuario = (data) =>
  axios.post("/usuarios/VerificarTokenUsuario", data);
// SOLICITUD PARA INICIAR SESION
export const SolicitudIniciarSesionUsuario = (data) =>
  axios.post("/usuarios/IniciarSesionUsuario", data);
// SOLICITUD PARA OBTENER INFORMACION DE UN USUARIO
export const SolicitudObtenerInformacionDeUnUsuario = ({
  CookieConToken,
  idUsuario,
}) =>
  axios.get(
    `/usuarios/ObtenerInformacionDeUnUsuario/${CookieConToken}/${idUsuario}`
  );
// SOLICITUD PARA REGISTRAR UN USUARIO
export const SolicitudRegistrarUsuario = (data) =>
  axios.post("/usuarios/RegistrarUsuario", data);
// SOLICITUD PARA CERRAR SESION
export const SolicitudCerrarSesionUsuario = () =>
  axios.post("/usuarios/CerrarSesionUsuario");
