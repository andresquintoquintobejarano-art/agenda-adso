
import { API_BASE_URL } from "./config";
 
// ─── READ ────────────────────────────────────────────────────────────────────
// GET /contactos → devuelve el array completo de contactos
export async function listarContactos() {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error("Error al listar contactos");
  return res.json();
}
 
// ─── CREATE ──────────────────────────────────────────────────────────────────
// POST /contactos → crea un nuevo contacto y devuelve el objeto con su id
export async function crearContacto(data) {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al crear el contacto");
  return res.json();
}
 
// ─── UPDATE ──────────────────────────────────────────────────────────────────
// PUT /contactos/:id → reemplaza el contacto completo y devuelve el actualizado
export async function actualizarContacto(id, data) {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error al actualizar el contacto");
  return res.json();
}
 
// ─── DELETE ──────────────────────────────────────────────────────────────────
// DELETE /contactos/:id → elimina el contacto y devuelve true si fue exitoso
export async function eliminarContactoPorId(id) {
  const res = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Error al eliminar el contacto");
  return true;
}