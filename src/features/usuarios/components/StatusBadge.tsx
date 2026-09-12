/**
 * Props que recibe StatusBadge.
 *
 * activo indica si el usuario se encuentra activo o inactivo.
 */
type StatusBadgeProps = {
  activo: boolean;
};

/**
 * Muestra el estado de un usuario como una etiqueta visual.
 *
 * Si el usuario está activo se muestra en verde.
 * Si el usuario está inactivo se muestra en rojo.
 */
export function StatusBadge({ activo }: StatusBadgeProps) {
  return (
    <span
      className={
        activo
          ? 'rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200'
          : 'rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-200'
      }
    >
      {activo ? 'Activo' : 'Inactivo'}
    </span>
  );
}
