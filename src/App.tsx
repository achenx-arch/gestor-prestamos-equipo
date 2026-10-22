import { useState } from 'react';
import type { Vista } from './components/Navegacion';
import InventarioPage from './pages/InventarioPage';
import PrestamosPage from './pages/PrestamosPage';

// Cada vista carga sus datos desde la API al montarse (useEffect en los hooks)
function App() {
  const [vista, setVista] = useState<Vista>('inventario');

  return vista === 'inventario' ? (
    <InventarioPage onCambiarVista={setVista} />
  ) : (
    <PrestamosPage onCambiarVista={setVista} />
  );
}

export default App;
