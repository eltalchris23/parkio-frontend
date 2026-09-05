import { axiosClient } from '../../../lib/api/axiosClient';
import type { ApiResponse, PageResponse } from '../../../lib/api/apiResponse';
import type { UsuarioResponse } from '../types/usuarioTypes';

/**
 * Parámetros aceptados para consultar usuarios paginados.
 *
 * Estos valores se envían al backend como query params:
 * /usuarios?page=0&size=10&sort=email,asc
 */
export type GetUsuariosParams = {
  page: number;
  size: number;
  sort: string;
};

/**
 * Consulta usuarios paginados desde el backend.
 *
 * Usa el axiosClient centralizado para:
 * - Tomar la URL base desde .env.
 * - Enviar automáticamente el JWT si existe.
 * - Mantener manejo común de errores.
 *
 * @param params configuración de paginación y ordenamiento
 * @returns página de usuarios devuelta por el backend
 */
export async function getUsuarios(
  params: GetUsuariosParams,
): Promise<PageResponse<UsuarioResponse>> {
  const response = await axiosClient.get<ApiResponse<PageResponse<UsuarioResponse>>>('/usuarios', {
    params,
  });

  return response.data.data;
}
