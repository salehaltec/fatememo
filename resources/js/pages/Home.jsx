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
  gold: "#f59e0b",
  goldLight: "#fbbf24",
  goldDeep: "#d97706",
  violet: "#8b5cf6",
  violetDeep: "#6366f1",
  violetLight: "#a78bfa",
  red: "#f87171",
  teal: "#2dd4bf",
  tealDeep: "#0d9488",
  tealLight: "#5eead4",
};

const FONT = "'Vazirmatn','Segoe UI',Tahoma,sans-serif";

// ─── TOOLS DATA ────────────────────────────────────────────────────────────

const TOOLS = [
  {
    title: "Business Check",
    desc: "کسب و کارتان واقعا کجا ایستاده؟",
    href: "/business-check",
    accent: C.violet,
    accentDeep: C.violetDeep,
    accentLight: C.violetLight,
  },
  {
    title: "Business Systemization",
    desc: "کسب و کاری که بدون شما کار کند",
    href: "/business-systemization",
    accent: C.teal,
    accentDeep: C.tealDeep,
    accentLight: C.tealLight,
  },
  {
    title: "Business Consulting, Coaching & Mentoring",
    desc: "مشاور اشتباه، گران‌تر از نداشتن مشاور",
    href: "/business-consultant",
    accent: C.gold,
    accentDeep: C.goldDeep,
    accentLight: C.goldLight,
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; }
        .tool-row { transition: transform .35s ease, border-color .35s ease, box-shadow .35s ease; }
        .tool-row:hover { transform: translateY(-4px); }
        .tool-row:hover .advisor-img { transform: translateY(-6px) scale(1.02); }
        a.tool-link { text-decoration: none; display: block; }

        .row-image { width: 180px; }

        .advisor-img {
          height: 250px;
          width: auto;
          max-width: none;
          object-fit: contain;
          margin-top: -90px;
          margin-bottom: -46px;
          filter: drop-shadow(0 14px 24px rgba(0,0,0,0.45));
          transition: transform .35s ease;
        }

        @media (max-width: 720px) {
          .tool-row {
            flex-direction: column;
            padding-top: 130px;
            padding-left: 24px;
            padding-right: 24px;
          }
          .row-content { align-items: center !important; max-width: 100% !important; text-align: center; }
          .row-title, .row-desc { text-align: center !important; direction: rtl !important; }
          .row-image {
            position: absolute !important;
            top: -55px !important;
            left: 50% !important;
            right: auto !important;
            transform: translateX(-50%) !important;
            width: auto !important;
          }
          .advisor-img {
            height: 150px !important;
            width: auto !important;
            max-width: none !important;
            margin-top: 0 !important;
            margin-bottom: 0 !important;
          }
          .cta-pill { margin: 6px auto 0 !important; }
        }
      `}</style>

      <div style={styles.glowViolet} />
      <div style={styles.glowGold} />

      <div style={styles.container}>
        {TOOLS.map((tool) => (
          <a key={tool.href} href={tool.href} className="tool-link">
            <div
              className="tool-row"
              style={{
                ...styles.row,
                borderColor: C.border,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = tool.accent + "66";
                e.currentTarget.style.boxShadow = `0 12px 36px ${tool.accent}2e`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = C.border;
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.2)";
              }}
            >
              <div className="row-content" style={styles.rowContent}>
                <div className="row-title-glass" style={styles.titleGlass}>
                  <h2
                    className="row-title"
                    style={{
                      ...styles.title,
                      background: `linear-gradient(90deg, ${tool.accentLight}, ${tool.accent} 55%, ${tool.accentDeep})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {tool.title}
                  </h2>
                </div>
                <p className="row-desc" style={styles.desc}>{tool.desc}</p>
                <div
                  className="cta-pill"
                  style={{
                    ...styles.cta,
                    color: tool.accent,
                    borderColor: tool.accent + "40",
                  }}
                >
                  بیشتر بخوانید
                  <span style={{ fontSize: 16 }}>‹</span>
                </div>
              </div>

              <div className="row-image" style={styles.rowImage}>
                <img
                  src="/images/advisor.png"
                  alt=""
                  className="advisor-img"
                  style={styles.advisorImg}
                />
                <div
                  style={{
                    ...styles.imageGlow,
                    background: `radial-gradient(circle, ${tool.accent}33, transparent 70%)`,
                  }}
                />
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
  glowViolet: {
    position: "absolute",
    top: -120,
    right: -100,
    width: 420,
    height: 420,
    borderRadius: "50%",
    background: "rgba(139,92,246,0.20)",
    filter: "blur(90px)",
    pointerEvents: "none",
  },
  glowGold: {
    position: "absolute",
    bottom: -140,
    left: -120,
    width: 460,
    height: 460,
    borderRadius: "50%",
    background: "rgba(245,158,11,0.14)",
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
    justifyContent: "space-between",
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 24,
    padding: "36px 48px",
    marginBottom: 64,
    cursor: "pointer",
  },
  rowContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    maxWidth: 560,
    zIndex: 2,
  },
  titleGlass: {
    display: "inline-block",
    padding: "10px 20px",
    borderRadius: 16,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.14)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    marginBottom: 14,
  },
  title: {
    fontFamily: "'Vazirmatn', sans-serif",
    fontSize: 25,
    fontWeight: 900,
    margin: 0,
    textAlign: "right",
  },
  desc: {
    fontSize: 14.5,
    lineHeight: 1.9,
    color: C.muted,
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
    border: `1px solid ${C.border}`,
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
    filter: "blur(20px)",
    zIndex: -1,
  },
};
