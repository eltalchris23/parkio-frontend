import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';

/**
 * Props que recibe PublicOnlyRoute.
 *
 * children representa la pantalla pública que solo debe mostrarse
 * cuando el usuario todavía no tiene una sesión activa.
 */
type PublicOnlyRouteProps = {
  children: ReactNode;
};

/**
 * Protege rutas públicas para evitar que usuarios autenticados
 * vuelvan a pantallas como login o registro.
 *
 * Flujo:
 * 1. Si AuthProvider todavía está validando la sesión, muestra un estado de carga.
 * 2. Si ya existe usuario autenticado, redirige al home.
 * 3. Si no existe usuario autenticado, permite mostrar la pantalla pública.
 */
export function PublicOnlyRoute({ children }: PublicOnlyRouteProps) {
  const { loading, isAuthenticated } = useAuth();

  /**
   * Mientras se valida si existe una sesión activa, mostramos una pantalla simple.
   *
   * Esto evita que se muestre el login por un instante cuando realmente
   * el usuario ya tiene una sesión guardada en el navegador.
   */
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <p className="text-sm font-medium text-white">Validando sesión...</p>
      </main>
    );
  }

  /**
   * Si el usuario ya está autenticado, no debería volver a ver login o registro.
   *
   * replace evita que el usuario pueda regresar con el botón "atrás"
   * a una pantalla pública que ya no necesita.
   */
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }

  /**
   * Si no hay sesión activa, se permite mostrar la pantalla pública.
   */
  return children;
}
