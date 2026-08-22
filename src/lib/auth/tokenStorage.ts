const TOKEN_STORAGE_KEY = 'parkio_access_token';

/**
 * Guarda el JWT de acceso en el almacenamiento local del navegador.
 *
 * Este token se usará después para enviar el header:
 * Authorization: Bearer <token>
 */
export function saveAccessToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

/**
 * Obtiene el JWT guardado en el navegador.
 *
 * Si el usuario no ha iniciado sesión o si el token fue eliminado,
 * devuelve null.
 */
export function getAccessToken(): string | null {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

/**
 * Elimina el JWT guardado en el navegador.
 *
 * Se debe llamar al cerrar sesión o cuando el backend responda 401
 * por token inválido o expirado.
 */
export function removeAccessToken(): void {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

/**
 * Indica si actualmente existe un JWT guardado.
 *
 * Esto no valida si el token sigue vigente; solamente confirma
 * si hay un token almacenado localmente.
 */
export function hasAccessToken(): boolean {
  return Boolean(getAccessToken());
}
