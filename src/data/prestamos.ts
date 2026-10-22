import type { Prestamo } from '../types';

// Préstamos de prueba: el primero ya está vencido para probar el resaltado
export const prestamosIniciales: Prestamo[] = [
  {
    id: 1,
    equipoId: 2,
    solicitante: 'María Fernanda Caal',
    carne: '0902-22-11234',
    fechaPrestamo: '2026-10-15T14:00:00.000Z',
    fechaLimite: '2026-10-20',
    devuelto: false,
  },
  {
    id: 2,
    equipoId: 6,
    solicitante: 'José Luis Pop',
    carne: '0902-23-15678',
    fechaPrestamo: '2026-10-21T15:30:00.000Z',
    fechaLimite: '2026-10-24',
    devuelto: false,
  },
];
