/**
 * Props que recibe EmptyState.
 *
 * message permite explicar por qué no hay información para mostrar.
 */
type EmptyStateProps = {
  message: string;
};

/**
 * Estado visual reutilizable para listas vacías.
 *
 * Se puede usar cuando una tabla, listado o búsqueda no tenga resultados.
 */
export function EmptyState({ message }: EmptyStateProps) {
  return <div className="px-4 py-8 text-center text-sm text-slate-500">{message}</div>;
}
