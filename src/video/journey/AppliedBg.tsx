import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, seg } from "../theme";
import { byId, APPLIED_FIRST, APPLIED_LAST } from "./timeline";
import ops from "../assets/bank-ops.jpg";

/**
 * خلفية مصرفية تشغيلية — تظهر في الحالة التطبيقية فقط،
 * ضبابية ومهدّأة حتى تبقى الأولوية للبيانات والنصوص.
 */
export const AppliedBg: React.FC = () => {
  const f = useCurrentFrame();
  const bridge = byId("bridge");
  const start = byId(APPLIED_FIRST).start;
  const end = byId(APPLIED_LAST).end;
  const o =
    seg(f, bridge.end - 60, start + 20) * (1 - seg(f, end - 50, end + 10));
  if (o <= 0.01) return null;
  const t = (f - start) / Math.max(1, end - start);
  return (
    <AbsoluteFill style={{ opacity: o, overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          backgroundImage: `url(${ops})`,
          backgroundSize: "cover",
          backgroundPosition: `${48 + t * 8}% ${40 + t * 14}%`,
          transform: `scale(${1.12 + t * 0.08})`,
          filter: "blur(6px) saturate(0.85)",
        }}
      />
      {/* طبقة تهدئة: تحافظ على الخلفية الفاتحة وهوية الإطار */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(246,243,235,0.86) 0%, rgba(246,243,235,0.70) 42%, rgba(237,232,219,0.82) 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(900px 900px at 50% 46%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 70%)`,
        }}
      />
      <AbsoluteFill
        style={{
          boxShadow: `inset 0 0 240px rgba(14,75,60,0.10)`,
          border: `0px solid ${C.line}`,
        }}
      />
    </AbsoluteFill>
  );
};
