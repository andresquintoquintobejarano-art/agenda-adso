// Punto de entrada principal de la aplicación React
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Importamos el proveedor de autenticación
import { AuthProvider } from './context/AuthContext'

import './index.css'
import App from "./App.jsx";

// Montamos la aplicación en el elemento con id "root" del index.html
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter: habilita el sistema de rutas en toda la app */}
    <BrowserRouter>
      {/* AuthProvider: provee el contexto de autenticación a toda la app */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)