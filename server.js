// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Conexión a base de datos
const db = require('./db/connection');

// Rutas
const tareasRouter = require('./routes/tareas');
app.use('/api/tareas', tareasRouter);

const usuariosRouter = require('./routes/usuarios');
app.use('/api/usuarios', usuariosRouter);

const tablerosRouter = require('./routes/tableros');
app.use('/api/tableros', tablerosRouter);

console.log('Rutas de tableros cargadas');


// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor corriendo correctamente ✔️');
});

app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});






