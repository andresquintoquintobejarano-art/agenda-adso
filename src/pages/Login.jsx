import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mostrarPass, setMostrarPass] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!usuario || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (usuario === "admin" && password === "1234") {
      login({ nombre: usuario });
    } else {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 via-purple-800 to-purple-900">
      
      {/* Card animada */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-80 animate-fadeIn">
        
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
          🔐 Iniciar Sesión
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          
          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
          />

          {/* Input con botón 👁️ */}
          <div className="relative">
            <input
              type={mostrarPass ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setMostrarPass(!mostrarPass)}
              className="absolute right-3 top-3 text-sm text-gray-600"
            >
              {mostrarPass ? "Ocultar" : "Ver"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800 transition transform hover:scale-105"
          >
            Ingresar
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center animate-pulse">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;