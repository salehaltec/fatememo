import { useState } from "react";
import PhoneVerification from "../components/PhoneVerification";
import SharedContactForm from "../components/SharedContactForm";

// ─── DATA ───────────────────────────────────────────────────────────────────

const TYPES = [
  {
    id: "trade",
    icon: "🏪",
    label: "بازرگانی",
    desc: "فروشگاه، نمایندگی، واسطه‌گری در فروش",
  },
  {
    id: "production",
    icon: "🏭",
    label: "تولیدی",
    desc: "کارخانه، کارگاه، محصول فیزیکی",
  },
  {
    id: "service",
    icon: "💡",
    label: "خدماتی",
    desc: "مشاوره، آموزش، خدمات تخصصی",
  },
];

const QUESTIONS = {
  trade: [
    // SECTION 1 – لجستیک تامین
    {
      section: "لجستیک تامین",
      sectionIcon: "📦",
      q: "تامین‌کنندگان اصلی شما چند نفرند و رابطه‌تان چقدر مستحکم است؟",
      options: [
        { text: "یک یا دو تامین‌کننده، کاملاً وابسته به آن‌ها هستیم", score: 1 },
        { text: "چند تامین‌کننده داریم اما شرایط مشخصی نداریم", score: 2 },
        { text: "چندین تامین‌کننده با قرارداد یا توافق‌نامه مکتوب", score: 3 },
        { text: "زنجیره تامین متنوع با ارزیابی دوره‌ای و پشتیبان‌گیری", score: 4 },
      ],
    },
    {
      section: "لجستیک تامین",
      sectionIcon: "📦",
      q: "موجودی انبار شما چگونه مدیریت می‌شود؟",
      options: [
        { text: "بر اساس حدس و تجربه شخصی سفارش می‌دهیم", score: 1 },
        { text: "یک سیستم دستی ساده داریم (اکسل یا دفتر)", score: 2 },
        { text: "نرم‌افزار انبارداری داریم اما کامل اجرا نمی‌شود", score: 3 },
        { text: "سیستم دقیق با نقطه سفارش‌دهی خودکار و گزارش‌گیری منظم", score: 4 },
      ],
    },
    // SECTION 2 – قیمت‌گذاری
    {
      section: "قیمت‌گذاری",
      sectionIcon: "💰",
      q: "قیمت‌گذاری شما چگونه انجام می‌شود؟",
      options: [
        { text: "بر اساس قیمت رقبا، با مقداری کم یا زیاد کردن", score: 1 },
        { text: "هزینه تمام‌شده + درصد سود ثابت", score: 2 },
        { text: "تحلیل هزینه + در نظر گرفتن ارزش ادراکی مشتری", score: 3 },
        { text: "استراتژی قیمت‌گذاری پویا با سطح‌بندی محصول/مشتری", score: 4 },
      ],
    },
    {
      section: "قیمت‌گذاری",
      sectionIcon: "💰",
      q: "آیا می‌دانید دقیقاً سود خالص هر محصول یا دسته‌بندی چقدر است؟",
      options: [
        { text: "خیر، فقط سود کلی کسب‌وکار را می‌دانم", score: 1 },
        { text: "تقریباً می‌دانم اما محاسبه دقیق ندارم", score: 2 },
        { text: "بله، برای اکثر محصولات حساب دارم", score: 3 },
        { text: "بله، با تحلیل دوره‌ای و داشبورد مالی", score: 4 },
      ],
    },
    // SECTION 3 – لجستیک فروش
    {
      section: "لجستیک فروش",
      sectionIcon: "🚚",
      q: "فرآیند ارسال و تحویل سفارشات چگونه است؟",
      options: [
        { text: "هنوز مشکلات تاخیر و نارضایتی مشتری داریم", score: 1 },
        { text: "معمولاً خوب است اما استاندارد ثابتی نداریم", score: 2 },
        { text: "فرآیند مشخص داریم با زمان‌بندی تعریف‌شده", score: 3 },
        { text: "سیستم ردیابی، اطلاع‌رسانی خودکار و بازخورد مشتری", score: 4 },
      ],
    },
    // SECTION 4 – بازاریابی و فروش
    {
      section: "بازاریابی و فروش",
      sectionIcon: "📣",
      q: "چگونه مشتریان جدید پیدا می‌کنید؟",
      options: [
        { text: "عمدتاً از طریق معرفی آشنایان و اتفاقی", score: 1 },
        { text: "تبلیغات پراکنده بدون استراتژی مشخص", score: 2 },
        { text: "چند کانال فعال با برنامه‌ریزی نسبی", score: 3 },
        { text: "قیف فروش تعریف‌شده با معیارهای سنجش و بهینه‌سازی مداوم", score: 4 },
      ],
    },
    {
      section: "بازاریابی و فروش",
      sectionIcon: "📣",
      q: "آیا پرسونای مشتری ایده‌آل خود را دقیق می‌شناسید؟",
      options: [
        { text: "نه، هر کسی که بخرد خوب است", score: 1 },
        { text: "یک تصویر کلی دارم اما مستند نیست", score: 2 },
        { text: "پرسونا تعریف کرده‌ام و بازاریابی بر اساس آن انجام می‌دهم", score: 3 },
        { text: "چند پرسونا با داده‌های واقعی، بهینه‌سازی‌شده بر اساس رفتار خرید", score: 4 },
      ],
    },
    // SECTION 5 – خدمات پس از فروش
    {
      section: "خدمات پس از فروش",
      sectionIcon: "🤝",
      q: "پس از فروش چه سیستمی برای ارتباط با مشتری دارید؟",
      options: [
        { text: "معمولاً تا وقتی مشتری تماس نگیرد، پیگیری نمی‌کنیم", score: 1 },
        { text: "گاهی با مشتریان قدیمی تماس می‌گیریم", score: 2 },
        { text: "سیستم پیگیری رضایت‌مندی داریم", score: 3 },
        { text: "CRM فعال با برنامه وفادارسازی و فروش مجدد", score: 4 },
      ],
    },
  ],

  production: [
    // SECTION 1 – لجستیک تامین
    {
      section: "لجستیک تامین",
      sectionIcon: "📦",
      q: "مواد اولیه شما از چند منبع تامین می‌شود؟",
      options: [
        { text: "یک منبع اصلی، ریسک قطع تامین بالاست", score: 1 },
        { text: "دو یا سه منبع اما بدون قرارداد رسمی", score: 2 },
        { text: "چند منبع با توافق‌نامه و امکان جایگزینی سریع", score: 3 },
        { text: "زنجیره تامین استراتژیک با تامین‌کنندگان ارزیابی‌شده و پشتیبان", score: 4 },
      ],
    },
    // SECTION 2 – فرآیندهای تولید
    {
      section: "فرآیندهای تولید",
      sectionIcon: "⚙️",
      q: "فرآیندهای تولید شما چقدر مستندسازی و استانداردسازی شده‌اند؟",
      options: [
        { text: "بیشتر در ذهن کارگران و استاد کارهاست، مستند نیست", score: 1 },
        { text: "بخشی مستند است اما کامل اجرا نمی‌شود", score: 2 },
        { text: "اکثر فرآیندها مستند و آموزش داده شده‌اند", score: 3 },
        { text: "SOP کامل، کنترل کیفیت در هر مرحله، بهبود مستمر", score: 4 },
      ],
    },
    {
      section: "فرآیندهای تولید",
      sectionIcon: "⚙️",
      q: "نرخ ضایعات و خرابی در تولید شما چقدر است؟",
      options: [
        { text: "اندازه‌گیری نمی‌کنیم", score: 1 },
        { text: "اندازه می‌گیریم اما برنامه کاهش نداریم", score: 2 },
        { text: "اندازه‌گیری و اقداماتی برای کاهش داریم", score: 3 },
        { text: "هدف‌گذاری دقیق، تحلیل ریشه‌ای و کاهش مستمر ضایعات", score: 4 },
      ],
    },
    // SECTION 3 – قیمت‌گذاری و لجستیک فروش
    {
      section: "قیمت‌گذاری و لجستیک فروش",
      sectionIcon: "💰",
      q: "بهای تمام‌شده محصولات را چگونه محاسبه می‌کنید؟",
      options: [
        { text: "تخمین کلی می‌زنیم، محاسبه دقیق نداریم", score: 1 },
        { text: "هزینه مواد اولیه + دستمزد مستقیم، سربار رو حساب نمی‌کنیم", score: 2 },
        { text: "محاسبه کامل شامل سربار تولید", score: 3 },
        { text: "حسابداری صنعتی با تحلیل انحراف و بهینه‌سازی ظرفیت", score: 4 },
      ],
    },
    // SECTION 4 – بازاریابی و فروش
    {
      section: "بازاریابی و فروش",
      sectionIcon: "📣",
      q: "کانال‌های فروش شما چیست؟",
      options: [
        { text: "فروش مستقیم سنتی، بدون کانال دیجیتال یا توزیع‌کننده", score: 1 },
        { text: "چند کانال فروش اما هماهنگ نیستند", score: 2 },
        { text: "کانال‌های متنوع با مدیریت نسبی", score: 3 },
        { text: "استراتژی اومنی‌چنل با قیمت‌گذاری و پیام هماهنگ", score: 4 },
      ],
    },
    {
      section: "بازاریابی و فروش",
      sectionIcon: "📣",
      q: "چه تمایز رقابتی واضحی در بازار دارید؟",
      options: [
        { text: "عمدتاً روی قیمت پایین‌تر رقابت می‌کنیم", score: 1 },
        { text: "کیفیت بهتر داریم اما به خوبی آن را انتقال نمی‌دهیم", score: 2 },
        { text: "تمایز مشخص داریم و در برخی کانال‌ها منتقل می‌کنیم", score: 3 },
        { text: "ارزش پیشنهادی قوی، موقعیت‌یابی واضح، شناخته‌شده در بازار هدف", score: 4 },
      ],
    },
    // SECTION 5 – خدمات پس از فروش
    {
      section: "خدمات پس از فروش",
      sectionIcon: "🤝",
      q: "سیستم گارانتی و پشتیبانی محصول شما چگونه است؟",
      options: [
        { text: "مشخص نیست، هر بار جداگانه تصمیم می‌گیریم", score: 1 },
        { text: "سیاست داریم اما ثبت و پیگیری منظم نداریم", score: 2 },
        { text: "فرآیند تعریف‌شده با ثبت شکایات", score: 3 },
        { text: "سیستم جامع پشتیبانی با تحلیل داده برای بهبود محصول", score: 4 },
      ],
    },
  ],

  service: [
    // SECTION 1 – تولید خدمت و مدیریت دانش
    {
      section: "تولید خدمت و مدیریت دانش",
      sectionIcon: "🧠",
      q: "خدمت شما تا چه حد سیستم‌سازی و قابل تکرار شده؟",
      options: [
        { text: "کاملاً به شخص من وابسته است، قابل واگذاری نیست", score: 1 },
        { text: "بعضی بخش‌ها مستند است اما اکثراً من انجام می‌دهم", score: 2 },
        { text: "فرآیند نسبتاً مستند، امکان واگذاری بخشی وجود دارد", score: 3 },
        { text: "سیستم کامل با آموزش، کنترل کیفیت و مقیاس‌پذیری", score: 4 },
      ],
    },
    {
      section: "تولید خدمت و مدیریت دانش",
      sectionIcon: "🧠",
      q: "دانش تخصصی کسب‌وکار شما چگونه مدیریت می‌شود؟",
      options: [
        { text: "فقط در ذهن من یا تیم اصلی است", score: 1 },
        { text: "بخشی مستند شده اما سازماندهی منظمی نداریم", score: 2 },
        { text: "پایگاه دانش داریم و به‌روز نسبتاً می‌کنیم", score: 3 },
        { text: "سیستم مدیریت دانش با به‌روزرسانی مداوم و قابل استفاده تیم", score: 4 },
      ],
    },
    {
      section: "تولید خدمت و مدیریت دانش",
      sectionIcon: "🧠",
      q: "کیفیت خدمات شما چگونه سنجیده می‌شود؟",
      options: [
        { text: "بر اساس احساس شخصی، معیار مشخصی نداریم", score: 1 },
        { text: "گاهی از مشتریان نظر می‌گیریم اما تحلیل نمی‌کنیم", score: 2 },
        { text: "سیستم بازخوردگیری داریم و بهبود می‌دهیم", score: 3 },
        { text: "KPIهای کیفیت خدمت، NPS، و بهینه‌سازی مستمر بر اساس داده", score: 4 },
      ],
    },
    // SECTION 2 – بازاریابی و فروش
    {
      section: "بازاریابی و فروش",
      sectionIcon: "📣",
      q: "مشتریان جدید شما از کجا می‌آیند؟",
      options: [
        { text: "تقریباً همه از معرفی دهان‌به‌دهان، بدون استراتژی جذب", score: 1 },
        { text: "ترکیبی از معرفی و حضور در شبکه‌های اجتماعی بدون برنامه", score: 2 },
        { text: "چند کانال جذب مشخص با محتوای نسبتاً منظم", score: 3 },
        { text: "موتور جذب مشتری با کانال‌های متنوع، قیف سنجیده و اتوماسیون", score: 4 },
      ],
    },
    {
      section: "بازاریابی و فروش",
      sectionIcon: "📣",
      q: "فرآیند تبدیل لید به مشتری (فروش) شما چگونه است؟",
      options: [
        { text: "هر بار متفاوت است، فرآیند ثابتی نداریم", score: 1 },
        { text: "یک جلسه معرفی و پیشنهاد قیمت، همین", score: 2 },
        { text: "مراحل نسبتاً مشخص با پیگیری", score: 3 },
        { text: "فرآیند فروش مستند با نرخ تبدیل سنجیده و بهینه‌شده", score: 4 },
      ],
    },
    {
      section: "بازاریابی و فروش",
      sectionIcon: "📣",
      q: "قیمت‌گذاری خدماتتان بر چه اساسی است؟",
      options: [
        { text: "رقبا را نگاه می‌کنم یا بر اساس احساس تعیین می‌کنم", score: 1 },
        { text: "هزینه زمانم + مقداری سود", score: 2 },
        { text: "ارزش ایجادشده برای مشتری را هم در نظر می‌گیرم", score: 3 },
        { text: "پکیج‌بندی استراتژیک بر اساس ارزش، با مدل‌های درآمدی متنوع", score: 4 },
      ],
    },
    // SECTION 3 – خدمات پس از فروش
    {
      section: "خدمات پس از فروش",
      sectionIcon: "🤝",
      q: "پس از اتمام پروژه یا دوره، با مشتری چه اتفاقی می‌افتد؟",
      options: [
        { text: "رابطه معمولاً قطع می‌شود تا پروژه بعدی", score: 1 },
        { text: "گاهی پیگیری می‌کنیم اما سیستم ندارد", score: 2 },
        { text: "برنامه پیگیری و ارائه محتوای ارزشمند داریم", score: 3 },
        { text: "اکوسیستم ارتباط دائمی با مشتریان قبلی، برنامه ارجاع و فروش مجدد", score: 4 },
      ],
    },
  ],
};

// ─── SCORING & ANALYSIS ────────────────────────────────────────────────────

function analyze(type, answers) {
  const qs = QUESTIONS[type];
  const totalMax = qs.length * 4;
  const totalScore = answers.reduce((s, a) => s + a, 0);
  const pct = Math.round((totalScore / totalMax) * 100);

  // section breakdown
  const sections = {};
  qs.forEach((q, i) => {
    if (!sections[q.section]) sections[q.section] = { max: 0, score: 0, icon: q.sectionIcon };
    sections[q.section].max += 4;
    sections[q.section].score += answers[i];
  });

  // find weakest section
  let weakest = null;
  let weakestPct = 100;
  Object.entries(sections).forEach(([sec, data]) => {
    const p = (data.score / data.max) * 100;
    if (p < weakestPct) { weakestPct = p; weakest = sec; }
  });

  // level
  let level, color, emoji;
  if (pct >= 80) { level = "پیشرفته"; color = "#10b981"; emoji = "🚀"; }
  else if (pct >= 60) { level = "در حال رشد"; color = "#f59e0b"; emoji = "📈"; }
  else if (pct >= 40) { level = "نیاز به ساختار"; color = "#f97316"; emoji = "🔧"; }
  else { level = "پایه‌گذاری ضروری"; color = "#ef4444"; emoji = "⚠️"; }

  // insight per section
  const INSIGHTS = {
    "لجستیک تامین": {
      low: "وابستگی بالا به تامین‌کنندگان محدود، یعنی یک اتفاق ساده می‌تواند کل چرخه کسب‌وکار شما را متوقف کند.",
      mid: "شروع خوبی دارید اما زنجیره تامین‌تان هنوز شکننده است — یک تنوع‌سازی هوشمند می‌تواند ریسک را به شدت کاهش دهد.",
      high: "زنجیره تامین شما نسبتاً مستحکم است. فرصت بعدی، بهینه‌سازی هزینه در مذاکرات است.",
    },
    "فرآیندهای تولید": {
      low: "دانش تولید شما در ذهن افراد است، نه در سیستم — این یعنی با رفتن هر کارگر ماهری، بخشی از کسب‌وکارتان می‌رود.",
      mid: "فرآیندها شروع به شکل گرفتن کرده‌اند اما هنوز از ظرفیت واقعی استانداردسازی فاصله دارید.",
      high: "فرآیندهای تولید شما خوب است. گام بعدی، کاهش هدرروی پنهان است که اکثراً نادیده گرفته می‌شود.",
    },
    "قیمت‌گذاری": {
      low: "شما در حال فروختن بدون دانستن سود واقعی هستید — این یکی از خطرناک‌ترین حالت‌های یک کسب‌وکار است.",
      mid: "محاسبات اولیه دارید اما ارزش ادراکی و سطح‌بندی قیمت می‌توانند درآمدتان را بدون افزایش فروش بالا ببرند.",
      high: "قیمت‌گذاری شما منطقی است. با استراتژی پویا می‌توانید حاشیه سود را بیشتر بهینه کنید.",
    },
    "لجستیک فروش": {
      low: "تجربه تحویل، اولین حافظه‌ای است که مشتری از شما نگه می‌دارد — و متأسفانه اکنون این حافظه قابل پیش‌بینی نیست.",
      mid: "فرآیند تحویل شما وجود دارد اما استانداردسازی کامل آن می‌تواند نرخ وفاداری را به طور چشمگیری افزایش دهد.",
      high: "لجستیک فروش شما خوب است. اتوماسیون اطلاع‌رسانی گام بعدی است.",
    },
    "قیمت‌گذاری و لجستیک فروش": {
      low: "قیمت‌گذاری بدون داده دقیق، مثل رانندگی با چشم بسته است — شاید تاکنون خوش‌شانس بوده‌اید.",
      mid: "هزینه‌های پنهان سربار احتمالاً سودتان را بیشتر از چیزی که فکر می‌کنید می‌خورند.",
      high: "محاسبات خوبی دارید. بهینه‌سازی ظرفیت تولید مرحله بعد است.",
    },
    "بازاریابی و فروش": {
      low: "کسب‌وکار شما برای رشد به استراتژی جذب مشتری نیاز دارد — دهان‌به‌دهان کافی نیست و رشد را به تصادف واگذار می‌کند.",
      mid: "ابزارهای بازاریابی دارید اما بدون استراتژی، این هزینه است نه سرمایه‌گذاری.",
      high: "بازاریابی شما خوب عمل می‌کند. بهینه‌سازی قیف و کاهش هزینه جذب مشتری فرصت بعدی است.",
    },
    "خدمات پس از فروش": {
      low: "جذب مشتری جدید ۵ تا ۷ برابر گران‌تر از نگه داشتن مشتری فعلی است — سیستم پس از فروش شما این پول را می‌سوزاند.",
      mid: "پایه‌ای خوب دارید اما بدون CRM، فرصت‌های فروش مجدد از دستتان می‌روند.",
      high: "خدمات پس از فروش شما قوی است. برنامه ارجاع فعال می‌تواند ارزان‌ترین کانال فروش‌تان باشد.",
    },
    "تولید خدمت و مدیریت دانش": {
      low: "کسب‌وکار شما اکنون یک شغل است، نه یک سیستم — اگر شما نباشید، درآمد هم نیست. این مهم‌ترین چیزی است که باید تغییر کند.",
      mid: "شروع خوبی برای سیستم‌سازی کرده‌اید. با مستندسازی کامل، می‌توانید از زمانتان تکثیر درآمد ایجاد کنید.",
      high: "خدمت شما نسبتاً سیستم‌سازی شده است. ظرفیت مقیاس‌پذیری بیشتری وجود دارد.",
    },
  };

  const sectionInsights = {};
  Object.entries(sections).forEach(([sec, data]) => {
    const p = (data.score / data.max) * 100;
    const ins = INSIGHTS[sec];
    if (!ins) return;
    sectionInsights[sec] = {
      pct: Math.round(p),
      insight: p < 40 ? ins.low : p < 70 ? ins.mid : ins.high,
    };
  });

  return { pct, level, color, emoji, sections, sectionInsights, weakest, weakestPct: Math.round(weakestPct) };
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

const styles = {
  root: {
    fontFamily: "'Vazirmatn', 'Segoe UI', Tahoma, sans-serif",
    direction: "rtl",
    background: "linear-gradient(135deg, #0f0c29 0%, #1a1a2e 50%, #16213e 100%)",
    minHeight: "100vh",
    padding: "0",
    margin: "0",
    color: "#e2e8f0",
  },
  container: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "2rem 1.25rem 4rem",
  },
  badge: {
    display: "inline-block",
    background: "rgba(139,92,246,0.15)",
    border: "1px solid rgba(139,92,246,0.4)",
    color: "#a78bfa",
    borderRadius: 999,
    padding: "0.3rem 1rem",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    marginBottom: "1.5rem",
    textTransform: "uppercase",
  },
  heroTitle: {
    fontSize: "clamp(1.6rem, 5vw, 2.6rem)",
    fontWeight: 800,
    lineHeight: 1.35,
    marginBottom: "1rem",
    background: "linear-gradient(135deg, #f8fafc 30%, #a78bfa 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSub: {
    fontSize: "1rem",
    color: "#94a3b8",
    lineHeight: 1.8,
    marginBottom: "2rem",
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: "1.5rem",
    marginBottom: "1.25rem",
    backdropFilter: "blur(8px)",
  },
  typeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1rem",
    marginBottom: "2rem",
  },
  typeBtn: (selected) => ({
    background: selected
      ? "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(99,102,241,0.3))"
      : "rgba(255,255,255,0.04)",
    border: selected ? "2px solid #8b5cf6" : "2px solid rgba(255,255,255,0.1)",
    borderRadius: 14,
    padding: "1.25rem 0.75rem",
    cursor: "pointer",
    textAlign: "center",
    transition: "all 0.2s ease",
    color: selected ? "#e2e8f0" : "#94a3b8",
  }),
  typeIcon: {
    fontSize: "2rem",
    display: "block",
    marginBottom: "0.5rem",
  },
  typeLabel: {
    fontWeight: 700,
    fontSize: "0.95rem",
    display: "block",
    marginBottom: "0.25rem",
  },
  typeDesc: {
    fontSize: "0.7rem",
    opacity: 0.7,
    lineHeight: 1.4,
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    marginBottom: "1.5rem",
    paddingBottom: "0.75rem",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
  sectionTitle: {
    fontSize: "0.8rem",
    fontWeight: 700,
    color: "#a78bfa",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  qText: {
    fontSize: "1.05rem",
    fontWeight: 600,
    color: "#f1f5f9",
    marginBottom: "1rem",
    lineHeight: 1.6,
  },
  optionBtn: (selected) => ({
    width: "100%",
    textAlign: "right",
    background: selected
      ? "linear-gradient(135deg, rgba(139,92,246,0.2), rgba(99,102,241,0.2))"
      : "rgba(255,255,255,0.03)",
    border: selected ? "1.5px solid #8b5cf6" : "1.5px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "0.85rem 1rem",
    cursor: "pointer",
    color: selected ? "#e2e8f0" : "#94a3b8",
    fontSize: "0.88rem",
    lineHeight: 1.5,
    marginBottom: "0.5rem",
    transition: "all 0.15s ease",
    display: "block",
  }),
  progress: {
    height: 4,
    background: "rgba(255,255,255,0.08)",
    borderRadius: 99,
    marginBottom: "2rem",
    overflow: "hidden",
  },
  progressFill: (pct) => ({
    height: "100%",
    width: `${pct}%`,
    background: "linear-gradient(90deg, #8b5cf6, #6366f1)",
    borderRadius: 99,
    transition: "width 0.3s ease",
  }),
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "1.5rem",
    gap: "1rem",
  },
  btnPrimary: {
    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "0.85rem 2rem",
    fontSize: "0.95rem",
    fontWeight: 700,
    cursor: "pointer",
    transition: "opacity 0.2s",
    flex: 1,
  },
  btnSecondary: {
    background: "rgba(255,255,255,0.06)",
    color: "#94a3b8",
    border: "1.5px solid rgba(255,255,255,0.1)",
    borderRadius: 10,
    padding: "0.85rem 1.5rem",
    fontSize: "0.9rem",
    cursor: "pointer",
    transition: "opacity 0.2s",
  },
  // Result styles
  scoreMeter: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  scoreNumber: {
    fontSize: "4rem",
    fontWeight: 900,
    background: "linear-gradient(135deg, #f8fafc, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    lineHeight: 1,
  },
  scoreSub: {
    fontSize: "0.85rem",
    color: "#64748b",
    marginTop: "0.3rem",
  },
  levelBadge: (color) => ({
    display: "inline-block",
    background: color + "22",
    border: `1.5px solid ${color}`,
    color: color,
    borderRadius: 999,
    padding: "0.3rem 1.2rem",
    fontSize: "0.85rem",
    fontWeight: 700,
    marginTop: "0.75rem",
  }),
  sectionBar: {
    marginBottom: "1rem",
  },
  sectionBarLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.8rem",
    marginBottom: "0.3rem",
    color: "#94a3b8",
  },
  barTrack: {
    height: 8,
    background: "rgba(255,255,255,0.08)",
    borderRadius: 99,
    overflow: "hidden",
  },
  barFill: (pct, color) => ({
    height: "100%",
    width: `${pct}%`,
    background: pct < 40 ? "#ef4444" : pct < 70 ? "#f59e0b" : "#10b981",
    borderRadius: 99,
    transition: "width 1s ease",
  }),
  insightBox: {
    background: "rgba(139,92,246,0.08)",
    border: "1px solid rgba(139,92,246,0.2)",
    borderRadius: 12,
    padding: "1rem 1.25rem",
    marginBottom: "0.75rem",
    fontSize: "0.88rem",
    lineHeight: 1.7,
    color: "#c4b5fd",
  },
  ctaCard: {
    background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.1))",
    border: "1px solid rgba(139,92,246,0.3)",
    borderRadius: 16,
    padding: "2rem 1.5rem",
    textAlign: "center",
    marginTop: "2rem",
  },
  ctaTitle: {
    fontSize: "1.3rem",
    fontWeight: 800,
    marginBottom: "0.75rem",
    color: "#f1f5f9",
  },
  ctaText: {
    fontSize: "0.9rem",
    color: "#94a3b8",
    lineHeight: 1.7,
    marginBottom: "1.5rem",
  },
  ctaBtn: {
    display: "inline-block",
    background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
    color: "#fff",
    border: "none",
    borderRadius: 12,
    padding: "1rem 2.5rem",
    fontSize: "1rem",
    fontWeight: 800,
    cursor: "pointer",
    letterSpacing: "0.02em",
    boxShadow: "0 8px 32px rgba(139,92,246,0.35)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
};

// ─── SCREENS ─────────────────────────────────────────────────────────────────

// mirror statements — the "I know you" moment
const MIRROR_STATS = [
  { num: "۷۰٪", text: "مدیرانی که فکر می‌کنند مشکل اصلی‌شان را می‌شناسند — اشتباه می‌کنند" },
  { num: "۳×",  text: "هزینه‌ای که یک گلوگاه پنهان می‌تواند روی رشد شما داشته باشد" },
  { num: "۵۰٪", text: "از وقت مدیران صرف کارهایی می‌شود که باید سیستم انجام دهد" },
];

// what this tool actually is
const WHAT_IT_IS = [
  { icon: "🔍", title: "نه آزمون شخصیت", desc: "این ابزار کسب‌وکار شما را می‌سنجد، نه شخصیت شما را" },
  { icon: "📊", title: "نه گزارش کلی", desc: "نتیجه به حوزه کسب‌وکار شما اختصاصی است — بازرگانی، تولیدی یا خدماتی" },
  { icon: "🎯", title: "همان سوالاتی که مشاور می‌پرسد", desc: "اولین جلسه مشاوره معمولاً با همین سوالات شروع می‌شود — شما آن را رایگان دریافت می‌کنید" },
];

function Intro({ onStart }) {
  const [step, setStep] = useState("land"); // land | select
  const [selectedType, setSelectedType] = useState(null);
  const [name, setName] = useState("");

  // ── LANDING STEP ──────────────────────────────────────────────────────────
  if (step === "land") {
    return (
      <div style={styles.container}>
        {/* Eyebrow */}
        <div style={styles.badge}>Business Check · آنالیز رایگان</div>

        {/* Hero — the provocative opener */}
        <h1 style={{ ...styles.heroTitle, fontSize: "clamp(1.7rem,5.5vw,2.8rem)" }}>
          کسب‌وکار شما<br />
          <span style={{ color: "#a78bfa" }}>یک چیز پنهان دارد</span><br />
          <span style={{ fontSize: "55%", color: "#64748b", fontWeight: 600 }}>
            که بیشترین انرژی‌تان را می‌خورد.
          </span>
        </h1>

        <p style={{ ...styles.heroSub, fontSize: "0.97rem" }}>
          هر کسب‌وکاری — بدون استثنا — یک یا دو گلوگاه اصلی دارد که بقیه مشکلات از آن‌ها سرچشمه می‌گیرد.
          مدیران باتجربه می‌دانند چه می‌فروشند. کمتر کسی می‌داند{" "}
          <strong style={{ color: "#c4b5fd" }}>کجا دقیقاً پول و انرژی‌شان هدر می‌رود.</strong>
        </p>

        {/* Mirror stats */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.75rem", marginBottom: "2rem",
        }}>
          {MIRROR_STATS.map((s, i) => (
            <div key={i} style={{
              background: "rgba(139,92,246,0.07)",
              border: "1px solid rgba(139,92,246,0.15)",
              borderRadius: 12, padding: "1rem 0.75rem", textAlign: "center",
            }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#a78bfa", lineHeight: 1, marginBottom: "0.4rem" }}>
                {s.num}
              </div>
              <div style={{ fontSize: "0.7rem", color: "#64748b", lineHeight: 1.5 }}>{s.text}</div>
            </div>
          ))}
        </div>

        {/* The mirror moment — "I see you" */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 16, padding: "1.5rem", marginBottom: "1.5rem",
        }}>
          <p style={{ fontSize: "0.78rem", color: "#475569", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "0.85rem" }}>
            آیا این جملات آشناست؟
          </p>
          {[
            "«کار می‌کنیم اما نمی‌دانم چرا سود کافی نیست»",
            "«تیم دارم اما همه چیز به خودم ختم می‌شود»",
            "«می‌فروشیم ولی رشد نمی‌کنیم»",
            "«مشکل را می‌دانم اما نمی‌دانم از کجا شروع کنم»",
          ].map((q, i) => (
            <div key={i} style={{
              fontSize: "0.88rem", color: "#94a3b8", padding: "0.5rem 0",
              borderBottom: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
              lineHeight: 1.5, display: "flex", gap: "0.6rem", alignItems: "flex-start",
            }}>
              <span style={{ color: "#7c3aed", flexShrink: 0, marginTop: "0.1rem" }}>›</span>
              <span style={{ fontStyle: "italic" }}>{q}</span>
            </div>
          ))}
          <p style={{ fontSize: "0.8rem", color: "#6366f1", marginTop: "1rem", marginBottom: 0, lineHeight: 1.65 }}>
            اگر حتی یکی از این‌ها آشناست، این ابزار چیزی به شما نشان می‌دهد که احتمالاً هنوز ندیده‌اید.
          </p>
        </div>

        {/* What it actually is */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: "0.78rem", color: "#475569", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "1rem" }}>
            این ابزار چیست؟
          </p>
          {WHAT_IT_IS.map((item, i) => (
            <div key={i} style={{
              display: "flex", gap: "0.9rem", alignItems: "flex-start",
              padding: "0.75rem 0",
              borderBottom: i < WHAT_IT_IS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}>
              <span style={{
                fontSize: "1.2rem",
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.2)",
                borderRadius: 8, padding: "0.35rem 0.5rem", flexShrink: 0,
              }}>{item.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.87rem", color: "#e2e8f0", marginBottom: "0.2rem" }}>{item.title}</div>
                <div style={{ fontSize: "0.79rem", color: "#64748b", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          style={{ ...styles.btnPrimary, width: "100%" }}
          onClick={() => setStep("select")}
        >
          می‌خواهم بدانم کجا هستم ←
        </button>
        <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#334155", marginTop: "0.75rem" }}>
          ۵ دقیقه · رایگان · بدون ثبت‌نام · نتیجه فوری
        </p>
      </div>
    );
  }

  // ── SELECT STEP ───────────────────────────────────────────────────────────
  return (
    <div style={styles.container}>
      {/* Back */}
      <button
        style={{
          background: "rgba(255,255,255,0.04)", border: "1.5px solid rgba(255,255,255,0.08)",
          borderRadius: 10, padding: "0.5rem 1rem", color: "#64748b", cursor: "pointer",
          fontSize: "0.82rem", marginBottom: "1.5rem",
          fontFamily: "'Vazirmatn','Segoe UI',Tahoma,sans-serif",
        }}
        onClick={() => setStep("land")}
      >← بازگشت</button>

      <div style={styles.badge}>گام اول</div>
      <h2 style={{ ...styles.heroTitle, fontSize: "clamp(1.4rem,4vw,2rem)" }}>
        کسب‌وکار شما<br />در کدام دسته است؟
      </h2>
      <p style={{ ...styles.heroSub, fontSize: "0.88rem" }}>
        سوالات و معیارهای ارزیابی برای هر نوع کسب‌وکار متفاوت است.
        دسته‌بندی درست، نتیجه دقیق‌تری به شما می‌دهد.
      </p>

      {/* Type cards — richer than before */}
      <div style={{ marginBottom: "1.5rem" }}>
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedType(t.id)}
            style={{
              width: "100%", textAlign: "right", display: "block",
              background: selectedType === t.id
                ? "linear-gradient(135deg, rgba(139,92,246,0.18), rgba(99,102,241,0.12))"
                : "rgba(255,255,255,0.03)",
              border: `2px solid ${selectedType === t.id ? "#8b5cf6" : "rgba(255,255,255,0.08)"}`,
              borderRadius: 14, padding: "1.1rem 1.25rem", cursor: "pointer",
              marginBottom: "0.65rem", transition: "all 0.15s",
              fontFamily: "'Vazirmatn','Segoe UI',Tahoma,sans-serif",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
              <span style={{
                fontSize: "1.6rem",
                background: selectedType === t.id ? "rgba(139,92,246,0.2)" : "rgba(255,255,255,0.05)",
                border: `1px solid ${selectedType === t.id ? "rgba(139,92,246,0.4)" : "rgba(255,255,255,0.08)"}`,
                borderRadius: 10, padding: "0.4rem 0.55rem", flexShrink: 0,
              }}>{t.icon}</span>
              <div>
                <div style={{ fontWeight: 800, fontSize: "0.97rem", color: selectedType === t.id ? "#e2e8f0" : "#94a3b8", marginBottom: "0.15rem" }}>
                  {t.label}
                </div>
                <div style={{ fontSize: "0.75rem", color: "#475569", lineHeight: 1.4 }}>{t.desc}</div>
              </div>
              {selectedType === t.id && (
                <span style={{ marginRight: "auto", color: "#8b5cf6", fontSize: "1.1rem" }}>✓</span>
              )}
            </div>
            {/* Sections preview */}
            <div style={{
              marginTop: "0.65rem", paddingTop: "0.65rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              display: "flex", flexWrap: "wrap", gap: "0.35rem",
            }}>
              {(t.id === "trade"
                ? ["لجستیک تامین","قیمت‌گذاری","لجستیک فروش","بازاریابی","خدمات پس از فروش"]
                : t.id === "production"
                ? ["لجستیک تامین","فرآیند تولید","قیمت‌گذاری","بازاریابی","خدمات پس از فروش"]
                : ["تولید خدمت","مدیریت دانش","بازاریابی","خدمات پس از فروش"]
              ).map((sec, i) => (
                <span key={i} style={{
                  fontSize: "0.67rem", color: "#475569",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 99, padding: "0.18rem 0.55rem",
                }}>{sec}</span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {/* Name field */}
      {selectedType && (
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14, padding: "1.25rem", marginBottom: "1.25rem",
        }}>
          <p style={{ fontSize: "0.82rem", color: "#64748b", marginBottom: "0.5rem" }}>
            اسم یا نام کسب‌وکارتان را بنویسید تا نتیجه شخصی‌سازی‌شده باشد:
          </p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثلاً: شرکت آراد، یا علی محمدی"
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.06)",
              border: "1.5px solid rgba(255,255,255,0.12)",
              borderRadius: 10, padding: "0.75rem 1rem",
              color: "#e2e8f0", fontSize: "0.95rem", outline: "none",
              boxSizing: "border-box",
              fontFamily: "'Vazirmatn','Segoe UI',Tahoma,sans-serif",
            }}
          />
        </div>
      )}

      <button
        style={{
          ...styles.btnPrimary, width: "100%",
          opacity: selectedType && name.trim() ? 1 : 0.35,
          cursor: selectedType && name.trim() ? "pointer" : "not-allowed",
        }}
        onClick={() => selectedType && name.trim() && onStart(selectedType, name.trim())}
      >
        شروع آنالیز ←
      </button>
      <p style={{ textAlign: "center", fontSize: "0.72rem", color: "#334155", marginTop: "0.75rem" }}>
        حدود ۵ دقیقه · نتیجه فوری · بدون ثبت‌نام
      </p>
    </div>
  );
}

function Quiz({ type, name, onFinish }) {
  const qs = QUESTIONS[type];
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(Array(qs.length).fill(null));
  const [selected, setSelected] = useState(null);

  const q = qs[current];
  const progress = Math.round(((current + 1) / qs.length) * 100);
  const prevSection = current > 0 ? qs[current - 1].section : null;
  const sectionChanged = current === 0 || q.section !== prevSection;

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[current] = qs[current].options[selected].score;
    setAnswers(newAnswers);
    if (current + 1 < qs.length) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      onFinish(newAnswers);
    }
  };

  const handleBack = () => {
    if (current === 0) return;
    setCurrent(current - 1);
    setSelected(answers[current - 1] !== null
      ? qs[current - 1].options.findIndex((o) => o.score === answers[current - 1])
      : null
    );
  };

  return (
    <div style={styles.container}>
      {/* Progress */}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#475569", marginBottom: "0.5rem" }}>
        <span>سوال {current + 1} از {qs.length}</span>
        <span>{progress}%</span>
      </div>
      <div style={styles.progress}>
        <div style={styles.progressFill(progress)} />
      </div>

      {/* Section header */}
      {sectionChanged && (
        <div style={{ ...styles.card, marginBottom: "1rem", padding: "0.85rem 1.25rem" }}>
          <div style={styles.sectionHeader}>
            <span style={{ fontSize: "1.2rem" }}>{q.sectionIcon}</span>
            <span style={styles.sectionTitle}>{q.section}</span>
          </div>
        </div>
      )}

      {/* Question */}
      <div style={styles.card}>
        <p style={styles.qText}>{q.q}</p>
        {q.options.map((opt, i) => (
          <button
            key={i}
            style={styles.optionBtn(selected === i)}
            onClick={() => setSelected(i)}
          >
            {opt.text}
          </button>
        ))}
      </div>

      {/* Nav */}
      <div style={styles.navRow}>
        {current > 0 ? (
          <button style={styles.btnSecondary} onClick={handleBack}>← قبلی</button>
        ) : <div />}
        <button
          style={{ ...styles.btnPrimary, opacity: selected !== null ? 1 : 0.4 }}
          onClick={handleNext}
        >
          {current + 1 < qs.length ? "بعدی →" : "مشاهده نتیجه →"}
        </button>
      </div>
    </div>
  );
}

function Results({ type, name, answers }) {
  const result = analyze(type, answers);
  const qs = QUESTIONS[type];
  const typeLabel = TYPES.find((t) => t.id === type)?.label;

  // Personalized opening line
  const opening = {
    trade: `${name} عزیز، کسب‌وکار بازرگانی شما را بررسی کردیم.`,
    production: `${name} عزیز، واحد تولیدی شما را از زوایای مختلف سنجیدیم.`,
    service: `${name} عزیز، کسب‌وکار خدماتی شما را با دقت آنالیز کردیم.`,
  }[type];

  const weakSection = result.sections[result.weakest];
  const weakIns = result.sectionInsights[result.weakest];

  return (
    <div style={styles.container}>
      {/* Score */}
      <div style={{ ...styles.card, ...styles.scoreMeter }}>
        <div style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "0.5rem" }}>امتیاز کلی کسب‌وکار شما</div>
        <div style={styles.scoreNumber}>{result.pct}</div>
        <div style={styles.scoreSub}>از ۱۰۰</div>
        <div style={styles.levelBadge(result.color)}>
          {result.emoji} {result.level}
        </div>
      </div>

      {/* Opening */}
      <div style={{ ...styles.card, fontSize: "0.95rem", lineHeight: 1.8, color: "#cbd5e1" }}>
        <p style={{ margin: 0 }}>
          {opening}{" "}
          با نگاه به پاسخ‌های شما، یک تصویر واضح از وضعیت فعلی‌تان شکل گرفته.
          در ادامه بخش به بخش می‌بینید که کجا هستید — و کجا فرصت واقعی دارید.
        </p>
      </div>

      {/* Section scores */}
      <div style={styles.card}>
        <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "1rem", fontWeight: 700 }}>
          وضعیت بخش‌های مختلف کسب‌وکار شما
        </p>
        {Object.entries(result.sections).map(([sec, data]) => {
          const pct = Math.round((data.score / data.max) * 100);
          return (
            <div key={sec} style={styles.sectionBar}>
              <div style={styles.sectionBarLabel}>
                <span>{data.icon} {sec}</span>
                <span style={{
                  color: pct < 40 ? "#ef4444" : pct < 70 ? "#f59e0b" : "#10b981",
                  fontWeight: 700
                }}>{pct}%</span>
              </div>
              <div style={styles.barTrack}>
                <div style={styles.barFill(pct)} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Insights */}
      <div style={styles.card}>
        <p style={{ fontSize: "0.8rem", color: "#a78bfa", fontWeight: 700, marginBottom: "1rem" }}>
          🔍 تحلیل تخصصی بر اساس پاسخ‌های شما
        </p>
        {Object.entries(result.sectionInsights).map(([sec, data]) => (
          <div key={sec} style={styles.insightBox}>
            <strong style={{ color: "#e2e8f0" }}>{sec}:</strong>{" "}
            {data.insight}
          </div>
        ))}
      </div>

      {/* Weakest point highlight */}
      {weakIns && (
        <div style={{
          ...styles.card,
          background: "rgba(239,68,68,0.06)",
          border: "1px solid rgba(239,68,68,0.2)",
        }}>
          <p style={{ fontSize: "0.8rem", color: "#f87171", fontWeight: 700, marginBottom: "0.5rem" }}>
            ⚠️ مهم‌ترین نقطه‌ای که باید روی آن تمرکز کنید
          </p>
          <p style={{ fontSize: "0.9rem", color: "#fca5a5", lineHeight: 1.7, margin: 0 }}>
            <strong>{result.weakest}</strong> با امتیاز {result.weakestPct}% ضعیف‌ترین حلقه کسب‌وکار شماست.
            {" "}{weakIns.insight}
          </p>
        </div>
      )}

      {/* What we can't tell you */}
      <div style={{
        ...styles.card,
        background: "rgba(255,255,255,0.02)",
        border: "1px dashed rgba(255,255,255,0.12)",
      }}>
        <p style={{ fontSize: "0.85rem", color: "#64748b", lineHeight: 1.8, margin: 0 }}>
          <strong style={{ color: "#94a3b8" }}>یک نکته مهم:</strong>{" "}
          این آنالیز یک تصویر کلی از وضعیت شماست. اما ریشه‌های واقعی مشکلات — آنچه واقعاً
          جلوی رشد شما را می‌گیرد — نیاز به یک بررسی عمیق‌تر دارد که
          ساختار سازمانی، منابع انسانی، بازار هدف و شخصیت مدیریتی شما را در نظر بگیرد.
        </p>
      </div>

      {/* CTA */}
      <div style={styles.ctaCard}>
        <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🎯</div>
        <h2 style={styles.ctaTitle}>
          نتیجه را می‌بینید؟<br />حالا بیایید آن را تغییر دهیم.
        </h2>
        <p style={styles.ctaText}>
          در یک جلسه مشاوره اختصاصی، دقیقاً همان مسیری را طراحی می‌کنیم
          که متناسب با <strong style={{ color: "#c4b5fd" }}>منابع، تیم و شخصیت مدیریتی شما</strong> باشد.
          نه یک راه‌حل کلیشه‌ای — بلکه یک نقشه راه واقعی.
        </p>
        <button
          style={styles.ctaBtn}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(139,92,246,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 32px rgba(139,92,246,0.35)";
          }}
        >
          درخواست مشاوره اختصاصی ←
        </button>
        <p style={{ fontSize: "0.73rem", color: "#475569", marginTop: "1rem" }}>
          ظرفیت محدود · اولویت با کسانی که آنالیز را کامل کرده‌اند
        </p>
      </div>
    </div>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [bizType, setBizType] = useState(null);
  const [bizName, setBizName] = useState("");
  const [finalAnswers, setFinalAnswers] = useState(null);

  return (
    <div style={styles.root}>
      <link
        href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      {screen === "intro" && (
        <Intro
          onStart={(type, name) => {
            setBizType(type);
            setBizName(name);
            setScreen("quiz");
          }}
        />
      )}
      {screen === "quiz" && (
        <Quiz
          type={bizType}
          name={bizName}
          onFinish={(answers) => {
            setFinalAnswers(answers);
            setScreen("verify");
          }}
        />
      )}
      {screen === "verify" && finalAnswers && (
        <PhoneVerification
          assessment={{tool:"business-check",business_name:bizName,business_type:bizType,answers:finalAnswers,result:analyze(bizType,finalAnswers)}}
          onVerified={() => setScreen("results")}
          accent="#2563eb"
        />
      )}
      {screen === "results" && (
        <><Results type={bizType} name={bizName} answers={finalAnswers} />
        <div style={{maxWidth:720,margin:"0 auto",padding:"0 20px 60px"}}><SharedContactForm source="business-check" service="بیزینس چک" /></div></>
      )}
    </div>
  );
}
