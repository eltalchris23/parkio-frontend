import type { UsuarioResponse } from '../types/usuarioTypes';
import { RoleBadge } from './RoleBadge';
import { StatusBadge } from './StatusBadge';

/**
 * Props que recibe UsuariosTable.
 *
 * usuarios representa la lista ya filtrada que debe mostrarse en la tabla.
 */
type UsuariosTableProps = {
  usuarios: UsuarioResponse[];
};

/**
 * Tabla visual de usuarios.
 *
 * Este componente se encarga únicamente de pintar los usuarios recibidos.
 * No consulta backend ni maneja paginación; esas responsabilidades viven
 * en UsuariosPage.
 */
export function UsuariosTable({ usuarios }: UsuariosTableProps) {
  return (
    <table className="w-full border-collapse text-left text-sm">
      <thead className="bg-slate-950 text-white">
        <tr>
          <th className="px-4 py-3 font-semibold">ID</th>
          <th className="px-4 py-3 font-semibold">Nombre</th>
          <th className="px-4 py-3 font-semibold">Email</th>
          <th className="px-4 py-3 font-semibold">Roles</th>
          <th className="px-4 py-3 font-semibold">Estado</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-slate-200">
        {usuarios.map((usuario) => (
          <tr className="hover:bg-blue-50/60" key={usuario.id}>
            <td className="px-4 py-3 font-medium text-slate-700">{usuario.id}</td>

            <td className="px-4 py-3 text-slate-700">
              {usuario.nombre} {usuario.apellido ?? ''}
            </td>

            <td className="px-4 py-3 text-slate-700">{usuario.email}</td>

            <td className="px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {usuario.roles.length > 0 ? (
                  usuario.roles.map((rol) => <RoleBadge key={rol} rol={rol} />)
                ) : (
                  <span className="text-sm text-slate-500">Sin roles</span>
                )}
              </div>
            </td>

            <td className="px-4 py-3">
              <StatusBadge activo={usuario.activo} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
