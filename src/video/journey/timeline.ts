export type Part = "cycle" | "applied" | "special";

export type Group =
  | "data"
  | "understanding"
  | "decision"
  | "action"
  | "outcome"
  | "learning";

export type ChapterDef = {
  id: string;
  dur: number;
  part: Part;
  /** ring station index (0..11) or null for ring centre */
  station: number | null;
  zoom: number;
  group?: Group;
  /** camera offset from the station centre, in world px */
  focus?: [number, number];
  /** profile offset from the station centre + scale */
  profile?: [number, number, number];
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

export const stationPos = (i: number): [number, number] => {
  const a = (-90 + (360 / STATIONS) * i) * (Math.PI / 180);
  return [Math.cos(a) * RING_R, Math.sin(a) * RING_R];
};

const P: [number, number, number] = [0, -430, 1];

const DEFS: ChapterDef[] = [
  {
    id: "intro",
    dur: 140,
    part: "special",
    station: null,
    zoom: 0.34,
    overlay: true,
  },
  {
    id: "s01",
    dur: 200,
    part: "cycle",
    station: 0,
    zoom: 0.94,
    group: "data",
    profile: [0, -200, 0.95],
    index: "01",
    ar: "استلام البيانات",
    en: "Data Intake",
    desc: "بيانات مالية وسلوكية وتفاعلية تصل إلى ملف العميل",
  },
  {
    id: "s02",
    dur: 185,
    part: "cycle",
    station: 1,
    zoom: 0.96,
    group: "data",
    profile: [0, -190, 1.0],
    index: "02",
    ar: "توحيد البيانات",
    en: "Data Unification",
    desc: "المصادر الثلاثة تندمج في ملف واحد موحّد",
  },
  {
    id: "s03",
    dur: 190,
    part: "cycle",
    station: 2,
    zoom: 0.9,
    group: "understanding",
    profile: [0, -300, 0.88],
    index: "03",
    ar: "بناء فهم العميل",
    en: "Customer Understanding",
    desc: "تحويل البيانات إلى فهم: مالي، سلوكي، سياقي",
  },
  {
    id: "s04",
    dur: 240,
    part: "cycle",
    station: 3,
    zoom: 0.7,
    group: "understanding",
    profile: [0, 0, 0.72],
    index: "04",
    ar: "تحليل أبعاد العميل",
    en: "Dimensions Analysis",
    desc: "سبعة مؤشرات تُقاس حول الملف",
  },
  {
    id: "s05",
    dur: 215,
    part: "cycle",
    station: 4,
    zoom: 0.88,
    group: "decision",
    profile: [0, -380, 0.62],
    index: "05",
    ar: "تحديد الشخصية",
    en: "Persona Identification",
    desc: "مطابقة الأبعاد مع الشخصيات المحتملة",
  },
  {
    id: "s06",
    dur: 185,
    part: "cycle",
    station: 5,
    zoom: 0.92,
    group: "decision",
    profile: [0, -370, 0.6],
    index: "06",
    ar: "درجة الشخصية",
    en: "Persona Score",
    desc: "درجة مركّبة تحدد التصنيف والأولوية",
  },
  {
    id: "s07",
    dur: 175,
    part: "cycle",
    station: 6,
    zoom: 0.92,
    group: "decision",
    profile: [0, -370, 0.6],
    index: "07",
    ar: "الجاهزية للقرار",
    en: "Decision Readiness",
    desc: "اكتمال المدخلات قبل فتح المسار نحو المحرك",
  },
  {
    id: "s08",
    dur: 240,
    part: "cycle",
    station: 7,
    zoom: 0.84,
    group: "decision",
    profile: [0, -400, 0.55],
    index: "08",
    ar: "محرك القرار",
    en: "Decision Engine",
    desc: "تقييم البدائل واعتماد الأنسب",
  },
  {
    id: "s09",
    dur: 200,
    part: "cycle",
    station: 8,
    zoom: 0.9,
    group: "action",
    profile: [0, -400, 0.55],
    index: "09",
    ar: "أفضل إجراء تحصيلي تالٍ",
    en: "Next Best Collection Action",
    desc: "حزمة إجراء: قناة وتوقيت وأسلوب",
  },
  {
    id: "s10",
    dur: 200,
    part: "cycle",
    station: 9,
    zoom: 0.82,
    group: "action",
    profile: [0, -410, 0.55],
    index: "10",
    ar: "التنفيذ",
    en: "Execution",
    desc: "إرسال الإجراء عبر القناة في التوقيت المحدد",
  },
  {
    id: "s11",
    dur: 185,
    part: "cycle",
    station: 10,
    zoom: 0.92,
    group: "outcome",
    profile: [0, -390, 0.55],
    index: "11",
    ar: "قياس النتائج",
    en: "Outcome Measurement",
    desc: "قياس ما حدث فعليًا بعد التنفيذ",
  },
  {
    id: "s12",
    dur: 225,
    part: "cycle",
    station: 11,
    zoom: 0.86,
    group: "learning",
    profile: [0, -340, 0.66],
    index: "12",
    ar: "التعلم والتحديث",
    en: "Learning & Update",
    desc: "النتيجة تعود لتحديث الملف والمؤشرات",
  },
  {
    id: "overview",
    dur: 160,
    part: "special",
    station: null,
    zoom: 0.28,
    profile: [0, 0, 1],
  },
  {
    id: "bridge",
    dur: 195,
    part: "special",
    station: null,
    zoom: 0.3,
    overlay: true,
  },

  /* ============ الحالة التطبيقية: نفس المراحل الـ12 بأرقام عميل واحد ============ */
  {
    id: "a1",
    dur: 200,
    part: "applied",
    station: 0,
    zoom: 0.92,
    group: "data",
    profile: [0, -190, 0.95],
    index: "01 | حالة",
    ar: "بيانات عميل واحد",
    en: "One Customer's Data",
    desc: "أرقام محددة تدخل الإطار — CUST-48219",
  },
  {
    id: "a2",
    dur: 195,
    part: "applied",
    station: 1,
    zoom: 0.92,
    group: "data",
    profile: [0, -190, 0.9],
    index: "02 | حالة",
    ar: "توحيد سجلاته",
    en: "Unifying His Records",
    desc: "تعارضات فعلية تُحلّ قبل التحليل",
  },
  {
    id: "a3",
    dur: 195,
    part: "applied",
    station: 2,
    zoom: 0.9,
    group: "understanding",
    profile: [0, -260, 0.82],
    index: "03 | حالة",
    ar: "ماذا نفهم عنه؟",
    en: "What We Understand",
    desc: "قادر على السداد لكنه لا يرد على الاتصال",
  },
  {
    id: "a4",
    dur: 250,
    part: "applied",
    station: 3,
    zoom: 0.7,
    group: "understanding",
    profile: [0, 0, 0.72],
    index: "04 | حالة",
    ar: "أبعاد غير متساوية",
    en: "Uneven Dimensions",
    desc: "التباين نفسه هو ما يقود القرار",
  },
  {
    id: "a5",
    dur: 215,
    part: "applied",
    station: 4,
    zoom: 0.88,
    group: "decision",
    profile: [0, -380, 0.6],
    index: "05 | حالة",
    ar: "مطابقة مبرَّرة",
    en: "Justified Match",
    desc: "لماذا هذه الشخصية تحديدًا؟",
  },
  {
    id: "a6",
    dur: 195,
    part: "applied",
    station: 5,
    zoom: 0.9,
    group: "decision",
    profile: [0, -360, 0.58],
    index: "06 | حالة",
    ar: "من أين جاءت الدرجة؟",
    en: "How the Score Is Built",
    desc: "عوامل مرجّحة تُنتج درجة ٧٤",
  },
  {
    id: "a7",
    dur: 185,
    part: "applied",
    station: 6,
    zoom: 0.9,
    group: "decision",
    profile: [0, -360, 0.58],
    index: "07 | حالة",
    ar: "جاهز للقرار",
    en: "Ready for Decision",
    desc: "كل مدخل مكتمل بقيمته الفعلية",
  },
  {
    id: "a8",
    dur: 265,
    part: "applied",
    station: 7,
    zoom: 0.84,
    group: "decision",
    profile: [0, -380, 0.55],
    index: "08 | حالة",
    ar: "بدائل مرفوضة ولماذا",
    en: "Rejected Alternatives",
    desc: "القرار يظهر مع أسباب الاستبعاد",
  },
  {
    id: "a9",
    dur: 230,
    part: "applied",
    station: 8,
    zoom: 0.88,
    group: "action",
    profile: [0, -380, 0.55],
    index: "09 | حالة",
    ar: "الإجراء مقابل الأسلوب التقليدي",
    en: "NBCA vs Traditional",
    desc: "نفس العميل — قرار مختلف تمامًا",
  },
  {
    id: "a10",
    dur: 210,
    part: "applied",
    station: 9,
    zoom: 0.82,
    group: "action",
    profile: [0, -400, 0.55],
    index: "10 | حالة",
    ar: "التنفيذ الفعلي",
    en: "Actual Execution",
    desc: "رسالة واحدة في التوقيت الصحيح",
  },
  {
    id: "a11",
    dur: 205,
    part: "applied",
    station: 10,
    zoom: 0.9,
    group: "outcome",
    profile: [0, -380, 0.55],
    index: "11 | حالة",
    ar: "النتيجة بالأرقام",
    en: "Outcome in Numbers",
    desc: "ما الذي تحقق فعليًا بعد الإرسال",
  },
  {
    id: "a12",
    dur: 245,
    part: "applied",
    station: 11,
    zoom: 0.84,
    group: "learning",
    profile: [0, -360, 0.62],
    index: "12 | حالة",
    ar: "قبل وبعد التعلم",
    en: "Before & After Learning",
    desc: "التغذية الراجعة تغيّر الملف فعليًا",
  },
  {
    id: "finale",
    dur: 225,
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
  profX: number;
  profY: number;
  profScale: number;
};

let acc = 0;
export const CHAPTERS: Chapter[] = DEFS.map((d) => {
  const [sx, sy] = d.station === null ? [0, 0] : stationPos(d.station);
  const [fx, fy] = d.focus ?? [0, 0];
  const [px, py, ps] = d.profile ?? P;
  const c: Chapter = {
    ...d,
    start: acc,
    end: acc + d.dur,
    camX: sx + fx,
    camY: sy + fy,
    profX: sx + px,
    profY: sy + py,
    profScale: ps,
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

/** local frame inside a chapter */
export const local = (frame: number, id: string) => frame - byId(id).start;

/** أول وآخر محطة في الحالة التطبيقية */
export const APPLIED_FIRST = "a1";
export const APPLIED_LAST = "a12";

export const TRANS = 50;
