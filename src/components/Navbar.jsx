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
      borderBottom: scrolled ? `1px solid ${theme.creamDark}` : "1px solid transparent"
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", height: 72
      }}>

        {/* Logo */}
        <div
          onClick={() => setView("home")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, marginRight: "auto" }}
        >
          <span style={{ fontSize: 28 }}>🌿</span>
          <div>
            <div style={{
              fontFamily: "'Crimson Pro', serif", fontSize: 22,
              fontWeight: 600, color: theme.green, lineHeight: 1
            }}>
              CampoFresco
            </div>
            <div style={{
              fontFamily: "'Outfit', sans-serif", fontSize: 10,
              color: theme.greenLight, letterSpacing: "2px", textTransform: "uppercase"
            }}>
              Del campo a tu mesa
            </div>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: "flex", alignItems: "center", gap: 32, marginRight: 32 }}>
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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {usuario ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 4 }}>

              {/* Avatar — muestra logo si existe, inicial si no */}
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: theme.green, overflow: "hidden",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, color: "white"
              }}>
                {usuario.logo
                  ? <img src={usuario.logo} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  : usuario.nombre[0].toUpperCase()
                }
              </div>

              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: theme.brownLight, fontWeight: 500 }}>
                Hola, {usuario.nombre}
              </span>

              <button
                onClick={onSalir}
                style={{
                  background: "transparent", border: `1.5px solid ${theme.creamDark}`,
                  padding: "6px 14px", borderRadius: 50, cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif", fontSize: 12, color: theme.gray
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
                  padding: "8px 18px", borderRadius: 50, cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif", fontSize: 13, color: theme.brownLight
                }}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => setAuthModal("register")}
                style={{
                  background: theme.green, border: "none",
                  padding: "8px 18px", borderRadius: 50, cursor: "pointer",
                  fontFamily: "'Outfit', sans-serif", fontSize: 13, color: "white", fontWeight: 600
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
              padding: "10px 20px", borderRadius: 50, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 8,
              transition: "all 0.2s", marginLeft: 4
            }}
          >
            <span style={{ fontSize: 16 }}>🧺</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, fontWeight: 500, color: "white" }}>
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