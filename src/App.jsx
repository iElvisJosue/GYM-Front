// IMPORTAMOS LOS COMPONENTES REACT
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

// IMPORTAMOS LOS PROVEEDORES
import AppProviders from "./AppProviders.jsx";

// IMPORTAMOS LAS VISTAS
import IniciarSesion from "./views/IniciarSesion";
import Principal from "./views/Principal";

// PROTECCIÓN DE RUTAS
import ProteccionPorCookies from "./security/ProteccionPorCookies";

export default function App() {
  return (
    <AppProviders>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
        <Routes>
          {/* RUTAS SIN PROTECCIÓN */}
          <Route path="/" element={<IniciarSesion />} />
          {/* TERMINAN RUTAS SIN PROTECCIÓN */}

          {/* RUTAS PROTEGIDAS POR COOKIES */}
          <Route element={<ProteccionPorCookies />}>
            <Route path="/Principal" element={<Principal />} />
          </Route>
          {/* TERMINAN RUTAS PROTEGIDAS POR COOKIES */}
        </Routes>
        {/* TERMINAN LAS RUTAS PROTEGIDAS POR COOKIES */}
      </BrowserRouter>
    </AppProviders>
  );
}
