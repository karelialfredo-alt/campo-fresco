import { useEffect, useState } from "react";
import { theme } from "../assets/theme";

const steps = [
  { icon: "🔍", step: "1", title: "Explora", desc: "Navega productos frescos de granjas cerca de ti" },
  { icon: "🧺", step: "2", title: "Selecciona", desc: "Llena tu canasta con lo que necesitas" },
  { icon: "🤝", step: "3", title: "Nosotros coordinamos", desc: "Confirmamos disponibilidad directamente con el productor" },
];

const getLS = (key, fallback = null) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

export default function HomePage({ setView, usuario, setAuthModal }) {
  const esConsumidor = usuario?.rol === "consumidor";

  const [granjas, setGranjas]   = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Leer granjas: cada agricultor registrado es una "granja"
    const usuarios   = getLS("cf_usuarios", []);
    const agricultores = usuarios.filter(u => u.rol === "agricultor");
    setGranjas(agricultores);

    // Leer productos guardados
    setProductos(getLS("cf_productos", []));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: "88vh", display: "flex", alignItems: "center",
        position: "relative", overflow: "hidden",
        background: `linear-gradient(135deg, #1A3A0A 0%, ${theme.green} 50%, ${theme.greenMid} 100%)`
      }}>
        <div style={{
          position: "absolute", inset: 0, opacity: 0.06,
          backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
        <div style={{
          position: "absolute", right: -80, top: "50%", transform: "translateY(-50%)",
          fontSize: 320, opacity: 0.07, userSelect: "none", pointerEvents: "none"
        }}>
          🌿
        </div>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 24px", position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: 640, animation: "slideUp 0.7s ease both" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
              padding: "6px 16px", borderRadius: 50, marginBottom: 28
            }}>
              <span style={{ fontSize: 14 }}>🌱</span>
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.9)", fontWeight: 500, letterSpacing: 1 }}>
                Granjas locales · {granjas.length} productores registrados
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Crimson Pro', serif",
              fontSize: "clamp(40px, 6vw, 72px)",
              fontWeight: 400, color: "white", lineHeight: 1.1, marginBottom: 24
            }}>
              Alimentos frescos<br />
              <span style={{ color: "#A8D87A", fontStyle: "italic" }}>directo del campo</span><br />
              a tu mesa.
            </h1>

            <p style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 17,
              color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 36, maxWidth: 500
            }}>
              Conectamos familias con productores locales
            </p>

            <div style={{
              display: "flex", gap: 32, marginTop: 48, paddingTop: 32,
              borderTop: "1px solid rgba(255,255,255,0.15)"
            }}>
              {esConsumidor ? (
                <>
                  <button onClick={() => setView("shop")} style={{
                    padding: "14px 32px", borderRadius: 50,
                    background: theme.terracotta, color: "white",
                    border: "none", cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600,
                  }}>
                    Ver tienda →
                  </button>
                  <button onClick={() => setView("farms")} style={{
                    padding: "14px 32px", borderRadius: 50,
                    background: "transparent", color: "white",
                    border: "2px solid rgba(255,255,255,0.5)", cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif", fontSize: 15,
                  }}>
                    Explorar granjas
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => setAuthModal("register")} style={{
                    padding: "14px 32px", borderRadius: 50,
                    background: theme.terracotta, color: "white",
                    border: "none", cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 600,
                  }}>
                    Comenzar gratis →
                  </button>
                  <button onClick={() => setAuthModal("login")} style={{
                    padding: "14px 32px", borderRadius: 50,
                    background: "transparent", color: "white",
                    border: "2px solid rgba(255,255,255,0.5)", cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif", fontSize: 15,
                  }}>
                    Iniciar sesión
                  </button>
                </>
              )}
            </div>

            {/* Bienvenida consumidor */}
            {esConsumidor && (
              <div style={{
                marginTop: 32, background: "rgba(255,255,255,0.08)",
                borderRadius: 20, padding: "24px 28px",
                border: "1px solid rgba(255,255,255,0.15)"
              }}>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>
                  Bienvenido de vuelta
                </p>
                <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 28, fontWeight: 500, color: "white", margin: "0 0 6px" }}>
                  Hola, {usuario.nombre} 👋
                </h2>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 16 }}>
                  ¿Qué llevas hoy a tu mesa?
                </p>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {[
                    { emoji: "🥬", label: "Verduras" },
                    { emoji: "🍎", label: "Frutas" },
                    { emoji: "🥛", label: "Lácteos" },
                    { emoji: "🍯", label: "Miel" },
                  ].map(({ emoji, label }) => (
                    <button key={label} onClick={() => setView("shop")} style={{
                      padding: "8px 18px", borderRadius: 50,
                      border: "1.5px solid rgba(255,255,255,0.3)",
                      background: "rgba(255,255,255,0.1)", cursor: "pointer",
                      fontFamily: "'Outfit', sans-serif", fontSize: 13,
                      color: "white", fontWeight: 500,
                      display: "flex", alignItems: "center", gap: 6,
                    }}>
                      {emoji} {label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Granjas registradas (solo consumidor logueado) ── */}
      {esConsumidor && granjas.length > 0 && (
        <section style={{ background: "white", padding: "64px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <p className="section-label">Productores activos</p>
                <h2 className="section-title" style={{ marginTop: 8 }}>Granjas en la plataforma</h2>
              </div>
              <button onClick={() => setView("farms")} style={{
                background: "transparent", border: `1.5px solid ${theme.greenLight}`,
                padding: "10px 22px", borderRadius: 50, cursor: "pointer",
                fontFamily: "'Outfit', sans-serif", fontSize: 13, color: theme.green, fontWeight: 600,
              }}>
                Ver todas →
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
              {granjas.map(granja => (
                <div key={granja.id} style={{
                  background: theme.cream, borderRadius: 20, padding: "24px",
                  border: `1px solid ${theme.greenLight}33`,
                  transition: "all 0.2s", cursor: "pointer",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = theme.green; e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${theme.greenLight}33`; e.currentTarget.style.boxShadow = "none"; }}
                  onClick={() => setView("farms")}
                >
                  {/* Avatar / logo */}
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <div style={{
                      width: 52, height: 52, borderRadius: "50%",
                      background: theme.green, overflow: "hidden",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 20, fontWeight: 700, color: "white",
                      fontFamily: "'Outfit', sans-serif", flexShrink: 0,
                    }}>
                      {granja.logo
                        ? <img src={granja.logo} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        : granja.nombre[0].toUpperCase()
                      }
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: 15, color: theme.green, margin: 0 }}>
                        {granja.nombre}
                      </p>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: theme.textMuted, margin: 0 }}>
                        📍 {granja.ubicacion || "Ubicación no especificada"}
                      </p>
                    </div>
                  </div>

                  {/* Tags de productos */}
                  {granja.tags?.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                      {granja.tags.slice(0, 4).map(tag => (
                        <span key={tag} style={{
                          padding: "3px 10px", borderRadius: 50,
                          background: theme.green + "18",
                          fontFamily: "'Outfit', sans-serif", fontSize: 11,
                          color: theme.green, fontWeight: 600,
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <button onClick={e => { e.stopPropagation(); setView("shop"); }} style={{
                    width: "100%", padding: "10px", borderRadius: 10,
                    background: theme.green, border: "none", cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif", fontSize: 13,
                    fontWeight: 600, color: "white",
                  }}>
                    Ver productos
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Productos disponibles (solo consumidor) ── */}
      {esConsumidor && productos.length > 0 && (
        <section style={{ background: theme.cream, padding: "64px 24px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
              <div>
                <p className="section-label">Disponible ahora</p>
                <h2 className="section-title" style={{ marginTop: 8 }}>Productos frescos</h2>
              </div>
              <button onClick={() => setView("shop")} style={{
                background: "transparent", border: `1.5px solid ${theme.greenLight}`,
                padding: "10px 22px", borderRadius: 50, cursor: "pointer",
                fontFamily: "'Outfit', sans-serif", fontSize: 13, color: theme.green, fontWeight: 600,
              }}>
                Ver tienda completa →
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }}>
              {productos.slice(0, 8).map(p => (
                <div key={p.id} onClick={() => setView("shop")} style={{
                  background: "white", borderRadius: 16, padding: "20px 16px",
                  border: `1px solid ${theme.greenLight}33`,
                  cursor: "pointer", textAlign: "center", transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = theme.green; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = `${theme.greenLight}33`; e.currentTarget.style.transform = "none"; }}
                >
                  <div style={{ fontSize: 40, marginBottom: 10 }}>{p.emoji}</div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: 14, color: theme.text, margin: "0 0 4px" }}>
                    {p.name}
                  </p>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: theme.green, fontWeight: 700, margin: 0 }}>
                    ${p.price}/kg
                  </p>
                  {p.stock > 0 && (
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 11, color: theme.textMuted, margin: "4px 0 0" }}>
                      Stock: {p.stock} kg
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How it works */}
      <section style={{ background: "white", padding: "80px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="section-label">Cómo funciona</p>
            <h2 className="section-title" style={{ marginTop: 8 }}>Del productor a tu hogar</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
            {steps.map(({ icon, step, title, desc }) => (
              <div key={step} style={{ textAlign: "center" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%", background: theme.cream,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px", fontSize: 30, position: "relative"
                }}>
                  {icon}
                  <span style={{
                    position: "absolute", top: -4, right: -4, width: 22, height: 22,
                    borderRadius: "50%", background: theme.terracotta, color: "white",
                    fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center"
                  }}>
                    {step}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 22, fontWeight: 500, color: theme.green, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: theme.textMuted, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", background: theme.creamDark, textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🌱</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>¿Listo para comer mejor?</h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: theme.textMuted, lineHeight: 1.7, marginBottom: 32 }}>
            Únete a cientos de familias que ya disfrutan de alimentos frescos.
          </p>
          {esConsumidor ? (
            <button onClick={() => setView("shop")} className="btn-primary" style={{ padding: "16px 40px", fontSize: 16 }}>
              Ir a la tienda →
            </button>
          ) : (
            <button onClick={() => setAuthModal("register")} className="btn-primary" style={{ padding: "16px 40px", fontSize: 16 }}>
              Crear cuenta gratis →
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: theme.green, padding: "40px 24px", color: "rgba(255,255,255,0.6)" }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 16
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 22 }}>🌱</span>
            <span style={{ fontFamily: "'Crimson Pro', serif", fontSize: 20, color: "white" }}>CampoFresco</span>
          </div>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13 }}>© 2025 CampoFresco · Puebla</p>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13 }}>hola@campofresco.mx</p>
        </div>
      </footer>
    </div>
  );
}