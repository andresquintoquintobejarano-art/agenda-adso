
// Archivo: src/components/ContactoCard.jsx
// Tarjeta que muestra la información de un contacto.
//
// Props:
//  nombre    (string) – nombre del contacto
//  telefono  (string) – teléfono
//  correo    (string) – correo electrónico
//  etiqueta  (string) – etiqueta opcional (Trabajo, Familia, etc.)
//  onEliminar (fn)   – callback para eliminar este contacto
//  onEditar   (fn)   – callback para activar modo edición con este contacto
 
function ContactoCard({ nombre, telefono, correo, etiqueta, onEliminar, onEditar }) {
  return (
    <article className="rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
  style={{
    background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(219,234,254,0.85) 50%, rgba(199,210,254,0.85) 100%)",
    boxShadow: "0 0 0 1px rgba(59,130,246,0.4), 0 0 30px rgba(59,130,246,0.2), 0 0 60px rgba(99,102,241,0.1), 0 8px 32px rgba(0,0,0,0.08)",
    backdropFilter: "blur(16px)",
  }}
>
  

      {/* Información del contacto */}
      <div>
        <h3 className="text-base font-semibold text-gray-900">{nombre}</h3>
        <p className="text-sm text-gray-600">Tel: {telefono}</p>
        <p className="text-sm text-gray-600">Correo: {correo}</p>
 
        {/* Badge de etiqueta (solo si existe) */}
        {etiqueta && (
          <span className="inline-flex mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
            {etiqueta}
          </span>
        )}
      </div>
 
      {/* Botones de acción */}
      <div className="flex gap-2 justify-end">
 
        {/* Botón Editar → activa modo edición en App.jsx */}
        <button
          type="button"
          onClick={onEditar}
          className="text-xs md:text-sm px-3 py-2 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Editar
        </button>
 
        {/* Botón Eliminar → llama a DELETE en App.jsx */}
        <button
          type="button"
          onClick={onEliminar}
          className="text-xs md:text-sm px-3 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
}
 
export default ContactoCard;