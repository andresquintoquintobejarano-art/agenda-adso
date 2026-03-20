// Navigate: redirige al usuario a otra ruta
import { Navigate } from "react-router-dom"

// useAuth: nos da acceso al estado de autenticación
import { useAuth } from "../context/AuthContext"

// Componente que protege rutas privadas
// children: representa el componente que queremos proteger
export default function ProtectedRoute({ children }) {
  
  // Obtenemos el estado de autenticación del contexto
  const { isAuthenticated } = useAuth()

  // Si el usuario NO está autenticado, lo redirigimos al login
  if (!isAuthenticated) {
    return <Navigate to="/login" />
  }

  // Si está autenticado, mostramos el componente protegido
  return children
}