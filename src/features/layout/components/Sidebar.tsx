import { NavLink } from 'react-router-dom';

/**
 * Opciones principales del menú privado.
 *
 * Por ahora se definen de forma fija. Más adelante se pueden filtrar
 * de acuerdo con los roles del usuario autenticado.
 */
const menuItems = [
  {
    label: 'Dashboard',
    path: '/home',
  },
  {
    label: 'Usuarios',
    path: '/usuarios',
  },
  {
    label: 'Estacionamientos',
    path: '/estacionamientos',
  },
  {
    label: 'Cajones',
    path: '/cajones',
  },
  {
    label: 'Reservas',
    path: '/reservas',
  },
  {
    label: 'Tickets',
    path: '/tickets',
  },
  {
    label: 'Tarifas',
    path: '/tarifas',
  },
  {
    label: 'Pagos',
    path: '/pagos',
  },
];

/**
 * Sidebar principal para navegación privada.
 *
 * Muestra el nombre de la aplicación y las opciones principales
 * que tendrá el usuario dentro del sistema.
 */
export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-white/10 bg-slate-950 px-4 py-6 text-white shadow-2xl shadow-slate-950/30 lg:block">
      <div className="mb-8 px-2">
        <p className="text-2xl font-bold tracking-tight">
          <span className="text-blue-500">P</span>arkio
        </p>

        <p className="mt-1 text-sm text-slate-400">Sistema de estacionamientos</p>
      </div>

      <nav className="space-y-1">
        {menuItems.map((item) => (
          <NavLink
            className={({ isActive }) =>
              [
                'block rounded-2xl px-4 py-3 text-sm font-medium transition',
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-950/30'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white',
              ].join(' ')
            }
            key={item.path}
            to={item.path}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
