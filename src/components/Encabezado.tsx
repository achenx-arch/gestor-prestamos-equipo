import type { Equipo, Prestamo } from '../types';
import { TITULO_APP } from '../config';
import { estaVencido } from '../utils/fechas';
import styles from './Encabezado.module.css';

interface EncabezadoProps {
  equipos: Equipo[];
  prestamos: Prestamo[];
  cargando?: boolean;
}

function Encabezado({ equipos, prestamos, cargando = false }: EncabezadoProps) {
  // Estado derivado: se calcula de los arreglos en cada render, no se guarda aparte
  const disponibles = equipos.filter((e) => e.disponible).length;

  // Regla adicional de la variante 6: contador de préstamos vencidos
  const vencidos = prestamos.filter((p) => !p.devuelto && estaVencido(p.fechaLimite)).length;

  return (
    <header className={styles.encabezado}>
      <h1 className={styles.titulo}>{TITULO_APP}</h1>
      <div className={styles.contadores}>
        {cargando ? (
          <span className={styles.contador}>Cargando…</span>
        ) : (
          <>
            <span className={styles.contador}>
              {disponibles} de {equipos.length} equipos disponibles
            </span>
            <span className={`${styles.contador} ${vencidos > 0 ? styles.vencidos : ''}`}>
              {vencidos} {vencidos === 1 ? 'préstamo vencido' : 'préstamos vencidos'}
            </span>
          </>
        )}
      </div>
    </header>
  );
}

export default Encabezado;
