import { theme } from "../assets/theme";

export default function Navbar({
  view, setView, setSelectedFarm, scrolled,
  usuario, setUsuario, setAuthModal,
  cartCount, setCartOpen, onSalir,
}) {
  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 50,
      background: scrolled ? "rgba(250,246,237,0.95)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      transition: "all 0.3s",
      borderBottom: scrolled ? `1px solid ${theme.creamDark}` : "1px solid transparent",
      width: "100%", boxSizing: "border-box"
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 16px",
        display: "flex", alignItems: "center", height: 64,
        width: "100%", boxSizing: "border-box"
      }}>

        {/* Logo */}
        <div
          onClick={() => setView("home")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8, marginRight: "auto", minWidth: 0 }}
        >
          <span style={{ fontSize: 24, flexShrink: 0 }}>🌿</span>
          <div style={{ minWidth: 0 }}>
            <div style={{
              fontFamily: "'Crimson Pro', serif", fontSize: 18,
              fontWeight: 600, color: theme.green, lineHeight: 1,
              whiteSpace: "nowrap"
            }}>
              CampoFresco
            </div>
            <div className="hide-mobile" style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 9,
              color: theme.greenLight, letterSpacing: "2px", textTransform: "uppercase"
            }}>
              Del campo a tu mesa
            </div>
          </div>
        </div>

        {/* Links — ocultos en móvil */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 32, marginRight: 24 }}>
          {[["home", "Inicio"]].map(([v, label]) => (
            <span
              key={v}
              className="nav-link"
              onClick={() => { setView(v); setSelectedFarm(null); }}
              style={{
                fontFamily: "'Outfit', sans-serif", fontSize: 15, fontWeight: 500,
                color: view === v ? theme.terracotta : theme.brownLight,
                borderBottom: view === v ? `2px solid ${theme.terracotta}` : "2px solid transparent",
                paddingBottom: 2, transition: "all 0.2s", cursor: "pointer"
              }}
            >
              {label}
            </span>
          ))}
        </div>

        {/* Auth + Cart */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          {usuario ? (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {/* Avatar */}
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: theme.green, overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, color: "white",
                flexShrink: 0
              }}>
                {usuario.logo
                  ? <img src={usuario.logo} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : usuario.nombre[0].toUpperCase()
                }
              </div>

              <span className="hide-mobile" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: theme.brownLight, fontWeight: 500 }}>
                Hola, {usuario.nombre}
              </span>

              <button
                onClick={onSalir}
                style={{
                  background: "transparent", border: `1.5px solid ${theme.creamDark}`,
                  padding: "6px 12px", borderRadius: 50, cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif", fontSize: 12, color: theme.gray,
                  whiteSpace: "nowrap"
                }}
              >
                Salir
              </button>
            </div>
          ) : (
            <>
              <button
                onClick={() => setAuthModal("login")}
                style={{
                  background: "transparent", border: `1.5px solid ${theme.creamDark}`,
                  padding: "7px 12px", borderRadius: 50, cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif", fontSize: 12, color: theme.brownLight,
                  whiteSpace: "nowrap"
                }}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => setAuthModal("register")}
                style={{
                  background: theme.green, border: "none",
                  padding: "7px 12px", borderRadius: 50, cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "white", fontWeight: 600,
                  whiteSpace: "nowrap"
                }}
              >
                Registrarse
              </button>
            </>
          )}

          {/* Canasta */}
          <button
            onClick={() => setCartOpen(true)}
            style={{
              position: "relative", background: theme.green, border: "none",
              padding: "8px 14px", borderRadius: 50, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
              transition: "all 0.2s", flexShrink: 0
            }}
          >
            <span style={{ fontSize: 16 }}>🧺</span>
            <span className="hide-mobile" style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500, color: "white" }}>
              Canasta
            </span>
            {cartCount > 0 && (
              <span style={{
                position: "absolute", top: -6, right: -6, background: theme.terracotta,
                color: "white", borderRadius: "50%", width: 20, height: 20,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Outfit', sans-serif", fontSize: 11, fontWeight: 700
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
