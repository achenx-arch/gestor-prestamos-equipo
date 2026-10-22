import type { Equipo, NuevoPrestamo, Prestamo } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Hace la petición y devuelve el JSON tipado.
 * Lanza un Error con un mensaje comprensible si no hay conexión
 * o si la API responde con un código distinto de 2xx.
 */
async function peticion<T>(ruta: string, opciones: RequestInit = {}): Promise<T> {
  if (!API_URL) {
    throw new Error('No se configuró la variable VITE_API_URL en el archivo .env.');
  }

  let respuesta: Response;
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, {
      ...opciones,
      headers: { 'Content-Type': 'application/json', ...opciones.headers },
    });
  } catch (error) {
    // Si la petición fue cancelada se propaga tal cual
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    throw new Error('No se pudo conectar con la API. Verifique que el servidor esté encendido.');
  }

  if (!respuesta.ok) {
    throw new Error(`La API respondió con un error (${respuesta.status} ${respuesta.statusText}).`);
  }

  return (await respuesta.json()) as T;
}

export function obtenerEquipos(signal?: AbortSignal): Promise<Equipo[]> {
  return peticion<Equipo[]>('/equipos', { signal });
}

export function obtenerPrestamosActivos(signal?: AbortSignal): Promise<Prestamo[]> {
  return peticion<Prestamo[]>('/prestamos?devuelto=false', { signal });
}

export function crearPrestamo(prestamo: NuevoPrestamo): Promise<Prestamo> {
  return peticion<Prestamo>('/prestamos', {
    method: 'POST',
    body: JSON.stringify(prestamo),
  });
}

export function actualizarDisponibilidad(id: number, disponible: boolean): Promise<Equipo> {
  return peticion<Equipo>(`/equipos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ disponible }),
  });
}

export function marcarDevuelto(id: number): Promise<Prestamo> {
  return peticion<Prestamo>(`/prestamos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ devuelto: true }),
  });
}
