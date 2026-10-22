import { useCallback, useEffect, useState } from 'react';
import type { Equipo } from '../types';
import { obtenerEquipos } from '../services/api';

/**
 * Carga el inventario desde la API al montar el componente.
 * Encapsula los datos, el estado de carga y el error, y expone
 * `recargar` para el botón Reintentar.
 */
export function useEquipos() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();

    obtenerEquipos(controlador.signal)
      .then((datos) => setEquipos(datos))
      .catch((err: unknown) => {
        if (controlador.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar los equipos.');
      })
      .finally(() => {
        if (!controlador.signal.aborted) setCargando(false);
      });

    // Limpieza: si el componente se desmonta, se cancela la petición
    return () => controlador.abort();
  }, [intento]); // se vuelve a ejecutar solo al montar y al reintentar

  // Reintentar: se reinicia el estado de carga y se vuelve a ejecutar el efecto
  const recargar = useCallback(() => {
    setCargando(true);
    setError(null);
    setIntento((n) => n + 1);
  }, []);

  return { equipos, setEquipos, cargando, error, recargar };
}
