import { MAX_DIAS_PRESTAMO } from '../config';
import { formatearFecha, hoyISO, sumarDias } from './fechas';

export interface DatosFormulario {
  solicitante: string;
  carne: string;
  fechaLimite: string;
}

export type ErroresFormulario = Partial<Record<keyof DatosFormulario, string>>;

// Formato de carné: 0000-00-00000
export const REGEX_CARNE = /^\d{4}-\d{2}-\d{5}$/;

export function validarPrestamo(datos: DatosFormulario): ErroresFormulario {
  const errores: ErroresFormulario = {};

  const solicitante = datos.solicitante.trim();
  if (solicitante === '') {
    errores.solicitante = 'El solicitante es obligatorio.';
  } else if (solicitante.length < 5) {
    errores.solicitante = 'El solicitante debe tener al menos 5 caracteres.';
  }

  if (!REGEX_CARNE.test(datos.carne.trim())) {
    errores.carne = 'El carné debe tener el formato 0000-00-00000.';
  }

  const hoy = hoyISO();
  const maxima = sumarDias(hoy, MAX_DIAS_PRESTAMO);
  if (datos.fechaLimite === '') {
    errores.fechaLimite = 'La fecha límite es obligatoria.';
  } else if (datos.fechaLimite < hoy) {
    errores.fechaLimite = 'La fecha límite no puede ser anterior a hoy.';
  } else if (datos.fechaLimite > maxima) {
    errores.fechaLimite = `Máximo ${MAX_DIAS_PRESTAMO} días: la fecha límite no puede pasar del ${formatearFecha(maxima)}.`;
  }

  return errores;
}
