import styles from './EstadoCarga.module.css';

export function Cargando({ texto = 'Cargando datos…' }: { texto?: string }) {
  return (
    <div className={styles.cargando} role="status">
      <span className={styles.spinner} aria-hidden="true" />
      {texto}
    </div>
  );
}

interface MensajeErrorProps {
  mensaje: string;
  onReintentar?: () => void;
}

export function MensajeError({ mensaje, onReintentar }: MensajeErrorProps) {
  return (
    <div className={styles.error} role="alert">
      <div>
        <strong>No se pudieron cargar los datos.</strong>
        <p>{mensaje}</p>
      </div>
      {onReintentar && (
        <button type="button" className={styles.reintentar} onClick={onReintentar}>
          Reintentar
        </button>
      )}
    </div>
  );
}
