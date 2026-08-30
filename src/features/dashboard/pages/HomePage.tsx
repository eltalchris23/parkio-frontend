import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

/**
 * Pantalla temporal de inicio.
 *
 * Permite validar que la app navega correctamente y que useAuth
 * puede consumirse porque AuthProvider ya envuelve la aplicación.
 */
export function HomePage() {
  const { isAuthenticated, loading, user } = useAuth();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <section className="mx-auto max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
          Parkio Frontend
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">Home temporal</h1>

        <div className="mt-6 rounded-xl bg-slate-100 p-4 text-sm text-slate-700">
          <p>loading: {String(loading)}</p>
          <p>isAuthenticated: {String(isAuthenticated)}</p>
          <p>usuario: {user ? user.email : 'sin usuario'}</p>
        </div>

        <Link
          className="mt-6 inline-block text-sm font-medium text-emerald-700 hover:text-emerald-800"
          to="/login"
        >
          Volver a login
        </Link>
      </section>
    </main>
  );
}
