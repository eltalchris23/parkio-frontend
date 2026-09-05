/**
 * Representa un usuario recibido desde el backend.
 *
 * Este tipo coincide con UsuarioResponse del backend.
 * En frontend funciona como un contrato similar a un DTO.
 */
export type UsuarioResponse = {
  id: number;
  nombre: string;
  apellido: string | null;
  email: string;
  activo: boolean;
  fechaCreacion: string;
  roles: string[];
  estacionamientoIds: number[];
};
