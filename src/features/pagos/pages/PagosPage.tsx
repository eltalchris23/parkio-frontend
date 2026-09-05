/**
 * Página placeholder del módulo Pagos.
 *
 * Esta pantalla reserva el espacio visual del módulo mientras se implementa
 * el listado y registro real de pagos.
 */
export function PagosPage() {
  return (
    <section className="parkio-glass-card rounded-[2rem] p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Módulo</p>

      <h1 className="mt-2 text-3xl font-black text-slate-950">Pagos</h1>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
        Esta sección permitirá listar pagos, revisar métodos de pago y registrar liquidaciones de
        tickets pendientes.
      </p>

      <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
        Pantalla pendiente de conectar con backend.
      </div>
    </section>
  );
}
