import { theme } from "../assets/theme";

export default function ProductCard({ product: p, addToCart, inCart, usuario, setAuthModal }) {
  return (
    <div className="product-card">
      <div style={{
        textAlign: "center", fontSize: 52, padding: "16px 0 12px",
        background: theme.cream, borderRadius: 12, marginBottom: 14
      }}>
        {p.emoji}
      </div>
      <div style={{ marginBottom: 8 }}>
        {p.fresh && (
          <span style={{
            background: theme.greenLight + "22", color: theme.greenMid,
            padding: "2px 8px", borderRadius: 50, fontFamily: "'Outfit', sans-serif",
            fontSize: 10, fontWeight: 600, letterSpacing: 1
          }}>
            ● FRESCO HOY
          </span>
        )}
      </div>
      <h3 style={{
        fontFamily: "'Crimson Pro', serif", fontSize: 18,
        fontWeight: 500, color: theme.text, marginBottom: 4
      }}>
        {p.name}
      </h3>
      <p style={{
        fontFamily: "'Outfit', sans-serif", fontSize: 12,
        color: theme.textMuted, marginBottom: 6
      }}>
        🏡 {p.farm}
      </p>
      <p style={{
        fontFamily: "'Outfit', sans-serif", fontSize: 12,
        color: theme.gray, lineHeight: 1.5, marginBottom: 14
      }}>
        {p.description}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <span style={{
            fontFamily: "'Crimson Pro', serif", fontSize: 22,
            fontWeight: 600, color: theme.green
          }}>
            ${p.price}
          </span>
          <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: theme.textMuted }}>
            /{p.unit}
          </span>
        </div>
       {usuario ? (
  <button
    className="btn-primary"
    style={{ padding: "8px 16px", fontSize: 13, background: inCart ? theme.greenMid : theme.terracotta }}
    onClick={() => addToCart(p)}
  >
    {inCart ? `+1 (${inCart.qty})` : "Añadir"}
  </button>
) : (
  <button
    className="btn-primary"
    style={{ padding: "8px 16px", fontSize: 13, background: theme.gray }}
    onClick={() => setAuthModal("login")}
  >
    🔒 Inicia sesión
  </button>
)}
      </div>
      <div style={{ marginTop: 10, display: "flex", gap: 6, alignItems: "center" }}>
        <div style={{ flex: 1, height: 3, background: theme.creamDark, borderRadius: 2 }}>
          <div style={{
            width: `${Math.min(100, (p.stock / 80) * 100)}%`,
            height: "100%",
            background: p.stock < 15 ? theme.terracotta : theme.greenLight,
            borderRadius: 2
          }} />
        </div>
        <span style={{
          fontFamily: "'Outfit', sans-serif", fontSize: 10,
          color: p.stock < 15 ? theme.terracotta : theme.textMuted
        }}>
          {p.stock < 15 ? "¡Últimas!" : `${p.stock} disp.`}
        </span>
      </div>
    </div>
  );
}