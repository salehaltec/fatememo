import { useState } from "react";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
// Palette: deep slate base, amber as the single warm accent (warmth of "building"),
// cool white for type, muted steel for secondary text.
// Signature: a horizontal "pipeline" diagram that shows the 5 stages as
// connected nodes — the one memorable element that makes the process tangible.
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  bg:        "#0b0f1a",
  surface:   "#111827",
  surfaceHi: "#1a2235",
  border:    "rgba(255,255,255,0.08)",
  borderHi:  "rgba(251,191,36,0.35)",
  amber:     "#fbbf24",
  amberDim:  "rgba(251,191,36,0.12)",
  amberGlow: "rgba(251,191,36,0.25)",
  text:      "#f1f5f9",
  muted:     "#64748b",
  soft:      "#94a3b8",
  danger:    "#f87171",
  dangerDim: "rgba(248,113,113,0.1)",
  success:   "#34d399",
  successDim:"rgba(52,211,153,0.1)",
};

const FONT = "'Vazirmatn', 'Segoe UI', Tahoma, sans-serif";

// ─── SERVICE STAGES DATA ──────────────────────────────────────────────────────

const STAGES = [
  {
    id: 1,
    icon: "🔍",
    title: "بیزینس چک اولیه",
    sub: "تشخیص قبل از نسخه",
    desc: "قبل از هر اقدامی، وضعیت واقعی سازمان شما را از زوایای مالی، عملیاتی، منابع انسانی و فرآیندی بررسی می‌کنیم. این مرحله تفاوت یک مشاور واقعی با یک فروشنده خدمات را مشخص می‌کند.",
    detail: "خروجی: گزارش ارزیابی اولیه + نقشه گلوگاه‌های احتمالی",
  },
  {
    id: 2,
    icon: "🎯",
    title: "شناسایی گلوگاه‌ها",
    sub: "کجا انرژی سازمان هدر می‌رود؟",
    desc: "بیشتر مشکلات سازمانی نه از کمبود تلاش، بلکه از گلوگاه‌های پنهانی ناشی می‌شوند که همه آن‌ها را می‌بینند اما کسی رسماً آدرسشان را ندارد. ما این گلوگاه‌ها را نام‌گذاری، اولویت‌بندی و ریشه‌یابی می‌کنیم.",
    detail: "خروجی: نقشه گلوگاه با اولویت اثرگذاری بر درآمد و هزینه",
  },
  {
    id: 3,
    icon: "📐",
    title: "طراحی و مستندسازی فرآیندها",
    sub: "دانش از ذهن به سیستم",
    desc: "مهم‌ترین فرآیندهای کسب‌وکارتان را از ذهن افراد به مستندات عملیاتی تبدیل می‌کنیم. SOP، چارت سازمانی واقعی، شرح وظایف کارکردی — نه برای روی کاغذ، برای اجرا.",
    detail: "خروجی: مجموعه مدارک عملیاتی قابل اجرا و آموزش‌پذیر",
  },
  {
    id: 4,
    icon: "⚙️",
    title: "استقرار و پیاده‌سازی",
    sub: "روی کاغذ نمی‌ماند",
    desc: "بسیاری از پروژه‌های سیستم‌سازی در مرحله مستندسازی متوقف می‌شوند. ما در کنار تیم شما می‌مانیم تا سیستم‌ها واقعاً اجرایی شوند — با مقاومت‌ها کنار می‌آییم، تنظیمات میدانی انجام می‌دهیم.",
    detail: "خروجی: سیستم در حال اجرا + گزارش پیشرفت هفتگی",
  },
  {
    id: 5,
    icon: "🎓",
    title: "آموزش و انتقال مالکیت",
    sub: "سیستم باید بدون ما کار کند",
    desc: "هدف نهایی این است که تیم شما سیستم را خودش اداره کند. آموزش‌های کاربردی برای مدیران میانی و پرسنل اجرایی، با مکانیزم پایش و اصلاح مستمر.",
    detail: "خروجی: تیم آموزش‌دیده + داشبورد سنجش عملکرد سیستم",
  },
  {
    id: 6,
    icon: "📊",
    title: "پایش و بهینه‌سازی مستمر",
    sub: "سیستم زنده است",
    desc: "سیستم‌های خوب تغییر می‌کنند. یک دوره همراهی بعد از استقرار برای شناسایی انحرافات، اصلاح مسیر و تنظیم سیستم بر اساس واقعیت میدانی — نه فرضیات اولیه.",
    detail: "خروجی: گزارش بهینه‌سازی دوره‌ای + پروتکل مقاومت‌زدایی",
  },
];

// ─── DIAGNOSTIC QUESTIONS ─────────────────────────────────────────────────────

const DIAG_QS = [
  {
    q: "وقتی یک نفر از تیم کلیدی‌تان غایب است، کار چقدر مختل می‌شود؟",
    weight: 2,
    options: [
      { text: "همه چیز متوقف می‌شود — آن شخص همه چیز را در ذهن دارد", score: 4 },
      { text: "کارها کند می‌شوند و اشتباهات زیاد می‌شود", score: 3 },
      { text: "بعضی بخش‌ها مشکل پیدا می‌کنند", score: 2 },
      { text: "تقریباً روال ادامه دارد", score: 1 },
    ],
  },
  {
    q: "یک کار تکراری مثل صدور فاکتور، پیگیری سفارش یا پرداخت حقوق چقدر طول می‌کشد و چند بار در آن اشتباه اتفاق می‌افتد؟",
    weight: 2,
    options: [
      { text: "هر بار متفاوت است و اشتباه معمول است", score: 4 },
      { text: "یک روش غیررسمی داریم ولی همه یکسان عمل نمی‌کنند", score: 3 },
      { text: "روش نسبتاً ثابتی داریم اما مستند نشده", score: 2 },
      { text: "فرآیند مشخص و مستند داریم", score: 1 },
    ],
  },
  {
    q: "وقتی مشتری شکایت یا مشکلی دارد، چه اتفاقی می‌افتد؟",
    weight: 1.5,
    options: [
      { text: "هر بار یک نفر متفاوت به روش متفاوتی حل می‌کند", score: 4 },
      { text: "معمولاً به من (یا مدیر) می‌رسد که حل کنم", score: 3 },
      { text: "یک روند تقریبی داریم ولی مکتوب نیست", score: 2 },
      { text: "پروتکل مشخص داریم و تیم آن را اجرا می‌کند", score: 1 },
    ],
  },
  {
    q: "اگر امروز بخواهید یک نیروی جدید بگیرید، آموزش او چقدر طول می‌کشد تا مستقل شود؟",
    weight: 1.5,
    options: [
      { text: "ماه‌ها — باید کنارش بنشینم تا یاد بگیرد", score: 4 },
      { text: "چند هفته مشاهده و آزمون و خطا", score: 3 },
      { text: "مقداری مستند داریم ولی کامل نیست", score: 2 },
      { text: "داریم مستنداتی که آموزش را سریع می‌کند", score: 1 },
    ],
  },
  {
    q: "تا چه حد می‌دانید هر بخش سازمانتان در هر لحظه مشغول چه کاری است؟",
    weight: 1,
    options: [
      { text: "اصلاً نمی‌دانم، باید هر بار بپرسم", score: 4 },
      { text: "یک تصویر کلی دارم ولی جزئیات را نمی‌دانم", score: 3 },
      { text: "جلسات دوره‌ای داریم که خلاصه می‌دهد", score: 2 },
      { text: "داشبورد یا سیستم گزارش‌گیری دارم", score: 1 },
    ],
  },
  {
    q: "چند درصد از زمان مدیریتی شما صرف کارهایی می‌شود که «فقط شما» می‌توانید انجام دهید؟",
    weight: 2,
    options: [
      { text: "کمتر از ۳۰٪ — بیشتر وقتم صرف آتش‌نشانی است", score: 4 },
      { text: "حدود ۵۰٪ — نصفه‌نیمه", score: 3 },
      { text: "حدود ۷۰٪ — نسبتاً خوب", score: 2 },
      { text: "بیشتر از ۸۰٪ — تیم مستقل عمل می‌کند", score: 1 },
    ],
  },
  {
    q: "اگر سازمانتان را به یک خریدار بفروشید، چقدر طول می‌کشد تا بتواند آن را بدون حضور شما اداره کند؟",
    weight: 2,
    options: [
      { text: "نمی‌تواند — کسب‌وکار بدون من معنا ندارد", score: 4 },
      { text: "شاید با یک یا دو سال حضور من", score: 3 },
      { text: "با چند ماه انتقال دانش شاید", score: 2 },
      { text: "مستنداتی داریم که این انتقال را ممکن می‌کند", score: 1 },
    ],
  },
];

// ─── UTILS ────────────────────────────────────────────────────────────────────

function diagAnalyze(answers) {
  let weighted = 0;
  let maxWeighted = 0;
  DIAG_QS.forEach((q, i) => {
    weighted += (answers[i] || 0) * q.weight;
    maxWeighted += 4 * q.weight;
  });
  const pct = Math.round((weighted / maxWeighted) * 100);

  let verdict, color, icon;
  if (pct >= 75) {
    verdict = "قطعی";
    color = "#f87171";
    icon = "🚨";
  } else if (pct >= 50) {
    verdict = "بسیار محتمل";
    color = "#fb923c";
    icon = "⚠️";
  } else if (pct >= 30) {
    verdict = "نسبی";
    color = "#fbbf24";
    icon = "💡";
  } else {
    verdict = "کم";
    color = "#34d399";
    icon = "✅";
  }

  // find worst answers
  const sorted = DIAG_QS.map((q, i) => ({ q: q.q, score: answers[i] || 0, w: q.weight }))
    .sort((a, b) => b.score * b.w - a.score * a.w);
  const topPains = sorted.slice(0, 3);

  return { pct, verdict, color, icon, topPains };
}

// ─── SHARED STYLES ────────────────────────────────────────────────────────────

const S = {
  root: {
    fontFamily: FONT,
    direction: "rtl",
    background: C.bg,
    minHeight: "100vh",
    color: C.text,
    margin: 0,
    padding: 0,
  },
  wrap: {
    maxWidth: 740,
    margin: "0 auto",
    padding: "2rem 1.25rem 5rem",
  },
  chip: (color = C.amber) => ({
    display: "inline-block",
    background: color + "18",
    border: `1px solid ${color}44`,
    color: color,
    borderRadius: 999,
    padding: "0.28rem 0.9rem",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.07em",
    textTransform: "uppercase",
    marginBottom: "1.2rem",
  }),
  h1: {
    fontSize: "clamp(1.7rem, 5vw, 2.8rem)",
    fontWeight: 900,
    lineHeight: 1.3,
    marginBottom: "1rem",
    color: C.text,
  },
  lead: {
    fontSize: "1rem",
    color: C.soft,
    lineHeight: 1.85,
    marginBottom: "2rem",
  },
  card: {
    background: C.surface,
    border: `1px solid ${C.border}`,
    borderRadius: 16,
    padding: "1.5rem",
    marginBottom: "1.25rem",
  },
  cardAmber: {
    background: C.amberDim,
    border: `1px solid ${C.borderHi}`,
    borderRadius: 16,
    padding: "1.5rem",
    marginBottom: "1.25rem",
  },
  label: {
    fontSize: "0.75rem",
    color: C.muted,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    marginBottom: "0.4rem",
  },
  input: {
    width: "100%",
    background: C.surfaceHi,
    border: `1.5px solid ${C.border}`,
    borderRadius: 10,
    padding: "0.75rem 1rem",
    color: C.text,
    fontSize: "0.92rem",
    outline: "none",
    boxSizing: "border-box",
    marginBottom: "1rem",
    fontFamily: FONT,
    transition: "border-color 0.2s",
  },
  select: {
    width: "100%",
    background: C.surfaceHi,
    border: `1.5px solid ${C.border}`,
    borderRadius: 10,
    padding: "0.75rem 1rem",
    color: C.text,
    fontSize: "0.92rem",
    outline: "none",
    boxSizing: "border-box",
    marginBottom: "1rem",
    fontFamily: FONT,
    appearance: "none",
  },
  btnPrimary: {
    width: "100%",
    background: "linear-gradient(135deg, #fbbf24, #f59e0b)",
    color: "#0b0f1a",
    border: "none",
    borderRadius: 12,
    padding: "1rem 2rem",
    fontSize: "1rem",
    fontWeight: 800,
    cursor: "pointer",
    letterSpacing: "0.02em",
    transition: "opacity 0.2s, transform 0.15s",
  },
  btnGhost: {
    background: C.surfaceHi,
    color: C.soft,
    border: `1.5px solid ${C.border}`,
    borderRadius: 10,
    padding: "0.8rem 1.5rem",
    fontSize: "0.88rem",
    cursor: "pointer",
    fontFamily: FONT,
  },
  divider: {
    height: 1,
    background: C.border,
    margin: "2rem 0",
  },
};

// ─── PIPELINE COMPONENT ───────────────────────────────────────────────────────

function Pipeline({ activeStage = null }) {
  return (
    <div style={{ overflowX: "auto", marginBottom: "2rem" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 0,
        minWidth: 580,
        padding: "0.25rem 0",
      }}>
        {STAGES.map((stage, i) => (
          <div key={stage.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            {/* Node */}
            <div style={{
              flex: "0 0 auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.4rem",
            }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: activeStage === i
                  ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                  : C.surfaceHi,
                border: `2px solid ${activeStage === i ? C.amber : C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                transition: "all 0.3s",
                boxShadow: activeStage === i ? `0 0 16px ${C.amberGlow}` : "none",
              }}>
                {stage.icon}
              </div>
              <span style={{
                fontSize: "0.6rem",
                color: activeStage === i ? C.amber : C.muted,
                textAlign: "center",
                maxWidth: 60,
                lineHeight: 1.3,
                fontWeight: activeStage === i ? 700 : 400,
              }}>
                {stage.title}
              </span>
            </div>
            {/* Connector */}
            {i < STAGES.length - 1 && (
              <div style={{
                flex: 1,
                height: 2,
                background: `linear-gradient(90deg, ${C.amber}44, ${C.border})`,
                marginBottom: "1.2rem",
              }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── STAGE CARDS ─────────────────────────────────────────────────────────────

function StagesGrid() {
  const [open, setOpen] = useState(null);
  return (
    <div>
      {STAGES.map((stage, i) => (
        <div
          key={stage.id}
          style={{
            ...S.card,
            cursor: "pointer",
            border: open === i ? `1px solid ${C.borderHi}` : `1px solid ${C.border}`,
            transition: "border-color 0.2s",
          }}
          onClick={() => setOpen(open === i ? null : i)}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
              <span style={{
                fontSize: "1.5rem",
                background: C.amberDim,
                border: `1px solid ${C.borderHi}`,
                borderRadius: 10,
                padding: "0.4rem 0.6rem",
              }}>{stage.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem", color: C.text }}>{stage.title}</div>
                <div style={{ fontSize: "0.75rem", color: C.muted, marginTop: "0.1rem" }}>{stage.sub}</div>
              </div>
            </div>
            <span style={{ color: C.muted, fontSize: "1rem", transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
          </div>
          {open === i && (
            <div style={{ marginTop: "1.25rem", paddingTop: "1.25rem", borderTop: `1px solid ${C.border}` }}>
              <p style={{ fontSize: "0.88rem", color: C.soft, lineHeight: 1.8, margin: "0 0 0.75rem" }}>{stage.desc}</p>
              <div style={{
                background: C.amberDim,
                border: `1px solid ${C.borderHi}`,
                borderRadius: 8,
                padding: "0.6rem 0.9rem",
                fontSize: "0.78rem",
                color: C.amber,
                fontWeight: 600,
              }}>
                📎 {stage.detail}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── FORM SCREEN ─────────────────────────────────────────────────────────────

function FormScreen({ onSubmit }) {
  const [f, setF] = useState({
    name: "", role: "", bizType: "", staff: "", departments: "",
    phone: "", challenge: "",
  });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const valid = f.name && f.phone && f.bizType && f.staff;

  return (
    <div>
      <div style={S.chip()}>مسیر اول — آماده برای مشاوره</div>
      <h2 style={{ ...S.h1, fontSize: "1.6rem" }}>اطلاعات سازمان را وارد کنید</h2>
      <p style={{ ...S.lead, fontSize: "0.88rem" }}>
        قبل از اولین جلسه، این اطلاعات به ما کمک می‌کند زمانتان را هدر ندهیم
        و با یک تصویر واقعی از سازمانتان پشت میز بنشینیم.
      </p>

      <div style={S.card}>
        <div style={S.label}>نام و نام خانوادگی *</div>
        <input style={S.input} value={f.name} onChange={set("name")} placeholder="علی محمدی" />

        <div style={S.label}>سمت شما در سازمان</div>
        <input style={S.input} value={f.role} onChange={set("role")} placeholder="مدیرعامل، مالک، مدیر عملیات..." />

        <div style={S.label}>نوع کسب‌وکار *</div>
        <select style={S.select} value={f.bizType} onChange={set("bizType")}>
          <option value="">انتخاب کنید</option>
          <option value="trade">بازرگانی / توزیع</option>
          <option value="production">تولیدی / صنعتی</option>
          <option value="service">خدماتی / مشاوره</option>
          <option value="mixed">ترکیبی</option>
        </select>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
          <div>
            <div style={S.label}>تعداد پرسنل *</div>
            <select style={{ ...S.select, marginBottom: 0 }} value={f.staff} onChange={set("staff")}>
              <option value="">انتخاب کنید</option>
              <option value="1-5">۱ تا ۵ نفر</option>
              <option value="6-15">۶ تا ۱۵ نفر</option>
              <option value="16-50">۱۶ تا ۵۰ نفر</option>
              <option value="50+">بیشتر از ۵۰ نفر</option>
            </select>
          </div>
          <div>
            <div style={S.label}>بخش‌های موجود</div>
            <input style={{ ...S.input, marginBottom: 0 }} value={f.departments}
              onChange={set("departments")} placeholder="فروش، تولید، مالی..." />
          </div>
        </div>
      </div>

      <div style={S.card}>
        <div style={S.label}>شماره تماس *</div>
        <input style={S.input} value={f.phone} onChange={set("phone")}
          placeholder="۰۹۱۲..." dir="ltr" />

        <div style={S.label}>بزرگ‌ترین چالشی که الان درگیرش هستید</div>
        <textarea
          style={{
            ...S.input,
            minHeight: 90,
            resize: "vertical",
            lineHeight: 1.7,
          }}
          value={f.challenge}
          onChange={set("challenge")}
          placeholder="مثلاً: وابستگی شدید به خودم، هرج‌ومرج در تیم فروش، نمی‌دانم پول به کجا می‌رود..."
        />
      </div>

      <button
        style={{ ...S.btnPrimary, opacity: valid ? 1 : 0.4, cursor: valid ? "pointer" : "not-allowed" }}
        onClick={() => valid && onSubmit(f)}
      >
        ثبت درخواست مشاوره سیستم‌سازی ←
      </button>
      <p style={{ textAlign: "center", fontSize: "0.73rem", color: C.muted, marginTop: "0.75rem" }}>
        ظرف ۲۴ ساعت کاری تماس گرفته می‌شود · اطلاعات شما محرمانه است
      </p>
    </div>
  );
}

// ─── FORM SUCCESS ─────────────────────────────────────────────────────────────

function FormSuccess({ name }) {
  return (
    <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>✅</div>
      <h2 style={{ ...S.h1, fontSize: "1.6rem" }}>درخواست {name} ثبت شد</h2>
      <p style={{ ...S.lead, maxWidth: 480, margin: "0 auto 2rem" }}>
        ظرف ۲۴ ساعت کاری با شما تماس می‌گیریم تا اولین جلسه را تنظیم کنیم.
        قبل از جلسه، یک پرسشنامه کوتاه آماده‌سازی برایتان ارسال می‌شود.
      </p>
      <div style={{ ...S.cardAmber, maxWidth: 440, margin: "0 auto", textAlign: "right" }}>
        <p style={{ fontSize: "0.82rem", color: C.amber, fontWeight: 700, marginBottom: "0.5rem" }}>
          📌 آنچه در اولین جلسه اتفاق می‌افتد:
        </p>
        {["بررسی وضعیت فعلی سازمان بدون قضاوت",
          "شناسایی اولیه گلوگاه‌های اصلی",
          "برآورد زمان و منابع مورد نیاز پروژه",
          "پاسخ به سوالات شما درباره فرآیند"].map((item, i) => (
          <div key={i} style={{ fontSize: "0.83rem", color: C.soft, padding: "0.3rem 0", borderBottom: i < 3 ? `1px solid ${C.border}` : "none" }}>
            ← {item}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── DIAGNOSTIC QUIZ ─────────────────────────────────────────────────────────

function DiagQuiz({ onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(DIAG_QS.length).fill(null));
  const [sel, setSel] = useState(null);
  const q = DIAG_QS[current];
  const pct = Math.round(((current + 1) / DIAG_QS.length) * 100);

  const handleNext = () => {
    if (sel === null) return;
    const na = [...answers];
    na[current] = DIAG_QS[current].options[sel].score;
    setAnswers(na);
    if (current + 1 < DIAG_QS.length) {
      setCurrent(current + 1);
      setSel(null);
    } else {
      onFinish(na);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.72rem", color: C.muted, marginBottom: "0.4rem" }}>
        <span>سوال {current + 1} از {DIAG_QS.length}</span>
        <span>{pct}%</span>
      </div>
      <div style={{ height: 4, background: C.surfaceHi, borderRadius: 99, marginBottom: "1.75rem", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${C.amber}, #f59e0b)`, borderRadius: 99, transition: "width 0.3s" }} />
      </div>

      <div style={S.card}>
        <p style={{ fontSize: "1.02rem", fontWeight: 700, color: C.text, lineHeight: 1.65, marginBottom: "1.25rem" }}>{q.q}</p>
        {q.options.map((opt, i) => (
          <button key={i} onClick={() => setSel(i)} style={{
            width: "100%",
            textAlign: "right",
            background: sel === i ? C.amberDim : C.surfaceHi,
            border: `1.5px solid ${sel === i ? C.amber : C.border}`,
            borderRadius: 10,
            padding: "0.85rem 1rem",
            cursor: "pointer",
            color: sel === i ? C.text : C.soft,
            fontSize: "0.87rem",
            lineHeight: 1.5,
            marginBottom: "0.5rem",
            display: "block",
            fontFamily: FONT,
            transition: "all 0.15s",
          }}>
            {opt.text}
          </button>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", gap: "0.75rem" }}>
        {current > 0
          ? <button style={S.btnGhost} onClick={() => { setCurrent(current - 1); setSel(answers[current - 1] !== null ? DIAG_QS[current - 1].options.findIndex(o => o.score === answers[current - 1]) : null); }}>← قبلی</button>
          : <div />
        }
        <button
          style={{ ...S.btnPrimary, flex: 1, opacity: sel !== null ? 1 : 0.4 }}
          onClick={handleNext}
        >
          {current + 1 < DIAG_QS.length ? "بعدی →" : "مشاهده نتیجه →"}
        </button>
      </div>
    </div>
  );
}

// ─── DIAGNOSTIC RESULT ───────────────────────────────────────────────────────

function DiagResult({ answers, onConsult }) {
  const r = diagAnalyze(answers);

  const MESSAGES = {
    "قطعی": "کسب‌وکار شما دقیقاً همان وضعیتی را دارد که سیستم‌سازی برای آن ساخته شده است.",
    "بسیار محتمل": "نشانه‌های قوی وجود دارد که نبود سیستم، رشد شما را محدود می‌کند.",
    "نسبی": "در بخش‌هایی از سازمانتان، سیستم‌سازی می‌تواند تأثیر قابل توجهی داشته باشد.",
    "کم": "زیرساخت‌های اولیه شما نسبتاً مستحکم است. بهینه‌سازی هدفمند می‌تواند به رشد بعدی کمک کند.",
  };

  return (
    <div>
      {/* Score */}
      <div style={{ ...S.card, textAlign: "center", marginBottom: "1.25rem" }}>
        <div style={{ fontSize: "0.8rem", color: C.muted, marginBottom: "0.5rem" }}>
          شاخص نیاز به سیستم‌سازی
        </div>
        <div style={{
          fontSize: "3.8rem",
          fontWeight: 900,
          color: r.color,
          lineHeight: 1,
          marginBottom: "0.25rem",
        }}>{r.pct}%</div>
        <div style={{
          display: "inline-block",
          background: r.color + "18",
          border: `1.5px solid ${r.color}44`,
          color: r.color,
          borderRadius: 999,
          padding: "0.3rem 1.2rem",
          fontSize: "0.85rem",
          fontWeight: 700,
          marginTop: "0.5rem",
        }}>
          {r.icon} نیاز {r.verdict}
        </div>
      </div>

      {/* Message */}
      <div style={{ ...S.cardAmber, fontSize: "0.92rem", lineHeight: 1.8, color: C.amber }}>
        <strong style={{ display: "block", marginBottom: "0.4rem" }}>تحلیل:</strong>
        {MESSAGES[r.verdict]}
      </div>

      {/* Top pains */}
      {r.pct >= 40 && (
        <div style={S.card}>
          <p style={{ fontSize: "0.78rem", color: C.muted, fontWeight: 700, marginBottom: "1rem" }}>
            ⚠️ بیشترین فشار را از کجا احساس می‌کنید؟
          </p>
          {r.topPains.map((p, i) => (
            <div key={i} style={{
              background: C.dangerDim,
              border: `1px solid rgba(248,113,113,0.15)`,
              borderRadius: 10,
              padding: "0.75rem 1rem",
              marginBottom: "0.6rem",
              fontSize: "0.83rem",
              color: "#fca5a5",
              lineHeight: 1.6,
            }}>
              {p.q}
            </div>
          ))}
          <p style={{ fontSize: "0.78rem", color: C.muted, marginTop: "0.75rem", lineHeight: 1.6 }}>
            این‌ها دقیقاً همان نقاطی هستند که سیستم‌سازی بیشترین تأثیر را روی آن‌ها می‌گذارد.
            هر کدام از این‌ها به تنهایی می‌توانند ساعت‌ها از وقت مدیریتی شما را هر هفته آزاد کنند.
          </p>
        </div>
      )}

      {/* What systemsazi solves */}
      {r.pct >= 40 && (
        <div style={S.card}>
          <p style={{ fontSize: "0.78rem", color: C.amber, fontWeight: 700, marginBottom: "1rem" }}>
            سیستم‌سازی چه مشکلاتی از شما حل می‌کند؟
          </p>
          {[
            ["وابستگی به افراد کلیدی", "وقتی کسی می‌رود، سازمان ادامه می‌دهد"],
            ["اشتباهات تکراری", "فرآیند مشخص، خطای انسانی را به حداقل می‌رساند"],
            ["وقت مدیریتی هدررفته", "وقتتان برای تصمیم‌های بزرگ آزاد می‌شود"],
            ["آنبوردینگ کند", "نیروی جدید در چند روز مستقل می‌شود"],
            ["رشد سقف‌خورده", "سیستم مقیاس می‌پذیرد، شما نه"],
          ].map(([prob, sol], i) => (
            <div key={i} style={{
              display: "flex",
              gap: "0.75rem",
              padding: "0.6rem 0",
              borderBottom: i < 4 ? `1px solid ${C.border}` : "none",
              alignItems: "flex-start",
            }}>
              <span style={{ color: C.danger, fontSize: "0.82rem", flex: "0 0 auto", paddingTop: "0.1rem" }}>✗</span>
              <span style={{ color: C.soft, fontSize: "0.82rem", flex: 1 }}>{prob}</span>
              <span style={{ color: C.success, fontSize: "0.82rem", flex: "0 0 auto", paddingTop: "0.1rem" }}>✓</span>
              <span style={{ color: C.soft, fontSize: "0.82rem", flex: 1 }}>{sol}</span>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div style={{
        background: "linear-gradient(135deg, rgba(251,191,36,0.08), rgba(245,158,11,0.04))",
        border: `1px solid ${C.borderHi}`,
        borderRadius: 16,
        padding: "2rem 1.5rem",
        textAlign: "center",
        marginTop: "1.5rem",
      }}>
        <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{r.pct >= 50 ? "🚀" : "💡"}</div>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.75rem", color: C.text }}>
          {r.pct >= 50
            ? "وقتش رسیده — کسب‌وکارتان منتظر این تغییر است"
            : "یک جلسه کافی است تا مسیر را روشن کنیم"}
        </h3>
        <p style={{ fontSize: "0.87rem", color: C.soft, lineHeight: 1.75, marginBottom: "1.5rem" }}>
          در یک جلسه اختصاصی، بررسی می‌کنیم کدام بخش‌های سازمانتان بیشترین
          بازدهی را از سیستم‌سازی دارند — و یک نقشه راه واقعی طراحی می‌کنیم.
        </p>
        <button
          style={S.btnPrimary}
          onClick={onConsult}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-1px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}
        >
          درخواست مشاوره سیستم‌سازی ←
        </button>
        <p style={{ fontSize: "0.7rem", color: C.muted, marginTop: "0.75rem" }}>
          اولین جلسه آشنایی · بدون تعهد
        </p>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("home"); // home | form | formDone | diag | diagDone | formAfterDiag | formDoneAfterDiag
  const [diagAnswers, setDiagAnswers] = useState(null);
  const [submittedName, setSubmittedName] = useState("");

  return (
    <div style={S.root}>
      <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800;900&display=swap" rel="stylesheet" />

      <div style={S.wrap}>

        {/* ── HOME ── */}
        {screen === "home" && (
          <>
            {/* Hero */}
            <div style={S.chip()}>خدمات سیستم‌سازی سازمانی</div>
            <h1 style={S.h1}>
              کسب‌وکاری که<br />
              <span style={{ color: C.amber }}>بدون شما</span> کار کند
            </h1>
            <p style={S.lead}>
              اگر امروز دو هفته مرخصی بگیرید، سازمانتان چه وضعی پیدا می‌کند؟
              اگر جوابتان «فاجعه» است — مشکل شما نیروی انسانی نیست، نبود سیستم است.
            </p>

            {/* Pipeline */}
            <div style={{ ...S.card, padding: "1.5rem 1rem 1rem" }}>
              <p style={{ ...S.label, marginBottom: "1.25rem" }}>فرآیند سیستم‌سازی — از تشخیص تا استقرار</p>
              <Pipeline />
            </div>

            {/* Stage accordion */}
            <StagesGrid />

            <div style={S.divider} />

            {/* Two paths */}
            <p style={{ ...S.label, textAlign: "center", marginBottom: "1.5rem" }}>
              از کجا شروع می‌کنید؟
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
              {/* Path 1 */}
              <div
                style={{
                  ...S.cardAmber,
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "transform 0.15s",
                }}
                onClick={() => setScreen("form")}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>✅</div>
                <div style={{ fontWeight: 800, fontSize: "0.92rem", color: C.amber, marginBottom: "0.4rem" }}>
                  مطمئنم نیاز دارم
                </div>
                <div style={{ fontSize: "0.75rem", color: C.soft, lineHeight: 1.5 }}>
                  اطلاعات سازمانم را وارد می‌کنم و منتظر تماس می‌مانم
                </div>
              </div>
              {/* Path 2 */}
              <div
                style={{
                  ...S.card,
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "transform 0.15s",
                }}
                onClick={() => setScreen("diag")}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🤔</div>
                <div style={{ fontWeight: 800, fontSize: "0.92rem", color: C.text, marginBottom: "0.4rem" }}>
                  مطمئن نیستم
                </div>
                <div style={{ fontSize: "0.75rem", color: C.soft, lineHeight: 1.5 }}>
                  تشخیص دهم آیا سیستم‌سازی مشکلم را حل می‌کند
                </div>
              </div>
            </div>
          </>
        )}

        {/* ── FORM ── */}
        {screen === "form" && (
          <>
            <button style={{ ...S.btnGhost, marginBottom: "1.5rem" }} onClick={() => setScreen("home")}>← بازگشت</button>
            <FormScreen onSubmit={(f) => { setSubmittedName(f.name); setScreen("formDone"); }} />
          </>
        )}

        {/* ── FORM DONE ── */}
        {screen === "formDone" && <FormSuccess name={submittedName} />}

        {/* ── DIAGNOSTIC ── */}
        {screen === "diag" && (
          <>
            <button style={{ ...S.btnGhost, marginBottom: "1.5rem" }} onClick={() => setScreen("home")}>← بازگشت</button>
            <div style={S.chip("#94a3b8")}>تشخیص نیاز — ۷ سوال</div>
            <h2 style={{ ...S.h1, fontSize: "1.6rem" }}>آیا مشکل شما «نبود سیستم» است؟</h2>
            <p style={{ ...S.lead, fontSize: "0.87rem" }}>
              این ۷ سوال دقیقاً همان چیزهایی را می‌سنجند که یک مشاور در اولین جلسه می‌پرسد.
              صادقانه جواب دهید — نتیجه فقط برای شماست.
            </p>
            <DiagQuiz onFinish={(a) => { setDiagAnswers(a); setScreen("diagDone"); }} />
          </>
        )}

        {/* ── DIAG DONE ── */}
        {screen === "diagDone" && diagAnswers && (
          <>
            <DiagResult
              answers={diagAnswers}
              onConsult={() => setScreen("formAfterDiag")}
            />
          </>
        )}

        {/* ── FORM AFTER DIAG ── */}
        {screen === "formAfterDiag" && (
          <>
            <button style={{ ...S.btnGhost, marginBottom: "1.5rem" }} onClick={() => setScreen("diagDone")}>← بازگشت به نتیجه</button>
            <FormScreen onSubmit={(f) => { setSubmittedName(f.name); setScreen("formDoneAfterDiag"); }} />
          </>
        )}

        {/* ── FORM DONE AFTER DIAG ── */}
        {screen === "formDoneAfterDiag" && <FormSuccess name={submittedName} />}

      </div>
    </div>
  );
}