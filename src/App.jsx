import { useState } from "react";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";

function App() {
  const { user, logout } = useAuth();

  const [contactos, setContactos] = useState([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");

  if (!user) return <Login />;

  const agregarContacto = (e) => {
    e.preventDefault();
    if (!nombre || !telefono) return;

    setContactos([...contactos, { nombre, telefono }]);
    setNombre("");
    setTelefono("");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      {/* Navbar */}
      <div className="bg-purple-700 text-white p-4 flex justify-between">
        <h1 className="font-bold">📒 Agenda</h1>
        <div>
          {user.nombre} | 
          <button onClick={logout} className="ml-2 underline">
            Salir
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 max-w-2xl mx-auto">
        
        {/* Card */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4 text-purple-700">
            Agregar Contacto
          </h2>

          <form onSubmit={agregarContacto} className="space-y-3">
            <input
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <input
              type="text"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full p-2 border rounded"
            />

            <button className="bg-purple-700 text-white px-4 py-2 rounded hover:bg-purple-800">
              Guardar
            </button>
          </form>
        </div>

        {/* Lista */}
        <div className="mt-6 space-y-2">
          {contactos.map((c, i) => (
            <div
              key={i}
              className="bg-white p-3 rounded shadow flex justify-between"
            >
              <span>{c.nombre} - {c.telefono}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;