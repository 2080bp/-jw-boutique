import { useState, useEffect } from "react";

const OVERHEAD_PER_ITEM = 11000;
const SHIPPING_RM = 4990;

const products = [
  {
    id: 1,
    name: "Mini Mochila Osito Kadingxiong",
    category: "Mini Mochilas",
    desc: "Diseño kawaii con tachas doradas. PU cuero texturado.",
    cost: 7000,
    price: 22990,
    colors: ["Crema", "Café", "Rosa"],
    swatches: ["#F5EDD8", "#7B4F2E", "#E8B4B8"],
    image: "01_kadingxiong_pastel.jpg",
    badge: "Más vendida",
  },
  {
    id: 2,
    name: "Mini Mochila Kadingxiong Dark",
    category: "Mini Mochilas",
    desc: "Edición en color negro con detalles dorados y tachas decorativas.",
    cost: 7000,
    price: 22990,
    colors: ["Negro"],
    swatches: ["#2C2C2C"],
    image: "02_kadingxiong_dark.jpg",
    badge: "Nuevo",
  },
  {
    id: 3,
    name: "Mochila Vintage Cuero PU",
    category: "Cuero PU",
    desc: "Estilo retro-clásico, gran capacidad. Ideal trabajo o universidad.",
    cost: 10000,
    price: 31990,
    colors: ["Camel", "Café"],
    swatches: ["#C68642", "#5C3D2E"],
    image: "05_pu_vintage.jpg",
    badge: "Unisex",
  },
  {
    id: 4,
    name: "Mochila Cuero PU Clásica",
    category: "Cuero PU",
    desc: "Diseño clásico multibolsillos, ideal para organizar todo.",
    cost: 9000,
    price: 31990,
    colors: ["Negro"],
    swatches: ["#2C2C2C"],
    image: "06_pu_clasica.jpg",
    badge: null,
  },
  {
    id: 5,
    name: "Mochila Roll-Top Impermeable",
    category: "Urbana",
    desc: "Cierre enrollable estilo outdoor. Tela impermeable.",
    cost: 8000,
    price: 24990,
    colors: ["Gris", "Negro", "Verde"],
    swatches: ["#555555", "#2C2C2C", "#556B2F"],
    image: "10_rolltop.jpg",
    badge: null,
  },
  {
    id: 6,
    name: "Bolso Leopardo Mostaza",
    category: "Moda",
    desc: "Bolso de hombro con estampado animal print. Tendencia 2025.",
    cost: 9000,
    price: 29990,
    colors: ["Leopardo Mostaza"],
    swatches: ["#B8860B"],
    image: "12_leopardo_mostaza.jpg",
    badge: "Tendencia",
  },
  {
    id: 7,
    name: "Mochila Peluche Capybara Viral",
    category: "Peluche",
    desc: "¡El Capybara viral! Súper suave. Ideal para niños y teens.",
    cost: 5000,
    price: 15000,
    colors: ["Caramelo"],
    swatches: ["#A0704B"],
    image: "capybaras.png",
    badge: "¡Viral!",
  },
];

const categories = ["Todos", "Mini Mochilas", "Cuero PU", "Urbana", "Moda", "Peluche"];

const fmt = (n) => n.toLocaleString("es-CL");

/* ─── Hook de ancho de ventana ─────────────────────────────────────── */
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

/* ─── ProductCard ───────────────────────────────────────────────────── */
function ProductCard({ p, onOrder }) {
  const [selectedColor, setSelectedColor] = useState(0);

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        transition: "transform .2s,box-shadow .2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)";
      }}
    >
      {/* Visual */}
      <div
        style={{
          height: "220px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
        }}
      >
        <img
          src={`${import.meta.env.BASE_URL}${p.image}`}
          alt={p.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        {p.badge && (
          <span
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              background: "#C75B3A",
              color: "#fff",
              fontSize: "10px",
              fontWeight: "700",
              letterSpacing: "0.5px",
              padding: "4px 10px",
              borderRadius: "20px",
              fontFamily: "'DM Mono',monospace",
            }}
          >
            {p.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: "20px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <div>
          <p
            style={{
              fontSize: "10px",
              color: "#C75B3A",
              fontWeight: "600",
              letterSpacing: "1px",
              textTransform: "uppercase",
              margin: "0 0 4px 0",
              fontFamily: "'DM Mono',monospace",
            }}
          >
            {p.category}
          </p>
          <h3
            style={{
              fontSize: "15px",
              fontWeight: "700",
              color: "#1A1A1A",
              margin: 0,
              lineHeight: 1.3,
              fontFamily: "'Cormorant Garamond',serif",
            }}
          >
            {p.name}
          </h3>
        </div>

        <p style={{ fontSize: "12px", color: "#666", lineHeight: 1.5, margin: 0, flex: 1 }}>
          {p.desc}
        </p>

        {/* Colors */}
        <div>
          <p style={{ fontSize: "10px", color: "#999", margin: "0 0 6px 0", fontFamily: "'DM Mono',monospace" }}>
            COLOR: <span style={{ color: "#333" }}>{p.colors[selectedColor]}</span>
          </p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {p.swatches.map((s, i) => (
              <button
                key={i}
                onClick={() => setSelectedColor(i)}
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: s,
                  border: selectedColor === i ? "2px solid #C75B3A" : "2px solid transparent",
                  outline: selectedColor === i ? "2px solid #C75B3A" : "none",
                  outlineOffset: "2px",
                  cursor: "pointer",
                  padding: 0,
                }}
                title={p.colors[i]}
              />
            ))}
          </div>
        </div>

        {/* Price */}
        <div
          style={{
            borderTop: "1px solid #F0EDE8",
            paddingTop: "12px",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p style={{ fontSize: "11px", color: "#999", margin: "0 0 2px 0" }}>Precio IVA incluido</p>
            <p
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "#1A1A1A",
                margin: 0,
                fontFamily: "'Cormorant Garamond',serif",
              }}
            >
              ${fmt(p.price)}
            </p>
            <p style={{ fontSize: "10px", color: "#999", margin: "2px 0 0 0" }}>
              + envío ${fmt(SHIPPING_RM)} RM
            </p>
          </div>
          <button
            onClick={() => onOrder(p, p.colors[selectedColor])}
            style={{
              background: "#25D366",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              padding: "10px 16px",
              fontSize: "12px",
              fontWeight: "700",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              transition: "background .2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#128C7E")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#25D366")}
          >
            📲 Pedir
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── PricingPanel ──────────────────────────────────────────────────── */
function PricingPanel() {
  const [cost, setCost] = useState(10000);
  const [items, setItems] = useState(6);
  const [margin, setMargin] = useState(80);
  const isMobile = useWindowWidth() < 600;

  const overhead = Math.round(66000 / items);
  const totalCost = cost + overhead;
  const priceNet = Math.round(totalCost * (1 + margin / 100));
  const priceIVA = Math.round(priceNet * 1.19);
  const priceSugg = Math.ceil(priceIVA / 990) * 990;
  const realMargin = Math.round(((priceSugg - cost - overhead) / (cost + overhead)) * 100);

  return (
    <div
      style={{
        background: "linear-gradient(135deg,#1A1A2E 0%,#16213E 100%)",
        borderRadius: "20px",
        padding: isMobile ? "20px 16px" : "28px",
        color: "#fff",
        boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
      }}
    >
      <h3
        style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: isMobile ? "18px" : "22px",
          margin: "0 0 4px 0",
        }}
      >
        🧮 Calculadora de Precios
      </h3>
      <p
        style={{
          fontSize: "11px",
          color: "#AAB4C8",
          margin: "0 0 24px 0",
          fontFamily: "'DM Mono',monospace",
          lineHeight: 1.5,
        }}
      >
        COSTO VIAJE: $64,000 tiempo + $2,000 pasaje = $66,000/viaje
      </p>

      {/* Sliders — siempre 1 columna en móvil */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {[
          { label: "Costo producto ($)", val: cost, set: setCost, min: 1000, max: 50000, step: 500 },
          { label: "Items por viaje", val: items, set: setItems, min: 1, max: 20, step: 1 },
          { label: "Margen objetivo (%)", val: margin, set: setMargin, min: 20, max: 200, step: 5 },
        ].map((f, i) => (
          <div key={i} style={{ gridColumn: !isMobile && i === 2 ? "1/-1" : "auto" }}>
            <label
              style={{
                fontSize: "10px",
                color: "#AAB4C8",
                fontFamily: "'DM Mono',monospace",
                letterSpacing: "0.5px",
              }}
            >
              {f.label}
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "6px" }}>
              <input
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={f.val}
                onChange={(e) => f.set(Number(e.target.value))}
                style={{ flex: 1, accentColor: "#C75B3A" }}
              />
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "700",
                  minWidth: "70px",
                  textAlign: "right",
                  fontFamily: "'DM Mono',monospace",
                }}
              >
                {f.label.includes("$") ? `$${fmt(f.val)}` : f.val}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Resultados — siempre 2 col pero se ajusta */}
      <div
        style={{
          background: "rgba(255,255,255,0.08)",
          borderRadius: "14px",
          padding: isMobile ? "16px" : "20px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
        }}
      >
        {[
          { label: "Overhead/producto", val: `$${fmt(overhead)}`, color: "#AAB4C8" },
          { label: "Costo total", val: `$${fmt(totalCost)}`, color: "#AAB4C8" },
          { label: "Precio neto s/IVA", val: `$${fmt(priceNet)}`, color: "#F0C060" },
          { label: "Precio c/IVA (19%)", val: `$${fmt(priceIVA)}`, color: "#F0C060" },
          { label: "Precio sugerido", val: `$${fmt(priceSugg)}`, color: "#7DEFA0", bold: true },
          {
            label: "Margen real",
            val: `${realMargin}%`,
            color: realMargin >= 50 ? "#7DEFA0" : "#FF7070",
            bold: true,
          },
        ].map((r, i) => (
          <div key={i}>
            <p
              style={{
                fontSize: "10px",
                color: "#AAB4C8",
                margin: "0 0 2px 0",
                fontFamily: "'DM Mono',monospace",
              }}
            >
              {r.label}
            </p>
            <p
              style={{
                fontSize: isMobile ? "14px" : "16px",
                fontWeight: r.bold ? "700" : "500",
                color: r.color,
                margin: 0,
                fontFamily: "'Cormorant Garamond',serif",
              }}
            >
              {r.val}
            </p>
          </div>
        ))}
      </div>

      <p
        style={{
          fontSize: "10px",
          color: "#667",
          margin: "12px 0 0 0",
          fontFamily: "'DM Mono',monospace",
          lineHeight: 1.5,
        }}
      >
        💡 A mayor cantidad de pedidos por viaje, menor overhead y más margen. Idealmente agrupa 6+ pedidos.
      </p>
    </div>
  );
}

/* ─── Tienda principal ──────────────────────────────────────────────── */
export default function Tienda() {
  const [cat, setCat] = useState("Todos");
  const [showCalc, setShowCalc] = useState(false);
  const [toast, setToast] = useState(null);
  const width = useWindowWidth();
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 1024;

  const filtered = cat === "Todos" ? products : products.filter((p) => p.category === cat);

  const handleOrder = (product, color) => {
    const msg = `Hola! Quiero pedir:\n🎒 *${product.name}*\n🎨 Color: ${color}\n💰 Precio: $${fmt(product.price)}\n📦 Entrega: 2 días hábiles\n\n¿Está disponible?`;
    const wa = `https://wa.me/56958537599?text=${encodeURIComponent(msg)}`;
    window.open(wa, "_blank");
    setToast(`¡Pedido de ${product.name} enviado!`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", fontFamily: "'DM Sans',sans-serif" }}>
      {/* Google Fonts + estilos globales */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@400;500;700&family=DM+Mono&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F0EDE8; }
        ::-webkit-scrollbar-thumb { background: #C75B3A; border-radius: 3px; }
      `}</style>

      {/* ── Header ── */}
      <header
        style={{
          background: "linear-gradient(135deg,#1A1A1A 0%,#3D2B1F 100%)",
          padding: isMobile ? "0 16px" : "0 24px",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 2px 20px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: isMobile ? "56px" : "64px",
            gap: "12px",
          }}
        >
          <div style={{ minWidth: 0 }}>
            <h1
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: isMobile ? "20px" : "26px",
                fontWeight: "700",
                color: "#fff",
                margin: 0,
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              JW Boutique
            </h1>
            <p
              style={{
                fontSize: isMobile ? "8px" : "10px",
                color: "#C75B3A",
                margin: "2px 0 0 0",
                letterSpacing: "2px",
                fontFamily: "'DM Mono',monospace",
                whiteSpace: "nowrap",
              }}
            >
              BOLSOS & MOCHILAS · A PEDIDO
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            {!isMobile && (
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "10px", color: "#AAB4C8", margin: 0, fontFamily: "'DM Mono',monospace" }}>
                  ENTREGA
                </p>
                <p style={{ fontSize: "12px", color: "#7DEFA0", margin: 0, fontWeight: "600" }}>
                  2 días hábiles
                </p>
              </div>
            )}
            <button
              onClick={() => setShowCalc(!showCalc)}
              style={{
                background: showCalc ? "#C75B3A" : "rgba(255,255,255,0.1)",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "10px",
                padding: isMobile ? "7px 10px" : "8px 14px",
                fontSize: "11px",
                cursor: "pointer",
                fontFamily: "'DM Mono',monospace",
                transition: "all .2s",
                whiteSpace: "nowrap",
              }}
            >
              🧮 {showCalc ? "Cerrar" : "Precios"}
            </button>
          </div>
        </div>
      </header>

      {/* ── Contenido principal ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: isMobile ? "20px 12px" : "32px 24px" }}>

        {/* Hero Banner — FIX: flexWrap + padding responsivo */}
        <div
          style={{
            background: "linear-gradient(135deg,#C75B3A 0%,#8B3A1F 50%,#3D2B1F 100%)",
            borderRadius: "24px",
            padding: isMobile ? "28px 24px" : "40px 48px",
            marginBottom: "28px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: isMobile ? "-30px" : "-20px",
              top: isMobile ? "-30px" : "-20px",
              fontSize: isMobile ? "120px" : "180px",
              opacity: 0.08,
              pointerEvents: "none",
            }}
          >
            🎒
          </div>

          <div style={{ position: "relative", minWidth: 0 }}>
            <p
              style={{
                fontSize: "11px",
                color: "#FFD6B0",
                letterSpacing: "2px",
                margin: "0 0 8px 0",
                fontFamily: "'DM Mono',monospace",
              }}
            >
              COLECCIÓN 2025
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                /* FIX: font fluido con clamp */
                fontSize: "clamp(22px, 5vw, 36px)",
                color: "#fff",
                margin: "0 0 8px 0",
                lineHeight: 1.1,
              }}
            >
              Bolsos & Mochilas
              <br />
              de tendencia
            </h2>
            <p style={{ color: "#FFD6B0", fontSize: "13px", margin: "0 0 20px 0" }}>
              Productos de calidad importados · Entrega en 2 días hábiles
            </p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {["📦 Envío a todo Chile", "🛡️ Compra segura", "💬 Pedido por WhatsApp"].map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: isMobile ? "10px" : "11px",
                    color: "#fff",
                    background: "rgba(255,255,255,0.15)",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontFamily: "'DM Mono',monospace",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Calculadora */}
        {showCalc && (
          <div style={{ marginBottom: "28px" }}>
            <PricingPanel />
          </div>
        )}

        {/* Info strip */}
        <div
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: isMobile ? "14px 16px" : "16px 24px",
            marginBottom: "24px",
            display: "grid",
            /* FIX: 2 col en móvil, 4 en desktop */
            gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)",
            gap: isMobile ? "16px" : "12px",
            boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          {[
            { icon: "🚚", label: "Envío RM", val: `$${fmt(SHIPPING_RM)}` },
            { icon: "📅", label: "Plazo entrega", val: "2 días hábiles" },
            { icon: "💰", label: "Medios de pago", val: "Transferencia / Mercadopago" },
            { icon: "📲", label: "Contacto", val: "WhatsApp al presionar 'Pedir'" },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", alignItems: "flex-start", gap: "8px" }}>
              <span style={{ fontSize: isMobile ? "18px" : "22px", flexShrink: 0, marginTop: "2px" }}>
                {item.icon}
              </span>
              <div style={{ minWidth: 0 }}>
                <p
                  style={{
                    fontSize: "10px",
                    color: "#999",
                    margin: 0,
                    fontFamily: "'DM Mono',monospace",
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    fontSize: isMobile ? "11px" : "13px",
                    fontWeight: "600",
                    color: "#1A1A1A",
                    margin: 0,
                    wordBreak: "break-word",
                  }}
                >
                  {item.val}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Filtros de categoría */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "24px" }}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                padding: isMobile ? "7px 14px" : "8px 18px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "0.3px",
                transition: "all .2s",
                background: cat === c ? "#C75B3A" : "#fff",
                color: cat === c ? "#fff" : "#666",
                boxShadow:
                  cat === c
                    ? "0 4px 12px rgba(199,91,58,0.3)"
                    : "0 2px 8px rgba(0,0,0,0.06)",
              }}
            >
              {c} {c === "Todos" ? `(${products.length})` : ""}
            </button>
          ))}
        </div>

        {/* Grid de productos — FIX: minmax adaptado */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile
              ? "1fr"
              : isTablet
              ? "repeat(2,1fr)"
              : "repeat(auto-fill,minmax(280px,1fr))",
            gap: isMobile ? "16px" : "20px",
          }}
        >
          {filtered.map((p) => (
            <ProductCard key={p.id} p={p} onOrder={handleOrder} />
          ))}
        </div>

        {/* Footer / Cómo comprar */}
        <div
          style={{
            marginTop: "48px",
            padding: isMobile ? "24px 16px" : "32px",
            background: "#1A1A1A",
            borderRadius: "20px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h3
            style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: isMobile ? "20px" : "24px",
              margin: "0 0 8px 0",
            }}
          >
            ¿Cómo comprar?
          </h3>
          <p style={{ color: "#AAB4C8", fontSize: "13px", margin: "0 0 24px 0" }}>
            Tienda 100% a pedido · Sin stock previo
          </p>

          {/* FIX: 2 col en móvil, 4 en desktop */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)",
              gap: isMobile ? "20px" : "16px",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            {[
              { n: "1", t: "Elige tu mochila", d: "Selecciona modelo y color" },
              { n: "2", t: "Haz tu pedido", d: "Presiona 'Pedir' vía WhatsApp" },
              { n: "3", t: "Confirma y paga", d: "Transferencia o Mercadopago" },
              { n: "4", t: "Recibe en casa", d: "2 días hábiles desde la compra" },
            ].map((s) => (
              <div key={s.n} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "#C75B3A",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    fontWeight: "700",
                    margin: "0 auto 8px",
                    fontFamily: "'DM Mono',monospace",
                  }}
                >
                  {s.n}
                </div>
                <p style={{ fontWeight: "600", margin: "0 0 4px 0", fontSize: "13px" }}>{s.t}</p>
                <p style={{ color: "#667", fontSize: "11px", margin: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>

          <p
            style={{
              color: "#444",
              fontSize: "11px",
              marginTop: "24px",
              fontFamily: "'DM Mono',monospace",
            }}
          >
            © 2025 JW Boutique · Santiago, Chile · Todos los precios incluyen IVA
          </p>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#25D366",
            color: "#fff",
            padding: "14px 24px",
            borderRadius: "12px",
            fontSize: "13px",
            fontWeight: "600",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            zIndex: 1000,
            whiteSpace: "nowrap",
          }}
        >
          ✅ {toast}
        </div>
      )}
    </div>
  );
}