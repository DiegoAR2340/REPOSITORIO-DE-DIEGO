const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Ruta de prueba
router.get('/test', (req, res) => {
    res.send('Ruta de tableros activa ✔️');
});

// Crear un nuevo tablero
router.post('/crear', (req, res) => {
    const { nombre, usuario_id } = req.body;

    if (!nombre || !usuario_id) {
        return res.status(400).json({ mensaje: 'Nombre y usuario_id son obligatorios' });
    }

    const sql = 'INSERT INTO tableros (nombre, usuario_id) VALUES (?, ?)';
    db.query(sql, [nombre, usuario_id], (err, resultado) => {
        if (err) {
            console.error('Error al crear tablero:', err);
            return res.status(500).json({ mensaje: 'Error del servidor' });
        }

        res.status(201).json({
            mensaje: 'Tablero creado correctamente',
            id: resultado.insertId
        });
    });
});

module.exports = router;



