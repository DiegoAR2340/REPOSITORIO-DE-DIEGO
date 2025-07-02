// backend/db/connection.js
const mysql = require('mysql2');

// Crear conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Diegoben10', // Reemplaza si cambias tu contraseña
    database: 'tareas_colaborativas'
});

// Conectar y verificar estado
db.connect((err) => {
    if (err) {
        console.error('❌ Error al conectar con MySQL:', err.message);
    } else {
        console.log('✅ Conectado a MySQL (desde connection.js)');
    }
});

module.exports = db;
