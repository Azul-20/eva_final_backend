const express = require('express');
const router = express.Router();
const Cargo = require('../models/Cargo'); // Ajusta el path si es necesario

// Ruta para crear un empleado
router.post('/', (req, res) => {
  const { nombre, descripcion } = req.body;
  Cargo.create(nombre, descripcion, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al crear el cargo', details: err });
    } else {
      res.status(201).json({ message: 'Cargo creado', data: result });
    }
  });
});

// Ruta para obtener todos los empleados
router.get('/', (req, res) => {
    Cargo.getAll((err, results) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener cargos', details: err });
    } else {
      res.status(200).json(results);
    }
  });
});

// Ruta para obtener un empleado por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Cargo.getById(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al obtener cargo', details: err });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Cargo no encontrado' });
    } else {
      res.status(200).json(result);
    }
  });
});

// Ruta para actualizar un empleado
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  Cargo.update(id, nombre, descripcion, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al actualizar cargo', details: err });
    } else {
      res.status(200).json({ message: 'Cargo actualizado', data: result });
    }
  });
});

// Ruta para eliminar un empleado
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Cargo.delete(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Error al eliminar cargo', details: err });
    } else {
      res.status(200).json({ message: 'Cargo eliminado', data: result });
    }
  });
});

module.exports = router;