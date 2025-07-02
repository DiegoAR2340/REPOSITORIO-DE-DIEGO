const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// Ruta de prueba
router.get('/test', (req, res) => {
    res.send('Ruta de tareas activa ✔️');
});

// Crear una nueva tarea
// Crear una nueva tarea (completa)
router.post('/crear', (req, res) => {
    const {
        titulo,
        descripcion,
        estado,
        fecha_creacion,
        fecha_vencimiento,
        tablero_id,
        asignado_a
    } = req.body;

    console.log('Datos recibidos para crear tarea:', {
    titulo,
    descripcion,
    estado,
    fecha_creacion,
    fecha_vencimiento,
    tablero_id,
    asignado_a
});


    if (!titulo || !descripcion || !estado || !fecha_creacion || !fecha_vencimiento || !tablero_id || !asignado_a) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const sql = `
        INSERT INTO tareas 
        (titulo, descripcion, estado, fecha_creacion, fecha_vencimiento, tablero_id, asignado_a) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const valores = [
        titulo,
        descripcion,
        estado,
        fecha_creacion,
        fecha_vencimiento,
        tablero_id,
        asignado_a
    ];

    db.query(sql, valores, (err, resultado) => {
        if (err) {
            console.error('Error al crear tarea:', err);
            return res.status(500).json({ mensaje: 'Error del servidor' });
        }

        res.status(201).json({
            mensaje: 'Tarea creada correctamente',
            id: resultado.insertId
        });
    });
});




// Obtener tareas por ID de tablero
router.get('/:tablero_id', (req, res) => {
    const { tablero_id } = req.params;

    const sql = 'SELECT * FROM tareas WHERE tablero_id = ?';
    db.query(sql, [tablero_id], (err, filas) => {
        if (err) {
            console.error('Error al obtener tareas:', err);
            return res.status(500).json({ mensaje: 'Error del servidor' });
        }

        res.status(200).json(filas);
    });
});

// Actualizar el estado de una tarea
router.put('/:id/estado', (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;

  if (!estado) {
    return res.status(400).json({ mensaje: 'El campo estado es obligatorio' });
  }

  const sql = 'UPDATE tareas SET estado = ? WHERE id = ?';
  db.query(sql, [estado, id], (err, resultado) => {
    if (err) {
      console.error('Error al actualizar estado:', err);
      return res.status(500).json({ mensaje: 'Error del servidor' });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Tarea no encontrada' });
    }

    res.json({ mensaje: 'Estado actualizado correctamente' });
  });
});

// Eliminar una tarea por ID
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM tareas WHERE id = ?';

    db.query(sql, [id], (err, resultado) => {
        if (err) {
            console.error('Error al eliminar tarea:', err);
            return res.status(500).json({ mensaje: 'Error del servidor' });
        }

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Tarea no encontrada' });
        }

        res.json({ mensaje: 'Tarea eliminada correctamente' });
    });
});

// Obtener todas las tareas de un tablero específico
router.get('/tablero/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM tareas WHERE tablero_id = ?';

    db.query(sql, [id], (err, resultados) => {
        if (err) {
            console.error('Error al obtener tareas por tablero:', err);
            return res.status(500).json({ mensaje: 'Error del servidor' });
        }

        res.json(resultados);
    });
});

// Asignar un usuario a una tarea
router.put('/:id/asignar', (req, res) => {
    const { id } = req.params;
    const { usuario_id } = req.body;

    if (!usuario_id) {
        return res.status(400).json({ mensaje: 'Falta el ID del usuario' });
    }

    const sql = 'UPDATE tareas SET asignado_a = ? WHERE id = ?';

    db.query(sql, [usuario_id, id], (err, resultado) => {
        if (err) {
            console.error('Error al asignar tarea:', err);
            return res.status(500).json({ mensaje: 'Error del servidor' });
        }

        res.json({ mensaje: 'Usuario asignado correctamente a la tarea' });
    });
});

// Obtener todas las tareas asignadas a un usuario
router.get('/usuario/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM tareas WHERE asignado_a = ?';
    db.query(sql, [id], (err, resultados) => {
        if (err) {
            console.error('Error al obtener tareas por usuario:', err);
            return res.status(500).json({ mensaje: 'Error del servidor' });
        }

        res.json(resultados);
    });
});

module.exports = router;