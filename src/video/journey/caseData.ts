/** كل الأرقام توضيحية | All figures are illustrative */

export const CASE = {
  id: "CUST-48219",
  title: { ar: "ملف العميل", en: "Customer Profile" },
  facts: [
    { ar: "المبلغ المتأخر", en: "Past Due", v: "١٢٬٤٠٠ ر.س" },
    { ar: "عمر التأخر", en: "Days Past Due", v: "٣٨ يومًا" },
    { ar: "سداد سابق", en: "Payment History", v: "٤ من ٦ في الموعد" },
    { ar: "محاولات سابقة", en: "Prior Attempts", v: "٣ اتصالات — بلا رد" },
    { ar: "قناة يستجيب لها", en: "Responsive Channel", v: "رسائل نصية" },
  ],
  dims: [
    { ar: "القدرة", en: "Ability", v: 0.82, note: "دخل مستقر" },
    { ar: "قابلية الوصول", en: "Reachability", v: 0.44, note: "لا يرد على الاتصال" },
    { ar: "التفاعل", en: "Engagement", v: 0.71, note: "يفتح الرسائل" },
    { ar: "الالتزام", en: "Commitment", v: 0.58, note: "التزام متذبذب" },
    { ar: "سلوك القنوات", en: "Channel Behavior", v: 0.86, note: "رسائل مساءً" },
    { ar: "العوائق والسياق", en: "Barriers & Context", v: 0.37, note: "ضغط موسمي" },
    { ar: "التعقيد", en: "Complexity", v: 0.29, note: "حالة بسيطة" },
  ],
  personas: [
    {
      ar: "قادر يصعب الوصول إليه",
      en: "Able but Hard to Reach",
      match: 0.81,
      up: ["القدرة | Ability", "سلوك القنوات | Channel Behavior"],
    },
    {
      ar: "متعثر مالياً",
      en: "Financially Strained",
      match: 0.34,
      down: ["القدرة مرتفعة | High Ability"],
    },
    {
      ar: "متجاهل متكرر",
      en: "Persistent Avoider",
      match: 0.27,
      down: ["التفاعل مرتفع | High Engagement"],
    },
  ],
  score: 74,
  classification: { ar: "أولوية مرتفعة", en: "High Priority" },
  alternatives: [
    {
      ar: "اتصال هاتفي صباحي",
      en: "Morning Phone Call",
      fit: 0.22,
      ok: false,
      why: "٣ محاولات سابقة بلا رد — قابلية الوصول ٤٤٪",
    },
    {
      ar: "إنذار قانوني",
      en: "Legal Notice",
      fit: 0.18,
      ok: false,
      why: "الالتزام والقدرة لا يبرران التصعيد",
    },
    {
      ar: "خطة تقسيط طويلة",
      en: "Long Instalment Plan",
      fit: 0.41,
      ok: false,
      why: "القدرة مرتفعة — لا حاجة لتمديد",
    },
    {
      ar: "رسالة نصية مع رابط سداد فوري",
      en: "SMS + Instant Payment Link",
      fit: 0.89,
      ok: true,
      why: "القناة التي يستجيب لها فعليًا، بلا تصعيد",
    },
  ],
  nbca: [
    { ar: "القناة", en: "Channel", v: "رسالة نصية + رابط سداد" },
    { ar: "التوقيت", en: "Timing", v: "٨:٣٠ مساءً — الثلاثاء" },
    { ar: "الأسلوب", en: "Approach", v: "تذكير ودّي بلا تصعيد" },
    { ar: "الأولوية", en: "Priority", v: "مرتفعة" },
    { ar: "نوع المعالجة", en: "Treatment", v: "سداد كامل بخيار تقسيطين" },
  ],
  traditional: {
    ar: "اتصال جماعي صباحي لكل المتأخرين",
    en: "Generic Morning Call Campaign",
    result: "٣ محاولات — بلا رد",
  },
  outcome: [
    { ar: "تم الوصول", en: "Reached", v: "نعم — خلال ٤ دقائق" },
    { ar: "تم التفاعل", en: "Engaged", v: "فتح الرابط" },
    { ar: "النتيجة", en: "Outcome", v: "سداد ٧٬٤٠٠ ر.س + وعد بالباقي" },
  ],
  learning: [
    { ar: "قابلية الوصول", en: "Reachability", before: 0.44, after: 0.63 },
    { ar: "الالتزام", en: "Commitment", before: 0.58, after: 0.71 },
    { ar: "سلوك القنوات", en: "Channel Behavior", before: 0.86, after: 0.92 },
  ],
  scoreAfter: 81,
  personaAfter: {
    ar: "قادر يستجيب رقميًا",
    en: "Able & Digitally Responsive",
  },
};

export type CaseData = typeof CASE;
