/**
 * Página placeholder del módulo Tickets.
 *
 * Esta pantalla reserva el espacio visual del módulo mientras se implementa
 * el flujo real de entradas, salidas y consulta de tickets.
 */
export function TicketsPage() {
  return (
    <section className="parkio-glass-card rounded-[2rem] p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Módulo</p>

      <h1 className="mt-2 text-3xl font-black text-slate-950">Tickets</h1>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
        Esta sección permitirá registrar entradas, registrar salidas, consultar tickets y dar
        seguimiento al estado pendiente de pago.
      </p>

      <div className="mt-6 rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-700">
        Pantalla pendiente de conectar con backend.
      </div>
    </section>
  );
}
