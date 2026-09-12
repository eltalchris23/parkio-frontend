import { useCallback, useEffect, useState } from 'react';
import type { PageResponse } from '../../../lib/api/apiResponse';
import { EmptyState } from '../../../shared/components/EmptyState';
import { ErrorState } from '../../../shared/components/ErrorState';
import { LoadingState } from '../../../shared/components/LoadingState';
import { getUsuarios } from '../api/usuariosApi';
import { UsuariosPagination } from '../components/UsuariosPagination';
import { UsuariosTable } from '../components/UsuariosTable';
import { UsuariosToolbar } from '../components/UsuariosToolbar';
import { UsuarioCreateModal } from '../components/UsuarioCreateModal';
import type { UsuarioResponse } from '../types/usuarioTypes';

/**
 * Página principal del módulo Usuarios.
 *
 * Consulta usuarios reales desde el backend y los muestra
 * en una tabla inicial.
 */
export function UsuariosPage() {
  const [usuariosPage, setUsuariosPage] = useState<PageResponse<UsuarioResponse> | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(2);
  const [searchText, setSearchText] = useState('');
  const [createModalOpened, setCreateModalOpened] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  /**
   * Texto de búsqueda normalizado.
   *
   * Se convierte a minúsculas y se eliminan espacios al inicio/final
   * para que la búsqueda sea más flexible.
   */
  const normalizedSearchText = searchText.trim().toLowerCase();

  /**
   * Lista de usuarios filtrada localmente.
   *
   * Importante:
   * Este filtro solo busca dentro de los usuarios cargados en la página actual.
   * Más adelante se puede reemplazar por una búsqueda real en backend.
   * El operador ? es un optional chaining
   * Permite acceder a content solo si usuariosPage existe.
   */
  const filteredUsuarios =
    usuariosPage?.content.filter((usuario) => {
      const fullName = `${usuario.nombre} ${usuario.apellido ?? ''}`.toLowerCase();
      const email = usuario.email.toLowerCase();
      const roles = usuario.roles.join(' ').toLowerCase();

      return (
        fullName.includes(normalizedSearchText) ||
        email.includes(normalizedSearchText) ||
        roles.includes(normalizedSearchText)
      );
    }) ?? [];

  /**
   * Total de usuarios cargados en la página actual antes de aplicar búsqueda local.
   */
  const currentPageUsersCount = usuariosPage?.content.length ?? 0;

  /**
   * Carga usuarios desde el backend.
   *
   * useCallback memoriza la función para que React pueda usarla como dependencia
   * estable dentro del useEffect.
   */
  const loadUsuarios = useCallback(async (): Promise<void> => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const pageResponse = await getUsuarios({
        page: currentPage,
        size: pageSize,
        sort: 'email,asc',
      });

      setUsuariosPage(pageResponse);
    } catch {
      setErrorMessage('No fue posible consultar los usuarios.');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize]);

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
   * Cambia la cantidad de usuarios mostrados por página.
   *
   * Cuando cambia el tamaño de página, regresamos a la primera página
   * porque la página actual podría dejar de existir con el nuevo tamaño.
   *
   * @param value cantidad de registros seleccionada desde el select
   */
  function handlePageSizeChange(value: string): void {
    setPageSize(Number(value));
    setCurrentPage(0);
  }

  /**
   * Limpia el texto de búsqueda local.
   *
   * Al dejar searchText vacío, la tabla vuelve a mostrar todos los usuarios
   * cargados en la página actual.
   */
  function handleClearSearch(): void {
    setSearchText('');
  }

  /**
   * Abre el modal de creación de usuarios.
   */
  function handleOpenCreateModal(): void {
    setCreateModalOpened(true);
  }

  /**
   * Cierra el modal de creación de usuarios.
   */
  function handleCloseCreateModal(): void {
    setCreateModalOpened(false);
  }

  /**
   * Recarga el listado cuando se crea un usuario correctamente.
   *
   * Si estamos en una página diferente a la primera, regresamos a la primera
   * para que el usuario recién creado pueda aparecer según el ordenamiento actual.
   */
  function handleUsuarioCreated(): void {
    setCurrentPage(0);
    void loadUsuarios();
  }

  /**
   * Carga usuarios cuando entra la pantalla
   * y también cada vez que cambie currentPage o pageSize
   */
  useEffect(() => {
    void loadUsuarios();
  }, [loadUsuarios]);

  return (
    <>
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

          <UsuariosToolbar
            onClearSearch={handleClearSearch}
            onCreateUsuario={handleOpenCreateModal}
            onPageSizeChange={handlePageSizeChange}
            onSearchTextChange={setSearchText}
            pageSize={pageSize}
            searchText={searchText}
          />
        </div>

        {loading && <LoadingState message="Cargando usuarios..." />}

        {errorMessage && <ErrorState message={errorMessage} />}

        {!loading && !errorMessage && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/70 bg-white/70 shadow-sm">
            <UsuariosTable usuarios={filteredUsuarios} />

            {filteredUsuarios.length === 0 && (
              <EmptyState message="No se encontraron usuarios con los filtros actuales." />
            )}

            {usuariosPage && (
              <UsuariosPagination
                currentPageUsersCount={currentPageUsersCount}
                filteredCount={filteredUsuarios.length}
                onNextPage={handleNextPage}
                onPreviousPage={handlePreviousPage}
                usuariosPage={usuariosPage}
              />
            )}
          </div>
        )}
      </section>

      <UsuarioCreateModal
        onClose={handleCloseCreateModal}
        onUsuarioCreated={handleUsuarioCreated}
        opened={createModalOpened}
      />
    </>
  );
}
