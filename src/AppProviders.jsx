/* eslint-disable react/prop-types */
import { ProveedorSistema } from "./providers/ProveedorSistema";
import { ProveedorUsuarios } from "./providers/ProveedorUsuarios";

export default function AppProviders({ children }) {
  return (
    <ProveedorSistema>
      <ProveedorUsuarios>{children}</ProveedorUsuarios>
    </ProveedorSistema>
  );
}
