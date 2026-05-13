/**
 * Servicio de Usuarios
 * Contiene la lógica de negocio para gestionar usuarios
 */

const db = require("../config/db");
const Usuario = require("../entities/Usuario");

const usuarioRepository = db.getRepository(Usuario);

/**
 * Crear un nuevo usuario
 * @param {Object} datosUsuario - { nombre, apellido, email, edad }
 * @returns {Object} El usuario creado
 */
const crearUsuario = async (datosUsuario) => {
  const nuevoUsuario = usuarioRepository.create(datosUsuario);
  return await usuarioRepository.save(nuevoUsuario);
};

/**
 * Obtener todos los usuarios
 * @returns {Array} Array de todos los usuarios
 */
const obtenerTodosLosUsuarios = async () => {
  // Retorna todos los registros de la tabla
  return await usuarioRepository.find(); //usuarioRepository.find() es el comando que va al la base de datos y ejecutato la tabla y lo da como arreglo
};

/**
 * Obtener un usuario por ID
 * @param {Number} id - ID del usuario
 * @returns {Object|null} El usuario encontrado o null
 */
const obtenerUsuarioPorId = async (id) => {
  // Busca un usuario por su ID
  return await usuarioRepository.findOneBy({ id }); //usuarioRepository.findOneBy({ id }) es el comando para buscar por una id que le pedimos al usurio
};

/**
 * Actualizar un usuario existente
 * @param {Number} id - ID del usuario
 * @param {Object} datosActualizados - Campos a actualizar
 * @returns {Object|null} El usuario actualizado o null si no existe
 */
const actualizarUsuario = async (id, datosActualizados) => {
  // Actualizamos el usuario con los datos que lleguen
  await usuarioRepository.update(id, datosActualizados); //.update() va a la base de datos y modifica los campos
  // Retornamos el usuario actualizado
  return await obtenerUsuarioPorId(id); //mostar el usuario modificado con la funcion de arriba
};

/**
 * Eliminar un usuario
 * @param {Number} id - ID del usuario
 * @returns {boolean} true si se eliminó, false si no existe
 */
const eliminarUsuario = async (id) => {
  // Eliminamos y verificamos si se afectó alguna fila
  const result = await usuarioRepository.delete(id); //va a la base de datos y elimnia segun el id
  return result.affected > 0; // si da mayor a 0  el usuario existio y se elminio correctamente si da 0 no se encontro o no existia el usuario
};

module.exports = {
  crearUsuario,
  obtenerTodosLosUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
};
