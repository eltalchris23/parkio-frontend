import axios from 'axios';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { ApiError } from '../../../lib/api/apiResponse';
import { useAuth } from '../hooks/useAuth';

/**
 * Pantalla de inicio de sesión.
 *
 * Permite capturar email y contraseña, consumir el endpoint /auth/login
 * y redirigir al usuario autenticado al home de la aplicación.
 */
export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Procesa el envío del formulario de login.
   *
   * Si las credenciales son correctas:
   * - Guarda el token mediante AuthProvider.
   * - Carga el usuario autenticado.
   * - Redirige a /home.
   *
   * Si ocurre un error:
   * - Muestra el mensaje devuelto por el backend cuando exista.
   */
  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    setSubmitting(true);
    setErrorMessage(null);

    try {
      await login({
        email,
        password,
      });

      navigate('/home');
    } catch (error) {
      setErrorMessage(getLoginErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="parkio-app-background flex min-h-screen items-center justify-center px-4">
      <section className="parkio-glass-card-strong w-full max-w-md rounded-[2rem] p-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Parkio</p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">Iniciar sesión</h1>

          <p className="mt-2 text-sm text-slate-500">
            Accede con tu cuenta para administrar o usar Parkio.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="email">
              Correo electrónico
            </label>

            <input
              autoComplete="email"
              className="w-full rounded-2xl border border-white/80 bg-white/80 px-4 py-3 text-slate-900 shadow-inner shadow-slate-200/60 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              id="email"
              name="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="correo@ejemplo.com"
              required
              type="email"
              value={email}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">
              Contraseña
            </label>

            <input
              autoComplete="current-password"
              className="w-full rounded-2xl border border-white/80 bg-white/80 px-4 py-3 text-slate-900 shadow-inner shadow-slate-200/60 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              id="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Tu contraseña"
              required
              type="password"
              value={password}
            />
          </div>

          <button
            className="parkio-primary-button w-full rounded-2xl px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-blue-300"
            disabled={submitting}
            type="submit"
          >
            {submitting ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          ¿No tienes cuenta?{' '}
          <Link className="font-semibold text-blue-600 hover:text-blue-700" to="/register">
            Crear cuenta
          </Link>
        </p>
      </section>
    </main>
  );
}

/**
 * Obtiene un mensaje entendible para el usuario cuando falla el login.
 *
 * Si el backend responde con ApiError, se muestra su campo message.
 * Si no existe una respuesta conocida, se usa un mensaje genérico.
 */
function getLoginErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiError>(error)) {
    return error.response?.data.message ?? 'No fue posible iniciar sesión.';
  }

  return 'Ocurrió un error inesperado al iniciar sesión.';
}
