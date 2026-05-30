import { theme } from "../assets/theme";
import ProductCard from "../components/ProductCard";

export default function ShopPage({ products, categories, activeCategory, setActiveCategory, searchTerm, setSearchTerm, addToCart, selectedFarm, setSelectedFarm, farms, cart, usuario, setAuthModal }) {
  const currentFarm = selectedFarm ? farms.find(f => f.id === selectedFarm) : null;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
      {currentFarm && (
        <div style={{
          background: currentFarm.color, borderRadius: 16, padding: "20px 24px",
          marginBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "center"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 36 }}>{currentFarm.image}</span>
            <div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>
                Mostrando productos de
              </p>
              <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 22, color: "white", fontWeight: 500 }}>
                {currentFarm.name}
              </h2>
            </div>
          </div>
          <button
            onClick={() => setSelectedFarm(null)}
            style={{
              background: "rgba(255,255,255,0.2)", border: "none",
              padding: "8px 16px", borderRadius: 50, cursor: "pointer",
              color: "white", fontFamily: "'Outfit', sans-serif", fontSize: 13
            }}
          >
            Ver todo ×
          </button>
        </div>
      )}

      {!currentFarm && (
        <div style={{ marginBottom: 36 }}>
          <p className="section-label">Tienda</p>
          <h1 className="section-title" style={{ marginTop: 8 }}>Productos frescos</h1>
        </div>
      )}

      {/* Search + filters */}
      <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ position: "relative", flex: "1 1 260px" }}>
          <span style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: theme.gray }}>🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Buscar productos o granjas..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {categories.map(cat => (
            <span
              key={cat}
              className="chip"
              onClick={() => setActiveCategory(cat)}
              style={{
                background: activeCategory === cat ? theme.green : "white",
                color: activeCategory === cat ? "white" : theme.brownLight,
                border: `1.5px solid ${activeCategory === cat ? theme.green : theme.creamDark}`
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: theme.textMuted }}>
          {products.length} productos disponibles
        </p>
      </div>

      {products.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0", color: theme.textMuted }}>
          <div style={{ fontSize: 56, marginBottom: 16 }}>🥦</div>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16 }}>
            No encontramos productos con esa búsqueda
          </p>
          <button
            className="btn-outline"
            style={{ marginTop: 20 }}
            onClick={() => { setSearchTerm(""); setActiveCategory("Todos"); }}
          >
            Limpiar filtros
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
          {products.map(p => {
            const inCart = cart.find(i => i.id === p.id);
            return <ProductCard key={p.id} product={p} addToCart={addToCart} inCart={inCart} usuario={usuario} setAuthModal={setAuthModal}/>;
          })}
        </div>
      )}
    </div>
  );
}