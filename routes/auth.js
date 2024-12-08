const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Empleado = require('../models/Empleado');  // Importar el modelo Empleado

// Ruta para el registro
router.post('/register', (req, res) => {
    const { email, password, nombre, apellidos, cargo_id } = req.body;

    // Verificar que todos los campos necesarios estén presentes
    if (!email || !password || !nombre || !apellidos || !cargo_id) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Encriptar la contraseña
    const hashedPassword = bcrypt.hashSync(password, 10);  // Generar el hash de la contraseña

    // Crear un nuevo empleado
    Empleado.create(email, hashedPassword, nombre, apellidos, cargo_id, (err, result) => {
        if (err) {
            return res.status(400).json({ error: 'Error al registrar el empleado: ' + err });
        } else {
            res.status(201).json({ message: 'Empleado registrado exitosamente!' });
        }
    });
});

// Ruta para el login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    Empleado.getAll((err, empleados) => {
        if (err) {
            return res.status(500).json({ error: 'Error al obtener empleados' });
        }

        const user = empleados.find(emp => emp.email === email); // Buscar al empleado por email
        if (!user) {
            return res.status(404).json({ error: 'No se encontró el empleado' });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ auth: false, token: null });
        }

        // Crear el token JWT
        const token = jwt.sign({ id: user.id }, 'your-secret-key', { expiresIn: 86400 });  // Token que expira en 24 horas
        res.status(200).json({ auth: true, token: token });
    });
});

module.exports = router;
