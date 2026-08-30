import { AppRouter } from './app/router/AppRouter';

/**
 * Componente raíz de Parkio Frontend.
 *
 * Delega la navegación principal a AppRouter para mantener separada
 * la definición de rutas del punto raíz de la aplicación.
 */
function App() {
  return <AppRouter />;
}

export default App;
