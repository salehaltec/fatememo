// ─── THEME (merged from business-check / consultant / systemization) ─────────

const C = {
  bg0: "#0f0c29",
  bg1: "#1a1a2e",
  bg2: "#16213e",
  surface: "rgba(255,255,255,0.04)",
  border: "rgba(255,255,255,0.08)",
  text: "#f8fafc",
  muted: "#94a3b8",
  soft: "#64748b",
  red: "#f87171",
  redLight: "#fca5a5",
  redDeep: "#dc2626",
};

const FONT = "'Vazirmatn','Segoe UI',Tahoma,sans-serif";

// ─── TOOLS DATA ────────────────────────────────────────────────────────────

const TOOLS = [
  {
    title: "Business Check",
    titleFa: "بررسی کسب‌وکار",
    desc: "کسب و کارتان واقعا کجا ایستاده؟",
    href: "/business-check",
    image: "/images/home1.PNG",
  },
  {
    title: "Business Systemization",
    titleFa: "سیستم‌سازی کسب‌وکار",
    desc: "کسب و کاری که بدون شما کار کند",
    href: "/business-systemization",
    image: "/images/home2.PNG",
  },
  {
    title: "Business Consulting, Coaching & Mentoring",
    titleFa: "مشاوره، کوچینگ و منتورینگ",
    desc: "مشاور اشتباه، گران‌تر از نداشتن مشاور",
    href: "/business-consultant",
    image: "/images/home3.PNG",
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600;700;800;900&family=Vazirmatn:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .tool-row { transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease; overflow: visible; }
        .tool-row:hover { transform: translateY(-4px); }
        .tool-row:hover .advisor-img { transform: translateY(calc(10% - 6px)) scale(1.02); }
        a.tool-link { text-decoration: none; display: block; }

        .row-image { width: auto; align-self: flex-start; margin-bottom: -50px; }

        .advisor-img {
          width: 300px;
          max-width:100%;
          height:auto;
          object-fit: contain;
          margin-top: -108px;
          margin-bottom: 0;
          transform: translateY(13%);
          filter: drop-shadow(0 14px 24px rgba(0,0,0,0.45));
          transition: transform .35s ease;
        }

        @media (max-width: 720px) {
          .tool-row{
            flex-direction:column-reverse !important;
            justify-content:flex-start !important;
            align-items:center !important;
            height:auto;
            aspect-ratio:auto;
            max-width:380px;
            margin:0 auto 32px !important;
            padding:0 24px 28px !important;
            overflow:hidden;
          }
          .row-content{align-items:center !important;max-width:100% !important;text-align:center;}
          .row-title-group{align-items:center !important;width:100%;}
          .row-title-en,.row-title-fa{text-align:center !important;}
          .row-desc{text-align:center !important;direction:rtl !important;}
          .row-image{
            position:relative !important;
            left:auto !important;right:auto !important;top:auto !important;bottom:auto !important;
            display:flex !important;justify-content:center !important;align-items:flex-end !important;
            width:100% !important;
            height:100% !important;
            margin:0 0 4px !important;
            align-self:center !important;
          }
          .advisor-img{
            height:210px !important;
            width:auto !important;
            max-width:82% !important;
            margin:0 !important;
            margin-top:0 !important;
            transform:none !important;
          }
          .tool-row:hover .advisor-img{transform:none !important;}
          .cta-pill{margin:8px auto 0 !important;}
        }
      `}</style>

      <div style={styles.glowRed1} />
      <div style={styles.glowRed2} />

      <div style={styles.container}>
        {TOOLS.map((tool) => (
          <a key={tool.href} href={tool.href} className="tool-link">
            <div
              className="tool-row"
              style={styles.row}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(248,113,113,0.5)";
                e.currentTarget.style.boxShadow =
                  "0 16px 48px rgba(248,113,113,0.22), 0 0 44px rgba(248,113,113,0.22)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(248,113,113,0.16)";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(0,0,0,0.25), 0 0 20px rgba(248,113,113,0.08)";
              }}
            >
              <div className="row-content" style={styles.rowContent}>
                <div className="row-title-group" style={styles.titleGroup}>
                  <h2
                    className="row-title-en"
                    dir="ltr"
                    style={styles.titleEn}
                  >
                    {tool.title}
                  </h2>
                  <span className="title-divider" style={styles.titleDivider} />
                  <h2
                    className="row-title-fa"
                    dir="rtl"
                    style={styles.titleFa}
                  >
                    {tool.titleFa}
                  </h2>
                </div>
                <p className="row-desc" style={styles.desc}>{tool.desc}</p>
                <div className="cta-pill" style={styles.cta}>
                  بیشتر بخوانید
                  <span style={{ fontSize: 16 }}>‹</span>
                </div>
              </div>

              <div className="row-image" style={styles.rowImage}>
                <img
                  src={tool.image}
                  alt={tool.title}
                  className="advisor-img"
                  style={styles.advisorImg}
                />
                <div style={styles.imageGlow} />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: `linear-gradient(135deg, ${C.bg0} 0%, ${C.bg1} 50%, ${C.bg2} 100%)`,
    fontFamily: FONT,
    color: C.text,
    direction: "rtl",
    position: "relative",
    overflow: "hidden",
    padding: "80px 0 100px",
  },
  glowRed1: {
    position: "absolute",
    top: -120,
    right: -100,
    width: 420,
    height: 420,
    borderRadius: "50%",
    background: "rgba(248,113,113,0.16)",
    filter: "blur(90px)",
    pointerEvents: "none",
  },
  glowRed2: {
    position: "absolute",
    bottom: -140,
    left: -120,
    width: 460,
    height: 460,
    borderRadius: "50%",
    background: "rgba(220,38,38,0.14)",
    filter: "blur(100px)",
    pointerEvents: "none",
  },
  container: {
    position: "relative",
    maxWidth: 980,
    margin: "0 auto",
    padding: "0 24px",
  },
  row: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    background: C.surface,
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(248,113,113,0.16)",
    borderRadius: 24,
    padding: "36px 48px",
    marginBottom: 64,
    cursor: "pointer",
    boxShadow: "0 4px 20px rgba(0,0,0,0.25), 0 0 20px rgba(248,113,113,0.08)",
  },
  rowContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    maxWidth: 560,
    zIndex: 2,
  },
  titleGroup: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    width: "100%",
    marginBottom: 16,
  },
  titleEn: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 18,
    fontWeight: 800,
    letterSpacing: 0.4,
    margin: 0,
    textAlign: "right",
    width: "100%",
    color: C.text,
  },
  titleDivider: {
    display: "block",
    width: "100%",
    height: 1,
    margin: "8px 0",
    background: "linear-gradient(90deg, transparent, rgba(248,113,113,0.35), transparent)",
  },
  titleFa: {
    fontFamily: "'Vazirmatn', sans-serif",
    fontSize: 25,
    fontWeight: 900,
    margin: 0,
    textAlign: "right",
    width: "100%",
    color: C.text,
  },
  desc: {
    fontSize: 16,
    lineHeight: 1.9,
    color: "#e2e8f0",
    margin: "0 0 22px",
  },
  cta: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    fontSize: 14,
    fontWeight: 700,
    padding: "11px 20px",
    borderRadius: 999,
    color: C.red,
    border: "1px solid rgba(248,113,113,0.4)",
  },
  rowImage: {
    position: "relative",
    flexShrink: 0,
    display: "flex",
    justifyContent: "center",
    zIndex: 3,
  },
  advisorImg: {
    position: "relative",
  },
  imageGlow: {
    position: "absolute",
    bottom: -20,
    width: 160,
    height: 60,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(248,113,113,0.28), transparent 70%)",
    filter: "blur(20px)",
    zIndex: -1,
  },
};
