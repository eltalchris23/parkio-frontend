import { axiosClient } from '../../../lib/api/axiosClient';
import type { ApiResponse } from '../../../lib/api/apiResponse';
import type { AuthenticatedUser, AuthLoginRequest, AuthResponse } from '../types/authTypes';

/**
 * Envía las credenciales del usuario al backend para iniciar sesión.
 *
 * Este endpoint es público y devuelve directamente AuthResponse,
 * no viene envuelto en ApiResponse.
 *
 * @param request correo y contraseña capturados en el formulario de login
 * @returns token JWT, tipo de token y tiempo de expiración en segundos
 */
export async function login(request: AuthLoginRequest): Promise<AuthResponse> {
  const response = await axiosClient.post<AuthResponse>('/auth/login', request);

  return response.data;
}

/**
 * Consulta la información vigente del usuario autenticado.
 *
 * Este endpoint requiere JWT válido. El axiosClient agrega automáticamente
 * el header Authorization si existe un token guardado en tokenStorage.
 *
 * @returns usuario autenticado con roles y estacionamientos asignados
 */
export async function getCurrentUser(): Promise<AuthenticatedUser> {
  const response = await axiosClient.get<ApiResponse<AuthenticatedUser>>('/auth/me');

  return response.data.data;
}
