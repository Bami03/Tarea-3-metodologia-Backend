/**
 * Controlador de Usuarios
 * Maneja las peticiones HTTP relacionadas con usuarios
 */

const { sendSuccess, sendError } = require("../handlers/responseHandler");
const usuarioService = require("../services/usuarioService");
const {
  createUsuarioSchema,
  updateUsuarioSchema,
} = require("../validations/usuarioValidation");

/**
 * POST /usuarios
 * Crea un nuevo usuario
 */
const crearUsuario = async (req, res) => {
  try {
    // 1. Validamos los datos de entrada con Joi
    const { error, value } = createUsuarioSchema.validate(req.body);

    if (error) {
      return sendError(
        res,
        "Error en validación de datos",
        400,
        error.details.map((err) => err.message),
      );
    }

    // 2. Llamamos al servicio para crear el usuario
    const usuarioCreado = await usuarioService.crearUsuario(value);

    // 3. Respondemos con éxito
    return sendSuccess(res, usuarioCreado, "Usuario creado exitosamente", 201);
  } catch (error) {
    console.error(error);
    return sendError(res, "Error al crear usuario", 500);
  }
};

/**
 * GET /usuarios
 * Obtiene todos los usuarios
 */
const obtenerTodosLosUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerTodosLosUsuarios();
    return sendSuccess(res, usuarios, "Usuarios obtenidos exitosamente", 200);
  } catch (error) {
    return sendError(res, "Error al obtener usuarios", 500);
  }
};

/**
 * GET /usuarios/:id
 * Obtiene un usuario específico por ID
 */
const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await usuarioService.obtenerUsuarioPorId(id);

    // Si el servicio nos devuelve null, devolvemos error 404
    if (!usuario) {
      return sendError(res, "Usuario no encontrado", 404);
    }

    // Si existe, respondemos con el usuario
    return sendSuccess(res, usuario, "Usuario encontrado exitosamente", 200);
  } catch (error) {
    return sendError(res, "Error al obtener usuario", 500);
  }
};

/**
 * PATCH /usuarios/:id
 * Actualiza un usuario existente
 */
const actualizarUsuario = async (req, res) => {
  try {
    // 1. Validamos los datos de entrada
    const { error, value } = updateUsuarioSchema.validate(req.body);

    if (error) {
      return sendError(
        res,
        "Error en validación de datos",
        400,
        error.details.map((err) => err.message),
      );
    }

    // 2. Obtenemos el ID de los parámetros
    const { id } = req.params;

    // 3. Llamamos al servicio pasando el id y los datos validados (value)
    const usuarioActualizado = await usuarioService.actualizarUsuario(
      id,
      value,
    );

    // 4. Si retorna null, significa que no encontró el usuario
    if (!usuarioActualizado) {
      return sendError(res, "Usuario no encontrado para actualizar", 404);
    }

    // 5. Si todo sale bien, respondemos con el usuario actualizado
    return sendSuccess(
      res,
      usuarioActualizado,
      "Usuario actualizado exitosamente",
      200,
    );
  } catch (error) {
    return sendError(res, "Error al actualizar usuario", 500);
  }
};

/**
 * DELETE /usuarios/:id
 * Elimina un usuario
 */
const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const fueEliminado = await usuarioService.eliminarUsuario(id);

    // Si devuelve false, el usuario no existía
    if (!fueEliminado) {
      return sendError(res, "Usuario no encontrado para eliminar", 404);
    }

    // Si se eliminó correctamente, respondemos (podemos enviar null como data)
    return sendSuccess(res, null, "Usuario eliminado exitosamente", 200);
  } catch (error) {
    return sendError(res, "Error al eliminar usuario", 500);
  }
};

module.exports = {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
};
