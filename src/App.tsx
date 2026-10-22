import { useState } from 'react';
import type { Equipo, Prestamo } from './types';
import Encabezado from './components/Encabezado';
import FormularioPrestamo from './components/FormularioPrestamo';
import InventarioPage from './pages/InventarioPage';
import { equiposIniciales } from './data/equipos';
import type { DatosFormulario } from './utils/validaciones';

function App() {
  const [equipos, setEquipos] = useState<Equipo[]>(equiposIniciales);
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [equipoAPrestar, setEquipoAPrestar] = useState<Equipo | null>(null);

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

  return (
    <>
      <Encabezado equipos={equipos} />
      <InventarioPage equipos={equipos} onPrestar={manejarPrestar} />
      <p style={{ textAlign: 'center' }}>Préstamos registrados: {prestamos.length}</p>

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
