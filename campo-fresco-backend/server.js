const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const usuariosRoutes = require("./src/routes/usuarios");
const granjasRoutes = require("./src/routes/granjas");
const productosRoutes = require("./src/routes/productos");
const pedidosRoutes = require("./src/routes/pedidos");

app.use("/api/usuarios", usuariosRoutes);
app.use("/api/granjas", granjasRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/pedidos", pedidosRoutes);

app.get("/", (req, res) => {
  res.json({ mensaje: "CampoFresco API funcionando ✅" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});