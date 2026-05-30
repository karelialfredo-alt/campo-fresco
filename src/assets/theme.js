export const theme = {
  green: "#2D5016",
  greenMid: "#4A7C2F",
  greenLight: "#7BAE5C",
  cream: "#FAF6ED",
  creamDark: "#F0E8D5",
  terracotta: "#C85A2A",
  terracottaLight: "#E8845A",
  brown: "#5C3D1E",
  brownLight: "#8B6340",
  white: "#FFFFFF",
  gray: "#6B7280",
  grayLight: "#F3F4F6",
  text: "#1A1A1A",
  textMuted: "#6B7280",
};

export const globalStyles = (theme) => `
  @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@300;400;500;600&family=Outfit:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: ${theme.cream}; }
  ::-webkit-scrollbar-thumb { background: ${theme.greenLight}; border-radius: 3px; }
  .nav-link { transition: color 0.2s; cursor: pointer; }
  .nav-link:hover { color: ${theme.terracotta} !important; }
  .btn-primary { background: ${theme.green}; color: white; border: none; padding: 12px 28px; border-radius: 50px; cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 500; transition: all 0.2s; }
  .btn-primary:hover { background: ${theme.greenMid}; transform: translateY(-1px); }
  .btn-outline { background: transparent; color: ${theme.green}; border: 2px solid ${theme.green}; padding: 10px 24px; border-radius: 50px; cursor: pointer; font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 500; transition: all 0.2s; }
  .btn-outline:hover { background: ${theme.green}; color: white; }
  .card { background: white; border-radius: 20px; overflow: hidden; transition: transform 0.25s, box-shadow 0.25s; }
  .card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.10); }
  .product-card { background: white; border-radius: 16px; padding: 20px; transition: all 0.2s; border: 1.5px solid transparent; }
  .product-card:hover { border-color: ${theme.greenLight}; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(74,124,47,0.12); }
  .chip { display: inline-flex; align-items: center; gap: 4px; padding: 4px 12px; border-radius: 50px; font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.18s; }
  .qty-btn { width: 30px; height: 30px; border-radius: 50%; border: 1.5px solid ${theme.greenMid}; background: transparent; color: ${theme.green}; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; font-weight: 500; }
  .qty-btn:hover { background: ${theme.green}; color: white; }
  .overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.45); z-index: 100; transition: opacity 0.3s; }
  .cart-panel { position: fixed; right: 0; top: 0; bottom: 0; width: min(420px, 96vw); background: white; z-index: 101; display: flex; flex-direction: column; box-shadow: -8px 0 40px rgba(0,0,0,0.15); }
  .auth-modal { background: white; border-radius: 24px; padding: 40px 44px; width: 100%; max-width: 440px; box-shadow: 0 24px 64px rgba(0,0,0,0.18); position: relative; animation: slideUp 0.3s ease; }
  .auth-input { width: 100%; padding: 13px 18px; border: 1.5px solid #E5E7EB; border-radius: 12px; font-size: 15px; font-family: 'Outfit', sans-serif; outline: none; margin-bottom: 14px; box-sizing: border-box; color: #1A1A1A; transition: border-color 0.2s; }
  .auth-input:focus { border-color: #7BAE5C; }
  .rol-btn { flex: 1; padding: 20px 14px; border-radius: 16px; cursor: pointer; text-align: center; transition: all 0.2s; font-family: 'Outfit', sans-serif; }
  input[type=text] { font-family: 'Outfit', sans-serif; }
  .search-input { width: 100%; padding: 14px 20px 14px 48px; border: 2px solid ${theme.creamDark}; border-radius: 50px; font-size: 15px; outline: none; background: white; transition: border-color 0.2s; color: ${theme.text}; }
  .search-input:focus { border-color: ${theme.greenLight}; }
  .farm-badge { display: inline-block; padding: 3px 10px; border-radius: 50px; font-size: 11px; font-weight: 600; font-family: 'Outfit', sans-serif; }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes notif { 0% { opacity:0; transform: translateY(20px); } 15% { opacity:1; transform:translateY(0); } 85% { opacity:1; } 100% { opacity:0; } }
  .animate-up { animation: slideUp 0.6s ease forwards; }
  .notif { position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%); background: ${theme.green}; color: white; padding: 12px 24px; border-radius: 50px; font-family: 'Outfit', sans-serif; font-size: 14px; z-index: 200; white-space: nowrap; animation: notif 2s ease forwards; }
  .star { color: #F59E0B; font-size: 13px; }
  .section-label { font-family: 'Outfit', sans-serif; font-size: 12px; font-weight: 600; letter-spacing: 3px; text-transform: uppercase; color: ${theme.terracotta}; }
  .section-title { font-size: clamp(28px, 4vw, 42px); font-weight: 500; line-height: 1.2; color: ${theme.green}; }
`;