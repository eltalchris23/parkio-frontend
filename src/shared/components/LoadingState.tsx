/**
 * Props que recibe LoadingState.
 *
 * message permite personalizar el texto mostrado mientras se carga información.
 */
type LoadingStateProps = {
  message: string;
};

/**
 * Estado visual reutilizable para indicar carga de información.
 *
 * Se puede usar en cualquier módulo que necesite mostrar que está esperando
 * respuesta del backend.
 */
export function LoadingState({ message }: LoadingStateProps) {
  return (
    <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
      {message}
    </div>
  );
}
