const db = require('../server'); // Importar la conexión desde server.js

const Empleado = {
  // Método para crear un nuevo empleado
  create: (email, password, nombre, apellidos, cargo_id, callback) => {
    const query = 'INSERT INTO empleado (email, password, nombre, apellidos, cargo_id) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [email, password, nombre, apellidos, cargo_id], (err, result) => {
      if (err) {
        console.error('Error al crear empleado:', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  // Método para obtener todos los empleados
  getAll: (callback) => {
    const query = 'SELECT * FROM empleado';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener empleados:', err);
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  // Método para obtener un empleado por su ID
  getById: (id, callback) => {
    const query = 'SELECT * FROM empleado WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error al obtener empleado por ID:', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  // Método para actualizar un empleado
  update: (id, email, nombre, apellidos, cargo_id, callback) => {
    const query = 'UPDATE empleado SET email = ?, nombre = ?, apellidos = ?, cargo_id = ? WHERE id = ?';
    db.query(query, [email, nombre, apellidos, cargo_id, id], (err, result) => {
      if (err) {
        console.error('Error al actualizar empleado:', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  // Método para eliminar un empleado
  delete: (id, callback) => {
    const query = 'DELETE FROM empleado WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar empleado:', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

module.exports = Empleado;

