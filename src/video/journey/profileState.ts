import { useCurrentFrame } from "remotion";
import { seg } from "../theme";
import { byId } from "./timeline";
import { CASE } from "./caseData";
import type { ProfileState } from "./ProfileCore";

const at = (id: string, off: number) => byId(id).start + off;

/**
 * حالة الملف المستمر: لا يُعاد إنشاؤه — كل مرحلة تضيف إليه مخرجاتها.
 */
export const useProfileState = (): ProfileState => {
  const f = useCurrentFrame();

  const lanes: [number, number, number] = [
    seg(f, at("s01", 24), at("s01", 78)),
    seg(f, at("s01", 34), at("s01", 92)),
    seg(f, at("s01", 44), at("s01", 106)),
  ];
  const unify = seg(f, at("s02", 22), at("s02", 82));
  const insight = seg(f, at("s03", 20), at("s03", 74));

  const cycleScore = seg(f, at("s06", 16), at("s06", 90)) * 74;
  const inApplied = f >= byId("a1").start;

  const rows = inApplied ? CASE.facts : undefined;
  const rowsReveal = inApplied ? seg(f, at("a1", 20), at("a1", 110)) : 0;

  const personaSwitch = seg(f, at("a7", 150), at("a7", 180));
  const persona = inApplied
    ? personaSwitch > 0.5
      ? CASE.personaAfter
      : { ar: CASE.personas[0]!.ar, en: CASE.personas[0]!.en }
    : { ar: "قادر يصعب الوصول إليه", en: "Able but Hard to Reach" };

  const personaIn = inApplied
    ? seg(f, at("a3", 96), at("a3", 132))
    : seg(f, at("s05", 100), at("s05", 140));

  const appliedScore =
    CASE.score + (CASE.scoreAfter - CASE.score) * seg(f, at("a7", 24), at("a7", 96));

  const score = inApplied ? appliedScore : cycleScore;
  const scoreIn = inApplied
    ? seg(f, at("a3", 120), at("a3", 150))
    : seg(f, at("s06", 20), at("s06", 60));

  const glow = Math.max(
    seg(f, at("s02", 60), at("s02", 100)) * 0.5,
    Math.max(
      seg(f, at("s07", 80), at("s07", 120)),
      seg(f, at("a7", 100), at("a7", 150)),
    ),
  );

  return {
    lanes: inApplied ? [1, 1, 1] : lanes,
    unify: inApplied ? 1 : unify,
    insight: inApplied ? 1 : insight,
    rows,
    rowsReveal,
    persona,
    personaIn,
    score,
    scoreIn,
    glow,
  };
};
