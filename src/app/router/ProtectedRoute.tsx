import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';

/**
 * Props que recibe ProtectedRoute.
 *
 * children representa la pantalla protegida que queremos mostrar
 * únicamente cuando el usuario tenga una sesión válida.
 */
type ProtectedRouteProps = {
  children: ReactNode;
};

/**
 * Protege rutas que requieren autenticación.
 *
 * Flujo:
 * 1. Si AuthProvider todavía está validando la sesión, muestra un estado de carga.
 * 2. Si no existe usuario autenticado, redirige al login.
 * 3. Si existe usuario autenticado, permite mostrar la pantalla solicitada.
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loading, isAuthenticated } = useAuth();

  /**
   * Mientras se valida si existe una sesión activa, mostramos una pantalla simple.
   *
   * Esto evita que el usuario vea por un instante la pantalla protegida
   * antes de que el frontend termine de revisar el token guardado.
   */
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <p className="text-sm font-medium text-white">Validando sesión...</p>
      </main>
    );
  }

  /**
   * Si no hay sesión activa, se redirige al login.
   *
   * replace evita que el usuario pueda regresar con el botón "atrás"
   * a la ruta protegida que intentó abrir sin autenticarse.
   */
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  /**
   * Si la sesión existe, se permite mostrar la pantalla protegida.
   */
  return children;
}
