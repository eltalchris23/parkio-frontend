import { Link } from 'react-router-dom';
import { useAuth } from '../../auth/hooks/useAuth';

/**
 * Datos temporales para mostrar tarjetas de resumen en el dashboard.
 *
 * Más adelante estos valores se obtendrán desde endpoints reales del backend.
 */
const dashboardStats = [
  {
    label: 'Cajones disponibles',
    value: '128',
    description: 'Espacios libres actualmente',
    colorClasses: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  },
  {
    label: 'Reservas activas',
    value: '24',
    description: 'Reservas vigentes',
    colorClasses: 'bg-blue-50 text-blue-700 ring-blue-200',
  },
  {
    label: 'Tickets pendientes',
    value: '7',
    description: 'Tickets por cerrar o cobrar',
    colorClasses: 'bg-amber-50 text-amber-700 ring-amber-200',
  },
  {
    label: 'Alertas',
    value: '3',
    description: 'Eventos que requieren atención',
    colorClasses: 'bg-red-50 text-red-700 ring-red-200',
  },
];

/**
 * Acciones rápidas iniciales del dashboard.
 *
 * Estas opciones funcionan como accesos visuales a los módulos principales.
 * Las rutas finales se conectarán conforme se creen las pantallas internas.
 */
const quickActions = [
  {
    label: 'Ver estacionamientos',
    description: 'Consulta estacionamientos registrados.',
    path: '/estacionamientos',
  },
  {
    label: 'Administrar cajones',
    description: 'Revisa disponibilidad y estado de cajones.',
    path: '/cajones',
  },
  {
    label: 'Revisar reservas',
    description: 'Consulta reservas activas y vencidas.',
    path: '/reservas',
  },
  {
    label: 'Gestionar tickets',
    description: 'Da seguimiento a entradas, salidas y pagos.',
    path: '/tickets',
  },
];

/**
 * Dashboard inicial de Parkio.
 *
 * Muestra una vista general del sistema para usuarios autenticados.
 * En esta primera versión usa datos temporales mientras se conectan
 * los endpoints reales de cada módulo.
 */
export function HomePage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-2xl shadow-slate-400/30">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
            Dashboard Parkio
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight">
            Hola, {user?.nombre ?? 'usuario'}
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-300">
            Aquí tendrás una vista general de estacionamientos, cajones, reservas, tickets y pagos.
            Por ahora esta pantalla muestra datos de ejemplo para definir la estructura visual.
          </p>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <article className="parkio-glass-card rounded-[2rem] p-6" key={stat.label}>
            <div
              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ring-1 ${stat.colorClasses}`}
            >
              {stat.label}
            </div>

            <p className="mt-5 text-3xl font-bold text-slate-900">{stat.value}</p>

            <p className="mt-2 text-sm text-slate-500">{stat.description}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <article className="parkio-glass-card rounded-[2rem] p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Estado operativo</h2>

              <p className="mt-1 text-sm text-slate-500">Resumen visual de la operación actual.</p>
            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
              En línea
            </span>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">Ocupación estimada</span>
                <span className="font-semibold text-slate-900">68%</span>
              </div>

              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 w-[68%] rounded-full bg-blue-600" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">Reservas atendidas</span>
                <span className="font-semibold text-slate-900">82%</span>
              </div>

              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 w-[82%] rounded-full bg-emerald-600" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="font-medium text-slate-700">Tickets pendientes</span>
                <span className="font-semibold text-slate-900">24%</span>
              </div>

              <div className="h-3 rounded-full bg-slate-100">
                <div className="h-3 w-[24%] rounded-full bg-amber-500" />
              </div>
            </div>
          </div>
        </article>

        <article className="parkio-glass-card rounded-[2rem] p-6">
          <h2 className="text-lg font-bold text-slate-900">Acciones rápidas</h2>

          <p className="mt-1 text-sm text-slate-500">
            Accesos iniciales a los módulos principales.
          </p>

          <div className="mt-5 space-y-3">
            {quickActions.map((action) => (
              <Link
                className="block rounded-2xl border border-white/70 bg-white/60 p-4 transition hover:border-blue-200 hover:bg-blue-50"
                key={action.path}
                to={action.path}
              >
                <p className="font-semibold text-slate-900">{action.label}</p>

                <p className="mt-1 text-sm text-slate-500">{action.description}</p>
              </Link>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}
