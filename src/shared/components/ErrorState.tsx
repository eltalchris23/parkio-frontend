/**
 * Props que recibe ErrorState.
 *
 * message permite mostrar un mensaje entendible cuando ocurre un error.
 */
type ErrorStateProps = {
  message: string;
};

/**
 * Estado visual reutilizable para mostrar errores.
 *
 * Se puede usar cuando falle una consulta al backend o una acción del usuario.
 */
export function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className="mt-8 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
      {message}
    </div>
  );
}
