import { PERSONA_DEFS } from "./personaData";

export type Part = "cycle" | "applied" | "special";

export type Group =
  | "data"
  | "understanding"
  | "decision"
  | "action"
  | "outcome"
  | "learning";

/** أوضاع بطاقة ملف العميل — تتحكم بارتفاعها حتى لا تتراكب مع بقية المشهد */
export type ProfileMode = "full" | "compact" | "mini";

export type ChapterDef = {
  id: string;
  dur: number;
  part: Part;
  /** ring station index (0..11) or null for ring centre */
  station: number | null;
  /** موضع حر في العالم (للوحات المتفرعة خارج الحلقة) */
  pos?: [number, number];
  zoom: number;

  group?: Group;
  /** camera offset from the station centre, in world px */
  focus?: [number, number];
  /** وضع بطاقة الملف */
  pMode?: ProfileMode;
  /** حجم البطاقة على الشاشة */
  pScale?: number;
  /** أعلى نطاق ودجات المحطة، بإحداثيات الشاشة (إطار 1080×1920) */
  wTop?: number;
  index?: string;
  ar?: string;
  en?: string;
  desc?: string;
  /** overlay-only chapter (intro / interstitial / finale) */
  overlay?: boolean;
};

export const FPS = 30;
export const RING_R = 2600;
export const STATIONS = 12;

/** أعلى نطاق بطاقة الملف على الشاشة */
export const PROFILE_TOP = 600;
/** مركز الإطار عموديًا */
export const SCREEN_CY = 960;

export const stationPos = (i: number): [number, number] => {
  const a = (-90 + (360 / STATIONS) * i) * (Math.PI / 180);
  return [Math.cos(a) * RING_R, Math.sin(a) * RING_R];
};

const DEFS: ChapterDef[] = [
  {
    id: "intro",
    dur: 590,
    part: "special",
    station: null,
    zoom: 0.34,
    overlay: true,
  },
  {
    id: "s01",
    dur: 660,
    part: "cycle",
    station: 0,
    zoom: 0.94,
    group: "data",
    pMode: "full",
    pScale: 1,
    wTop: 1080,
    index: "01",
    ar: "استلام البيانات",
    en: "Data Intake",
    desc: "بيانات مالية وسلوكية وتفاعلية تصل إلى ملف العميل",
  },
  {
    id: "s02",
    dur: 560,
    part: "cycle",
    station: 1,
    zoom: 0.96,
    group: "data",
    pMode: "full",
    pScale: 1,
    wTop: 1080,
    index: "02",
    ar: "توحيد البيانات",
    en: "Data Unification",
    desc: "المصادر الثلاثة تندمج في ملف واحد موحّد",
  },
  {
    id: "s03",
    dur: 675,
    part: "cycle",
    station: 2,
    zoom: 0.9,
    group: "understanding",
    pMode: "full",
    pScale: 0.95,
    wTop: 1130,
    index: "03",
    ar: "بناء فهم العميل",
    en: "Customer Understanding",
    desc: "تحويل البيانات إلى فهم: مالي، سلوكي، سياقي",
  },
  {
    id: "s04",
    dur: 1575,
    part: "cycle",
    station: 3,
    zoom: 0.7,
    group: "understanding",
    pMode: "mini",
    pScale: 0.62,
    wTop: 1000,
    index: "04",
    ar: "تحليل أبعاد العميل",
    en: "Dimensions Analysis",
    desc: "سبعة مؤشرات تُقاس حول الملف",
  },

  /* ====== لوحات الشخصيات الأساسية: قوس متفرّع بعد تحليل الأبعاد ====== */
  {
    id: "p00",
    dur: 620,
    part: "cycle",
    station: null,
    pos: [RING_R + 2200, -260],
    zoom: 0.66,
    group: "understanding",
    pMode: "mini",
    pScale: 0.5,
    wTop: 640,
    ar: "الشخصيات الأساسية",
    en: "Core Collection Personas",
  },
  ...PERSONA_DEFS.map((p, i) => ({
    id: `p${String(i + 1).padStart(2, "0")}`,
    dur: 480,
    part: "cycle" as const,
    station: null,
    pos: [RING_R + 2200 + (i + 1) * 2500, i % 2 === 0 ? 320 : -320] as [number, number],
    zoom: 0.72,
    group: "understanding" as const,
    pMode: "mini" as const,
    pScale: 0.5,
    wTop: 700,
    ar: p.ar,
    en: p.en,
  })),

  {
    id: "s05",
    dur: 940,
    part: "cycle",
    station: 4,
    zoom: 0.88,
    group: "decision",
    pMode: "mini",
    pScale: 0.74,
    wTop: 1120,
    index: "05",
    ar: "تحديد الشخصية",
    en: "Persona Identification",
    desc: "مطابقة الأبعاد مع الشخصيات المحتملة",
  },
  {
    id: "s06",
    dur: 820,
    part: "cycle",
    station: 5,
    zoom: 0.92,
    group: "decision",
    pMode: "mini",
    pScale: 0.74,
    wTop: 1120,
    index: "06",
    ar: "درجة الشخصية",
    en: "Persona Score",
    desc: "درجة مركّبة تحدد التصنيف والأولوية",
  },
  {
    id: "s07",
    dur: 910,
    part: "cycle",
    station: 6,
    zoom: 0.92,
    group: "decision",
    pMode: "mini",
    pScale: 0.74,
    wTop: 1120,
    index: "07",
    ar: "الجاهزية للقرار",
    en: "Decision Readiness",
    desc: "اكتمال المدخلات قبل فتح المسار نحو المحرك",
  },
  {
    id: "s08",
    dur: 900,
    part: "cycle",
    station: 7,
    zoom: 0.84,
    group: "decision",
    pMode: "mini",
    pScale: 0.74,
    wTop: 1120,
    index: "08",
    ar: "محرك القرار",
    en: "Decision Engine",
    desc: "تقييم البدائل واعتماد الأنسب",
  },
  {
    id: "s09",
    dur: 880,
    part: "cycle",
    station: 8,
    zoom: 0.9,
    group: "action",
    pMode: "mini",
    pScale: 0.74,
    wTop: 1120,
    index: "09",
    ar: "أفضل إجراء تحصيلي تالٍ",
    en: "Next Best Collection Action",
    desc: "حزمة إجراء: قناة وتوقيت وأسلوب",
  },
  {
    id: "s10",
    dur: 785,
    part: "cycle",
    station: 9,
    zoom: 0.82,
    group: "action",
    pMode: "mini",
    pScale: 0.74,
    wTop: 1120,
    index: "10",
    ar: "التنفيذ",
    en: "Execution",
    desc: "إرسال الإجراء عبر القناة في التوقيت المحدد",
  },
  {
    id: "s11",
    dur: 860,
    part: "cycle",
    station: 10,
    zoom: 0.92,
    group: "outcome",
    pMode: "mini",
    pScale: 0.74,
    wTop: 1120,
    index: "11",
    ar: "قياس النتائج",
    en: "Outcome Measurement",
    desc: "قياس ما حدث فعليًا بعد التنفيذ",
  },
  {
    id: "s12",
    dur: 850,
    part: "cycle",
    station: 11,
    zoom: 0.86,
    group: "learning",
    pMode: "mini",
    pScale: 0.74,
    wTop: 1120,
    index: "12",
    ar: "التعلم والتحديث",
    en: "Learning & Update",
    desc: "النتيجة تعود لتحديث الملف والمؤشرات",
  },
  {
    id: "overview",
    dur: 945,
    part: "special",
    station: null,
    zoom: 0.28,
    pMode: "mini",
    pScale: 0.7,
  },
  {
    id: "bridge",
    dur: 535,
    part: "special",
    station: null,
    zoom: 0.3,
    pMode: "mini",
    pScale: 0.7,
    overlay: true,
  },

  /* ============ الحالة التطبيقية: نفس المراحل الـ12 بأرقام عميل واحد ============ */
  {
    id: "a1",
    dur: 870,
    part: "applied",
    station: 0,
    zoom: 0.92,
    group: "data",
    pMode: "compact",
    pScale: 0.8,
    wTop: 1180,
    ar: "بيانات عميل واحد",
    en: "One Customer's Data",
    desc: "أرقام محددة تدخل الإطار — CUST-48219",
  },
  {
    id: "a2",
    dur: 815,
    part: "applied",
    station: 1,
    zoom: 0.92,
    group: "data",
    pMode: "compact",
    pScale: 0.8,
    wTop: 1180,
    ar: "توحيد سجلاته",
    en: "Unifying His Records",
    desc: "تعارضات فعلية تُحلّ قبل التحليل",
  },
  {
    id: "a3",
    dur: 880,
    part: "applied",
    station: 2,
    zoom: 0.9,
    group: "understanding",
    pMode: "compact",
    pScale: 0.7,
    wTop: 1190,
    ar: "ماذا نفهم عنه؟",
    en: "What We Understand",
    desc: "قادر على السداد لكنه لا يرد على الاتصال",
  },
  {
    id: "a4",
    dur: 1120,
    part: "applied",
    station: 3,
    zoom: 0.7,
    group: "understanding",
    pMode: "mini",
    pScale: 0.62,
    wTop: 1000,
    ar: "أبعاد غير متساوية",
    en: "Uneven Dimensions",
    desc: "التباين نفسه هو ما يقود القرار",
  },
  {
    id: "a5",
    dur: 830,
    part: "applied",
    station: 4,
    zoom: 0.88,
    group: "decision",
    pMode: "mini",
    pScale: 0.74,
    wTop: 1200,
    ar: "مطابقة مبرَّرة",
    en: "Justified Match",
    desc: "لماذا هذه الشخصية تحديدًا؟",
  },
  {
    id: "a6",
    dur: 995,
    part: "applied",
    station: 5,
    zoom: 0.64,
    group: "decision",
    pMode: "mini",
    pScale: 0.74,
    wTop: 1080,
    ar: "من أين جاءت الدرجة؟",
    en: "How the Score Is Built",
    desc: "عوامل مرجّحة تُنتج درجة ٧٤",
  },
  {
    id: "a7",
    dur: 865,
    part: "applied",
    station: 6,
    zoom: 0.9,
    group: "decision",
    pMode: "mini",
    pScale: 0.74,
    wTop: 1200,
    ar: "جاهز للقرار",
    en: "Ready for Decision",
    desc: "كل مدخل مكتمل بقيمته الفعلية",
  },
  {
    id: "a8",
    dur: 1250,
    part: "applied",
    station: 7,
    zoom: 0.62,
    group: "decision",
    pMode: "mini",
    pScale: 0.74,
    wTop: 1080,
    ar: "بدائل مرفوضة ولماذا",
    en: "Rejected Alternatives",
    desc: "القرار يظهر مع أسباب الاستبعاد",
  },
  {
    id: "a9",
    dur: 860,
    part: "applied",
    station: 8,
    zoom: 0.88,
    group: "action",
    pMode: "mini",
    pScale: 0.74,
    wTop: 1200,
    ar: "الإجراء مقابل الأسلوب التقليدي",
    en: "NBCA vs Traditional",
    desc: "نفس العميل — قرار مختلف تمامًا",
  },
  {
    id: "a10",
    dur: 845,
    part: "applied",
    station: 9,
    zoom: 0.82,
    group: "action",
    pMode: "mini",
    pScale: 0.74,
    wTop: 1200,
    ar: "التنفيذ الفعلي",
    en: "Actual Execution",
    desc: "رسالة واحدة في التوقيت الصحيح",
  },
  {
    id: "a11",
    dur: 835,
    part: "applied",
    station: 10,
    zoom: 0.9,
    group: "outcome",
    pMode: "mini",
    pScale: 0.74,
    wTop: 1200,
    ar: "النتيجة بالأرقام",
    en: "Outcome in Numbers",
    desc: "ما الذي تحقق فعليًا بعد الإرسال",
  },
  {
    id: "a12",
    dur: 890,
    part: "applied",
    station: 11,
    zoom: 0.84,
    group: "learning",
    pMode: "mini",
    pScale: 0.74,
    wTop: 1200,
    ar: "قبل وبعد التعلم",
    en: "Before & After Learning",
    desc: "التغذية الراجعة تغيّر الملف فعليًا",
  },
  {
    id: "finale",
    dur: 770,
    part: "special",
    station: null,
    zoom: 0.26,
    overlay: true,
  },
];

export type Chapter = ChapterDef & {
  start: number;
  end: number;
  camX: number;
  camY: number;
  profScale: number;
  widgetTop: number;
  mode: ProfileMode;
};

let acc = 0;
export const CHAPTERS: Chapter[] = DEFS.map((d) => {
  const [sx, sy] = d.pos ?? (d.station === null ? [0, 0] : stationPos(d.station));
  const [fx, fy] = d.focus ?? [0, 0];
  const c: Chapter = {
    ...d,
    start: acc,
    end: acc + d.dur,
    camX: sx + fx,
    camY: sy + fy,
    profScale: d.pScale ?? 0.8,
    widgetTop: d.wTop ?? 1120,
    mode: d.pMode ?? "mini",
  };
  acc += d.dur;
  return c;
});

export const TOTAL = acc;

export const byId = (id: string): Chapter => {
  const c = CHAPTERS.find((x) => x.id === id);
  if (!c) throw new Error(`unknown chapter ${id}`);
  return c;
};

/** الفصل الحالي حسب الإطار */
export const chapterAt = (frame: number): Chapter =>
  CHAPTERS.find((c) => frame >= c.start && frame < c.end) ?? CHAPTERS[0]!;

/** local frame inside a chapter */
export const local = (frame: number, id: string) => frame - byId(id).start;

/** أول وآخر محطة في الحالة التطبيقية */
export const APPLIED_FIRST = "a1";
export const APPLIED_LAST = "a12";

export const TRANS = 50;
