import { useState } from 'react';
import type { Equipo } from '../types';
import ListaEquipos from '../components/ListaEquipos';
import FiltrosInventario from '../components/FiltrosInventario';
import styles from './Pagina.module.css';

interface InventarioPageProps {
  equipos: Equipo[];
  onPrestar: (id: number) => void;
}

function InventarioPage({ equipos, onPrestar }: InventarioPageProps) {
  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');

  // Lista filtrada derivada: ambos filtros se combinan
  const texto = busqueda.trim().toLowerCase();
  const filtrados = equipos.filter(
    (e) =>
      (categoria === '' || e.categoria === categoria) &&
      e.nombre.toLowerCase().includes(texto),
  );

  return (
    <section className={styles.pagina}>
      <h2 className={styles.titulo}>Inventario</h2>
      <FiltrosInventario
        busqueda={busqueda}
        categoria={categoria}
        onBusquedaChange={setBusqueda}
        onCategoriaChange={setCategoria}
      />
      <ListaEquipos equipos={filtrados} onPrestar={onPrestar} />
    </section>
  );
}

export default InventarioPage;
