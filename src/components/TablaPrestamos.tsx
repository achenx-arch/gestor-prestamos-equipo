import type { Equipo, Prestamo } from '../types';
import { estaVencido, formatearFecha } from '../utils/fechas';
import styles from './TablaPrestamos.module.css';

interface TablaPrestamosProps {
  prestamos: Prestamo[];
  equipos: Equipo[];
  onDevolver: (prestamo: Prestamo) => void;
  devolviendoId?: number | null;
}

function TablaPrestamos({ prestamos, equipos, onDevolver, devolviendoId = null }: TablaPrestamosProps) {
  if (prestamos.length === 0) {
    return <p className={styles.vacio}>No hay préstamos activos.</p>;
  }

  const nombreEquipo = (id: number) =>
    equipos.find((e) => e.id === id)?.nombre ?? `Equipo #${id}`;

  return (
    <div className={styles.contenedor}>
      <table className={styles.tabla}>
        <thead>
          <tr>
            <th>Equipo</th>
            <th>Solicitante</th>
            <th>Fecha límite</th>
            <th aria-label="Acciones" />
          </tr>
        </thead>
        <tbody>
          {prestamos.map((p) => {
            const vencido = estaVencido(p.fechaLimite);
            return (
              <tr key={p.id} className={vencido ? styles.vencida : undefined}>
                <td>{nombreEquipo(p.equipoId)}</td>
                <td>
                  {p.solicitante}
                  <small className={styles.carne}>{p.carne}</small>
                </td>
                <td>
                  {formatearFecha(p.fechaLimite)}
                  {vencido && <span className={styles.etiqueta}>Vencido</span>}
                </td>
                <td className={styles.celdaAccion}>
                  <button
                    type="button"
                    className={styles.boton}
                    onClick={() => onDevolver(p)}
                    disabled={devolviendoId === p.id}
                  >
                    {devolviendoId === p.id ? 'Devolviendo…' : 'Devolver'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TablaPrestamos;
