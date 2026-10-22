import styles from './Navegacion.module.css';

export type Vista = 'inventario' | 'prestamos';

interface NavegacionProps {
  vista: Vista;
  onCambiar: (vista: Vista) => void;
}

const opciones: { id: Vista; texto: string }[] = [
  { id: 'inventario', texto: 'Inventario' },
  { id: 'prestamos', texto: 'Préstamos activos' },
];

function Navegacion({ vista, onCambiar }: NavegacionProps) {
  return (
    <nav className={styles.nav}>
      {opciones.map((o) => (
        <button
          key={o.id}
          type="button"
          className={`${styles.tab} ${vista === o.id ? styles.activa : ''}`}
          onClick={() => onCambiar(o.id)}
          aria-current={vista === o.id ? 'page' : undefined}
        >
          {o.texto}
        </button>
      ))}
    </nav>
  );
}

export default Navegacion;
