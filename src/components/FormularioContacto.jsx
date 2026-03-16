
// Archivo: src/components/FormularioContacto.jsx
// Formulario reutilizable para crear y editar contactos.
//
// Modos:
//  • Crear  → contactoEnEdicion === null  → usa onAgregar(form)
//  • Editar → contactoEnEdicion !== null  → usa onActualizar({ ...form, id })
//
// Props:
//  onAgregar        (fn) – callback para crear un contacto nuevo
//  onActualizar     (fn) – callback para actualizar un contacto existente
//  contactoEnEdicion (obj|null) – contacto que se está editando, o null
//  onCancelarEdicion (fn) – callback para salir del modo edición
 
import { useEffect, useState } from "react";
 
function FormularioContacto({
  onAgregar,
  onActualizar,
  contactoEnEdicion,
  onCancelarEdicion,
}) {
  // ── Estado del formulario ─────────────────────────────────────────────────
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    correo: "",
    etiqueta: "",
  });
 
  // ── Errores de validación por campo ──────────────────────────────────────
  const [errores, setErrores] = useState({ nombre: "", telefono: "", correo: "" });
 
  // ── Indica si el formulario está esperando respuesta del servidor ─────────
  const [enviando, setEnviando] = useState(false);
 
  // ── Sincroniza el formulario cuando cambia el contacto en edición ─────────
  // Si contactoEnEdicion tiene datos → rellenar. Si es null → limpiar.
  useEffect(() => {
    if (contactoEnEdicion) {
      setForm({
        nombre:   contactoEnEdicion.nombre   || "",
        telefono: contactoEnEdicion.telefono || "",
        correo:   contactoEnEdicion.correo   || "",
        etiqueta: contactoEnEdicion.etiqueta || "",
      });
    } else {
      setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
    }
    // Limpiamos los errores al cambiar de modo
    setErrores({ nombre: "", telefono: "", correo: "" });
  }, [contactoEnEdicion]);
 
  // ── Manejador de cambio de inputs ─────────────────────────────────────────
  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
 
  // ── Validación ────────────────────────────────────────────────────────────
  function validarFormulario() {
    const nuevosErrores = { nombre: "", telefono: "", correo: "" };
 
    if (!form.nombre.trim())
      nuevosErrores.nombre = "El nombre es obligatorio.";
 
    if (!form.telefono.trim())
      nuevosErrores.telefono = "El teléfono es obligatorio.";
 
    if (!form.correo.trim())
      nuevosErrores.correo = "El correo es obligatorio.";
    else if (!form.correo.includes("@"))
      nuevosErrores.correo = "El correo debe contener @.";
 
    setErrores(nuevosErrores);
    return !nuevosErrores.nombre && !nuevosErrores.telefono && !nuevosErrores.correo;
  }
 
  // ── Envío del formulario ──────────────────────────────────────────────────
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;
 
    try {
      setEnviando(true);
 
      if (contactoEnEdicion) {
        // MODO EDICIÓN: enviamos el objeto con el id original
        await onActualizar({ ...form, id: contactoEnEdicion.id });
        if (onCancelarEdicion) onCancelarEdicion();
      } else {
        // MODO CREAR: enviamos solo los campos del formulario
        await onAgregar(form);
      }
 
      // Limpiamos el formulario después de guardar
      setForm({ nombre: "", telefono: "", correo: "", etiqueta: "" });
      setErrores({ nombre: "", telefono: "", correo: "" });
    } finally {
      setEnviando(false);
    }
  };
 
  // ── Textos dinámicos según el modo ────────────────────────────────────────
  const estaEnEdicion = Boolean(contactoEnEdicion);
  const tituloFormulario = estaEnEdicion ? "Editar contacto" : "Nuevo contacto";
  const textoBoton = estaEnEdicion ? "Guardar cambios" : "Agregar contacto";
 
  // ── Render ────────────────────────────────────────────────────────────────
  return (
    
     <form
  className="rounded-2xl p-6 space-y-4 mb-8"
  style={{
    background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(219,234,254,0.85) 50%, rgba(199,210,254,0.85) 100%)",
    boxShadow: "0 0 0 1px rgba(59,130,246,0.4), 0 0 30px rgba(59,130,246,0.2), 0 0 60px rgba(99,102,241,0.1), 0 8px 32px rgba(0,0,0,0.08)",
    backdropFilter: "blur(16px)",
  }}
  onSubmit={onSubmit}
>
    
      <h2 className="text-lg font-semibold text-gray-900 mb-2">
        {tituloFormulario}
      </h2>
 
      {/* Campo: Nombre */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Nombre *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="nombre"
          placeholder="Ej: Camila Pérez"
          value={form.nombre}
          onChange={onChange}
        />
        {errores.nombre && (
          <p className="mt-1 text-xs text-red-600">{errores.nombre}</p>
        )}
      </div>
 
      {/* Campo: Teléfono */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Teléfono *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="telefono"
          placeholder="Ej: 300 123 4567"
          value={form.telefono}
          onChange={onChange}
        />
        {errores.telefono && (
          <p className="mt-1 text-xs text-red-600">{errores.telefono}</p>
        )}
      </div>
 
      {/* Campo: Correo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Correo *
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="correo"
          placeholder="Ej: camila@sena.edu.co"
          value={form.correo}
          onChange={onChange}
        />
        {errores.correo && (
          <p className="mt-1 text-xs text-red-600">{errores.correo}</p>
        )}
      </div>
 
      {/* Campo: Etiqueta (opcional) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Etiqueta (opcional)
        </label>
        <input
          className="w-full rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500"
          name="etiqueta"
          placeholder="Ej: Trabajo, Compañero, Familia..."
          value={form.etiqueta}
          onChange={onChange}
        />
      </div>
 
      {/* Botones */}
      <div className="pt-2 flex flex-col md:flex-row md:items-center gap-3">
        {/* Botón principal: crear o guardar */}
        <button
          type="submit"
          disabled={enviando}
          className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-semibold shadow-sm"
        >
          {enviando ? "Guardando..." : textoBoton}
        </button>
 
        {/* Botón cancelar edición (solo visible en modo editar) */}
        {estaEnEdicion && (
          <button
            type="button"
            onClick={onCancelarEdicion}
            className="w-full md:w-auto bg-gray-100 text-gray-700 px-6 py-3 rounded-xl border border-gray-300 hover:bg-gray-200 text-sm"
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}
 
export default FormularioContacto;