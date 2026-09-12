/**
 * Props que recibe UsuariosToolbar.
 *
 * Este componente no maneja estado propio; recibe los valores y funciones
 * desde UsuariosPage para mantener la lógica principal en la página.
 */
type UsuariosToolbarProps = {
  searchText: string;
  pageSize: number;
  onSearchTextChange: (value: string) => void;
  onClearSearch: () => void;
  onPageSizeChange: (value: string) => void;
};

/**
 * Barra de acciones del módulo Usuarios.
 *
 * Muestra:
 * - Input de búsqueda local.
 * - Botón para limpiar búsqueda.
 * - Selector de tamaño de página.
 * - Botón para crear nuevo usuario.
 */
export function UsuariosToolbar({
  searchText,
  pageSize,
  onSearchTextChange,
  onClearSearch,
  onPageSizeChange,
}: UsuariosToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="flex gap-2">
        <input
          className="min-w-0 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 text-sm font-medium text-slate-700 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          onChange={(event) => onSearchTextChange(event.target.value)}
          placeholder="Buscar usuario..."
          type="search"
          value={searchText}
        />

        <button
          className="rounded-2xl border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!searchText}
          onClick={onClearSearch}
          type="button"
        >
          Limpiar
        </button>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
        Mostrar
        <select
          className="rounded-2xl border border-white/70 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          onChange={(event) => onPageSizeChange(event.target.value)}
          value={pageSize}
        >
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>

      <button
        className="parkio-primary-button whitespace-nowrap rounded-2xl px-4 py-2.5 text-sm font-bold text-white transition hover:bg-slate-800"
        type="button"
      >
        Nuevo usuario
      </button>
    </div>
  );
}
