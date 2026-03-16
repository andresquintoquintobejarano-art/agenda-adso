// Archivo: src/App.jsx
// Agenda ADSO v10 — Dashboard con vistas separadas.
//
// Cambios respecto a v9:
//  - Estado "vista" controla qué pantalla se muestra ("crear" o "contactos")
//  - Layout tipo dashboard: columna principal + panel lateral
//  - Barra superior fija con botón de navegación entre vistas
//  - Formulario de edición solo aparece en vista "contactos" cuando hay contactoEnEdicion
 
import { useEffect, useState } from "react";
import {
  listarContactos,
  crearContacto,
  actualizarContacto,
  eliminarContactoPorId,
} from "./api";
import { APP_INFO } from "./config";
import FormularioContacto from "./components/FormularioContacto";
import ContactoCard from "./components/ContactoCard";
import PanelLateral from "./components/PanelLateral";
 
function App() {
  // ── Estados de datos ───────────────────────────────────────────────────────
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);
 
  // ── Estado de vista: "crear" o "contactos" ────────────────────────────────
  const [vista, setVista] = useState("crear");
 
  // Variables booleanas para facilitar el renderizado condicional
  const estaEnVistaCrear     = vista === "crear";
  const estaEnVistaContactos = vista === "contactos";
 
  // ── Funciones de navegación entre vistas ──────────────────────────────────
  const irAVerContactos = () => {
    setVista("contactos");
    setContactoEnEdicion(null);
  };
 
  const irACrearContacto = () => {
    setVista("crear");
    setContactoEnEdicion(null);
    setBusqueda("");
  };
 
  // ── Carga inicial de contactos (READ) ─────────────────────────────────────
  useEffect(() => {
    const cargarContactos = async () => {
      try {
        setCargando(true);
        setError("");
        const data = await listarContactos();
        setContactos(data);
      } catch (err) {
        console.error("Error al cargar contactos:", err);
        setError("No se pudieron cargar los contactos. Verifica que JSON Server esté encendido.");
      } finally {
        setCargando(false);
      }
    };
    cargarContactos();
  }, []);
 
  // ── CREATE ────────────────────────────────────────────────────────────────
  const onAgregarContacto = async (nuevoContacto) => {
    try {
      setError("");
      const creado = await crearContacto(nuevoContacto);
      setContactos((prev) => [...prev, creado]);
    } catch (err) {
      console.error("Error al crear contacto:", err);
      setError("No se pudo guardar el contacto.");
      throw err;
    }
  };
 
  // ── UPDATE ────────────────────────────────────────────────────────────────
  const onActualizarContacto = async (contactoActualizado) => {
    try {
      setError("");
      const actualizado = await actualizarContacto(
        contactoActualizado.id,
        contactoActualizado
      );
      setContactos((prev) =>
        prev.map((c) => (c.id === actualizado.id ? actualizado : c))
      );
      setContactoEnEdicion(null);
    } catch (err) {
      console.error("Error al actualizar contacto:", err);
      setError("No se pudo actualizar el contacto.");
      throw err;
    }
  };
 
  // ── DELETE ────────────────────────────────────────────────────────────────
  const onEliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
      setContactoEnEdicion((actual) =>
        actual && actual.id === id ? null : actual
      );
    } catch (err) {
      console.error("Error al eliminar contacto:", err);
      setError("No se pudo eliminar el contacto.");
    }
  };
 
  // ── Handlers de edición ───────────────────────────────────────────────────
  const onEditarClick = (contacto) => {
    setContactoEnEdicion(contacto);
    setError("");
  };
 
  const onCancelarEdicion = () => setContactoEnEdicion(null);
 
  // ── Filtrado y ordenamiento ───────────────────────────────────────────────
  const contactosFiltrados = contactos.filter((c) => {
    const t = busqueda.toLowerCase();
    return (
      c.nombre.toLowerCase().includes(t) ||
      c.correo.toLowerCase().includes(t) ||
      (c.etiqueta || "").toLowerCase().includes(t)
    );
  });
 
  const contactosOrdenados = [...contactosFiltrados].sort((a, b) => {
    const nA = a.nombre.toLowerCase();
    const nB = b.nombre.toLowerCase();
    if (nA < nB) return ordenAsc ? -1 : 1;
    if (nA > nB) return ordenAsc ? 1 : -1;
    return 0;
  });
 
  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{
      background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 25%, #a855f7 50%, #6d28d9 75%, #4c1d95 100%)",
      backgroundSize: "400% 400%",
      animation: "chromaShift 6s ease infinite",
    }}>
 
      {/* ── Barra superior fija ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-10 px-6 py-3 flex items-center justify-between"
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        {/* Logo y título */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-white text-lg"
            style={{ background: "rgba(255,255,255,0.25)" }}>
            A
          </div>
          <div>
            <p className="font-bold text-white text-sm leading-tight">{APP_INFO.titulo}</p>
            <p className="text-xs text-purple-200">Ficha {APP_INFO.ficha} · SENA CTMA</p>
          </div>
        </div>
 
        {/* Botón de navegación entre vistas */}
        <button
          onClick={estaEnVistaCrear ? irAVerContactos : irACrearContacto}
          className="text-sm font-semibold px-4 py-2 rounded-xl transition-all"
          style={{
            background: "rgba(255,255,255,0.2)",
            color: "white",
            border: "1px solid rgba(255,255,255,0.3)",
          }}
        >
          {estaEnVistaCrear ? "Ver contactos →" : "← Volver a crear"}
        </button>
      </header>
 
      {/* ── Contenido principal ───────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
 
        {/* ── Columna principal (2/3) ───────────────────────────────────── */}
        <div className="lg:col-span-2">
 
          {/* Tarjeta principal */}
          <div className="rounded-2xl p-6" style={{
            background: "rgba(255,255,255,0.12)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          }}>
 
            {/* Encabezado de la tarjeta con modo actual */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-xs font-semibold text-purple-200 uppercase tracking-widest">
                  {estaEnVistaCrear ? "Modo creación" : "Modo contactos"}
                </p>
                <h1 className="text-2xl font-extrabold text-white mt-1">
                  {estaEnVistaCrear ? "Nuevo contacto" : "Gestionar contactos"}
                </h1>
              </div>
              <span className="text-3xl">{estaEnVistaCrear ? "✏️" : "📋"}</span>
            </div>
 
            {/* Error global */}
            {error && (
              <div className="mb-4 rounded-xl px-4 py-3"
                style={{ background: "rgba(239,68,68,0.2)", border: "1px solid rgba(239,68,68,0.4)" }}>
                <p className="text-sm font-medium text-red-200">{error}</p>
              </div>
            )}
 
            {cargando ? (
              <p className="text-purple-200 text-sm">Cargando contactos...</p>
            ) : (
              <>
                {/* ── VISTA CREAR ─────────────────────────────────────── */}
                {estaEnVistaCrear && (
                  <FormularioContacto
                    onAgregar={onAgregarContacto}
                    onActualizar={onActualizarContacto}
                    contactoEnEdicion={null}
                    onCancelarEdicion={onCancelarEdicion}
                  />
                )}
 
                {/* ── VISTA CONTACTOS ─────────────────────────────────── */}
                {estaEnVistaContactos && (
                  <>
                    {/* Formulario edición — solo si hay contacto seleccionado */}
                    {contactoEnEdicion && (
                      <div className="mb-6">
                        <FormularioContacto
                          onAgregar={onAgregarContacto}
                          onActualizar={onActualizarContacto}
                          contactoEnEdicion={contactoEnEdicion}
                          onCancelarEdicion={onCancelarEdicion}
                        />
                      </div>
                    )}
 
                    {/* Buscador y ordenamiento */}
                    <div className="flex flex-col md:flex-row gap-3 mb-4">
                      <input
                        type="text"
                        className="flex-1 rounded-xl px-4 py-2 text-sm"
                        style={{
                          background: "rgba(255,255,255,0.15)",
                          border: "1px solid rgba(255,255,255,0.25)",
                          color: "white",
                        }}
                        placeholder="Buscar por nombre, correo o etiqueta..."
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setOrdenAsc((prev) => !prev)}
                        className="text-sm px-4 py-2 rounded-xl font-medium"
                        style={{
                          background: "rgba(255,255,255,0.15)",
                          border: "1px solid rgba(255,255,255,0.25)",
                          color: "white",
                        }}
                      >
                        {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
                      </button>
                    </div>
 
                    {/* Lista de contactos */}
                    <section className="space-y-3">
                      {contactosOrdenados.length === 0 ? (
                        <p className="text-purple-200 text-sm">
                          No se encontraron contactos que coincidan con la búsqueda.
                        </p>
                      ) : (
                        contactosOrdenados.map((c) => (
                          <ContactoCard
                            key={c.id}
                            nombre={c.nombre}
                            telefono={c.telefono}
                            correo={c.correo}
                            etiqueta={c.etiqueta}
                            onEliminar={() => onEliminarContacto(c.id)}
                            onEditar={() => onEditarClick(c)}
                          />
                        ))
                      )}
                    </section>
                  </>
                )}
              </>
            )}
          </div>
        </div>
 
     {/* ── Panel lateral (1/3) ───────────────────────────────────────── */}
<PanelLateral contactos={contactos} />

</main>

      <footer className="text-center py-4 text-xs text-purple-300">
        <p>Desarrollo Web – ReactJS | Proyecto Agenda ADSO v10</p>
        <p>Instructor: Gustavo Adolfo Bolaños Dorado</p>
      </footer>
    </div>
  );
}

export default App;