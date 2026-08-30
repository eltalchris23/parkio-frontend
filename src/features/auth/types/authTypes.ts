// ESTE ARCHIVO ES COMO EL DTO EN JAVA
// AQUI DECLARO MIS OBJETOS

/**
 * Request enviado al backend para iniciar sesión.
 *
 * Coincide con AuthLoginRequest del backend.
 */
export type AuthLoginRequest = {
  email: string;
  password: string;
};

/**
 * Response devuelto por el backend al iniciar sesión correctamente.
 *
 * Importante:
 * POST /auth/login devuelve este objeto directamente,
 * no viene envuelto en ApiResponse.
 */
export type AuthResponse = {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
};

/**
 * Usuario autenticado devuelto por GET /auth/me dentro de ApiResponse.
 *
 * Coincide con UsuarioResponse del backend.
 */
export type AuthenticatedUser = {
  id: number;
  nombre: string;
  apellido: string | null;
  email: string;
  activo: boolean;
  fechaCreacion: string;
  roles: string[];
  estacionamientoIds: number[];
};
