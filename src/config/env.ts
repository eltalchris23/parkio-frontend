/**
 * Centraliza la lectura de variables de entorno usadas por el frontend.
 *
 * En Vite, las variables expuestas al código del navegador deben comenzar con:
 * VITE_
 *
 * Ejemplo local:
 * VITE_API_BASE_URL=http://localhost:8023/api/v1
 */
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

/**
 * Valida que la URL base del backend exista.
 *
 * Esto ayuda a fallar rápido durante desarrollo si falta configurar
 * el archivo .env local.
 */
if (!apiBaseUrl) {
  throw new Error('Falta configurar VITE_API_BASE_URL en el archivo .env del frontend');
}

/**
 * Objeto centralizado de configuración del frontend.
 *
 * Cualquier archivo que necesite conocer la URL del backend debe importar
 * este objeto en lugar de leer import.meta.env directamente.
 */
export const env = {
  apiBaseUrl,
};
