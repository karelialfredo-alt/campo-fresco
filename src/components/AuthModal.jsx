import { useState } from "react";
import { theme } from "../assets/theme";

const PRODUCT_TAGS = ["Verduras", "Frutas", "Huevo", "Lácteos", "Hierbas", "Carnes", "Mariscos", "Granos", "Miel"];
const UNIT_OPTIONS = ["kg", "g", "litros", "ml", "piezas", "cajas"];
const PAYMENT_OPTIONS = [
  { id: "efectivo",      label: "Efectivo",      emoji: "💵" },
  { id: "tarjeta",       label: "Tarjeta",       emoji: "💳" },
  { id: "transferencia", label: "Transferencia", emoji: "📲" },
];

export default function AuthModal({
  authModal, setAuthModal, authStep, setAuthStep,
  authRol, setAuthRol, cerrarAuth, handleLogin, handleRegister,
}) {
  const [selectedTags, setSelectedTags]   = useState([]);
  const [selectedPago, setSelectedPago]   = useState("efectivo");
  const [logoPreview, setLogoPreview]     = useState(null);
  const [logoName, setLogoName]           = useState(null);

  const toggleTag = (tag) =>
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLogoName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => setLogoPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  // ✅ Lee todos los campos por name y agrega los extras del estado local
  const handleRegisterWrapped = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    handleRegister(e, {
      ...data,
      tags:       selectedTags,
      metodoPago: selectedPago,
      logo:       logoPreview,
    });
  };

  const inputStyle = {
    width: "100%", padding: "12px 16px",
    border: "1.5px solid #E5E7EB", borderRadius: 12,
    fontSize: 14, fontFamily: "'Outfit', sans-serif",
    outline: "none", marginBottom: 12, boxSizing: "border-box",
    color: theme.text, background: "white", transition: "border-color 0.2s",
  };

  const labelStyle = {
    fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600,
    letterSpacing: "0.06em", textTransform: "uppercase",
    color: theme.textMuted, marginBottom: 5, display: "block",
  };

  const sectionDivider = (text) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "18px 0 14px" }}>
      <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
      <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", color: theme.textMuted, whiteSpace: "nowrap" }}>
        {text}
      </span>
      <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
    </div>
  );

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
        zIndex: 200, display: "flex", alignItems: "center",
        justifyContent: "center", padding: 20, overflowY: "auto",
      }}
      onClick={cerrarAuth}
    >
      <div
        className="auth-modal"
        onClick={e => e.stopPropagation()}
        style={{ maxHeight: "92vh", overflowY: "auto", scrollbarWidth: "thin" }}
      >
        {/* Botón cerrar */}
        <button
          onClick={cerrarAuth}
          style={{
            position: "sticky", top: 0, float: "right",
            background: "none", border: "none", fontSize: 22,
            cursor: "pointer", color: "#999", lineHeight: 1, zIndex: 10,
          }}
        >
          ×
        </button>

        {/* ── LOGIN ─────────────────────────────────────────────────────────── */}
        {authModal === "login" && (
          <>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 44, marginBottom: 10 }}>🌿</div>
              <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 28, fontWeight: 500, color: theme.green, margin: 0 }}>
                Bienvenido de nuevo
              </h2>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: theme.textMuted, marginTop: 6 }}>
                Ingresa tus datos para continuar
              </p>
            </div>
            <form onSubmit={handleLogin}>
              <input className="auth-input" type="email" placeholder="Correo electrónico" required />
              <input className="auth-input" type="password" placeholder="Contraseña" required />
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: theme.terracotta, cursor: "pointer", textAlign: "right", marginTop: -6, marginBottom: 20 }}>
                ¿Olvidaste tu contraseña?
              </p>
              <button type="submit" className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: 15 }}>
                Entrar al catálogo →
              </button>
            </form>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: theme.textMuted, textAlign: "center", marginTop: 20 }}>
              ¿No tienes cuenta?{" "}
              <span onClick={() => { setAuthModal("register"); setAuthStep(1); }} style={{ color: theme.green, cursor: "pointer", fontWeight: 600 }}>
                Regístrate
              </span>
            </p>
          </>
        )}

        {/* ── REGISTER ──────────────────────────────────────────────────────── */}
        {authModal === "register" && (
          <>
            {/* PASO 1 — Elegir rol */}
            {authStep === 1 && (
              <>
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>👤</div>
                  <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 26, fontWeight: 500, color: theme.green, margin: 0 }}>
                    ¿Cómo usarás CampoFresco?
                  </h2>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: theme.textMuted, marginTop: 6 }}>
                    Elige tu tipo de cuenta
                  </p>
                </div>
                <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                  {[
                    { tipo: "consumidor", emoji: "🛒", label: "Consumidor", desc: "Compro alimentos frescos" },
                    { tipo: "agricultor", emoji: "🌾", label: "Agricultor", desc: "Vendo mis productos" },
                  ].map(({ tipo, emoji, label, desc }) => (
                    <button
                      key={tipo}
                      className="rol-btn"
                      onClick={() => setAuthRol(tipo)}
                      style={{
                        border: `2px solid ${authRol === tipo ? theme.green : "#E5E7EB"}`,
                        background: authRol === tipo ? "#F0F7E8" : "white",
                      }}
                    >
                      <div style={{ fontSize: 36, marginBottom: 8 }}>{emoji}</div>
                      <div style={{ fontWeight: 600, fontSize: 15, color: theme.green, marginBottom: 4 }}>{label}</div>
                      <div style={{ fontSize: 12, color: theme.textMuted }}>{desc}</div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => authRol && setAuthStep(2)}
                  className="btn-primary"
                  style={{ width: "100%", padding: "14px", fontSize: 15, opacity: authRol ? 1 : 0.4 }}
                >
                  Continuar →
                </button>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: theme.textMuted, textAlign: "center", marginTop: 16 }}>
                  ¿Ya tienes cuenta?{" "}
                  <span onClick={() => setAuthModal("login")} style={{ color: theme.green, cursor: "pointer", fontWeight: 600 }}>
                    Inicia sesión
                  </span>
                </p>
              </>
            )}

            {/* PASO 2 — Formulario según rol */}
            {authStep === 2 && (
              <>
                <div style={{ textAlign: "center", marginBottom: 22 }}>
                  <div style={{ fontSize: 36, marginBottom: 8 }}>
                    {authRol === "agricultor" ? "🌾" : "🛒"}
                  </div>
                  <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 24, fontWeight: 500, color: theme.green, margin: 0 }}>
                    {authRol === "agricultor" ? "Datos de tu granja" : "Tus datos de entrega"}
                  </h2>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: theme.textMuted, marginTop: 6 }}>
                    Cuenta de <strong>{authRol}</strong>
                  </p>
                </div>

                <form onSubmit={handleRegisterWrapped}>

                  {/* ── AGRICULTOR ────────────────────────────────────────── */}
                  {authRol === "agricultor" && (
                    <>
                      {sectionDivider("Información general")}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <div>
                          <label style={labelStyle}>Nombre / Razón social</label>
                          <input style={inputStyle} type="text" name="nombre" placeholder="Granja Los Pinos" required />
                        </div>
                        <div>
                          <label style={labelStyle}>Teléfono / Contacto</label>
                          <input style={inputStyle} type="tel" name="telefono" placeholder="776 123 4567" required />
                        </div>
                      </div>

                      <label style={labelStyle}>Correo electrónico</label>
                      <input style={inputStyle} type="email" name="email" placeholder="correo@ejemplo.com" required />

                      <label style={labelStyle}>Ubicación / Municipio</label>
                      <input style={inputStyle} type="text" name="ubicacion" placeholder="Ej. Huauchinango, Puebla" required />

                      <label style={labelStyle}>Contraseña</label>
                      <input style={inputStyle} type="password" name="password" placeholder="Mínimo 8 caracteres" required />

                      {sectionDivider("Foto de perfil / Logo")}
                      <div
                        onClick={() => document.getElementById("logo-upload").click()}
                        style={{
                          border: `1.5px dashed ${logoPreview ? theme.greenMid : "#D1D5DB"}`,
                          borderRadius: 14, padding: "16px 12px", textAlign: "center",
                          cursor: "pointer", background: logoPreview ? "#F0F7E8" : "#FAFAFA",
                          marginBottom: 14, transition: "all 0.2s",
                        }}
                      >
                        {logoPreview ? (
                          <img src={logoPreview} alt="preview" style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", margin: "0 auto 6px", display: "block" }} />
                        ) : (
                          <div style={{ fontSize: 28, marginBottom: 4 }}>📷</div>
                        )}
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: logoPreview ? theme.green : theme.textMuted, fontWeight: logoPreview ? 500 : 400 }}>
                          {logoName || "Subir foto o logo"}
                        </p>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: "#9CA3AF", marginTop: 2 }}>
                          JPG, PNG o WEBP · máx. 5 MB
                        </p>
                        <input id="logo-upload" type="file" accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />
                      </div>

                      {sectionDivider("Tipo de productos")}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                        {PRODUCT_TAGS.map(tag => (
                          <button
                            key={tag} type="button" onClick={() => toggleTag(tag)}
                            style={{
                              padding: "5px 13px", borderRadius: 50,
                              border: `1.5px solid ${selectedTags.includes(tag) ? theme.green : "#D1D5DB"}`,
                              background: selectedTags.includes(tag) ? theme.green : "white",
                              color: selectedTags.includes(tag) ? "white" : theme.textMuted,
                              fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 500,
                              cursor: "pointer", transition: "all 0.15s",
                            }}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>

                      {sectionDivider("Cantidad de producto")}
                      <label style={labelStyle}>Volumen disponible</label>
                      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                        <input style={{ ...inputStyle, flex: 2, marginBottom: 0 }} type="number" name="volumen" min="0" placeholder="Ej. 50" />
                        <select style={{ ...inputStyle, flex: 1, marginBottom: 0, cursor: "pointer" }} name="unidad">
                          {UNIT_OPTIONS.map(u => <option key={u}>{u}</option>)}
                        </select>
                      </div>
                    </>
                  )}

                  {/* ── CONSUMIDOR ────────────────────────────────────────── */}
                  {authRol === "consumidor" && (
                    <>
                      {sectionDivider("Información personal")}
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <div>
                          <label style={labelStyle}>Nombre completo</label>
                          <input style={inputStyle} type="text" name="nombre" placeholder="Tu nombre" required />
                        </div>
                        <div>
                          <label style={labelStyle}>Teléfono</label>
                          <input style={inputStyle} type="tel" name="telefono" placeholder="776 123 4567" required />
                        </div>
                      </div>

                      <label style={labelStyle}>Correo electrónico</label>
                      <input style={inputStyle} type="email" name="email" placeholder="correo@ejemplo.com" required />

                      <label style={labelStyle}>Contraseña</label>
                      <input style={inputStyle} type="password" name="password" placeholder="Mínimo 8 caracteres" required />

                      {sectionDivider("Dirección de entrega")}
                      <label style={labelStyle}>Calle y número</label>
                      <input style={inputStyle} type="text" name="calle" placeholder="Ej. Av. Hidalgo 45, Col. Centro" required />

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                        <div>
                          <label style={labelStyle}>Municipio</label>
                          <input style={inputStyle} type="text" name="municipio" placeholder="Ej. Huauchinango" required />
                        </div>
                        <div>
                          <label style={labelStyle}>Código postal</label>
                          <input style={inputStyle} type="text" name="cp" placeholder="73160" maxLength={5} required />
                        </div>
                      </div>

                      <label style={labelStyle}>Referencias</label>
                      <textarea
                        style={{ ...inputStyle, resize: "vertical", minHeight: 64, lineHeight: 1.5 }}
                        name="referencias"
                        placeholder="Ej. Casa azul con portón negro, frente al parque..."
                      />

                      {sectionDivider("Método de pago")}
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginBottom: 14 }}>
                        {PAYMENT_OPTIONS.map(({ id, label, emoji }) => (
                          <button
                            key={id} type="button" onClick={() => setSelectedPago(id)}
                            style={{
                              padding: "12px 8px", borderRadius: 12,
                              border: `1.5px solid ${selectedPago === id ? theme.green : "#E5E7EB"}`,
                              background: selectedPago === id ? "#F0F7E8" : "white",
                              cursor: "pointer", textAlign: "center", transition: "all 0.15s",
                            }}
                          >
                            <div style={{ fontSize: 22, marginBottom: 4 }}>{emoji}</div>
                            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, fontWeight: 500, color: selectedPago === id ? theme.green : theme.textMuted }}>
                              {label}
                            </div>
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  <button type="submit" className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: 15, marginTop: 6 }}>
                    Crear mi cuenta ✓
                  </button>
                </form>

                <p
                  onClick={() => setAuthStep(1)}
                  style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: theme.textMuted, textAlign: "center", marginTop: 14, cursor: "pointer" }}
                >
                  ← Regresar
                </p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}