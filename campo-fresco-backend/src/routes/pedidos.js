const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener pedidos de un usuario
router.get("/usuario/:id", async (req, res) => {
  try {
    const [pedidos] = await db.query(
      "SELECT * FROM pedidos WHERE usuario_id = ? ORDER BY fecha DESC",
      [req.params.id]
    );
    for (let pedido of pedidos) {
      const [detalle] = await db.query(
        `SELECT dp.*, p.name, p.emoji FROM detalle_pedidos dp
         JOIN productos p ON dp.producto_id = p.id
         WHERE dp.pedido_id = ?`,
        [pedido.id]
      );
      pedido.detalle = detalle;
    }
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear pedido
router.post("/", async (req, res) => {
  const { usuario_id, total, items } = req.body;
  const conn = await (require("../db")).getConnection();
  try {
    await conn.beginTransaction();

    const [pedido] = await conn.query(
      "INSERT INTO pedidos (usuario_id, total, estado) VALUES (?,?,?)",
      [usuario_id, total, "pendiente"]
    );
    const pedido_id = pedido.insertId;

    for (const item of items) {
      await conn.query(
        "INSERT INTO detalle_pedidos (pedido_id, producto_id, cantidad, precio_unitario) VALUES (?,?,?,?)",
        [pedido_id, item.id, item.qty, item.price]
      );
      await conn.query(
        "UPDATE productos SET stock = stock - ? WHERE id = ?",
        [item.qty, item.id]
      );
    }

    await conn.commit();
    res.json({ id: pedido_id, mensaje: "Pedido creado exitosamente" });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ error: err.message });
  } finally {
    conn.release();
  }
});

module.exports = router;