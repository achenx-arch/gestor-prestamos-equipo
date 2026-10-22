import type { Equipo } from '../types';

// Datos de prueba de la variante 6 (Monitor, Teclado, Mouse)
export const equiposIniciales: Equipo[] = [
  { id: 1, nombre: 'Monitor Dell P2422H 24"', categoria: 'Monitor', disponible: true },
  { id: 2, nombre: 'Monitor LG UltraGear 27"', categoria: 'Monitor', disponible: false },
  { id: 3, nombre: 'Monitor Samsung 22" F22T35', categoria: 'Monitor', disponible: true },
  { id: 4, nombre: 'Monitor AOC 24B2XH', categoria: 'Monitor', disponible: true },
  { id: 5, nombre: 'Teclado Logitech K120', categoria: 'Teclado', disponible: true },
  { id: 6, nombre: 'Teclado mecánico Redragon Kumara', categoria: 'Teclado', disponible: false },
  { id: 7, nombre: 'Teclado HP KB-0316', categoria: 'Teclado', disponible: true },
  { id: 8, nombre: 'Mouse Logitech M90', categoria: 'Mouse', disponible: true },
  { id: 9, nombre: 'Mouse inalámbrico Microsoft 1850', categoria: 'Mouse', disponible: true },
  { id: 10, nombre: 'Mouse Razer DeathAdder Essential', categoria: 'Mouse', disponible: true },
];
