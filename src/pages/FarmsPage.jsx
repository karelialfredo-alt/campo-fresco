import { useEffect, useState } from "react";
import { theme } from "../assets/theme";

const getLS = (key, fallback = null) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

export default function FarmsPage({ farms, setView, setSelectedFarm, allProducts, addToCart }) {
  const [granjas, setGranjas]     = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Granjas del backend (si hay) + agricultores registrados en localStorage
    const usuarios     = getLS("cf_usuarios", []);
    const agricultores = usuarios.filter(u => u.rol === "agricultor");

    // Convertir agricultores al formato de granja
    const granjasLS = agricultores.map(a => ({
      id:        a.id,
      name:      a.nombre,
      location:  a.ubicacion || "Puebla",
      distance:  "—",
      rating:    4.5,
      reviews:   0,
      badge:     "Nuevo productor",
      specialty: a.tags?.join(", ") || "Productos del campo",
      image:     a.logo || null,
      iniciales: a.nombre[0].toUpperCase(),
      color:     theme.green,
      tags:      a.tags || [],
      email:     a.email,
    }));

    // Mezclar con granjas del backend si las hay
    const todasLasGranjas = [
      ...farms,
      ...granjasLS.filter(g => !farms.find(f => f.id === g.id)),
    ];

    setGranjas(todasLasGranjas);
    setProductos(getLS("cf_productos", []));
  }, [farms]);

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px" }}>
      <div style={{ marginBottom: 48 }}>
        <p className="section-label">Productores locales</p>
        <h1 className="section-title" style={{ marginTop: 8 }}>Conoce nuestras granjas</h1>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, color: theme.textMuted, marginTop: 12, maxWidth: 520 }}>
          Trabajamos únicamente con productores verificados que comparten nuestros valores de agricultura sostenible.
        </p>
      </div>

      {granjas.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: theme.textMuted }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🌾</div>
          <h3 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 26, color: theme.green, marginBottom: 8 }}>
            Aún no hay granjas registradas
          </h3>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 15 }}>
            Pronto se unirán productores locales a la plataforma.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gap: 24 }}>
          {granjas.map(granja => {
            const farmProducts = allProducts?.filter(p => p.farmId === granja.id) ?? productos;
            return (
              <div key={granja.id} style={{
                background: "white", borderRadius: 24, overflow: "hidden",
                border: `1px solid ${theme.greenLight}33`,
                display: "grid", gridTemplateColumns: "240px 1fr",
              }}>
                {/* Columna izquierda */}
                <div style={{
                  background: `linear-gradient(135deg, #1A3A0A, ${theme.green})`,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  padding: 32, gap: 12,
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: 80, height: 80, borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)", overflow: "hidden",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 36, fontWeight: 700, color: "white",
                    fontFamily: "'Outfit', sans-serif",
                  }}>
                    {granja.image
                      ? <img src={granja.image} alt="logo" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      : (granja.iniciales || granja.name?.[0]?.toUpperCase() || "🌾")
                    }
                  </div>

                  {/* Estrellas */}
                  <div style={{ display: "flex", gap: 3 }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{ color: i < Math.floor(granja.rating ?? 4) ? "#FFD700" : "rgba(255,255,255,0.3)", fontSize: 14 }}>★</span>
                    ))}
                  </div>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.7)", textAlign: "center" }}>
                    {granja.rating ?? "4.5"} · {granja.reviews ?? 0} reseñas
                  </p>

                  <span style={{
                    background: "rgba(255,255,255,0.15)", color: "white",
                    padding: "4px 12px", borderRadius: 50,
                    fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 500,
                  }}>
                    {granja.badge ?? "Productor local"}
                  </span>
                </div>

                {/* Columna derecha */}
                <div style={{ padding: 28 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div>
                      <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 26, fontWeight: 500, color: theme.green, margin: 0 }}>
                        {granja.name ?? granja.nombre}
                      </h2>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, color: theme.textMuted, marginTop: 4 }}>
                        📍 {granja.location ?? granja.ubicacion ?? "Puebla"}
                        {granja.distance && granja.distance !== "—" ? ` · ${granja.distance}` : ""}
                      </p>
                    </div>
                    <button
                      className="btn-primary"
                      style={{ flexShrink: 0, fontSize: 13, padding: "10px 20px" }}
                      onClick={() => { setSelectedFarm?.(granja.id); setView("shop"); }}
                    >
                      Ver productos
                    </button>
                  </div>

                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: theme.textMuted, lineHeight: 1.7, marginBottom: 16 }}>
                    Especializados en{" "}
                    <strong style={{ color: theme.brownLight }}>
                      {granja.specialty ?? granja.tags?.join(", ") ?? "productos del campo"}
                    </strong>.{" "}
                    Todos nuestros productos se cosechan o preparan el mismo día de entrega para garantizar la máxima frescura.
                  </p>

                  {/* Tags */}
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {(granja.tags ?? []).map(tag => (
                      <span key={tag} style={{
                        background: theme.cream, padding: "5px 12px", borderRadius: 50,
                        fontFamily: "'Outfit', sans-serif", fontSize: 12, color: theme.green, fontWeight: 600,
                      }}>
                        {tag}
                      </span>
                    ))}
                    {/* Productos del backend si los hay */}
                    {farmProducts.slice(0, 4).map(p => (
                      <span key={p.id} style={{
                        background: theme.cream, padding: "5px 12px", borderRadius: 50,
                        fontFamily: "'Outfit', sans-serif", fontSize: 12, color: theme.brownLight,
                      }}>
                        {p.emoji} {p.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}