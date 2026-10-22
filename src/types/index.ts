export interface Equipo {
  id: number;
  nombre: string;
  categoria: string;
  disponible: boolean;
}

export interface Prestamo {
  id: number;
  equipoId: number;
  solicitante: string;
  carne: string;
  fechaPrestamo: string; // ISO 8601
  fechaLimite: string; // ISO 8601
  devuelto: boolean;
}

/** Datos para crear un préstamo: el id lo asigna la API */
export type NuevoPrestamo = Omit<Prestamo, 'id'>;
