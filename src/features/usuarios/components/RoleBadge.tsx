/**
 * Props que recibe RoleBadge.
 *
 * rol representa el nombre del rol recibido desde el backend.
 */
type RoleBadgeProps = {
  rol: string;
};

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
 * Muestra un rol como una etiqueta visual.
 *
 * Este componente centraliza el estilo de los roles para que cualquier tabla
 * o pantalla que muestre roles use el mismo diseño.
 */
export function RoleBadge({ rol }: RoleBadgeProps) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${getRoleBadgeClasses(rol)}`}
    >
      {rol}
    </span>
  );
}
