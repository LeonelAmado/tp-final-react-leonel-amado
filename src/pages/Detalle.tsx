import { useParams } from "react-router-dom";

function Detalle() {
  const { id } = useParams();
  
  return (
    <div className="detalle-page">
      <h1>Detalle del Pokémon</h1>
      <p>ID: {id}</p>
      <p>Aquí irán los detalles del Pokémon seleccionado.</p>
    </div>
  );
}

export default Detalle;