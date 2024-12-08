const db = require('../server'); // Importar la conexión desde server.js

const Cargo = {
  // Método para obtener todos los cargos
  getAll: (callback) => {
    const query = 'SELECT * FROM cargo';
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener cargos:', err);
        callback(err, null);
      } else {
        callback(null, results);
      }
    });
  },

  // Método para crear un nuevo cargo
  create: (nombre, descripcion, callback) => {
    const query = 'INSERT INTO cargo (nombre, descripcion) VALUES (?, ?)';
    db.query(query, [nombre, descripcion], (err, result) => {
      if (err) {
        console.error('Error al crear cargo:', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  // Método para obtener un cargo por su ID
  getById: (id, callback) => {
    const query = 'SELECT * FROM cargo WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error al obtener cargo por ID:', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  // Método para actualizar un cargo
  update: (id, nombre, descripcion, callback) => {
    const query = 'UPDATE cargo SET nombre = ?, descripcion = ? WHERE id = ?';
    db.query(query, [nombre, descripcion, id], (err, result) => {
      if (err) {
        console.error('Error al actualizar cargo:', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  },

  // Método para eliminar un cargo
  delete: (id, callback) => {
    const query = 'DELETE FROM cargo WHERE id = ?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error al eliminar cargo:', err);
        callback(err, null);
      } else {
        callback(null, result);
      }
    });
  }
};

module.exports = Cargo;
