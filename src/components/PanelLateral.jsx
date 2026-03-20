
// Archivo: src/components/VistaLateral.jsx

import { APP_INFO } from "../config";

function VistaLateral({ contactos }) {
  return (
    <div className="space-y-4">

      {/* Banner morado con estadísticas */}
      <div className="rounded-2xl p-5" style={{
        background: "linear-gradient(135deg, rgba(109,40,217,0.8), rgba(168,85,247,0.6))",
        border: "1px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(12px)",
      }}>
        <p className="text-xs font-bold text-purple-200 uppercase tracking-widest mb-1">
          Agenda ADSO · Dashboard
        </p>
        <h2 className="text-xl font-extrabold text-white mb-3">
          {APP_INFO.titulo}
        </h2>
        <p className="text-sm text-purple-100 mb-4">
          CRUD completo desarrollado con React y JSON Server. Proyecto ABP 2025.
        </p>

        {/* Total de contactos */}
        <div className="rounded-xl px-4 py-3 text-center mb-3"
          style={{ background: "rgba(255,255,255,0.15)" }}>
          <p className="text-4xl font-extrabold text-white">{contactos.length}</p>
          <p className="text-xs text-purple-200 mt-1">Contactos registrados</p>
        </div>

        {/* Último contacto */}
        <div className="rounded-xl px-4 py-3 mb-3"
          style={{ background: "rgba(255,255,255,0.15)" }}>
          <p className="text-xs font-bold text-purple-200 uppercase tracking-widest mb-1">
            Último contacto
          </p>
          {contactos.length > 0 ? (
            <p className="text-sm font-semibold text-white">
              {contactos[contactos.length - 1].nombre}
            </p>
          ) : (
            <p className="text-xs text-purple-300">Sin contactos aún</p>
          )}
        </div>

        {/* Por etiqueta */}
        <div className="rounded-xl px-4 py-3 mb-3"
          style={{ background: "rgba(255,255,255,0.15)" }}>
          <p className="text-xs font-bold text-purple-200 uppercase tracking-widest mb-2">
            Por etiqueta
          </p>
          {Object.entries(
            contactos.reduce((acc, c) => {
              const etiqueta = c.etiqueta || "Sin etiqueta";
              acc[etiqueta] = (acc[etiqueta] || 0) + 1;
              return acc;
            }, {})
          ).map(([etiqueta, cantidad]) => (
            <div key={etiqueta} className="flex justify-between items-center mb-1">
              <p className="text-xs text-purple-100">{etiqueta}</p>
              <p className="text-xs font-bold text-white">{cantidad}</p>
            </div>
          ))}
          {contactos.length === 0 && (
            <p className="text-xs text-purple-300">Sin contactos aún</p>
          )}
        </div>

        {/* Favoritos */}
        <div className="rounded-xl px-4 py-3"
          style={{ background: "rgba(255,255,255,0.15)" }}>
          <p className="text-xs font-bold text-purple-200 uppercase tracking-widest mb-1">
            ⭐ Favoritos
          </p>
          <p className="text-4xl font-extrabold text-white text-center">
            {contactos.filter(c => c.etiqueta === "favorito").length}
          </p>
          <p className="text-xs text-purple-200 text-center mt-1">contactos favoritos</p>
        </div>

        <p className="text-xs text-purple-200 mt-4 text-center">
          🎓 Usa este proyecto como evidencia en tu portafolio profesional.
        </p>
      </div>

      {/* Tips de código limpio */}
      <div className="rounded-2xl p-5" style={{
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(12px)",
      }}>
        <p className="text-xs font-bold text-purple-200 uppercase tracking-widest mb-3">
          Tips · Código limpio
        </p>
        {[
          { titulo: "Nombres descriptivos", desc: "Nombra componentes según su responsabilidad." },
          { titulo: "Evita duplicación", desc: "Extrae funciones reutilizables entre componentes." },
          { titulo: "Comenta con intención", desc: "Explica el 'por qué', no el 'qué'." },
          { titulo: "Archivos coherentes", desc: "Un componente debe hacer una sola cosa bien." },
        ].map((tip) => (
          <div key={tip.titulo} className="mb-3">
            <p className="text-sm font-semibold text-white">{tip.titulo}</p>
            <p className="text-xs text-purple-200">{tip.desc}</p>
          </div>
        ))}
      </div>

      {/* Tarjeta SENA CTMA */}
      <div className="rounded-2xl p-5" style={{
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)",
        backdropFilter: "blur(12px)",
      }}>
        <p className="text-xs font-bold text-purple-200 uppercase tracking-widest mb-2">
          SENA CTMA · ADSO
        </p>
        <p className="text-xs text-purple-100 leading-relaxed mb-3">
          Desarrollo Web · ReactJS — Ficha <strong className="text-white">3229209</strong>. Proyecto como Tecnólogo en
          Análisis y Desarrollo de Software.
        </p>
        <p className="text-xs text-purple-200 italic">
          "Desarrollar para satisfacer a las próximas generaciones."
        </p>
      </div>

    </div>
  );
}

export default VistaLateral;