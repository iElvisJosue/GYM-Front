import "../../styles/components/global/Cargando.css";

// eslint-disable-next-line react/prop-types
export default function Cargando({ Tamaño = "Completo" }) {
  return (
    <section className={`Main__Cargando ${Tamaño}`}>
      <div className="Cargando"></div>
      <h1>Cargando...</h1>
    </section>
  );
}
