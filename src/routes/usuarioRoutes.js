/**
 * Rutas de Usuarios
 * Aquí definimos los endpoints relacionados con usuarios
 */

const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

// POST /usuarios - Crear un nuevo usuario (IMPLEMENTADO)
router.post("/", usuarioController.crearUsuario);

// GET /usuarios - Obtener todos los usuarios
// Ya implementamos la función, así que activamos la ruta:
router.get("/", usuarioController.obtenerTodosLosUsuarios);

// GET /usuarios/:id - Obtener un usuario específico
// Ya implementamos la función, así que activamos la ruta:
router.get("/:id", usuarioController.obtenerUsuarioPorId);

// PATCH /usuarios/:id - Actualizar un usuario
// Ya implementamos la función, así que activamos la ruta:
router.patch("/:id", usuarioController.actualizarUsuario);

// DELETE /usuarios/:id - Eliminar un usuario
// Ya implementamos la función, así que activamos la ruta:
router.delete("/:id", usuarioController.eliminarUsuario);

module.exports = router;
