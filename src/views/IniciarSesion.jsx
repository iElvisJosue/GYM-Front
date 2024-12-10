// LIBRERÍAS A USAR
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// CONTEXTOS A USAR
import { useSistema } from "../context/SistemaContext";
import { useUsuarios } from "../context/UsuariosContext";

// COMPONENTES A USAR
import Cargando from "../components/global/Cargando";

// AYUDAS A USAR
import { MENSAJES_DE_VALIDACION } from "../helpers/MensajesValidaciones";
import { ManejarRespuestasDelServidor } from "../helpers/ManejarRespuestasDelServidor";
import { MensajePeticionPendiente } from "../helpers/FuncionesGenerales";
import { ESTILOS_SUCCESS, ESTILOS_INFO } from "../helpers/SonnerEstilos";
import { LISTA_SVGS } from "../helpers/SVGs";
import { HOST_IMAGENES } from "../helpers/Urls";

// ESTILOS A USAR
import "../styles/views/IniciarSesion.css";

export default function IniciarSesion() {
  // ESTADOS AQUI
  const [peticionPediente, establecerPeticionPendiente] = useState(false);
  const { cargandoInfSistema, infSistema } = useSistema();
  const { IniciarSesionUsuario } = useUsuarios();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const cookies = Cookies.get();
    if (cookies.TOKEN_DE_ACCESO_GYM) {
      toast.error("¡Vaya! Parece que ya tienes una sesión activa.", {
        style: ESTILOS_INFO,
        action: {
          label: (
            <LISTA_SVGS
              SVG="CASA"
              Clase="SVG Blanco"
              Tamaño="15"
              Box="0 0 20 20"
            />
          ),

          onClick: () => {
            window.location.href = "/Principal";
          },
        },
      });
    }
  }, []);

  const ManejarRespuestaExitosa = (res) => {
    toast.success(
      `¡Se ha iniciado sesión, bienvenido ${res.NickUsuario.toUpperCase()} 💪!`,
      {
        style: ESTILOS_SUCCESS,
      }
    );
    // if (res.Permisos === "Chofer") {
    //   return setTimeout(() => navigate("/Recolecciones"), 1000);
    // }
    // if (res.Permisos === "Bodega") {
    //   return setTimeout(() => navigate("/Bodega-Entradas"), 1000);
    // }
    return setTimeout(() => navigate("/Principal"), 1000);
  };

  const PeticionIniciarSesion = handleSubmit(async (data) => {
    // SI HAY UNA PETICION PENDIENTE, NO PERMITIMOS EL REGISTRO Y MOSTRAMOS UNA ALERTA
    if (peticionPediente) return MensajePeticionPendiente();
    establecerPeticionPendiente(true);
    try {
      const res = await IniciarSesionUsuario(data);
      if (res.response) {
        const { status, data } = res.response;
        ManejarRespuestasDelServidor({ status, data });
      } else {
        ManejarRespuestaExitosa(res);
      }
    } catch (error) {
      const { status, data } = error.response;
      ManejarRespuestasDelServidor({ status, data });
    } finally {
      establecerPeticionPendiente(false);
    }
  });

  const CampoRequerido = (nombreCampo) => {
    return (
      <ErrorMessage
        errors={errors}
        name={nombreCampo}
        render={({ messages }) =>
          messages &&
          Object.entries(messages).map(([type, message]) => (
            <small key={type} className="CampoRequerido">
              {message}
            </small>
          ))
        }
      />
    );
  };

  if (cargandoInfSistema) return <Cargando />;

  return (
    <main className="IniciarSesion">
      <form
        className="IniciarSesion__Formulario"
        onSubmit={PeticionIniciarSesion}
      >
        <img
          src={`${HOST_IMAGENES}/${infSistema.LogoSistema}`}
          alt={infSistema.NombreSistema}
          className="IniciarSesion__Formulario--Imagen"
        />
        <h2 className="IniciarSesion__Formulario--Titulo">
          ¡Bienvenido/a al sistema de <b>{infSistema.NombreSistema}</b>!
        </h2>
        <div className="IniciarSesion__Formulario--Campos">
          <span className="IniciarSesion__Formulario--Campos--Icono">
            <LISTA_SVGS SVG="PERSONA" Clase="SVG Negro" />
          </span>
          <input
            id="NickUsuario"
            name="NickUsuario"
            type="text"
            placeholder="Usuario"
            className="IniciarSesion__Formulario--Campos--Input"
            {...register("NickUsuario", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
            })}
          />
        </div>
        {CampoRequerido("NickUsuario")}
        <div className="IniciarSesion__Formulario--Campos">
          <span className="IniciarSesion__Formulario--Campos--Icono">
            <LISTA_SVGS SVG="CANDADO" Clase="SVG Negro" />
          </span>
          <input
            id="ContrasenaUsuario"
            name="ContrasenaUsuario"
            type="password"
            placeholder="Contraseña"
            className="IniciarSesion__Formulario--Campos--Input"
            {...register("ContrasenaUsuario", {
              required: MENSAJES_DE_VALIDACION.REQUERIDO,
            })}
          />
        </div>
        {CampoRequerido("ContrasenaUsuario")}
        <button type="submit" className="Boton Completo Negro">
          <LISTA_SVGS SVG="LOGIN" Clase="SVG Blanco" />
          Iniciar Sesión
        </button>
      </form>
    </main>
  );
}
