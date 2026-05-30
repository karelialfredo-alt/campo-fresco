const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT p.*, g.nombre AS farm, g.id AS farmId
       FROM productos p
       JOIN granjas g ON p.granja_id = g.id
       WHERE p.stock > 0`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar producto (agricultor)
router.post("/", async (req, res) => {
  const { name, description, price, unit, category, stock, emoji, granja_id } = req.body;
  try {
    const [result] = await db.query(
      "INSERT INTO productos (name, description, price, unit, category, stock, emoji, granja_id) VALUES (?,?,?,?,?,?,?,?)",
      [name, description, price, unit, category, stock, emoji || "🥦", granja_id]
    );
    res.json({ id: result.insertId, name, price, stock });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar stock
router.put("/:id/stock", async (req, res) => {
  const { stock } = req.body;
  try {
    await db.query("UPDATE productos SET stock = ? WHERE id = ?", [stock, req.params.id]);
    res.json({ mensaje: "Stock actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;