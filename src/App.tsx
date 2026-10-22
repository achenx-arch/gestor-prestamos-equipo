import Encabezado from './components/Encabezado';
import InventarioPage from './pages/InventarioPage';
import { equiposIniciales } from './data/equipos';

function App() {
  const manejarPrestar = (id: number) => {
    console.log('Prestar equipo', id);
  };

  return (
    <>
      <Encabezado equipos={equiposIniciales} />
      <InventarioPage equipos={equiposIniciales} onPrestar={manejarPrestar} />
    </>
  );
}

export default App;
