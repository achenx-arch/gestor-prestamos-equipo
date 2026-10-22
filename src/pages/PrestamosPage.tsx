import { useState } from 'react';
import type { Prestamo } from '../types';
import Encabezado from '../components/Encabezado';
import Navegacion, { type Vista } from '../components/Navegacion';
import TablaPrestamos from '../components/TablaPrestamos';
import { Cargando, MensajeError } from '../components/EstadoCarga';
import { useEquipos } from '../hooks/useEquipos';
import { usePrestamosActivos } from '../hooks/usePrestamosActivos';
import { actualizarDisponibilidad, marcarDevuelto } from '../services/api';
import styles from './Pagina.module.css';

interface PrestamosPageProps {
  onCambiarVista: (vista: Vista) => void;
}

function PrestamosPage({ onCambiarVista }: PrestamosPageProps) {
  const { prestamos, setPrestamos, cargando, error, recargar } = usePrestamosActivos();
  // Los equipos se usan para mostrar el nombre en la tabla y el contador del Encabezado
  const equiposApi = useEquipos();

  const [devolviendoId, setDevolviendoId] = useState<number | null>(null);
  const [errorAccion, setErrorAccion] = useState<string | null>(null);

  const devolver = async (prestamo: Prestamo) => {
    if (devolviendoId !== null) return; // evita dobles peticiones
    setDevolviendoId(prestamo.id);
    setErrorAccion(null);

    try {
      await marcarDevuelto(prestamo.id);
      const equipo = await actualizarDisponibilidad(prestamo.equipoId, true);

      // El préstamo deja de estar activo y el equipo vuelve a estar disponible
      setPrestamos((prev) => prev.filter((p) => p.id !== prestamo.id));
      equiposApi.setEquipos((prev) => prev.map((e) => (e.id === equipo.id ? equipo : e)));
    } catch (err) {
      setErrorAccion(err instanceof Error ? err.message : 'No se pudo registrar la devolución.');
    } finally {
      setDevolviendoId(null);
    }
  };

  const reintentar = () => {
    recargar();
    equiposApi.recargar();
  };

  const estaCargando = cargando || equiposApi.cargando;
  const mensajeError = error ?? equiposApi.error;

  return (
    <>
      <Encabezado equipos={equiposApi.equipos} prestamos={prestamos} cargando={estaCargando} />
      <Navegacion vista="prestamos" onCambiar={onCambiarVista} />

      <section className={styles.pagina}>
        <h2 className={styles.titulo}>Préstamos activos</h2>

        {estaCargando ? (
          <Cargando texto="Cargando préstamos…" />
        ) : mensajeError ? (
          <MensajeError mensaje={mensajeError} onReintentar={reintentar} />
        ) : (
          <>
            {errorAccion && <p className={styles.alerta}>{errorAccion}</p>}
            <TablaPrestamos
              prestamos={prestamos}
              equipos={equiposApi.equipos}
              onDevolver={devolver}
              devolviendoId={devolviendoId}
            />
          </>
        )}
      </section>
    </>
  );
}

export default PrestamosPage;
