import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'

const initialValues = {
  nombre: '',
  email: '',
  telefono: '',
}

const initialTouched = {
  nombre: false,
  email: false,
  telefono: false,
}

const validate = (values) => {
  const errors = {}

  if (!values.nombre.trim()) {
    errors.nombre = 'Nombre requerido'
  } else if (values.nombre.trim().length < 2) {
    errors.nombre = 'Minimo 2 caracteres'
  }

  if (!values.email.trim()) {
    errors.email = 'Email requerido'
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Email invalido'
  }

  if (!values.telefono.trim()) {
    errors.telefono = 'Telefono requerido'
  } else if (!/^\+?\d{8,15}$/.test(values.telefono)) {
    errors.telefono = 'Telefono invalido'
  }

  return errors
}

function FormPage() {
  const [values, setValues] = useState(initialValues)
  const [touched, setTouched] = useState(initialTouched)
  const [status, setStatus] = useState('')

  const errors = validate(values)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleBlur = (event) => {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextTouched = {
      nombre: true,
      email: true,
      telefono: true,
    }

    setTouched(nextTouched)

    if (Object.keys(errors).length > 0) {
      setStatus('error')
      return
    }

    setStatus('ok')
  }

  const handleReset = () => {
    setValues(initialValues)
    setTouched(initialTouched)
    setStatus('')
  }

  const inputClass = (field) => {
    const hasError = touched[field] && errors[field]
    return `w-full rounded-lg border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 ${
      hasError
        ? 'border-rose-400 focus:ring-rose-200'
        : 'border-slate-300 focus:ring-slate-200'
    }`
  }

  return (
    <main className="mx-auto w-full max-w-lg px-6 py-12">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Formulario de practica
          </p>
          <h1 className="text-2xl font-semibold">Validaciones basicas</h1>
        </header>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="nombre">
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              value={values.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('nombre')}
              placeholder="Ej: Ana"
            />
            {touched.nombre && errors.nombre ? (
              <p className="text-xs text-rose-600">{errors.nombre}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('email')}
              placeholder="ana@email.com"
            />
            {touched.email && errors.email ? (
              <p className="text-xs text-rose-600">{errors.email}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="telefono">
              Telefono
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              value={values.telefono}
              onChange={handleChange}
              onBlur={handleBlur}
              className={inputClass('telefono')}
              placeholder="Ej: +56912345678"
            />
            {touched.telefono && errors.telefono ? (
              <p className="text-xs text-rose-600">{errors.telefono}</p>
            ) : null}
          </div>

          {status === 'ok' ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              Formulario valido. Puedes enviar datos al backend desde aqui.
            </div>
          ) : null}
          {status === 'error' ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-700">
              Revisa los campos marcados antes de continuar.
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Validar formulario
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-4 text-sm font-semibold text-slate-700">
          <Link className="transition hover:text-slate-900" to="/">
            Home
          </Link>
          <Link className="transition hover:text-slate-900" to="/form">
            Form
          </Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </div>
  )
}

export default App
