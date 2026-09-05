/**
 * Página placeholder del módulo Tarifas.
 *
 * Esta pantalla reserva el espacio visual del módulo mientras se implementa
 * la administración real de tarifas por estacionamiento.
 */
export function TarifasPage() {
  return (
    <section className="parkio-glass-card rounded-[2rem] p-8">
      <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">Módulo</p>

      <h1 className="mt-2 text-3xl font-black text-slate-950">Tarifas</h1>

      <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
        Esta sección permitirá configurar precio por hora, tolerancia, cobro por fracción y tarifa
        mínima de cada estacionamiento.
      </p>

      <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
        Pantalla pendiente de conectar con backend.
      </div>
    </section>
  );
}
