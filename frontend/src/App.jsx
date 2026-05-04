function App() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-8 px-6 py-16">
      <header className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Tu proyecto
        </p>
        <h1 className="text-4xl font-semibold text-slate-900 md:text-5xl">
          Espacio limpio para tu interfaz
        </h1>
        <p className="max-w-2xl text-base text-slate-600 md:text-lg">
          Puedes reemplazar este contenido con tus propios componentes y estilos.
        </p>
      </header>

      <section className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8">
        <h2 className="text-xl font-semibold text-slate-800">Siguiente paso</h2>
        <p className="mt-2 text-slate-600">
          Agrega un boton, un formulario o consume tu API desde aqui.
        </p>
        <button
          type="button"
          className="mt-4 inline-flex items-center rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          Boton de ejemplo
        </button>
      </section>
    </main>
  )
}

export default App
