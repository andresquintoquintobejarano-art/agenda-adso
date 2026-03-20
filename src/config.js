
// Archivo: src/config.js
// Configuración global de la Agenda ADSO.
// Centraliza la URL base de la API y la información de la aplicación.
 
// URL base del JSON Server (puerto 3001, recurso "contactos")
export const API_BASE_URL = "https://agenda-adso-api.onrender.com/contactos";

// Información general de la aplicación (usada en el encabezado)
export const APP_INFO = {
  titulo: "Agenda ADSO",
  subtitulo: "Gestión de contactos conectada a una API remota en Render.",
  ficha: "3229209",
};