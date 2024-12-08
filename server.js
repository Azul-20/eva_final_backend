const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2'); // Importar el módulo mysql2

// Configuración de la app
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Inicializar el servidor
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Server is up and running on port: ' + port);
});

// Conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost', // Cambia esto según tu configuración
  user: 'root', // Tu usuario de MySQL
  password: '', // Tu contraseña de MySQL
  database: 'db_proyecto' // El nombre de tu base de datos
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

module.exports = db;

// Rutas de autenticación
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const empleadoRoutes = require('./routes/empleado');
app.use('/empleados', empleadoRoutes);

const cargoRoutes = require('./routes/cargo');
app.use('/cargos', cargoRoutes);