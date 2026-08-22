function App() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <section className="mx-auto flex max-w-4xl flex-col gap-6 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Parkio Frontend
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight">
            React + Vite + TypeScript + Tailwind listo
          </h1>
        </div>

        <p className="text-lg text-slate-600">
          Esta será la base del frontend para consumir el backend de Parkio.
        </p>

        <div className="rounded-xl bg-slate-100 p-4 text-sm text-slate-700">
          Siguiente paso: configurar variables de entorno, cliente HTTP y módulo de autenticación.
        </div>
      </section>
    </main>
  );
}

export default App;
