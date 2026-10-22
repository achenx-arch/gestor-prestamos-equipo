// Utilidades de fechas. Se trabaja con cadenas "YYYY-MM-DD" (ISO 8601)
// en hora local, para que comparar fechas sea una simple comparación de texto.

const dosDigitos = (n: number) => String(n).padStart(2, '0');

export function aFechaISO(fecha: Date): string {
  return `${fecha.getFullYear()}-${dosDigitos(fecha.getMonth() + 1)}-${dosDigitos(fecha.getDate())}`;
}

export function hoyISO(): string {
  return aFechaISO(new Date());
}

export function sumarDias(fechaISO: string, dias: number): string {
  const [anio, mes, dia] = fechaISO.split('-').map(Number);
  return aFechaISO(new Date(anio, mes - 1, dia + dias));
}

/** Un préstamo está vencido si su fecha límite es anterior a hoy */
export function estaVencido(fechaLimite: string): boolean {
  return fechaLimite.slice(0, 10) < hoyISO();
}

export function formatearFecha(fechaISO: string): string {
  const [anio, mes, dia] = fechaISO.slice(0, 10).split('-');
  return `${dia}/${mes}/${anio}`;
}
