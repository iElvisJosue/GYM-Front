import { Navigate, Outlet } from "react-router-dom";
import { useUsuarios } from "../context/UsuariosContext";
import Cargando from "../components/global/Cargando";

export default function ProteccionPorCookies() {
  const { cargandoInfUsuario, tieneCookie } = useUsuarios();

  if (cargandoInfUsuario) return <Cargando />;
  if (!cargandoInfUsuario && !tieneCookie) return <Navigate to="/" replace />;

  return <Outlet />;
}
