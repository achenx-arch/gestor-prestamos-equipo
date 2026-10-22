import type { Equipo } from '../types';
import ListaEquipos from '../components/ListaEquipos';
import styles from './Pagina.module.css';

interface InventarioPageProps {
  equipos: Equipo[];
  onPrestar: (id: number) => void;
}

function InventarioPage({ equipos, onPrestar }: InventarioPageProps) {
  return (
    <section className={styles.pagina}>
      <h2 className={styles.titulo}>Inventario</h2>
      <ListaEquipos equipos={equipos} onPrestar={onPrestar} />
    </section>
  );
}

export default InventarioPage;
