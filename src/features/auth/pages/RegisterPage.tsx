import { Link } from 'react-router-dom';

/**
 * Pantalla temporal de registro.
 *
 * En esta etapa solo sirve para validar navegación.
 * Después se conectará con POST /usuarios.
 */
export function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10 text-slate-900">
      <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Parkio</p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">Crear cuenta</h1>

        <p className="mt-4 text-sm text-slate-600">
          Aquí irá el formulario real de registro para clientes finales.
        </p>

        <Link
          className="mt-6 block text-center text-sm font-medium text-emerald-700 hover:text-emerald-800"
          to="/login"
        >
          Volver a login
        </Link>
      </section>
    </main>
  );
}
