import { useState, useEffect } from "react";
import { theme, globalStyles } from "./assets/theme";
import Navbar from "./components/Navbar";
import CartPanel from "./components/CartPanel";
import AuthModal from "./components/AuthModal";
import Notification from "./components/Notification";
import HomePage from "./pages/HomePage";
import FarmsPage from "./pages/FarmsPage";
import ShopPage from "./pages/ShopPage";
import FarmerDashboard from "./pages/FarmerDashboard";

const categories = ["Todos", "Verduras", "Frutas", "Lácteos", "Miel"];

const getLS = (key, fallback = null) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};
const setLS = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch {}
};
const removeLS = (key) => {
  try { localStorage.removeItem(key); }
  catch {}
};

export default function App() {
  const [view, setView] = useState("home");
  const [farms, setFarms] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [cartOpen, setCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [notification, setNotification] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [authModal, setAuthModal] = useState(null);
  const [authStep, setAuthStep] = useState(1);
  const [authRol, setAuthRol] = useState(null);

  const cerrarAuth = () => { setAuthModal(null); setAuthStep(1); setAuthRol(null); };

  // ✅ Restaurar sesión al recargar
  useEffect(() => {
    const sesion = getLS("cf_sesion");
    if (sesion) {
      setUsuario(sesion);
      if (sesion.rol === "agricultor") setView("farmer");
    }
  }, []);

  // ✅ Login
  const handleLogin = (e) => {
    e.preventDefault();
    const email    = e.target[0].value.trim();
    const password = e.target[1].value;

    const usuarios = getLS("cf_usuarios", []);
    const encontrado = usuarios.find(
      u => u.email === email && u.password === password
    );

    if (!encontrado) {
      setNotification("❌ Correo o contraseña incorrectos");
      setTimeout(() => setNotification(null), 2500);
      return;
    }

    setLS("cf_sesion", encontrado);
    setUsuario(encontrado);
    cerrarAuth();
    if (encontrado.rol === "agricultor") setView("farmer");
    setNotification(`👋 Bienvenido, ${encontrado.nombre}`);
    setTimeout(() => setNotification(null), 2500);
  };

  // ✅ Registro
  const handleRegister = (e, datosCompletos) => {
    e.preventDefault();

    const usuarios = getLS("cf_usuarios", []);

    if (usuarios.find(u => u.email === datosCompletos.email)) {
      setNotification("❌ Ese correo ya está registrado");
      setTimeout(() => setNotification(null), 2500);
      return;
    }

    const nuevoUsuario = {
      id: Date.now(),
      nombre:      datosCompletos.nombre,
      email:       datosCompletos.email,
      password:    datosCompletos.password,
      rol:         authRol,
      telefono:    datosCompletos.telefono    ?? null,
      ubicacion:   datosCompletos.ubicacion   ?? null,
      tags:        datosCompletos.tags        ?? [],
      logo:        datosCompletos.logo        ?? null,
      calle:       datosCompletos.calle       ?? null,
      municipio:   datosCompletos.municipio   ?? null,
      cp:          datosCompletos.cp          ?? null,
      referencias: datosCompletos.referencias ?? null,
      metodoPago:  datosCompletos.metodoPago  ?? null,
      fechaRegistro: new Date().toISOString(),
    };

    setLS("cf_usuarios", [...usuarios, nuevoUsuario]);
    setLS("cf_sesion", nuevoUsuario);
    setUsuario(nuevoUsuario);
    cerrarAuth();
    if (authRol === "agricultor") setView("farmer");
    setNotification(`🌿 ¡Cuenta creada! Bienvenido, ${nuevoUsuario.nombre}`);
    setTimeout(() => setNotification(null), 2500);
  };

  // ✅ Cerrar sesión
  const handleSalir = () => {
    removeLS("cf_sesion");
    setUsuario(null);
    setView("home");
    setNotification("👋 Sesión cerrada");
    setTimeout(() => setNotification(null), 2000);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/productos")
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error cargando productos:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3001/api/granjas")
      .then(res => res.json())
      .then(data => setFarms(data))
      .catch(err => console.error("Error cargando granjas:", err));
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
    setNotification(`${product.emoji} ${product.name} añadido al carrito`);
    setTimeout(() => setNotification(null), 2000);
  };

  const updateQty = (id, delta) => {
    setCart(prev =>
      prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
         .filter(i => i.qty > 0)
    );
  };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const filteredProducts = products.filter(p => {
    const matchCat    = activeCategory === "Todos" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        p.farm.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFarm   = selectedFarm === null || p.farmId === selectedFarm;
    return matchCat && matchSearch && matchFarm;
  });

  const handleOrder = () => {
    setCart([]);
    setCartOpen(false);
    setOrderSuccess(true);
    setTimeout(() => { setOrderSuccess(false); setView("home"); }, 3500);
  };

  return (
    <div style={{ fontFamily: "'Crimson Pro', 'Georgia', serif", background: theme.cream, minHeight: "100vh", color: theme.text }}>
      <style>{globalStyles(theme)}</style>

      <Notification message={notification} />

      {orderSuccess && (
        <div style={{
          position: "fixed", inset: 0, background: theme.cream, zIndex: 300,
          display: "flex", flexDirection: "column", alignItems: "center",
          justifyContent: "center", gap: 20, animation: "fadeIn 0.4s ease"
        }}>
          <div style={{ fontSize: 80 }}>🌿</div>
          <h2 style={{ fontFamily: "'Crimson Pro', serif", fontSize: 36, color: theme.green, fontWeight: 500 }}>
            ¡Pedido confirmado!
          </h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", color: theme.textMuted, fontSize: 16, textAlign: "center", maxWidth: 320 }}>
            Tu pedido ha sido enviado a los productores. Recibirás tus alimentos frescos mañana.
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center", background: theme.greenLight + "22", padding: "10px 20px", borderRadius: 50, marginTop: 8 }}>
            <span style={{ fontSize: 18 }}>🚗</span>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: 14, color: theme.green, fontWeight: 500 }}>
              Entrega estimada: 9:00 – 11:00 AM
            </span>
          </div>
        </div>
      )}

      {cartOpen && (
        <CartPanel
          cart={cart}
          updateQty={updateQty}
          cartTotal={cartTotal}
          cartCount={cartCount}
          setCartOpen={setCartOpen}
          setView={setView}
          handleOrder={handleOrder}
        />
      )}

      {authModal && (
        <AuthModal
          authModal={authModal}
          setAuthModal={setAuthModal}
          authStep={authStep}
          setAuthStep={setAuthStep}
          authRol={authRol}
          setAuthRol={setAuthRol}
          cerrarAuth={cerrarAuth}
          handleLogin={handleLogin}
          handleRegister={handleRegister}
        />
      )}

      <Navbar
        view={view}
        setView={setView}
        setSelectedFarm={setSelectedFarm}
        scrolled={scrolled}
        usuario={usuario}
        setUsuario={setUsuario}
        setAuthModal={setAuthModal}
        cartCount={cartCount}
        setCartOpen={setCartOpen}
        onSalir={handleSalir}
      />

      {view === "home" && (
        <HomePage setView={setView} usuario={usuario} setAuthModal={setAuthModal} />
      )}
      {view === "farmer" && (
        <FarmerDashboard usuario={usuario} setView={setView} farms={farms} products={products} />
      )}
      {view === "farms" && (
        <FarmsPage
          farms={farms} setView={setView}
          setSelectedFarm={setSelectedFarm}
          allProducts={products} addToCart={addToCart}
        />
      )}
      {view === "shop" && (
        <ShopPage
          products={filteredProducts} categories={categories}
          activeCategory={activeCategory} setActiveCategory={setActiveCategory}
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
          addToCart={addToCart} selectedFarm={selectedFarm}
          setSelectedFarm={setSelectedFarm} farms={farms} cart={cart}
          usuario={usuario} setAuthModal={setAuthModal}
        />
      )}
    </div>
  );
}