import type { Equipo } from '../types';
import styles from './TarjetaEquipo.module.css';

interface TarjetaEquipoProps {
  equipo: Equipo;
  onPrestar: (id: number) => void;
}

function TarjetaEquipo({ equipo, onPrestar }: TarjetaEquipoProps) {
  return (
    <article className={styles.tarjeta}>
      <div className={styles.cabecera}>
        <span className={styles.categoria}>{equipo.categoria}</span>
        <span
          className={`${styles.estado} ${equipo.disponible ? styles.disponible : styles.prestado}`}
        >
          {equipo.disponible ? 'Disponible' : 'Prestado'}
        </span>
      </div>
      <h3 className={styles.nombre}>{equipo.nombre}</h3>
      <button
        type="button"
        className={styles.boton}
        disabled={!equipo.disponible}
        onClick={() => onPrestar(equipo.id)}
      >
        Prestar
      </button>
    </article>
  );
}

export default TarjetaEquipo;
