import { theme } from "../assets/theme";

export default function CartPanel({ cart, updateQty, cartTotal, cartCount, setCartOpen, setView, handleOrder }) {
  return (
    <>
      <div className="overlay" onClick={() => setCartOpen(false)} />
      <div className="cart-panel">
        {/* Encabezado */}
        <div style={{
          padding: "24px 24px 16px", borderBottom: `1px solid ${theme.creamDark}`,
          display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div>
            <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 26, fontWeight: 500, color: theme.green }}>
              Tu canasta
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: theme.textMuted, marginTop: 2 }}>
              {cartCount} productos de granjas locales
            </p>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            style={{
              background: theme.grayLight, border: "none", width: 36, height: 36,
              borderRadius: "50%", cursor: "pointer", fontSize: 18,
              display: "flex", alignItems: "center", justifyContent: "center"
            }}
          >
            ×
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 60, color: theme.textMuted }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🧺</div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15 }}>Tu canasta está vacía</p>
              <button
                className="btn-outline"
                style={{ marginTop: 20 }}
                onClick={() => { setCartOpen(false); setView("shop"); }}
              >
                Ver productos
              </button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {cart.map(item => (
                <div key={item.id} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  padding: "14px 0", borderBottom: `1px solid ${theme.grayLight}`
                }}>
                  <div style={{ fontSize: 32, flexShrink: 0 }}>{item.emoji}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500, color: theme.text }}>
                      {item.name}
                    </p>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: theme.textMuted }}>
                      {item.farm}
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                    <span style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: 14,
                      fontWeight: 500, minWidth: 20, textAlign: "center"
                    }}>
                      {item.qty}
                    </span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 600, color: theme.green }}>
                      ${(item.price * item.qty).toFixed(0)}
                    </p>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: theme.textMuted }}>
                      ${item.price}/{item.unit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: `1px solid ${theme.creamDark}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: theme.textMuted }}>Subtotal</span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14 }}>${cartTotal.toFixed(0)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: theme.textMuted }}>Entrega</span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: theme.greenMid }}>Gratis 🎉</span>
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between", marginBottom: 20,
              paddingTop: 12, borderTop: `1px solid ${theme.creamDark}`
            }}>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 600 }}>Total</span>
              <span style={{ fontFamily: "'Crimson Pro', serif", fontSize: 22, fontWeight: 600, color: theme.green }}>
                ${cartTotal.toFixed(0)} MXN
              </span>
            </div>
            <button
              className="btn-primary"
              style={{ width: "100%", padding: "15px", fontSize: 16 }}
              onClick={handleOrder}
            >
              Confirmar pedido ✓
            </button>
            <p style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 11,
              color: theme.textMuted, textAlign: "center", marginTop: 10
            }}>
              Pago al recibir tu pedido
            </p>
          </div>
        )}
      </div>
    </>
  );
}