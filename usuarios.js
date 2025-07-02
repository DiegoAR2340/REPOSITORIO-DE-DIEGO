const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');

// Registro de nuevo usuario
router.post('/registro', async (req, res) => {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const sql = 'INSERT INTO usuarios (nombre, email, password_hash) VALUES (?, ?, ?)';
        db.query(sql, [nombre, email, hashedPassword], (err, resultado) => {
            if (err) {
                console.error('Error al registrar usuario:', err);
                return res.status(500).json({ mensaje: 'Error del servidor' });
            }
            res.status(201).json({ mensaje: 'Usuario registrado correctamente', id: resultado.insertId });
        });
    } catch (error) {
        console.error('Error al cifrar contraseña:', error);
        res.status(500).json({ mensaje: 'Error del servidor' });
    }
});


// Inicio de sesión
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ mensaje: 'Correo y contraseña son obligatorios' });
    }

    const sql = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(sql, [email], async (err, resultados) => {
        if (err) {
            console.error('Error al buscar usuario:', err);
            return res.status(500).json({ mensaje: 'Error del servidor' });
        }

        if (resultados.length === 0) {
            return res.status(401).json({ mensaje: 'Correo no registrado' });
        }

        const usuario = resultados[0];
        const match = await bcrypt.compare(password, usuario.password_hash);

        if (!match) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        res.status(200).json({
            mensaje: 'Inicio de sesión exitoso',
            usuario: {
                id: usuario.id,
                nombre: usuario.nombre,
                email: usuario.email
            }
        });
    });
});

module.exports = router;



