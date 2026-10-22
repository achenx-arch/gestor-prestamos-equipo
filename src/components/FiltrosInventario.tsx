import { CATEGORIAS } from '../config';
import styles from './FiltrosInventario.module.css';

interface FiltrosInventarioProps {
  busqueda: string;
  categoria: string;
  onBusquedaChange: (valor: string) => void;
  onCategoriaChange: (valor: string) => void;
}

function FiltrosInventario({
  busqueda,
  categoria,
  onBusquedaChange,
  onCategoriaChange,
}: FiltrosInventarioProps) {
  return (
    <div className={styles.filtros}>
      <input
        type="search"
        className={styles.busqueda}
        placeholder="Buscar por nombre…"
        value={busqueda}
        onChange={(e) => onBusquedaChange(e.target.value)}
        aria-label="Buscar equipo por nombre"
      />
      <select
        className={styles.select}
        value={categoria}
        onChange={(e) => onCategoriaChange(e.target.value)}
        aria-label="Filtrar por categoría"
      >
        <option value="">Todas las categorías</option>
        {CATEGORIAS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FiltrosInventario;
