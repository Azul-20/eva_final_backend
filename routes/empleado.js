const express = require('express');
const router = express.Router();
const Empleado = require('../models/Empleado'); // Ajusta el path si es necesario

// Ruta para crear un empleado
router.post('/', (req, res) => {
  const { email, password, nombre, apellidos, cargo_id } = req.body;
  Empleado.create(email, password, nombre, apellidos, cargo_id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al crear el empleado', details: err });
    } else {
      res.status(201).json({ message: 'Empleado creado', data: result });
    }
  });
});

// Ruta para obtener todos los empleados
router.get('/', (req, res) => {
  Empleado.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener empleados', details: err });
    } else {
      res.status(200).json(results);
    }
  });
});

// Ruta para obtener un empleado por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Empleado.getById(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener empleado', details: err });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Empleado no encontrado' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Ruta para actualizar un empleado
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { email, nombre, apellidos, cargo_id } = req.body;
  console.log('ID recibido:', id);
  console.log('Datos recibidos:', req.body);
  Empleado.update(id, email, nombre, apellidos, cargo_id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al actualizar empleado', details: err });
    } else {
      res.status(200).json({ message: 'Empleado actualizado', data: result });
    }
  });
});

// Ruta para eliminar un empleado
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Empleado.delete(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al eliminar empleado', details: err });
    } else {
      res.status(200).json({ message: 'Empleado eliminado', data: result });
    }
  });
});

module.exports = router;
