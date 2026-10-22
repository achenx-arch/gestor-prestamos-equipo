import type { Equipo } from '../types';
import TarjetaEquipo from './TarjetaEquipo';
import styles from './ListaEquipos.module.css';

interface ListaEquiposProps {
  equipos: Equipo[];
  onPrestar: (id: number) => void;
}

function ListaEquipos({ equipos, onPrestar }: ListaEquiposProps) {
  if (equipos.length === 0) {
    return <p className={styles.vacio}>No hay equipos que coincidan con la búsqueda.</p>;
  }

  return (
    <div className={styles.grid}>
      {equipos.map((equipo) => (
        // key estable: el id del equipo, nunca el índice del arreglo
        <TarjetaEquipo key={equipo.id} equipo={equipo} onPrestar={onPrestar} />
      ))}
    </div>
  );
}

export default ListaEquipos;
