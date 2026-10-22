import type { Equipo } from '../types';
import { TITULO_APP } from '../config';
import styles from './Encabezado.module.css';

interface EncabezadoProps {
  equipos: Equipo[];
}

function Encabezado({ equipos }: EncabezadoProps) {
  // Estado derivado: se calcula del arreglo en cada render, no se guarda aparte
  const disponibles = equipos.filter((e) => e.disponible).length;

  return (
    <header className={styles.encabezado}>
      <h1 className={styles.titulo}>{TITULO_APP}</h1>
      <div className={styles.contadores}>
        <span className={styles.contador}>
          {disponibles} de {equipos.length} equipos disponibles
        </span>
      </div>
    </header>
  );
}

export default Encabezado;
