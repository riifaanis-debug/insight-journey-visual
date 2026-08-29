import { useCurrentFrame } from "remotion";
import { seg } from "../theme";
import { byId, APPLIED_FIRST } from "./timeline";
import { CASE } from "./caseData";
import type { ProfileState } from "./ProfileCore";

const at = (id: string, off: number) => byId(id).start + off;

/** بيانات تعريفية توضيحية تُعرض داخل بطاقة الملف */
const PROFILE_META = [
  { ar: "الاسم", en: "Name", v: "أحمد محمد الشريف" },
  { ar: "المدينة", en: "City", v: "الرياض" },
  { ar: "الشريحة", en: "Segment", v: "أفراد — تجزئة" },
  { ar: "إجمالي المديونية", en: "Total Exposure", v: "٤٨٬٠٠٠ ر.س" },
  { ar: "آخر تحديث", en: "Last Update", v: "اليوم ١٠:٢٤" },
];

/**
 * حالة الملف المستمر: لا يُعاد إنشاؤه — كل مرحلة تضيف إليه مخرجاتها،
 * في الدورة التشغيلية وفي الحالة التطبيقية على السواء.
 */
export const useProfileState = (): ProfileState => {
  const f = useCurrentFrame();

  const cycleLanes: [number, number, number] = [
    seg(f, at("s01", 28), at("s01", 92)),
    seg(f, at("s01", 40), at("s01", 108)),
    seg(f, at("s01", 52), at("s01", 124)),
  ];
  const cycleUnify = seg(f, at("s02", 24), at("s02", 96));
  const cycleInsight = seg(f, at("s03", 22), at("s03", 88));

  const cycleScore = seg(f, at("s06", 18), at("s06", 104)) * 74;
  const inApplied = f >= byId(APPLIED_FIRST).start;

  // الحالة التطبيقية تبني الملف من جديد بأرقام العميل — لا تقفز للنهاية
  const appliedLanes: [number, number, number] = [
    seg(f, at("a1", 26), at("a1", 90)),
    seg(f, at("a1", 38), at("a1", 106)),
    seg(f, at("a1", 50), at("a1", 122)),
  ];
  const appliedUnify = seg(f, at("a2", 20), at("a2", 92));
  const appliedInsight = seg(f, at("a3", 18), at("a3", 82));

  const rows = inApplied ? CASE.facts : undefined;
  const rowsReveal = inApplied ? seg(f, at("a1", 24), at("a1", 120)) : 0;

  // بيانات تعريفية خام تملأ البطاقة منذ استلام البيانات
  const meta = PROFILE_META;
  const metaReveal = inApplied
    ? seg(f, at("a1", 16), at("a1", 90))
    : seg(f, at("s01", 30), at("s01", 130));
  const completeness =
    0.35 +
    0.5 * (inApplied ? appliedUnify : cycleUnify) +
    0.15 * (inApplied ? appliedInsight : cycleInsight);

  const personaSwitch = seg(f, at("a12", 160), at("a12", 195));
  const persona = inApplied
    ? personaSwitch > 0.5
      ? CASE.personaAfter
      : { ar: CASE.personas[0]!.ar, en: CASE.personas[0]!.en }
    : { ar: "قادر يصعب الوصول إليه", en: "Able but Hard to Reach" };

  const personaIn = inApplied
    ? seg(f, at("a5", 104), at("a5", 142))
    : seg(f, at("s05", 110), at("s05", 150));

  const appliedScore =
    CASE.score + (CASE.scoreAfter - CASE.score) * seg(f, at("a12", 24), at("a12", 100));

  const score = inApplied ? appliedScore : cycleScore;
  const scoreIn = inApplied
    ? seg(f, at("a6", 20), at("a6", 60))
    : seg(f, at("s06", 20), at("s06", 62));

  const glow = Math.max(
    seg(f, at("s02", 64), at("s02", 108)) * 0.5,
    Math.max(
      seg(f, at("s07", 86), at("s07", 130)),
      Math.max(
        seg(f, at("a2", 96), at("a2", 140)) * 0.6,
        seg(f, at("a12", 104), at("a12", 156)),
      ),
    ),
  );

  return {
    lanes: inApplied ? appliedLanes : cycleLanes,
    unify: inApplied ? appliedUnify : cycleUnify,
    insight: inApplied ? appliedInsight : cycleInsight,
    rows,
    rowsReveal,
    persona,
    personaIn,
    score,
    scoreIn,
    glow,
  };
};
