import { Link } from 'react-router-dom';

/**
 * Pantalla temporal de login.
 *
 * En esta etapa solo valida que React Router funciona correctamente.
 * Después se reemplazará por el formulario real de autenticación.
 */
export function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10 text-slate-900">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Parkio</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">Iniciar sesión</h1>

        <p className="mt-4 text-sm text-slate-600">
          Aquí irá el formulario real para autenticar usuarios contra el backend.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            className="rounded-lg bg-emerald-600 px-4 py-2 text-center font-semibold text-white hover:bg-emerald-700"
            to="/home"
          >
            Ir a home temporal
          </Link>

          <Link
            className="text-center text-sm font-medium text-emerald-700 hover:text-emerald-800"
            to="/register"
          >
            Crear cuenta
          </Link>
        </div>
      </section>
    </main>
  );
}
