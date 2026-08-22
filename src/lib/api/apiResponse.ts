/**
 * Representa la respuesta estándar exitosa del backend Parkio.
 *
 * El backend devuelve este formato para operaciones no paginadas
 * y también como contenedor de respuestas paginadas.
 *
 * T es el tipo real de información contenida en data.
 *
 * Ejemplo:
 * ApiResponse<UsuarioResponse>
 * ApiResponse<PageResponse<UsuarioResponse>>
 */
export type ApiResponse<T> = {
  timestamp: string;
  status: number;
  message: string;
  transactionId: string;
  data: T;
};

/**
 * Representa una respuesta paginada del backend Parkio.
 *
 * El backend usa este formato dentro de ApiResponse cuando un endpoint
 * devuelve listas paginadas.
 *
 * Ejemplo:
 * ApiResponse<PageResponse<EstacionamientoResponse>>
 */
export type PageResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
};

/**
 * Representa el formato estándar de error del backend Parkio.
 *
 * Este tipo ayuda al frontend a leer mensajes seguros, códigos HTTP,
 * errores de validación y el transactionId para soporte/logs.
 */
export type ApiError = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  transactionId: string;
  path: string;
  validationErrors: Record<string, string>;
};
