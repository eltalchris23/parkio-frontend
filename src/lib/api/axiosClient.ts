import axios from 'axios';
import { env } from '../../config/env';
import { getAccessToken, removeAccessToken } from '../auth/tokenStorage';

/**
 * Cliente HTTP centralizado para consumir el backend de Parkio.
 *
 * Todas las llamadas al backend deben salir desde este cliente para mantener:
 * - URL base única.
 * - JWT agregado automáticamente.
 * - Manejo centralizado de errores comunes.
 * - Lectura del X-Transaction-Id.
 */
export const axiosClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Interceptor de request.
 *
 * Se ejecuta antes de enviar cada petición HTTP al backend.
 * Su función principal es agregar el JWT al header Authorization
 * cuando exista un token guardado en el navegador.
 */
axiosClient.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/**
 * Interceptor de response.
 *
 * Se ejecuta cuando el backend responde correctamente o cuando ocurre un error.
 *
 * Por ahora:
 * - Si el backend responde 401, elimina el token local porque puede estar vencido
 *   o ser inválido.
 * - Conserva el error original para que cada pantalla decida qué mensaje mostrar.
 */
axiosClient.interceptors.response.use(
  (response) => {
    const transactionId = response.headers['x-transaction-id'];

    if (transactionId) {
      console.debug('Parkio transactionId:', transactionId);
    }

    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      removeAccessToken();
    }

    return Promise.reject(error);
  },
);
