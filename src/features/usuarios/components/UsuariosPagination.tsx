import type { PageResponse } from '../../../lib/api/apiResponse';
import type { UsuarioResponse } from '../types/usuarioTypes';

/**
 * Props que recibe UsuariosPagination.
 *
 * usuariosPage contiene la información paginada devuelta por el backend.
 * filteredCount indica cuántos usuarios se muestran después del filtro local.
 * currentPageUsersCount indica cuántos usuarios llegaron originalmente en la página actual.
 * onPreviousPage y onNextPage notifican a UsuariosPage que debe cambiar la página.
 */
type UsuariosPaginationProps = {
  usuariosPage: PageResponse<UsuarioResponse>;
  filteredCount: number;
  currentPageUsersCount: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

/**
 * Control visual de paginación para el módulo Usuarios.
 *
 * Este componente no decide la página actual ni consulta backend.
 * Solo muestra datos de paginación y ejecuta callbacks cuando el usuario
 * presiona Anterior o Siguiente.
 */
export function UsuariosPagination({
  usuariosPage,
  filteredCount,
  currentPageUsersCount,
  onPreviousPage,
  onNextPage,
}: UsuariosPaginationProps) {
  return (
    <div className="flex flex-col gap-4 border-t border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-slate-600">
        <p>
          Página <span className="font-semibold text-slate-900">{usuariosPage.page + 1}</span> de{' '}
          <span className="font-semibold text-slate-900">{usuariosPage.totalPages}</span>
        </p>

        <p className="mt-1">
          Mostrando <span className="font-semibold text-slate-900">{filteredCount}</span> de{' '}
          <span className="font-semibold text-slate-900">{currentPageUsersCount}</span> usuarios en
          esta página
        </p>

        <p className="mt-1">
          Total en backend:{' '}
          <span className="font-semibold text-slate-900">{usuariosPage.totalElements}</span>
        </p>
      </div>

      <div className="flex gap-3">
        <button
          className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={usuariosPage.first}
          onClick={onPreviousPage}
          type="button"
        >
          Anterior
        </button>

        <button
          className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={usuariosPage.last}
          onClick={onNextPage}
          type="button"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
