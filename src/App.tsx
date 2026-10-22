import { useState } from 'react';
import type { Equipo, Prestamo } from './types';
import Encabezado from './components/Encabezado';
import Navegacion, { type Vista } from './components/Navegacion';
import FormularioPrestamo from './components/FormularioPrestamo';
import InventarioPage from './pages/InventarioPage';
import PrestamosPage from './pages/PrestamosPage';
import { equiposIniciales } from './data/equipos';
import { prestamosIniciales } from './data/prestamos';
import type { DatosFormulario } from './utils/validaciones';

function App() {
  const [vista, setVista] = useState<Vista>('inventario');
  const [equipos, setEquipos] = useState<Equipo[]>(equiposIniciales);
  const [prestamos, setPrestamos] = useState<Prestamo[]>(prestamosIniciales);
  const [equipoAPrestar, setEquipoAPrestar] = useState<Equipo | null>(null);

  const prestamosActivos = prestamos.filter((p) => !p.devuelto);

  const manejarPrestar = (id: number) => {
    setEquipoAPrestar(equipos.find((e) => e.id === id) ?? null);
  };

  const guardarPrestamo = (datos: DatosFormulario) => {
    if (!equipoAPrestar) return;

    const nuevo: Prestamo = {
      id: Date.now(),
      equipoId: equipoAPrestar.id,
      solicitante: datos.solicitante,
      carne: datos.carne,
      fechaPrestamo: new Date().toISOString(),
      fechaLimite: datos.fechaLimite,
      devuelto: false,
    };

    // Actualización inmutable: arreglos nuevos con spread y map
    setPrestamos((prev) => [...prev, nuevo]);
    setEquipos((prev) =>
      prev.map((e) => (e.id === equipoAPrestar.id ? { ...e, disponible: false } : e)),
    );
    setEquipoAPrestar(null);
  };

  const devolverPrestamo = (prestamo: Prestamo) => {
    setPrestamos((prev) =>
      prev.map((p) => (p.id === prestamo.id ? { ...p, devuelto: true } : p)),
    );
    setEquipos((prev) =>
      prev.map((e) => (e.id === prestamo.equipoId ? { ...e, disponible: true } : e)),
    );
  };

  return (
    <>
      <Encabezado equipos={equipos} prestamos={prestamosActivos} />
      <Navegacion vista={vista} onCambiar={setVista} />

      {vista === 'inventario' ? (
        <InventarioPage equipos={equipos} onPrestar={manejarPrestar} />
      ) : (
        <PrestamosPage
          prestamos={prestamosActivos}
          equipos={equipos}
          onDevolver={devolverPrestamo}
        />
      )}

      {equipoAPrestar && (
        <FormularioPrestamo
          equipo={equipoAPrestar}
          onGuardar={guardarPrestamo}
          onCancelar={() => setEquipoAPrestar(null)}
        />
      )}
    </>
  );
}

export default App;
