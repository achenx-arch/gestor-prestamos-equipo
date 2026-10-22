import { useState } from 'react';
import type { Equipo } from '../types';
import Encabezado from '../components/Encabezado';
import Navegacion, { type Vista } from '../components/Navegacion';
import ListaEquipos from '../components/ListaEquipos';
import FiltrosInventario from '../components/FiltrosInventario';
import FormularioPrestamo from '../components/FormularioPrestamo';
import { Cargando, MensajeError } from '../components/EstadoCarga';
import { useEquipos } from '../hooks/useEquipos';
import { usePrestamosActivos } from '../hooks/usePrestamosActivos';
import { actualizarDisponibilidad, crearPrestamo } from '../services/api';
import type { DatosFormulario } from '../utils/validaciones';
import styles from './Pagina.module.css';

interface InventarioPageProps {
  onCambiarVista: (vista: Vista) => void;
}

function InventarioPage({ onCambiarVista }: InventarioPageProps) {
  const { equipos, setEquipos, cargando, error, recargar } = useEquipos();
  // Los préstamos se cargan para el contador de vencidos del Encabezado
  const prestamosApi = usePrestamosActivos();

  const [busqueda, setBusqueda] = useState('');
  const [categoria, setCategoria] = useState('');
  const [equipoAPrestar, setEquipoAPrestar] = useState<Equipo | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);

  // Lista filtrada derivada: ambos filtros se combinan
  const texto = busqueda.trim().toLowerCase();
  const filtrados = equipos.filter(
    (e) =>
      (categoria === '' || e.categoria === categoria) &&
      e.nombre.toLowerCase().includes(texto),
  );

  const abrirFormulario = (id: number) => {
    setErrorEnvio(null);
    setEquipoAPrestar(equipos.find((e) => e.id === id) ?? null);
  };

  const cerrarFormulario = () => {
    if (!enviando) setEquipoAPrestar(null);
  };

  const guardarPrestamo = async (datos: DatosFormulario) => {
    if (!equipoAPrestar || enviando) return;
    setEnviando(true);
    setErrorEnvio(null);

    try {
      const nuevo = await crearPrestamo({
        equipoId: equipoAPrestar.id,
        solicitante: datos.solicitante,
        carne: datos.carne,
        fechaPrestamo: new Date().toISOString(),
        fechaLimite: datos.fechaLimite,
        devuelto: false,
      });
      const actualizado = await actualizarDisponibilidad(equipoAPrestar.id, false);

      // Se actualiza la interfaz de forma inmutable con lo que devolvió la API
      prestamosApi.setPrestamos((prev) => [...prev, nuevo]);
      setEquipos((prev) => prev.map((e) => (e.id === actualizado.id ? actualizado : e)));
      setEquipoAPrestar(null);
    } catch (err) {
      setErrorEnvio(err instanceof Error ? err.message : 'No se pudo registrar el préstamo.');
    } finally {
      setEnviando(false);
    }
  };

  const reintentar = () => {
    recargar();
    prestamosApi.recargar();
  };

  const estaCargando = cargando || prestamosApi.cargando;
  const mensajeError = error ?? prestamosApi.error;

  return (
    <>
      <Encabezado equipos={equipos} prestamos={prestamosApi.prestamos} cargando={estaCargando} />
      <Navegacion vista="inventario" onCambiar={onCambiarVista} />

      <section className={styles.pagina}>
        <h2 className={styles.titulo}>Inventario</h2>

        {estaCargando ? (
          <Cargando texto="Cargando inventario…" />
        ) : mensajeError ? (
          <MensajeError mensaje={mensajeError} onReintentar={reintentar} />
        ) : (
          <>
            <FiltrosInventario
              busqueda={busqueda}
              categoria={categoria}
              onBusquedaChange={setBusqueda}
              onCategoriaChange={setCategoria}
            />
            <ListaEquipos equipos={filtrados} onPrestar={abrirFormulario} />
          </>
        )}
      </section>

      {equipoAPrestar && (
        <FormularioPrestamo
          equipo={equipoAPrestar}
          onGuardar={guardarPrestamo}
          onCancelar={cerrarFormulario}
          enviando={enviando}
          errorEnvio={errorEnvio}
        />
      )}
    </>
  );
}

export default InventarioPage;
