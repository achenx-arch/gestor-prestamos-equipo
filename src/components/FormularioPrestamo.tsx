import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { Equipo } from '../types';
import { MAX_DIAS_PRESTAMO } from '../config';
import { hoyISO, sumarDias } from '../utils/fechas';
import {
  validarPrestamo,
  type DatosFormulario,
  type ErroresFormulario,
} from '../utils/validaciones';
import styles from './FormularioPrestamo.module.css';

interface FormularioPrestamoProps {
  equipo: Equipo;
  onGuardar: (datos: DatosFormulario) => void | Promise<void>;
  onCancelar: () => void;
  /** true mientras la petición a la API está en curso */
  enviando?: boolean;
  /** mensaje si la API falló al guardar */
  errorEnvio?: string | null;
}

const datosVacios: DatosFormulario = { solicitante: '', carne: '', fechaLimite: '' };

function FormularioPrestamo({
  equipo,
  onGuardar,
  onCancelar,
  enviando = false,
  errorEnvio = null,
}: FormularioPrestamoProps) {
  const [datos, setDatos] = useState<DatosFormulario>(datosVacios);
  const [errores, setErrores] = useState<ErroresFormulario>({});

  const manejarCambio = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  const manejarEnvio = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (enviando) return; // evita dobles registros
    const nuevosErrores = validarPrestamo(datos);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    onGuardar({ ...datos, solicitante: datos.solicitante.trim(), carne: datos.carne.trim() });
  };

  const hoy = hoyISO();

  return (
    <div className={styles.fondo} onClick={enviando ? undefined : onCancelar}>
      <form
        className={styles.modal}
        onSubmit={manejarEnvio}
        onClick={(e) => e.stopPropagation()}
        noValidate
      >
        <h2 className={styles.titulo}>Registrar préstamo</h2>
        <p className={styles.equipo}>
          {equipo.nombre} <span>· {equipo.categoria}</span>
        </p>

        <label className={styles.campo}>
          <span>Solicitante</span>
          <input
            name="solicitante"
            value={datos.solicitante}
            onChange={manejarCambio}
            placeholder="Nombre completo"
            aria-invalid={Boolean(errores.solicitante)}
          />
          {errores.solicitante && <small className={styles.error}>{errores.solicitante}</small>}
        </label>

        <label className={styles.campo}>
          <span>Carné</span>
          <input
            name="carne"
            value={datos.carne}
            onChange={manejarCambio}
            placeholder="0000-00-00000"
            aria-invalid={Boolean(errores.carne)}
          />
          {errores.carne && <small className={styles.error}>{errores.carne}</small>}
        </label>

        <label className={styles.campo}>
          <span>Fecha límite (máximo {MAX_DIAS_PRESTAMO} días)</span>
          <input
            type="date"
            name="fechaLimite"
            value={datos.fechaLimite}
            onChange={manejarCambio}
            min={hoy}
            max={sumarDias(hoy, MAX_DIAS_PRESTAMO)}
            aria-invalid={Boolean(errores.fechaLimite)}
          />
          {errores.fechaLimite && <small className={styles.error}>{errores.fechaLimite}</small>}
        </label>

        {errorEnvio && <p className={styles.errorEnvio}>{errorEnvio}</p>}

        <div className={styles.acciones}>
          <button
            type="button"
            className={styles.secundario}
            onClick={onCancelar}
            disabled={enviando}
          >
            Cancelar
          </button>
          <button type="submit" className={styles.primario} disabled={enviando}>
            {enviando ? 'Guardando…' : 'Guardar préstamo'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioPrestamo;
