/**
 * Página placeholder del módulo Reservas.
 *
 * Esta pantalla reserva el espacio visual del módulo mientras se implementa
 * la consulta y administración de reservas.
 */
export function ReservasPage() {
  return (
    <section className="parkio-glass-card rounded-[2rem] p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Módulo</p>

      <h1 className="mt-2 text-3xl font-black text-slate-950">Reservas</h1>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
        Esta sección permitirá revisar reservas activas, canceladas, expiradas y usadas dentro del
        flujo de estacionamiento.
      </p>

      <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
        Pantalla pendiente de conectar con backend.
      </div>
    </section>
  );
}
