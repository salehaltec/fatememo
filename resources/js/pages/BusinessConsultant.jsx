import { useState, useRef } from "react";
import PhoneVerification from "../components/PhoneVerification";
import SharedContactForm from "../components/SharedContactForm";

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
// Accent: warm gold #d97706/#f59e0b — distinct from teal (consulting v1)
// and purple (business-check) and amber (systemsazi).
// Gold = earned expertise, real value, trust built over time.
// Signature element: 5-question inline diagnostic that animates result
// without page change — score bars fill live, recommendation appears.
// ─────────────────────────────────────────────────────────────────────────────

const C = {
  bg:         "#09080f",
  surface:    "#110f1c",
  surfaceHi:  "#1a1728",
  border:     "rgba(255,255,255,0.07)",
  borderGold: "rgba(217,119,6,0.35)",
  gold:       "#f59e0b",
  goldDeep:   "#d97706",
  goldDim:    "rgba(245,158,11,0.1)",
  text:       "#f1f5f9",
  muted:      "#4b5563",
  soft:       "#94a3b8",
  red:        "#f87171",
  redDim:     "rgba(248,113,113,0.08)",
  green:      "#34d399",
  blue:       "#60a5fa",
  violet:     "#a78bfa",
};

const FONT = "'Vazirmatn','Segoe UI',Tahoma,sans-serif";

// ─── DOMAINS ─────────────────────────────────────────────────────────────────

const DOMAINS = [
  { icon: "📊", label: "استراتژی کسب‌وکار",       desc: "موقعیت‌یابی رقابتی، مدل درآمدی، مسیر رشد" },
  { icon: "💰", label: "مالی و حسابداری مدیریتی", desc: "تحلیل صورت‌های مالی، بودجه، سودآوری واقعی" },
  { icon: "🛒", label: "فروش و توسعه بازار",       desc: "ساختار تیم فروش، قیف، مذاکره، قرارداد" },
  { icon: "📣", label: "بازاریابی و برند",          desc: "پوزیشنینگ، پیام برند، کانال‌های جذب مشتری" },
  { icon: "⚙️", label: "عملیات و فرآیند",          desc: "بهینه‌سازی گردش کار، KPI، کاهش هدررفت" },
  { icon: "👥", label: "منابع انسانی",              desc: "ساختار سازمانی، جذب، ارزیابی، فرهنگ" },
  { icon: "🌐", label: "دیجیتال و وب",              desc: "استراتژی دیجیتال، UX، سئو، فروش آنلاین" },
  { icon: "🤖", label: "هوش مصنوعی کاربردی",       desc: "شناسایی فرصت‌های AI، ابزارها، خودکارسازی" },
  { icon: "🔬", label: "تحقیق و توسعه",             desc: "فرآیند نوآوری، توسعه محصول، آزمون سریع" },
  { icon: "📦", label: "زنجیره تامین",              desc: "مدیریت تامین‌کنندگان، انبار، هزینه پنهان" },
  { icon: "⚖️", label: "حقوقی و قراردادی",         desc: "ریسک قرارداد، ساختار شرکت، مذاکره شراکت" },
  { icon: "📈", label: "داده و تحلیل",              desc: "داشبورد مدیریتی، تصمیم‌گیری بر پایه داده" },
];

// ─── SERVICES ─────────────────────────────────────────────────────────────────

const SERVICES = {
  consulting: {
    id: "consulting", icon: "🧭", color: "#60a5fa",
    colorDim: "rgba(96,165,250,0.1)",
    title: "مشاوره مدیریت",
    tagline: "تصمیم درست، سریع‌تر",
    desc: "برای مدیرانی که با تصمیم‌های پیچیده روبرو هستند و به یک نگاه بیرونی آگاه نیاز دارند. مشاور تحلیل می‌کند، گزینه‌ها را می‌سنجد و توصیه مشخص می‌دهد.",
    forWho: [
      "می‌خواهید درباره یک تصمیم بزرگ صحبت کنید",
      "با یک بحران سازمانی یا مالی روبرو هستید",
      "می‌خواهید وارد بازار جدید یا مشارکت جدیدی شوید",
      "به بررسی بیرونی استراتژی فعلی‌تان نیاز دارید",
    ],
    packages: [
      { name: "جلسه تک",      detail: "۹۰ دقیقه + خلاصه مکتوب" },
      { name: "ماهانه",       detail: "۲ جلسه در ماه + دسترسی بین جلسات" },
      { name: "همراه سالانه", detail: "۸ جلسه در ماه + حضور در جلسات مهم" },
    ],
    notFor: "کسانی که به رشد شخصی یا یادگیری از تجربه نیاز دارند",
  },
  coaching: {
    id: "coaching", icon: "🔥", color: "#34d399",
    colorDim: "rgba(52,211,153,0.1)",
    title: "کوچینگ کسب‌وکار",
    tagline: "از دانستن به انجام دادن",
    desc: "برای مدیرانی که جواب را می‌دانند اما اجرا نمی‌کنند، یا تیمی دارند که نتیجه نمی‌گیرد. کوچ سوال می‌پرسد، چالش می‌کند و کمک می‌کند قابلیت‌های خودتان را کشف کنید.",
    forWho: [
      "تصمیم گرفته‌اید اما اجرا نمی‌کنید",
      "تیم دارید اما نتیجه ندارید",
      "انگیزه یا وضوح مسیر ندارید",
      "می‌خواهید رفتارهای مدیریتی‌تان را تغییر دهید",
    ],
    packages: [
      { name: "جلسه تک",        detail: "۶۰ دقیقه + تکلیف عملی" },
      { name: "دوره ۸ جلسه‌ای", detail: "یک چالش مشخص، ۸ هفته، نتیجه اندازه‌گیری‌پذیر" },
      { name: "کوچینگ مستمر",   detail: "۴ جلسه در ماه + چک‌این هفتگی" },
    ],
    notFor: "کسانی که به اطلاعات و تحلیل بیرونی نیاز دارند، نه قابلیت درونی",
  },
  mentoring: {
    id: "mentoring", icon: "🌱", color: "#a78bfa",
    colorDim: "rgba(167,139,250,0.1)",
    title: "منتورینگ",
    tagline: "یاد گرفتن از راه رفته",
    desc: "برای کارآفرینان و مدیرانی که می‌خواهند از تجربه، اشتباهات و مسیر طی‌شده یک نفر که قبلاً در همین راه بوده یاد بگیرند. منتور تجربه را منتقل می‌کند.",
    forWho: [
      "در ابتدای مسیر کارآفرینی هستید",
      "می‌خواهید از اشتباهات دیگران یاد بگیرید",
      "به الگو و راهنمای مسیر نیاز دارید",
      "می‌خواهید شبکه و دیدگاه‌تان را گسترش دهید",
    ],
    packages: [
      { name: "جلسه آشنایی", detail: "۴۵ دقیقه — ببینیم همخوانی داریم" },
      { name: "ماهانه",       detail: "۲ جلسه در ماه + دسترسی برای سوال" },
      { name: "سالانه",       detail: "جلسات منظم + معرفی به شبکه + مرور تصمیم‌ها" },
    ],
    notFor: "کسانی که به تحلیل یا راه‌حل فوری نیاز دارند",
  },
};

// ─── DIAGNOSTIC QUESTIONS ─────────────────────────────────────────────────────

const DIAG = [
  {
    q: "در چه حوزه‌ای بیشتر به کمک نیاز دارید؟",
    w: 2,
    opts: [
      { text: "تصمیم‌های کسب‌وکار: رشد، بازار، مالی، شراکت", s: { consulting:4, coaching:1, mentoring:1 } },
      { text: "اجرا و پیاده‌سازی: تیم، فرآیند، نتیجه گرفتن",  s: { consulting:2, coaching:4, mentoring:2 } },
      { text: "مسیر شخصی و رهبری: چطور مدیر بهتری باشم",      s: { consulting:1, coaching:2, mentoring:4 } },
    ],
  },
  {
    q: "مشکل اصلی الان دقیقاً چیست؟",
    w: 2,
    opts: [
      { text: "نمی‌دانم چه تصمیمی بگیرم — اطلاعات یا دیدگاه بیرونی ندارم", s: { consulting:4, coaching:1, mentoring:2 } },
      { text: "می‌دانم چه باید بکنم اما اجرا نمی‌شود یا انگیزه ندارم",      s: { consulting:1, coaching:4, mentoring:2 } },
      { text: "نمی‌دانم چه مدیری می‌خواهم باشم — الگو و راهنما ندارم",       s: { consulting:1, coaching:2, mentoring:4 } },
    ],
  },
  {
    q: "از این جلسات چه انتظاری دارید؟",
    w: 1.5,
    opts: [
      { text: "تحلیل وضعیت، پیشنهاد راه‌حل، توصیه اجرایی مشخص", s: { consulting:4, coaching:1, mentoring:2 } },
      { text: "سوال، چالش، کمک برای پیدا کردن جواب خودم",          s: { consulting:1, coaching:4, mentoring:2 } },
      { text: "شنیدن تجربه، اشتباهات، یاد گرفتن از راه رفته",       s: { consulting:1, coaching:2, mentoring:4 } },
    ],
  },
  {
    q: "کسب‌وکار شما در چه مرحله‌ای است؟",
    w: 1.5,
    opts: [
      { text: "بالغ و در حال تصمیم‌های مهم (توسعه، سرمایه، بحران)", s: { consulting:4, coaching:2, mentoring:1 } },
      { text: "در حال رشد، تیم دارد، نتیجه‌ها ثابت نیست",            s: { consulting:2, coaching:4, mentoring:2 } },
      { text: "اول راه یا در حال یادگیری — می‌خواهم درست شروع کنم", s: { consulting:1, coaching:2, mentoring:4 } },
    ],
  },
  {
    q: "چه چیزی برایتان مهم‌تر است؟",
    w: 1,
    opts: [
      { text: "گرفتن جواب درست برای یک مسئله مشخص — سریع و دقیق",  s: { consulting:4, coaching:1, mentoring:2 } },
      { text: "پیشرفت مستمر در طول زمان — تبدیل شدن به نسخه بهتر", s: { consulting:1, coaching:3, mentoring:4 } },
      { text: "ترکیبی از هر دو — هم جواب، هم رشد",                   s: { consulting:2, coaching:3, mentoring:3 } },
    ],
  },
];

const WRONG_CASES = [
  { icon:"💸", text:"مشاور بازاریابی پیشنهاد کمپین ۵۰ میلیونی داد — بدون بررسی جریان نقدی. شش ماه بعد کسب‌وکار با بحران مواجه شد." },
  { icon:"🤖", text:"مشاور مانع سرمایه‌گذاری در ابزار AI شد چون نمی‌شناخت. رقبا امروز با همان ابزار هزینه‌شان را نصف کرده‌اند." },
  { icon:"👥", text:"ساختار سازمانی طراحی شد بدون شناخت فرهنگ تیم. نتیجه: استعفای سه نفر کلیدی ظرف یک ماه." },
  { icon:"🌍", text:"توصیه‌ها بر اساس متدهای خارجی بود بدون درک بازار ایران. اجرا شد، شکست خورد، پول سوخت." },
];

// ─── DOMAIN RADAR ─────────────────────────────────────────────────────────────

function DomainRadar() {
  const [hov, setHov] = useState(null);
  return (
    <div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"0.45rem", marginBottom:"0.75rem" }}>
        {DOMAINS.map((d,i) => (
          <button key={i}
            onMouseEnter={()=>setHov(i)} onMouseLeave={()=>setHov(null)}
            onTouchStart={()=>setHov(hov===i?null:i)}
            style={{
              background: hov===i ? "rgba(245,158,11,0.1)" : "#1a1728",
              border: `1.5px solid ${hov===i ? C.gold : "rgba(255,255,255,0.07)"}`,
              borderRadius:999, padding:"0.4rem 0.85rem", fontSize:"0.77rem",
              color: hov===i ? C.gold : C.soft, cursor:"pointer", fontFamily:FONT,
              transition:"all 0.15s", fontWeight: hov===i ? 700 : 400,
              display:"flex", alignItems:"center", gap:"0.3rem",
            }}>
            <span>{d.icon}</span><span>{d.label}</span>
          </button>
        ))}
      </div>
      <div style={{
        minHeight:48,
        background: hov!==null ? "rgba(245,158,11,0.1)" : "transparent",
        border: `1px solid ${hov!==null ? "rgba(217,119,6,0.35)" : "transparent"}`,
        borderRadius:10, padding: hov!==null ? "0.65rem 1rem" : 0,
        fontSize:"0.82rem", color:C.soft, lineHeight:1.6, transition:"all 0.2s",
      }}>
        {hov!==null && <span><strong style={{color:C.gold}}>{DOMAINS[hov].label}:</strong> {DOMAINS[hov].desc}</span>}
      </div>
    </div>
  );
}

// ─── DIAGNOSTIC QUIZ ─────────────────────────────────────────────────────────

function Diagnostic({ onResult }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [sel, setSel] = useState(null);
  const [loading, setLoading] = useState(false);
  const q = DIAG[step];
  const pct = Math.round(((step+(sel!==null?1:0))/DIAG.length)*100);

  const handleNext = () => {
    if (sel===null) return;
    const na = [...answers, { optIdx:sel, w:q.w, s:q.opts[sel].s }];
    if (step+1 < DIAG.length) {
      setAnswers(na); setStep(step+1); setSel(null);
    } else {
      setLoading(true);
      const totals = {consulting:0, coaching:0, mentoring:0};
      na.forEach(a => Object.keys(totals).forEach(k => { totals[k] += a.s[k]*a.w; }));
      const best = Object.entries(totals).sort((a,b)=>b[1]-a[1])[0][0];
      setTimeout(() => onResult(best, totals), 700);
    }
  };

  if (loading) return (
    <div style={{textAlign:"center",padding:"2.5rem 1rem"}}>
      <div style={{fontSize:"2rem",marginBottom:"0.5rem"}}>⏳</div>
      <div style={{color:C.soft,fontSize:"0.88rem"}}>در حال تحلیل پاسخ‌ها...</div>
    </div>
  );

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.7rem",color:C.muted,marginBottom:"0.35rem"}}>
        <span>سوال {step+1} از {DIAG.length}</span><span>{pct}٪</span>
      </div>
      <div style={{height:3,background:C.surfaceHi,borderRadius:99,marginBottom:"1.5rem",overflow:"hidden"}}>
        <div style={{height:"100%",width:`${pct}%`,background:`linear-gradient(90deg,${C.gold},${C.goldDeep})`,transition:"width 0.35s"}}/>
      </div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:"1.5rem",marginBottom:"1rem"}}>
        <p style={{fontSize:"0.98rem",fontWeight:700,color:C.text,lineHeight:1.65,marginBottom:"1.1rem"}}>{q.q}</p>
        {q.opts.map((opt,i) => (
          <button key={i} onClick={()=>setSel(i)} style={{
            width:"100%",textAlign:"right",display:"block",
            background: sel===i ? "rgba(245,158,11,0.1)" : C.surfaceHi,
            border: `1.5px solid ${sel===i ? C.gold : C.border}`,
            borderRadius:10, padding:"0.8rem 1rem", cursor:"pointer",
            color: sel===i ? C.text : C.soft, fontSize:"0.86rem",lineHeight:1.5,
            marginBottom:"0.45rem", fontFamily:FONT, transition:"all 0.12s",
            fontWeight: sel===i ? 600 : 400,
          }}>{opt.text}</button>
        ))}
      </div>
      <div style={{display:"flex",gap:"0.75rem",justifyContent:"space-between"}}>
        {step>0
          ? <button style={{background:C.surfaceHi,color:C.soft,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"0.65rem 1.1rem",fontSize:"0.83rem",cursor:"pointer",fontFamily:FONT}}
              onClick={()=>{setStep(step-1);setSel(null);setAnswers(answers.slice(0,-1));}}>← قبلی</button>
          : <div/>}
        <button
          style={{flex:1,background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"#09080f",border:"none",borderRadius:12,padding:"0.9rem 2rem",fontSize:"0.95rem",fontWeight:800,cursor:"pointer",fontFamily:FONT,opacity:sel!==null?1:0.35}}
          onClick={handleNext}>
          {step+1<DIAG.length ? "بعدی ←" : "مشاهده نتیجه ←"}
        </button>
      </div>
    </div>
  );
}

// ─── DIAG RESULT ─────────────────────────────────────────────────────────────

function DiagResult({ result, totals, onConsult, onCompare }) {
  const svc = SERVICES[result];
  const maxScore = Math.max(...Object.values(totals));

  return (
    <div>
      <div style={{
        background: svc.colorDim, border:`1.5px solid ${svc.color}50`,
        borderRadius:16, padding:"2rem 1.5rem", textAlign:"center", marginBottom:"1rem",
      }}>
        <div style={{fontSize:"2.8rem",marginBottom:"0.5rem"}}>{svc.icon}</div>
        <div style={{fontSize:"0.7rem",color:svc.color,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"0.35rem"}}>
          بر اساس پاسخ‌های شما
        </div>
        <div style={{fontSize:"1.75rem",fontWeight:900,color:C.text,marginBottom:"0.3rem"}}>{svc.title}</div>
        <div style={{fontSize:"0.88rem",color:C.soft,fontStyle:"italic"}}>{svc.tagline}</div>
      </div>

      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:"1.5rem",marginBottom:"1rem"}}>
        <div style={{fontSize:"0.7rem",color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:"0.9rem"}}>تطابق با هر خدمت</div>
        {Object.entries(SERVICES).map(([key,s]) => {
          const p = Math.round((totals[key]/maxScore)*100);
          return (
            <div key={key} style={{marginBottom:"0.7rem"}}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:"0.78rem",marginBottom:"0.28rem"}}>
                <span style={{color:key===result?s.color:C.soft,fontWeight:key===result?700:400}}>{s.icon} {s.title}</span>
                <span style={{color:key===result?s.color:C.muted,fontWeight:key===result?700:400}}>{p}٪</span>
              </div>
              <div style={{height:6,background:C.surfaceHi,borderRadius:99,overflow:"hidden"}}>
                <div style={{height:"100%",width:`${p}%`,background:key===result?s.color:C.border,borderRadius:99,transition:"width 0.9s ease"}}/>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:"1.5rem",marginBottom:"1rem"}}>
        <p style={{fontSize:"0.86rem",color:C.soft,lineHeight:1.8,marginBottom:"1rem"}}>{svc.desc}</p>
        <div style={{fontSize:"0.7rem",color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:"0.6rem"}}>مناسب برای شما اگر:</div>
        {svc.forWho.map((item,i)=>(
          <div key={i} style={{display:"flex",gap:"0.5rem",fontSize:"0.82rem",color:C.soft,padding:"0.3rem 0",borderBottom:i<svc.forWho.length-1?`1px solid ${C.border}`:"none"}}>
            <span style={{color:svc.color,flexShrink:0}}>✓</span><span>{item}</span>
          </div>
        ))}
        <div style={{marginTop:"0.9rem",fontSize:"0.74rem",color:C.muted,lineHeight:1.6}}>
          <span style={{color:C.red}}>✗ مناسب نیست اگر: </span>{svc.notFor}
        </div>
      </div>

      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:"1.5rem",marginBottom:"1.25rem"}}>
        <div style={{fontSize:"0.7rem",color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:"0.85rem"}}>مدل‌های همکاری</div>
        {svc.packages.map((pkg,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0.6rem 0",borderBottom:i<svc.packages.length-1?`1px solid ${C.border}`:"none"}}>
            <span style={{fontSize:"0.85rem",fontWeight:700,color:C.text}}>{pkg.name}</span>
            <span style={{fontSize:"0.73rem",color:svc.color,background:svc.colorDim,border:`1px solid ${svc.color}40`,borderRadius:999,padding:"0.18rem 0.65rem"}}>{pkg.detail}</span>
          </div>
        ))}
      </div>

      <button style={{width:"100%",background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"#09080f",border:"none",borderRadius:12,padding:"1rem 2rem",fontSize:"1rem",fontWeight:800,cursor:"pointer",fontFamily:FONT,marginBottom:"0.6rem"}}
        onClick={onConsult}>
        درخواست {svc.title} ←
      </button>
      <button style={{width:"100%",background:C.surfaceHi,color:C.soft,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"0.7rem",fontSize:"0.83rem",cursor:"pointer",fontFamily:FONT}}
        onClick={onCompare}>
        مقایسه همه خدمات
      </button>
    </div>
  );
}

// ─── ALL SERVICES COMPARE ────────────────────────────────────────────────────

function AllServices({ highlight, onSelect }) {
  return (
    <div>
      {Object.values(SERVICES).map(svc => (
        <div key={svc.id} style={{
          background: svc.id===highlight ? svc.colorDim : C.surface,
          border: `1.5px solid ${svc.id===highlight ? svc.color+"60" : C.border}`,
          borderRadius:16, padding:"1.5rem", marginBottom:"1rem", cursor:"pointer",
          transition:"transform 0.15s",
        }}
          onClick={()=>onSelect(svc.id)}
          onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
          onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}
        >
          <div style={{display:"flex",alignItems:"center",gap:"0.75rem",marginBottom:"0.85rem"}}>
            <span style={{fontSize:"1.6rem"}}>{svc.icon}</span>
            <div>
              <div style={{fontWeight:800,fontSize:"0.95rem",color:C.text}}>{svc.title}</div>
              <div style={{fontSize:"0.74rem",color:svc.color,fontStyle:"italic"}}>{svc.tagline}</div>
            </div>
            {svc.id===highlight && (
              <div style={{marginRight:"auto",fontSize:"0.63rem",color:svc.color,background:svc.colorDim,border:`1px solid ${svc.color}40`,borderRadius:999,padding:"0.18rem 0.6rem",fontWeight:700}}>
                پیشنهاد برای شما
              </div>
            )}
          </div>
          <p style={{fontSize:"0.82rem",color:C.soft,lineHeight:1.75,margin:"0 0 0.75rem"}}>{svc.desc}</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:"0.35rem"}}>
            {svc.forWho.slice(0,2).map((item,i)=>(
              <span key={i} style={{fontSize:"0.73rem",color:C.soft,background:C.surfaceHi,border:`1px solid ${C.border}`,borderRadius:6,padding:"0.2rem 0.55rem"}}>✓ {item}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── CONTACT FORM ─────────────────────────────────────────────────────────────

function ContactForm({ preService }) {
  const [f, setF] = useState({ name:"", phone:"", service: preService||"", note:"" });
  const [done, setDone] = useState(false);
  const set = k => e => setF({...f,[k]:e.target.value});
  const valid = f.name && f.phone;
  const inputS = {width:"100%",background:C.surfaceHi,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"0.75rem 1rem",color:C.text,fontSize:"0.92rem",outline:"none",boxSizing:"border-box",marginBottom:"1rem",fontFamily:FONT};

  if (done) return (
    <div style={{textAlign:"center",padding:"2.5rem 1rem"}}>
      <div style={{fontSize:"3rem",marginBottom:"0.75rem"}}>✅</div>
      <div style={{fontSize:"1.2rem",fontWeight:800,marginBottom:"0.5rem",color:C.text}}>ثبت شد، {f.name}</div>
      <p style={{fontSize:"0.85rem",color:C.soft,lineHeight:1.75,maxWidth:420,margin:"0 auto 1.5rem"}}>
        ظرف ۲۴ ساعت کاری با شما تماس گرفته می‌شود. یک چالش یا سوال مشخص آماده داشته باشید — جلسه اول از آنجا شروع می‌شود.
      </p>
      <div style={{background:"rgba(245,158,11,0.1)",border:"1px solid rgba(217,119,6,0.35)",borderRadius:16,padding:"1.25rem",maxWidth:400,margin:"0 auto",textAlign:"right"}}>
        <div style={{fontSize:"0.78rem",color:C.gold,fontWeight:700,marginBottom:"0.6rem"}}>قبل از تماس بدانید:</div>
        {["جلسه اول اطلاعات است، نه معامله","اگر خدمت مناسبی نداشته باشم، می‌گویم","هر آنچه مطرح می‌شود محرمانه می‌ماند"]
          .map((item,i)=>(
          <div key={i} style={{fontSize:"0.8rem",color:C.soft,padding:"0.3rem 0",borderBottom:i<2?`1px solid ${C.border}`:"none"}}>← {item}</div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:"1.5rem",marginBottom:"1rem"}}>
        <div style={{fontSize:"0.72rem",color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:"0.4rem"}}>نام *</div>
        <input style={inputS} value={f.name} onChange={set("name")} placeholder="نام شما"/>

        <div style={{fontSize:"0.72rem",color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:"0.4rem"}}>شماره تماس *</div>
        <input style={inputS} value={f.phone} onChange={set("phone")} placeholder="۰۹۱۲..." dir="ltr"/>

        <div style={{fontSize:"0.72rem",color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:"0.4rem"}}>خدمت مورد نظر</div>
        <select style={{...inputS,appearance:"none"}} value={f.service} onChange={set("service")}>
          <option value="">انتخاب کنید</option>
          {Object.values(SERVICES).map(s=><option key={s.id} value={s.title}>{s.icon} {s.title}</option>)}
          <option value="notSure">هنوز مطمئن نیستم</option>
        </select>

        <div style={{fontSize:"0.72rem",color:C.muted,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",marginBottom:"0.4rem"}}>چالش یا سوال اصلی (اختیاری)</div>
        <textarea style={{...inputS,minHeight:78,resize:"vertical",lineHeight:1.7}} value={f.note} onChange={set("note")} placeholder="چه مسئله‌ای الان بیشتر از همه ذهنتان را درگیر کرده؟"/>
      </div>
      <button
        style={{width:"100%",background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"#09080f",border:"none",borderRadius:12,padding:"1rem 2rem",fontSize:"1rem",fontWeight:800,cursor:"pointer",fontFamily:FONT,opacity:valid?1:0.38}}
        onClick={()=>valid&&setDone(true)}>
        ثبت درخواست ←
      </button>
      <p style={{textAlign:"center",fontSize:"0.7rem",color:C.muted,marginTop:"0.65rem"}}>تماس ظرف ۲۴ ساعت کاری · اطلاعات محرمانه</p>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("home"); // home|quiz|result|compare|form
  const [diagResult, setDiagResult] = useState(null);
  const [diagTotals, setDiagTotals] = useState(null);
  const [selectedSvc, setSelectedSvc] = useState(null);
  const formRef = useRef(null);

  const goToForm = (svcId) => {
    setSelectedSvc(svcId || diagResult);
    setScreen("form");
    setTimeout(()=>formRef.current?.scrollIntoView({behavior:"smooth"}),50);
  };

  return (
    <div style={{fontFamily:FONT,direction:"rtl",background:C.bg,minHeight:"100vh",color:C.text,margin:0,padding:0}}>
      <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800;900&display=swap" rel="stylesheet"/>
      <div style={{maxWidth:740,margin:"0 auto",padding:"2.5rem 1.25rem 6rem"}}>

        {/* HERO */}
        <div style={{display:"inline-block",background:"rgba(245,158,11,0.12)",border:"1px solid rgba(245,158,11,0.3)",color:C.gold,borderRadius:999,padding:"0.28rem 0.9rem",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"1.1rem"}}>
          مشاوره · کوچینگ · منتورینگ
        </div>
        <h1 style={{fontSize:"clamp(1.9rem,5.5vw,3.1rem)",fontWeight:900,lineHeight:1.25,marginBottom:"1.25rem"}}>
          مشاور خوب<br/>
          <span style={{color:C.gold}}>نادر است.</span><br/>
          <span style={{fontSize:"58%",color:C.soft,fontWeight:600}}>و مشاور اشتباه، گران‌تر از نداشتن مشاور.</span>
        </h1>
        <p style={{fontSize:"1rem",color:C.soft,lineHeight:1.9,marginBottom:"2rem"}}>
          هر مدیری در نقطه‌ای به کسی نیاز دارد که بیرون از کسب‌وکار بایستد،
          بدون تعصب نگاه کند و بدون ترس از رابطه، حقیقت را بگوید.
          مشکل اینجاست که اکثر مشاوران در یک حوزه عمق دارند —
          اما کسب‌وکار شما در ده حوزه هم‌زمان تصمیم می‌گیرد.
        </p>

        {/* WRONG ADVISOR */}
        <div style={{background:C.redDim,border:"1px solid rgba(248,113,113,0.15)",borderRadius:16,padding:"1.5rem",marginBottom:"1rem"}}>
          <div style={{fontSize:"0.75rem",color:C.red,fontWeight:700,marginBottom:"1rem"}}>⚠️ این‌ها اتفاقات واقعی هستند — نه استعاره</div>
          {WRONG_CASES.map((c,i)=>(
            <div key={i} style={{display:"flex",gap:"0.75rem",padding:"0.6rem 0",borderBottom:i<WRONG_CASES.length-1?"1px solid rgba(248,113,113,0.1)":"none",alignItems:"flex-start"}}>
              <span style={{fontSize:"1.1rem",flexShrink:0}}>{c.icon}</span>
              <span style={{fontSize:"0.82rem",color:"#fca5a5",lineHeight:1.65}}>{c.text}</span>
            </div>
          ))}
          <p style={{fontSize:"0.77rem",color:C.muted,lineHeight:1.65,marginTop:"0.75rem",marginBottom:0}}>
            وجه مشترک: مشاورانی که خارج از حوزه‌شان توصیه دادند یا از ابزارها و متدهای جدید بی‌خبر بودند.
          </p>
        </div>

        {/* BREADTH */}
        <div style={{height:1,background:C.border,margin:"2rem 0"}}/>
        <div style={{display:"inline-block",background:"rgba(245,158,11,0.12)",border:"1px solid rgba(245,158,11,0.3)",color:C.gold,borderRadius:999,padding:"0.28rem 0.9rem",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"1.1rem"}}>
          تجربه عملیاتی در تمام حوزه‌ها
        </div>
        <h2 style={{fontSize:"clamp(1.2rem,3.5vw,1.8rem)",fontWeight:800,lineHeight:1.35,marginBottom:"0.75rem"}}>
          آشنایی واقعی با همه ابزارهایی که<br/>کسب‌وکارتان با آن کار می‌کند
        </h2>
        <p style={{fontSize:"0.87rem",color:C.soft,lineHeight:1.85,marginBottom:"1.25rem"}}>
          وقتی از وب‌سایت صحبت می‌کنیم، باید UX بداند. وقتی از AI حرف می‌زنیم، باید اجرا کرده باشد.
          وقتی از تیم صحبت می‌کنیم، باید روانشناسی سازمانی بداند. روی هر حوزه هاور کنید:
        </p>
        <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:"1.5rem",marginBottom:"1rem"}}>
          <DomainRadar/>
        </div>

        {/* THREE SERVICES INTRO */}
        <div style={{height:1,background:C.border,margin:"2rem 0"}}/>
        <h2 style={{fontSize:"clamp(1.2rem,3.5vw,1.8rem)",fontWeight:800,lineHeight:1.35,marginBottom:"0.6rem"}}>
          سه نوع همراهی — یک انتخاب درست
        </h2>
        <p style={{fontSize:"0.87rem",color:C.soft,lineHeight:1.85,marginBottom:"1.5rem"}}>
          مشاوره، کوچینگ و منتورینگ سه چیز کاملاً متفاوت‌اند. انتخاب اشتباه بین این‌ها یعنی هزینه زمان و پول
          برای چیزی که نیاز نداشتید. با پنج سوال مشخص می‌کنیم کدام‌یک برای وضعیت شما درست است.
        </p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"0.6rem",marginBottom:"1.5rem"}}>
          {Object.values(SERVICES).map(svc=>(
            <div key={svc.id} style={{background:svc.colorDim,border:`1px solid ${svc.color}40`,borderRadius:14,padding:"1rem 0.75rem",textAlign:"center"}}>
              <div style={{fontSize:"1.7rem",marginBottom:"0.4rem"}}>{svc.icon}</div>
              <div style={{fontSize:"0.8rem",fontWeight:700,color:C.text,marginBottom:"0.2rem"}}>{svc.title}</div>
              <div style={{fontSize:"0.68rem",color:svc.color,fontStyle:"italic"}}>{svc.tagline}</div>
            </div>
          ))}
        </div>

        {/* QUIZ / RESULT / COMPARE */}
        {screen === "home" && (
          <div style={{background:"rgba(245,158,11,0.1)",border:"1px solid rgba(217,119,6,0.35)",borderRadius:16,padding:"1.75rem 1.5rem",marginBottom:"1rem"}}>
            <div style={{fontSize:"0.72rem",color:C.gold,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"0.6rem"}}>
              ۵ سوال — تشخیص دقیق
            </div>
            <p style={{fontSize:"0.85rem",color:C.soft,lineHeight:1.75,marginBottom:"1.25rem"}}>
              بگویید کجای کسب‌وکارتان هستید، می‌گویم چه نوع همراهی‌ای واقعاً به دردتان می‌خورد.
            </p>
            <button style={{width:"100%",background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"#09080f",border:"none",borderRadius:12,padding:"1rem 2rem",fontSize:"1rem",fontWeight:800,cursor:"pointer",fontFamily:FONT}}
              onClick={()=>setScreen("quiz")}>
              شروع تشخیص ←
            </button>
          </div>
        )}

        {screen === "quiz" && (
          <>
            <div style={{display:"inline-block",background:"rgba(245,158,11,0.12)",border:"1px solid rgba(245,158,11,0.3)",color:C.gold,borderRadius:999,padding:"0.28rem 0.9rem",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"1.1rem"}}>تشخیص نوع خدمت</div>
            <button style={{float:"left",background:C.surfaceHi,color:C.soft,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"0.5rem 1rem",fontSize:"0.8rem",cursor:"pointer",fontFamily:FONT,marginBottom:"1rem"}}
              onClick={()=>setScreen("home")}>← بازگشت</button>
            <div style={{clear:"both"}}/>
            <Diagnostic onResult={(res,totals)=>{setDiagResult(res);setDiagTotals(totals);setScreen("verify");}}/>
          </>
        )}

        {screen === "verify" && diagResult && (
          <PhoneVerification dark accent="#f59e0b" assessment={{tool:"business-consultant",answers:diagTotals,result:{recommended:diagResult,totals:diagTotals}}} onVerified={()=>setScreen("result")} />
        )}

        {screen === "result" && diagResult && (
          <>
            <div style={{display:"inline-block",background:"rgba(245,158,11,0.12)",border:"1px solid rgba(245,158,11,0.3)",color:C.gold,borderRadius:999,padding:"0.28rem 0.9rem",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"1.1rem"}}>نتیجه تشخیص</div>
            <DiagResult
              result={diagResult} totals={diagTotals}
              onConsult={()=>goToForm()}
              onCompare={()=>setScreen("compare")}
            />
            <div style={{marginTop:"1.5rem"}}><SharedContactForm source="business-consultant" service={SERVICES[diagResult]?.title || "مشاوره کسب‌وکار"} dark /></div>
          </>
        )}

        {screen === "compare" && (
          <>
            <div style={{display:"inline-block",background:"rgba(245,158,11,0.12)",border:"1px solid rgba(245,158,11,0.3)",color:C.gold,borderRadius:999,padding:"0.28rem 0.9rem",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"1.1rem"}}>مقایسه خدمات</div>
            <button style={{float:"left",background:C.surfaceHi,color:C.soft,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"0.5rem 1rem",fontSize:"0.8rem",cursor:"pointer",fontFamily:FONT,marginBottom:"1rem"}}
              onClick={()=>setScreen("result")}>← بازگشت</button>
            <div style={{clear:"both"}}/>
            <AllServices highlight={diagResult} onSelect={(id)=>goToForm(id)}/>
          </>
        )}

        {/* STANDALONE CTA (home only) */}
        {screen === "home" && (
          <div style={{background:"linear-gradient(135deg,rgba(245,158,11,0.07),rgba(217,119,6,0.04))",border:"1px solid rgba(217,119,6,0.3)",borderRadius:16,padding:"2rem 1.5rem",textAlign:"center",marginTop:"1rem"}}>
            <div style={{fontSize:"1.6rem",marginBottom:"0.6rem"}}>🧭</div>
            <h3 style={{fontSize:"1.1rem",fontWeight:800,marginBottom:"0.5rem"}}>مطمئن نیستید چه نیازی دارید؟</h3>
            <p style={{fontSize:"0.83rem",color:C.soft,lineHeight:1.75,marginBottom:"1.25rem"}}>
              در یک جلسه آشنایی کوتاه، بدون تعهد، وضعیت را بررسی می‌کنیم.
              اگر بتوانم کمک واقعی بکنم می‌گویم، اگر نه، آن را هم می‌گویم.
            </p>
            <button style={{width:"100%",background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"#09080f",border:"none",borderRadius:12,padding:"1rem 2rem",fontSize:"1rem",fontWeight:800,cursor:"pointer",fontFamily:FONT}}
              onClick={()=>goToForm()}>
              درخواست جلسه آشنایی ←
            </button>
          </div>
        )}

        {/* FORM */}
        {screen === "form" && (
          <div ref={formRef}>
            <div style={{height:1,background:C.border,margin:"2rem 0"}}/>
            <div style={{display:"inline-block",background:"rgba(245,158,11,0.12)",border:"1px solid rgba(245,158,11,0.3)",color:C.gold,borderRadius:999,padding:"0.28rem 0.9rem",fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",marginBottom:"1.1rem"}}>ثبت درخواست</div>
            <h2 style={{fontSize:"1.4rem",fontWeight:800,marginBottom:"0.5rem"}}>اطلاعات تماس</h2>
            <p style={{fontSize:"0.85rem",color:C.soft,lineHeight:1.7,marginBottom:"1.5rem"}}>
              اطلاعات زیر را وارد کنید تا در اولین فرصت با شما تماس بگیریم.
            </p>
            <SharedContactForm source="business-consultant" service={selectedSvc ? SERVICES[selectedSvc]?.title : "مشاوره کسب‌وکار"} dark />
            <button style={{width:"100%",background:C.surfaceHi,color:C.soft,border:`1.5px solid ${C.border}`,borderRadius:10,padding:"0.7rem",fontSize:"0.83rem",cursor:"pointer",fontFamily:FONT,marginTop:"0.75rem"}}
              onClick={()=>setScreen(diagResult?"result":"home")}>
              ← بازگشت
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
