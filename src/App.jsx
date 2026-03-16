// Archivo: src/App.jsx
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

function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [ordenAsc, setOrdenAsc] = useState(true);
  const [contactoEnEdicion, setContactoEnEdicion] = useState(null);

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

  const onActualizarContacto = async (contactoActualizado) => {
    try {
      setError("");
      const actualizado = await actualizarContacto(contactoActualizado.id, contactoActualizado);
      setContactos((prev) => prev.map((c) => (c.id === actualizado.id ? actualizado : c)));
      setContactoEnEdicion(null);
    } catch (err) {
      console.error("Error al actualizar contacto:", err);
      setError("No se pudo actualizar el contacto.");
      throw err;
    }
  };

  const onEliminarContacto = async (id) => {
    try {
      setError("");
      await eliminarContactoPorId(id);
      setContactos((prev) => prev.filter((c) => c.id !== id));
      setContactoEnEdicion((actual) => (actual && actual.id === id ? null : actual));
    } catch (err) {
      console.error("Error al eliminar contacto:", err);
      setError("No se pudo eliminar el contacto.");
    }
  };

  const onEditarClick = (contacto) => {
    setContactoEnEdicion(contacto);
    setError("");
  };

  const onCancelarEdicion = () => setContactoEnEdicion(null);

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

  return (
   <div className="min-h-screen" style={{
  background: "linear-gradient(135deg, #4c1d95 0%, #7c3aed 25%, #a855f7 50%, #6d28d9 75%, #4c1d95 100%)",
  backgroundSize: "400% 400%",
  animation: "chromaShift 6s ease infinite",
}}>

        <header className="mb-8">
          <p className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            Desarrollo Web ReactJS — Ficha {APP_INFO.ficha}
          </p>
          <h1 className="text-4xl font-extrabold text-gray-900 mt-2">{APP_INFO.titulo}</h1>
          <p className="text-sm text-gray-600 mt-1">{APP_INFO.subtitulo}</p>
        </header>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3">
            <p className="text-sm font-medium text-red-700">{error}</p>
          </div>
        )}

        {cargando ? (
          <p className="text-sm text-gray-500">Cargando contactos...</p>
        ) : (
          <>
            <FormularioContacto
              onAgregar={onAgregarContacto}
              onActualizar={onActualizarContacto}
              contactoEnEdicion={contactoEnEdicion}
              onCancelarEdicion={onCancelarEdicion}
            />
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <input
                type="text"
                className="w-full md:flex-1 rounded-xl border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm"
                placeholder="Buscar por nombre, correo o etiqueta..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setOrdenAsc((prev) => !prev)}
                className="bg-gray-100 text-gray-700 text-sm px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-200"
              >
                {ordenAsc ? "Ordenar Z-A" : "Ordenar A-Z"}
              </button>
            </div>
            <section className="space-y-4">
              {contactosOrdenados.length === 0 ? (
                <p className="text-sm text-gray-500">No se encontraron contactos.</p>
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

        <footer className="mt-8 text-xs text-gray-400">
          <p>Desarrollo Web – ReactJS | Proyecto Agenda ADSO</p>
          <p>Instructor: Gustavo Adolfo Bolaños Dorado</p>
        </footer>
      </div>
    
  );
}

export default App;