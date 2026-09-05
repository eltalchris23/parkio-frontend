import { useEffect, useState } from 'react';
import type { PageResponse } from '../../../lib/api/apiResponse';
import { getUsuarios } from '../api/usuariosApi';
import type { UsuarioResponse } from '../types/usuarioTypes';

/**
 * Obtiene las clases visuales para representar un rol como badge.
 *
 * Cada rol usa un color distinto para que sea más fácil identificarlo
 * dentro de la tabla de usuarios.
 *
 * @param rol nombre del rol recibido desde el backend
 * @returns clases Tailwind para colorear el badge del rol
 */
function getRoleBadgeClasses(rol: string): string {
  if (rol === 'ADMIN') {
    return 'bg-blue-50 text-blue-700 ring-blue-200';
  }

  if (rol === 'OWNER') {
    return 'bg-emerald-50 text-emerald-700 ring-emerald-200';
  }

  if (rol === 'OPERADOR') {
    return 'bg-amber-50 text-amber-700 ring-amber-200';
  }

  return 'bg-slate-50 text-slate-700 ring-slate-200';
}

/**
 * Página principal del módulo Usuarios.
 *
 * Consulta usuarios reales desde el backend y los muestra
 * en una tabla inicial.
 */
export function UsuariosPage() {
  const [usuariosPage, setUsuariosPage] = useState<PageResponse<UsuarioResponse> | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Carga la primera página de usuarios desde el backend.
   *
   * Por ahora usamos valores fijos:
   * - page: 0
   * - size: 10
   * - sort: email,asc
   *
   * Más adelante estos valores se controlarán desde la paginación de la pantalla.
   */
  async function loadUsuarios(): Promise<void> {
    setLoading(true);
    setErrorMessage(null);

    try {
      const pageResponse = await getUsuarios({
        page: currentPage,
        size: 2,
        sort: 'email,asc',
      });

      setUsuariosPage(pageResponse);
    } catch {
      setErrorMessage('No fue posible consultar los usuarios.');
    } finally {
      setLoading(false);
    }
  }

  /**
   * Retrocede una página en el listado.
   *
   * Usa una actualización funcional para tomar el valor actual de currentPage
   * y restarle 1 de forma segura.
   */
  function handlePreviousPage(): void {
    setCurrentPage((page) => page - 1);
  }

  /**
   * Avanza una página en el listado.
   *
   * Usa una actualización funcional para tomar el valor actual de currentPage
   * y sumarle 1 de forma segura.
   */
  function handleNextPage(): void {
    setCurrentPage((page) => page + 1);
  }

  /**
   * Carga usuarios cuando entra la pantalla
   * y también cada vez que cambie currentPage.
   */
  useEffect(() => {
    void loadUsuarios();
  }, [currentPage]);

  return (
    <section className="parkio-glass-card rounded-[2rem] p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Módulo</p>

          <h1 className="mt-2 text-3xl font-black text-slate-950">Usuarios</h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
            Consulta inicial de usuarios registrados en Parkio. Esta pantalla usa el endpoint
            paginado del backend.
          </p>
        </div>

        <button
          className="parkio-primary-button rounded-2xl px-5 py-3 text-sm font-bold text-white transition hover:bg-slate-800"
          type="button"
        >
          Nuevo usuario
        </button>
      </div>

      {loading && (
        <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
          Cargando usuarios...
        </div>
      )}

      {errorMessage && (
        <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
          {errorMessage}
        </div>
      )}

      {!loading && !errorMessage && (
        <div className="mt-8 overflow-hidden rounded-2xl border border-white/70 bg-white/70 shadow-sm">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-slate-950 text-white">
              <tr>
                <th className="px-4 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold">Nombre</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Roles</th>
                <th className="px-4 py-3 font-semibold">Estado</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {usuariosPage?.content.map((usuario) => (
                <tr className="hover:bg-blue-50/60" key={usuario.id}>
                  <td className="px-4 py-3 font-medium text-slate-700">{usuario.id}</td>

                  <td className="px-4 py-3 text-slate-700">
                    {usuario.nombre} {usuario.apellido ?? ''}
                  </td>

                  <td className="px-4 py-3 text-slate-700">{usuario.email}</td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {usuario.roles.length > 0 ? (
                        usuario.roles.map((rol) => (
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getRoleBadgeClasses(
                              rol,
                            )}`}
                            key={rol}
                          >
                            {rol}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-slate-500">Sin roles</span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={
                        usuario.activo
                          ? 'rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200'
                          : 'rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-200'
                      }
                    >
                      {usuario.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {usuariosPage?.content.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-slate-500">
              No se encontraron usuarios.
            </div>
          )}

          {usuariosPage && (
            <div className="flex flex-col gap-4 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-sm text-slate-600">
                <p>
                  Página{' '}
                  <span className="font-semibold text-slate-900">{usuariosPage.page + 1}</span> de{' '}
                  <span className="font-semibold text-slate-900">{usuariosPage.totalPages}</span>
                </p>

                <p className="mt-1">
                  Total de usuarios:{' '}
                  <span className="font-semibold text-slate-900">{usuariosPage.totalElements}</span>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={usuariosPage.first}
                  onClick={handlePreviousPage}
                  type="button"
                >
                  Anterior
                </button>

                <button
                  className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={usuariosPage.last}
                  onClick={handleNextPage}
                  type="button"
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
