export type Part = "cycle" | "applied" | "special";

export type ChapterDef = {
  id: string;
  dur: number;
  part: Part;
  /** ring station index (0..11) or null for ring centre */
  station: number | null;
  zoom: number;
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
    dur: 130,
    part: "special",
    station: null,
    zoom: 0.34,
    overlay: true,
  },
  {
    id: "s01",
    dur: 155,
    part: "cycle",
    station: 0,
    zoom: 0.8,
    profile: [0, -330, 1],
    index: "01",
    ar: "استلام البيانات",
    en: "Data Intake",
    desc: "بيانات مالية وسلوكية وتفاعلية تصل إلى ملف العميل",
  },
  {
    id: "s02",
    dur: 140,
    part: "cycle",
    station: 1,
    zoom: 0.8,
    profile: [0, -300, 1.05],
    index: "02",
    ar: "توحيد البيانات",
    en: "Data Unification",
    desc: "المصادر الثلاثة تندمج في ملف واحد موحّد",
  },
  {
    id: "s03",
    dur: 145,
    part: "cycle",
    station: 2,
    zoom: 0.78,
    profile: [0, -420, 1],
    index: "03",
    ar: "بناء فهم العميل",
    en: "Customer Understanding",
    desc: "تحويل البيانات إلى فهم: مالي، سلوكي، سياقي",
  },
  {
    id: "s04",
    dur: 185,
    part: "cycle",
    station: 3,
    zoom: 0.7,
    profile: [0, 0, 0.72],
    index: "04",
    ar: "تحليل أبعاد العميل",
    en: "Dimensions Analysis",
    desc: "سبعة مؤشرات تُقاس حول الملف",
  },
  {
    id: "s05",
    dur: 165,
    part: "cycle",
    station: 4,
    zoom: 0.74,
    profile: [0, -470, 0.85],
    index: "05",
    ar: "تحديد الشخصية",
    en: "Persona Identification",
    desc: "مطابقة الأبعاد مع الشخصيات المحتملة",
  },
  {
    id: "s06",
    dur: 140,
    part: "cycle",
    station: 5,
    zoom: 0.76,
    profile: [0, -470, 0.8],
    index: "06",
    ar: "درجة الشخصية",
    en: "Persona Score",
    desc: "درجة مركّبة تحدد التصنيف والأولوية",
  },
  {
    id: "s07",
    dur: 130,
    part: "cycle",
    station: 6,
    zoom: 0.78,
    profile: [0, -470, 0.78],
    index: "07",
    ar: "الجاهزية للقرار",
    en: "Decision Readiness",
    desc: "اكتمال المدخلات قبل فتح المسار نحو المحرك",
  },
  {
    id: "s08",
    dur: 185,
    part: "cycle",
    station: 7,
    zoom: 0.72,
    profile: [0, -520, 0.7],
    index: "08",
    ar: "محرك القرار",
    en: "Decision Engine",
    desc: "تقييم البدائل واعتماد الأنسب",
  },
  {
    id: "s09",
    dur: 155,
    part: "cycle",
    station: 8,
    zoom: 0.76,
    profile: [0, -520, 0.68],
    index: "09",
    ar: "أفضل إجراء تحصيلي تالٍ",
    en: "Next Best Collection Action",
    desc: "حزمة إجراء: قناة وتوقيت وأسلوب",
  },
  {
    id: "s10",
    dur: 155,
    part: "cycle",
    station: 9,
    zoom: 0.76,
    profile: [0, -520, 0.68],
    index: "10",
    ar: "التنفيذ",
    en: "Execution",
    desc: "إرسال الإجراء عبر القناة في التوقيت المحدد",
  },
  {
    id: "s11",
    dur: 140,
    part: "cycle",
    station: 10,
    zoom: 0.78,
    profile: [0, -520, 0.68],
    index: "11",
    ar: "قياس النتائج",
    en: "Outcome Measurement",
    desc: "قياس ما حدث فعليًا بعد التنفيذ",
  },
  {
    id: "s12",
    dur: 175,
    part: "cycle",
    station: 11,
    zoom: 0.74,
    profile: [0, -400, 0.85],
    index: "12",
    ar: "التعلم والتحديث",
    en: "Learning & Update",
    desc: "النتيجة تعود لتحديث الملف والمؤشرات",
  },
  {
    id: "overview",
    dur: 150,
    part: "special",
    station: null,
    zoom: 0.28,
    profile: [0, 0, 1],
  },
  {
    id: "bridge",
    dur: 105,
    part: "special",
    station: null,
    zoom: 0.3,
    overlay: true,
  },
  {
    id: "a1",
    dur: 175,
    part: "applied",
    station: 0,
    zoom: 0.78,
    profile: [0, -330, 1],
    index: "حالة",
    ar: "عميل واحد بأرقام حقيقية",
    en: "One Real Customer File",
    desc: "بيانات محددة تدخل الإطار",
  },
  {
    id: "a2",
    dur: 175,
    part: "applied",
    station: 3,
    zoom: 0.7,
    profile: [0, 0, 0.72],
    index: "حالة",
    ar: "أبعاد غير متساوية",
    en: "Uneven Dimensions",
    desc: "التباين نفسه هو ما يقود القرار",
  },
  {
    id: "a3",
    dur: 165,
    part: "applied",
    station: 4,
    zoom: 0.74,
    profile: [0, -470, 0.85],
    index: "حالة",
    ar: "مطابقة مبرَّرة",
    en: "Justified Match",
    desc: "لماذا هذه الشخصية تحديدًا؟",
  },
  {
    id: "a4",
    dur: 215,
    part: "applied",
    station: 7,
    zoom: 0.7,
    profile: [0, -540, 0.66],
    index: "حالة",
    ar: "بدائل مرفوضة ولماذا",
    en: "Rejected Alternatives",
    desc: "القرار يظهر مع أسباب الاستبعاد",
  },
  {
    id: "a5",
    dur: 185,
    part: "applied",
    station: 8,
    zoom: 0.74,
    profile: [0, -540, 0.66],
    index: "حالة",
    ar: "الإجراء مقابل الأسلوب التقليدي",
    en: "NBCA vs Traditional",
    desc: "الفرق العملي في القرار",
  },
  {
    id: "a6",
    dur: 175,
    part: "applied",
    station: 10,
    zoom: 0.76,
    profile: [0, -540, 0.66],
    index: "حالة",
    ar: "التنفيذ والنتيجة",
    en: "Execution & Outcome",
    desc: "نتيجة واحدة واضحة بالأرقام",
  },
  {
    id: "a7",
    dur: 205,
    part: "applied",
    station: 11,
    zoom: 0.72,
    profile: [0, -390, 0.85],
    index: "حالة",
    ar: "قبل وبعد التعلم",
    en: "Before & After Learning",
    desc: "التغذية الراجعة تغيّر الملف فعليًا",
  },
  {
    id: "finale",
    dur: 215,
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

export const TRANS = 34;
