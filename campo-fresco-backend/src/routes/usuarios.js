const express = require("express");
const router = express.Router();
const db = require("../db");

// Registrar usuario
router.post("/registro", async (req, res) => {
  const { nombre, email, telefono, password, rol, granja_o_ciudad, productos_cultiva } = req.body;
  try {
    const [existe] = await db.query("SELECT id FROM usuarios WHERE email = ?", [email]);
    if (existe.length > 0) return res.status(400).json({ error: "El correo ya está registrado" });

    const [result] = await db.query(
      "INSERT INTO usuarios (nombre, email, telefono, password, rol, granja_o_ciudad, productos_cultiva) VALUES (?,?,?,?,?,?,?)",
      [nombre, email, telefono, password, rol, granja_o_ciudad, productos_cultiva || null]
    );
    res.json({ id: result.insertId, nombre, email, rol });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query(
      "SELECT id, nombre, email, rol FROM usuarios WHERE email = ? AND password = ?",
      [email, password]
    );
    if (rows.length === 0) return res.status(401).json({ error: "Correo o contraseña incorrectos" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;