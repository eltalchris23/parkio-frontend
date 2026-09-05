import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

/**
 * Header principal de las pantallas privadas.
 *
 * Muestra información básica del usuario autenticado y permite cerrar sesión.
 */
export function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  /**
   * Cierra la sesión actual.
   *
   * Primero limpia el estado local de autenticación y después redirige
   * al usuario hacia la pantalla de login.
   */
  function handleLogout(): void {
    logout();

    navigate('/login');
  }

  return (
    <header className="border-b border-white/70 bg-white/70 px-6 py-4 shadow-sm backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">Bienvenido</p>

          <h1 className="text-xl font-bold text-slate-900">
            {user ? `${user.nombre} ${user.apellido ?? ''}` : 'Usuario'}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-slate-900">{user?.email}</p>

            <p className="text-xs font-medium text-slate-500">
              {user?.roles?.join(', ') ?? 'Sin roles'}
            </p>
          </div>

          <button
            className="parkio-primary-button rounded-2xl px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            onClick={handleLogout}
            type="button"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
