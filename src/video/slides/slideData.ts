import type { IconKey } from "./icons";

export const PAL = {
  green: "#3E9C4E",
  blue: "#1F6FD0",
  orange: "#E29B33",
  teal: "#14887E",
  purple: "#6355A8",
  crimson: "#B04A5E",
  gold: "#C39A3E",
} as const;

export type SlideItem = {
  ar: string;
  en: string;
  k: IconKey;
  color: string;
};

export type Slide = {
  num: number;
  ar: string;
  en: string;
  descAr: string;
  descEn: string;
  items: [SlideItem, SlideItem, SlideItem, SlideItem];
  center: { k: IconKey; color: string };
  resultAr: string;
  resultEn: string;
  summaryAr: string;
  summaryEn: string;
  summaryIcon: IconKey;
};

export const SLIDES: Slide[] = [
  {
    num: 1,
    ar: "استلام البيانات",
    en: "Data Intake",
    descAr: "جمع البيانات من جميع المصادر الداخلية والخارجية ذات الصلة بالعميل.",
    descEn: "Collecting data from all relevant internal and external sources related to the customer.",
    items: [
      { ar: "أنظمة التحصيل", en: "Collection Systems", k: "database", color: PAL.green },
      { ar: "المستندات والسجلات", en: "Documents & Records", k: "document", color: PAL.orange },
      { ar: "بيانات العملاء", en: "Customer Data", k: "user", color: PAL.blue },
      { ar: "المصادر الخارجية", en: "External Sources", k: "cloud", color: PAL.teal },
    ],
    center: { k: "dashboard", color: PAL.green },
    resultAr: "تدفقات مالية وسلوكية وتفاعلية تصل إلى ملف العميل.",
    resultEn: "Financial, behavioral, and engagement streams flowing into the customer profile.",
    summaryAr: "الأساس الأول لأي قرار تحصيلي فعّال.",
    summaryEn: "The foundation for any effective collection decision.",
    summaryIcon: "target",
  },
  {
    num: 2,
    ar: "توحيد المصادر",
    en: "Data Unification",
    descAr: "دمج التدفقات في مسار واحد، ومعالجة السجلات المكررة والمتعارضة.",
    descEn: "Merging all streams into one path and resolving duplicated or conflicting records.",
    items: [
      { ar: "مطابقة الهوية", en: "Identity Matching", k: "idcard", color: PAL.blue },
      { ar: "حذف التكرار", en: "Deduplication", k: "duplicate", color: PAL.orange },
      { ar: "حل التعارض", en: "Conflict Resolution", k: "filter", color: PAL.crimson },
      { ar: "جودة البيانات", en: "Data Quality", k: "shield", color: PAL.teal },
    ],
    center: { k: "merge", color: PAL.blue },
    resultAr: "بطاقة واحدة موحدة للعميل: Unified Customer Profile.",
    resultEn: "One single record: the Unified Customer Profile.",
    summaryAr: "مصدر واحد للحقيقة بدل بيانات مبعثرة.",
    summaryEn: "A single source of truth instead of scattered data.",
    summaryIcon: "check",
  },
  {
    num: 3,
    ar: "بناء الفهم",
    en: "Customer Understanding",
    descAr: "تحويل البيانات الخام إلى مؤشرات مفهومة تصف واقع العميل.",
    descEn: "Turning raw data into meaningful indicators that describe the customer's reality.",
    items: [
      { ar: "الدخل والقدرة", en: "Income & Ability", k: "wallet", color: PAL.green },
      { ar: "سلوك السداد", en: "Payment Behavior", k: "chart", color: PAL.blue },
      { ar: "الاستجابة", en: "Responsiveness", k: "signal", color: PAL.orange },
      { ar: "الظروف والسياق", en: "Circumstances & Context", k: "behavior", color: PAL.teal },
    ],
    center: { k: "idcard", color: PAL.teal },
    resultAr: "ملف العميل يتحول من أرقام إلى صورة مفهومة.",
    resultEn: "The profile shifts from raw numbers to an understandable picture.",
    summaryAr: "الفهم قبل القرار.",
    summaryEn: "Understanding comes before deciding.",
    summaryIcon: "brain",
  },
  {
    num: 4,
    ar: "تحليل أبعاد العميل",
    en: "Dimensions Analysis",
    descAr: "تنفتح حول الملف سبعة أبعاد ترتفع وتنخفض مؤشراتها بحسب حالة العميل.",
    descEn: "Seven dimensions open around the profile, rising and falling with the customer's state.",
    items: [
      { ar: "القدرة والوصول", en: "Ability & Reachability", k: "grid", color: PAL.green },
      { ar: "التفاعل والالتزام", en: "Engagement & Commitment", k: "radar", color: PAL.blue },
      { ar: "سلوك القناة", en: "Channel Behavior", k: "signal", color: PAL.orange },
      { ar: "العوائق والتعقيد", en: "Barriers & Complexity", k: "library", color: PAL.teal },
    ],
    center: { k: "radar", color: PAL.blue },
    resultAr: "سبعة أبعاد مقيسة، ومكتبة الشخصيات الثماني تمر أمام النظام.",
    resultEn: "Seven measured dimensions while the eight-persona library is scanned.",
    summaryAr: "النظام يبحث عن النمط الأقرب للعميل.",
    summaryEn: "The system searches for the closest matching pattern.",
    summaryIcon: "library",
  },
  {
    num: 5,
    ar: "مطابقة الشخصية",
    en: "Persona Matching",
    descAr: "تتحرك نتائج الأبعاد نحو الشخصيات الثماني، وتتراجع غير المتوافقة.",
    descEn: "Dimension results move toward the eight personas; mismatched ones fade away.",
    items: [
      { ar: "ثماني شخصيات", en: "Eight Personas", k: "persona", color: PAL.purple },
      { ar: "درجة التوافق", en: "Match Score", k: "match", color: PAL.blue },
      { ar: "استبعاد غير المتوافق", en: "Mismatch Filtering", k: "filter", color: PAL.orange },
      { ar: "الشخصية الأقرب", en: "Closest Persona", k: "check", color: PAL.green },
    ],
    center: { k: "match", color: PAL.purple },
    resultAr: "تضيء الشخصية الأكثر تطابقًا: قادر ولكن يصعب الوصول إليه.",
    resultEn: "The best-matching persona lights up: Able but Hard to Reach.",
    summaryAr: "شخصية واحدة تختصر سلوك العميل.",
    summaryEn: "One persona that summarizes the customer's behavior.",
    summaryIcon: "persona",
  },
  {
    num: 6,
    ar: "درجة الشخصية",
    en: "Persona Score",
    descAr: "تتجمع مؤشرات الشخصية بأوزان مختلفة داخل عداد دائري لإنتاج الدرجة النهائية.",
    descEn: "Weighted persona indicators are combined in a circular meter to produce the final score.",
    items: [
      { ar: "أوزان المؤشرات", en: "Indicator Weights", k: "weight", color: PAL.orange },
      { ar: "العداد الدائري", en: "Circular Meter", k: "gauge", color: PAL.blue },
      { ar: "مستوى الأولوية", en: "Priority Level", k: "priority", color: PAL.crimson },
      { ar: "الدرجة النهائية", en: "Final Score", k: "chart", color: PAL.green },
    ],
    center: { k: "gauge", color: PAL.orange },
    resultAr: "Persona Score نهائي مع مؤشر بصري للأولوية.",
    resultEn: "A final Persona Score with a visual priority indicator.",
    summaryAr: "رقم واحد يوجّه ترتيب المعالجة.",
    summaryEn: "A single number that drives treatment priority.",
    summaryIcon: "gauge",
  },
  {
    num: 7,
    ar: "التحقق من الجاهزية",
    en: "Decision Readiness",
    descAr: "تمر الحالة عبر بوابة تحقق تتأكد من اكتمال كل مدخلات القرار.",
    descEn: "The case passes a validation gate confirming all decision inputs are complete.",
    items: [
      { ar: "اكتمال البيانات", en: "Data Completeness", k: "database", color: PAL.green },
      { ar: "الفهم والأبعاد", en: "Understanding & Dimensions", k: "grid", color: PAL.blue },
      { ar: "الشخصية والدرجة", en: "Persona & Score", k: "gauge", color: PAL.orange },
      { ar: "بوابة التحقق", en: "Validation Gate", k: "gate", color: PAL.teal },
    ],
    center: { k: "shield", color: PAL.teal },
    resultAr: "علامات ✓ متتابعة ثم تتحول الحالة إلى Decision Ready.",
    resultEn: "Sequential ✓ checks, then the case becomes Decision Ready.",
    summaryAr: "لا قرار قبل اكتمال الأساس.",
    summaryEn: "No decision before the foundation is complete.",
    summaryIcon: "check",
  },
  {
    num: 8,
    ar: "محرك القرار",
    en: "Decision Engine",
    descAr: "يدخل الملف إلى المحرك فتخرج أمامه عدة مسارات تُقارن وتُستبعد تباعًا.",
    descEn: "The profile enters the engine; multiple paths are compared and eliminated one by one.",
    items: [
      { ar: "اتصال ورسالة", en: "Call & Message", k: "phone", color: PAL.blue },
      { ar: "تسوية وتقسيط", en: "Settlement & Installments", k: "coins", color: PAL.green },
      { ar: "تصعيد", en: "Escalation", k: "priority", color: PAL.crimson },
      { ar: "مقارنة الخيارات", en: "Option Comparison", k: "compare", color: PAL.orange },
    ],
    center: { k: "engine", color: PAL.purple },
    resultAr: "تُستبعد الخيارات غير الملائمة ويبقى الأعلى ملاءمة.",
    resultEn: "Unsuitable options are eliminated; the most suitable one remains.",
    summaryAr: "قرار مبني على مقارنة لا على اجتهاد.",
    summaryEn: "A decision built on comparison, not on guesswork.",
    summaryIcon: "branch",
  },
  {
    num: 9,
    ar: "أفضل إجراء تحصيلي تالٍ",
    en: "Next Best Collection Action",
    descAr: "يتحول الخيار الفائز إلى حزمة تنفيذية تحدد ماذا وكيف ومتى.",
    descEn: "The winning option becomes an executable package defining what, how, and when.",
    items: [
      { ar: "القناة: رسالة نصية", en: "Channel: SMS", k: "message", color: PAL.blue },
      { ar: "التوقيت: 8:30 مساءً", en: "Timing: 8:30 PM", k: "clock", color: PAL.orange },
      { ar: "النبرة: تذكير ودّي", en: "Tone: Friendly Reminder", k: "eye", color: PAL.teal },
      { ar: "عرض تسوية", en: "Settlement Offer", k: "package", color: PAL.green },
    ],
    center: { k: "package", color: PAL.green },
    resultAr: "أولوية عالية + حزمة تنفيذ متكاملة جاهزة للإرسال.",
    resultEn: "High priority plus a complete execution package ready to send.",
    summaryAr: "لم يختر «رسالة» فقط، بل حدد ماذا وكيف ومتى.",
    summaryEn: "Not just \u201Ca message\u201D \u2014 it defines what, how, and when.",
    summaryIcon: "priority",
  },
  {
    num: 10,
    ar: "التنفيذ",
    en: "Execution",
    descAr: "تنتقل الرسالة من النظام إلى هاتف العميل وتُتابع حالتها لحظيًا.",
    descEn: "The message moves from the system to the customer's phone and is tracked in real time.",
    items: [
      { ar: "الإرسال", en: "Send", k: "send", color: PAL.blue },
      { ar: "التسليم", en: "Delivered", k: "check", color: PAL.green },
      { ar: "الفتح", en: "Opened", k: "eye", color: PAL.orange },
      { ar: "تفاعل العميل", en: "Customer Action", k: "phone", color: PAL.teal },
    ],
    center: { k: "phone", color: PAL.blue },
    resultAr: "مسار التنفيذ مرئي بالكامل: إرسال ← تسليم ← فتح ← تفاعل.",
    resultEn: "A fully visible path: Send \u2192 Delivered \u2192 Opened \u2192 Customer Action.",
    summaryAr: "التنفيذ يُقاس، لا يُفترض.",
    summaryEn: "Execution is measured, not assumed.",
    summaryIcon: "send",
  },
  {
    num: 11,
    ar: "قياس النتائج",
    en: "Outcome Measurement",
    descAr: "تتحول استجابة العميل إلى بيانات قابلة للقياس تصل مباشرة لمؤشر التحصيل.",
    descEn: "The customer response becomes measurable data feeding the collection indicator.",
    items: [
      { ar: "تم الوصول", en: "Reached", k: "signal", color: PAL.blue },
      { ar: "تم التفاعل", en: "Engaged", k: "eye", color: PAL.orange },
      { ar: "وعد بالسداد", en: "Promise to Pay", k: "list", color: PAL.teal },
      { ar: "سداد", en: "Payment", k: "coins", color: PAL.green },
    ],
    center: { k: "chart", color: PAL.green },
    resultAr: "مبلغ السداد ينتقل إلى مؤشر التحصيل، والنتيجة تعود بيانات.",
    resultEn: "The paid amount moves to the collection indicator; the outcome becomes data.",
    summaryAr: "كل نتيجة تُقاس تصبح مصدرًا للتعلم.",
    summaryEn: "Every measured outcome becomes a learning source.",
    summaryIcon: "chart",
  },
  {
    num: 12,
    ar: "التعلّم والتحديث",
    en: "Learning & Update",
    descAr: "البيانات الجديدة ترجع إلى ملف العميل فتتحدث الأبعاد والدرجة والشخصية.",
    descEn: "New data returns to the profile, updating dimensions, score, and persona.",
    items: [
      { ar: "تحديث الأبعاد", en: "Dimensions Update", k: "refresh", color: PAL.blue },
      { ar: "تغيّر الدرجة", en: "Score Shift", k: "gauge", color: PAL.orange },
      { ar: "انتقال الشخصية", en: "Persona Shift", k: "persona", color: PAL.purple },
      { ar: "تغذية راجعة للمحرك", en: "Feedback to Engine", k: "arrowback", color: PAL.green },
    ],
    center: { k: "refresh", color: PAL.crimson },
    resultAr: "خط يعود من الملف إلى محرك القرار فتبدأ الدورة أذكى.",
    resultEn: "A line returns from the profile to the Decision Engine; the cycle restarts smarter.",
    summaryAr: "إطار يتعلم من كل حالة ويحسّن القرار التالي.",
    summaryEn: "A framework that learns from every case and improves the next decision.",
    summaryIcon: "brain",
  },
];
