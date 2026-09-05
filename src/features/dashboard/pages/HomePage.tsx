import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

/**
 * Página temporal de inicio.
 *
 * Muestra información básica de la sesión actual para validar
 * que el login, el token y /auth/me están funcionando correctamente.
 */
export function HomePage() {
  const navigate = useNavigate();
  const { user, loading, isAuthenticated, logout } = useAuth();

  /**
   * Cierra la sesión local y redirige al login.
   */
  function handleLogout(): void {
    logout();

    navigate('/login');
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-lg">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Parkio</p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">Home</h1>

        <div className="mt-6 space-y-2 text-slate-700">
          <p>
            <span className="font-semibold">Cargando sesión:</span> {loading ? 'Sí' : 'No'}
          </p>

          <p>
            <span className="font-semibold">Autenticado:</span> {isAuthenticated ? 'Sí' : 'No'}
          </p>

          <p>
            <span className="font-semibold">Usuario:</span> {user?.email ?? 'Sin usuario'}
          </p>
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            className="rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-700 hover:bg-slate-50"
            to="/login"
          >
            Ir a login
          </Link>

          <button
            className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white hover:bg-slate-800"
            onClick={handleLogout}
            type="button"
          >
            Cerrar sesión
          </button>
        </div>
      </section>
    </main>
  );
}
