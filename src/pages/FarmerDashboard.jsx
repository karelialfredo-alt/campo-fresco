import { useState, useEffect } from "react";
import { theme } from "../assets/theme";

const MENU_ITEMS = [
  { icon: "📦", label: "Mis productos", id: "productos" },
  { icon: "📋", label: "Pedidos recibidos", id: "pedidos" },
  { icon: "📊", label: "Estadísticas", id: "stats" },
  { icon: "🏡", label: "Mi granja", id: "granja" },
];

const PRODUCTOS_FICTICIOS = [
  { id: 1, name: "Tomates cherry",   emoji: "🍅", price: 35, stock: 120 },
  { id: 2, name: "Lechuga romana",   emoji: "🥬", price: 18, stock: 80  },
  { id: 3, name: "Zanahorias",       emoji: "🥕", price: 22, stock: 200 },
  { id: 4, name: "Chiles jalapeños", emoji: "🌶️", price: 40, stock: 60  },
  { id: 5, name: "Aguacates",        emoji: "🥑", price: 75, stock: 45  },
];

const PEDIDOS_FICTICIOS = [
  { id: 1, cliente: "María López",  total: 320, estado: "nuevo", fecha: "2025-05-28" },
  { id: 2, cliente: "Carlos Ramos", total: 150, estado: "nuevo", fecha: "2025-05-29" },
  { id: 3, cliente: "Ana Pérez",    total: 480, estado: "nuevo", fecha: "2025-05-30" },
];

const STATS_FICTICIOS = { ventasMes: 2450, calificacion: 4.8 };

const EMOJIS_OPCIONES = ["🍅","🥬","🥕","🌶️","🥑","🌽","🫑","🧅","🧄","🥦","🍋","🍓","🫐","🍇","🥝","🍄","🌿","🫚","🥚","🧀","🍯","🌾","🫛","🥜"];

const getLS = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};
const setLS = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch {}
};

function initDatosFicticios() {
  if (!localStorage.getItem("cf_productos")) setLS("cf_productos", PRODUCTOS_FICTICIOS);
  if (!localStorage.getItem("cf_pedidos"))   setLS("cf_pedidos",   PEDIDOS_FICTICIOS);
  if (!localStorage.getItem("cf_stats"))     setLS("cf_stats",     STATS_FICTICIOS);
}

// ── Modal de edición ────────────────────────────────────────────────────────
function EditModal({ producto, onGuardar, onEliminar, onCerrar }) {
  const [form, setForm] = useState({
    name:  producto.name,
    emoji: producto.emoji,
    price: producto.price,
    stock: producto.stock,
  });

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const inputStyle = {
    width: "100%", padding: "10px 14px",
    border: `1.5px solid ${theme.greenLight}`,
    borderRadius: 10, fontSize: 14,
    fontFamily: "'Outfit', sans-serif",
    outline: "none", boxSizing: "border-box",
    color: theme.text, background: "white",
  };

  const labelStyle = {
    fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600,
    letterSpacing: "0.06em", textTransform: "uppercase",
    color: theme.textMuted, marginBottom: 5, display: "block",
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
        zIndex: 300, display: "flex", alignItems: "center",
        justifyContent: "center", padding: 20,
      }}
      onClick={onCerrar}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "white", borderRadius: 20, padding: "32px 28px",
          width: "100%", maxWidth: 440,
          boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 24, color: theme.green, margin: 0, fontWeight: 500 }}>
            Editar producto
          </h2>
          <button onClick={onCerrar} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#999" }}>
            ×
          </button>
        </div>

        {/* Selector de emoji */}
        <label style={labelStyle}>Ícono</label>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {EMOJIS_OPCIONES.map(em => (
            <button
              key={em}
              type="button"
              onClick={() => set("emoji", em)}
              style={{
                fontSize: 22, width: 40, height: 40, borderRadius: 8, cursor: "pointer",
                border: `2px solid ${form.emoji === em ? theme.green : "#E5E7EB"}`,
                background: form.emoji === em ? "#F0F7E8" : "white",
                transition: "all 0.15s",
              }}
            >
              {em}
            </button>
          ))}
        </div>

        {/* Nombre */}
        <label style={labelStyle}>Nombre del producto</label>
        <input
          style={{ ...inputStyle, marginBottom: 14 }}
          type="text"
          value={form.name}
          onChange={e => set("name", e.target.value)}
          placeholder="Ej. Tomates cherry"
        />

        {/* Precio y stock */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
          <div>
            <label style={labelStyle}>Precio por kg ($)</label>
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={form.price}
              onChange={e => set("price", Number(e.target.value))}
            />
          </div>
          <div>
            <label style={labelStyle}>Stock (kg)</label>
            <input
              style={inputStyle}
              type="number"
              min="0"
              value={form.stock}
              onChange={e => set("stock", Number(e.target.value))}
            />
          </div>
        </div>

        {/* Botones */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => onEliminar(producto.id)}
            style={{
              flex: 1, padding: "12px", borderRadius: 12, cursor: "pointer",
              border: "1.5px solid #FECACA", background: "#FEF2F2",
              fontFamily: "'Outfit', sans-serif", fontSize: 14,
              fontWeight: 600, color: "#DC2626", transition: "all 0.2s",
            }}
          >
            🗑 Eliminar
          </button>
          <button
            onClick={() => onGuardar({ ...producto, ...form })}
            style={{
              flex: 2, padding: "12px", borderRadius: 12, cursor: "pointer",
              border: "none", background: theme.green,
              fontFamily: "'Outfit', sans-serif", fontSize: 14,
              fontWeight: 600, color: "white", transition: "all 0.2s",
            }}
          >
            Guardar cambios ✓
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Dashboard principal ─────────────────────────────────────────────────────
export default function FarmerDashboard({ usuario, setView, farms = [] }) {
  const miGranja = farms.find(f => f.ownerEmail === usuario?.email);

  const [misProductos, setMisProductos] = useState([]);
  const [pedidos, setPedidos]           = useState([]);
  const [stats, setStats]               = useState({ ventasMes: 0, calificacion: "—" });
  const [productoEditando, setProductoEditando] = useState(null); // null = modal cerrado

  useEffect(() => {
    initDatosFicticios();
    setMisProductos(getLS("cf_productos", []));
    setPedidos(getLS("cf_pedidos", []));
    setStats(getLS("cf_stats", { ventasMes: 0, calificacion: "—" }));
  }, []);

  const pedidosNuevos = pedidos.filter(p => p.estado === "nuevo").length;

  function agregarProducto() {
    const nuevo = {
      id: Date.now(), name: "Nuevo producto",
      emoji: "🌿", price: 0, stock: 0,
    };
    const nuevos = [...misProductos, nuevo];
    setMisProductos(nuevos);
    setLS("cf_productos", nuevos);
    setProductoEditando(nuevo); // abre el modal directo
  }

  function guardarProducto(productoActualizado) {
    const nuevos = misProductos.map(p =>
      p.id === productoActualizado.id ? productoActualizado : p
    );
    setMisProductos(nuevos);
    setLS("cf_productos", nuevos);
    setProductoEditando(null);
  }

  function eliminarProducto(id) {
    const nuevos = misProductos.filter(p => p.id !== id);
    setMisProductos(nuevos);
    setLS("cf_productos", nuevos);
    setProductoEditando(null);
  }

  return (
    <div style={{ minHeight: "100vh", background: theme.cream, paddingTop: 80 }}>

      {/* Modal de edición */}
      {productoEditando && (
        <EditModal
          producto={productoEditando}
          onGuardar={guardarProducto}
          onEliminar={eliminarProducto}
          onCerrar={() => setProductoEditando(null)}
        />
      )}

      {/* Header */}
      <section style={{
        background: `linear-gradient(135deg, #1A3A0A 0%, ${theme.green} 100%)`,
        padding: "48px 24px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32,
          }}>
            🌾
          </div>
          <div>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 4 }}>
              Panel del agricultor
            </p>
            <h1 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 32, color: "white", fontWeight: 500, margin: 0 }}>
              Bienvenido, {usuario?.nombre}
            </h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.7)", marginTop: 4 }}>
              {miGranja?.nombre || "Configura tu granja para empezar"}
            </p>
          </div>
        </div>
      </section>

      {/* Tarjetas de resumen */}
      <section style={{ padding: "40px 24px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
          {[
            { label: "Mis productos",  valor: misProductos.length,                    emoji: "📦" },
            { label: "Pedidos nuevos", valor: pedidosNuevos,                           emoji: "📋" },
            { label: "Ventas del mes", valor: `$${stats.ventasMes.toLocaleString()}`,  emoji: "💰" },
            { label: "Calificación",   valor: stats.calificacion,                      emoji: "⭐" },
          ].map(({ label, valor, emoji }) => (
            <div key={label} style={{
              background: "white", borderRadius: 16, padding: "24px 20px",
              border: `1px solid ${theme.greenLight}33`,
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{emoji}</div>
              <div style={{ fontFamily: "'Crimson Pro', serif", fontSize: 32, fontWeight: 500, color: theme.green }}>
                {valor}
              </div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: theme.textMuted, marginTop: 4 }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Menú de acciones */}
      <section style={{ padding: "32px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 24, color: theme.green, marginBottom: 20 }}>
            ¿Qué deseas hacer?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {MENU_ITEMS.map(({ icon, label, id }) => (
              <button
                key={id}
                onClick={() => setView?.(id)}
                style={{
                  background: "white", border: `1.5px solid ${theme.greenLight}`,
                  borderRadius: 16, padding: "28px 20px", cursor: "pointer",
                  textAlign: "left", transition: "all 0.2s",
                  display: "flex", alignItems: "center", gap: 16,
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = theme.green}
                onMouseLeave={e => e.currentTarget.style.borderColor = theme.greenLight}
              >
                <span style={{ fontSize: 32 }}>{icon}</span>
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600, color: theme.green }}>
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Mis productos */}
      <section style={{ padding: "0 24px 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 24, color: theme.green, margin: 0 }}>
              Mis productos
            </h2>
            <button className="btn-primary" style={{ padding: "10px 24px", fontSize: 14 }} onClick={agregarProducto}>
              + Agregar producto
            </button>
          </div>

          {misProductos.length === 0 ? (
            <div style={{
              background: "white", borderRadius: 16, padding: "48px 24px",
              textAlign: "center", border: `1.5px dashed ${theme.greenLight}`,
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🌱</div>
              <p style={{ fontFamily: "'Crimson Pro', serif", fontSize: 22, color: theme.green, marginBottom: 8 }}>
                Aún no tienes productos
              </p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: theme.textMuted }}>
                Agrega tu primer producto para que los consumidores puedan encontrarte.
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 16 }}>
              {misProductos.map(p => (
                <div
                  key={p.id}
                  onClick={() => setProductoEditando(p)}
                  style={{
                    background: "white", borderRadius: 16, padding: "20px",
                    border: `1px solid ${theme.greenLight}33`,
                    cursor: "pointer", transition: "all 0.2s", position: "relative",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = theme.green;
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = `${theme.greenLight}33`;
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* Botón editar */}
                  <div style={{
                    position: "absolute", top: 12, right: 12,
                    background: theme.greenLight + "33", borderRadius: 8,
                    padding: "4px 8px", fontSize: 11,
                    fontFamily: "'Outfit', sans-serif", color: theme.green, fontWeight: 600,
                  }}>
                    ✏️ Editar
                  </div>

                  <div style={{ fontSize: 32, marginBottom: 8 }}>{p.emoji}</div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, color: theme.text, margin: "0 0 4px" }}>
                    {p.name}
                  </p>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: theme.green, fontWeight: 700 }}>
                    ${p.price}/kg
                  </p>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: theme.textMuted }}>
                    Stock: {p.stock} kg
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}