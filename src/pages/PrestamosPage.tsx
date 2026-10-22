import type { Equipo, Prestamo } from '../types';
import TablaPrestamos from '../components/TablaPrestamos';
import styles from './Pagina.module.css';

interface PrestamosPageProps {
  prestamos: Prestamo[];
  equipos: Equipo[];
  onDevolver: (prestamo: Prestamo) => void;
}

function PrestamosPage({ prestamos, equipos, onDevolver }: PrestamosPageProps) {
  return (
    <section className={styles.pagina}>
      <h2 className={styles.titulo}>Préstamos activos</h2>
      <TablaPrestamos prestamos={prestamos} equipos={equipos} onDevolver={onDevolver} />
    </section>
  );
}

export default PrestamosPage;
