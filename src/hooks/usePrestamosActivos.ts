import { useCallback, useEffect, useState } from 'react';
import type { Prestamo } from '../types';
import { obtenerPrestamosActivos } from '../services/api';

/** Carga los préstamos activos (devuelto=false) al montar el componente. */
export function usePrestamosActivos() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controlador = new AbortController();

    obtenerPrestamosActivos(controlador.signal)
      .then((datos) => setPrestamos(datos))
      .catch((err: unknown) => {
        if (controlador.signal.aborted) return;
        setError(err instanceof Error ? err.message : 'Error desconocido al cargar los préstamos.');
      })
      .finally(() => {
        if (!controlador.signal.aborted) setCargando(false);
      });

    return () => controlador.abort();
  }, [intento]);

  // Reintentar: se reinicia el estado de carga y se vuelve a ejecutar el efecto
  const recargar = useCallback(() => {
    setCargando(true);
    setError(null);
    setIntento((n) => n + 1);
  }, []);

  return { prestamos, setPrestamos, cargando, error, recargar };
}
