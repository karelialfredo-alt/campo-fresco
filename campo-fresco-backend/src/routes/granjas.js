const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todas las granjas
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT g.*, u.nombre AS agricultor FROM granjas g JOIN usuarios u ON g.usuario_id = u.id"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear granja (solo agricultores)
router.post("/", async (req, res) => {
  const { nombre, descripcion, ubicacion, usuario_id } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO granjas (nombre, descripcion, ubicacion, usuario_id) VALUES (?,?,?,?)",
      [nombre, descripcion, ubicacion, usuario_id]
    );
    res.json({ id: result.insertId, nombre, descripcion, ubicacion, usuario_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;