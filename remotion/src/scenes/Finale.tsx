import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, appear, seg } from "../theme";
import { FSTACK } from "../font";
import { CycleRing, FrameworkMark } from "./Intro";

export const Finale: React.FC = () => {
  const f = useCurrentFrame();
  const lines = [
    { ar: "كل تفاعل يولّد معرفة جديدة.", en: "Every Interaction Creates New Insight.", d: 10 },
    { ar: "وكل معرفة تحسّن القرار التالي.", en: "Every Insight Improves the Next Decision.", d: 70 },
  ];
  const zoom = seg(f, 0, 60);
  const markIn = seg(f, 135, 175);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div
        style={{
          position: "absolute",
          transform: `scale(${(0.7 + zoom * 0.28) * (1 + markIn * 0.06)})`,
          opacity: 0.9,
        }}
      >
        <CycleRing progress={Math.min(1, seg(f, 5, 90))} radius={340} />
      </div>

      {lines.map((l, i) => {
        const inn = appear(f, l.d, 22);
        const out = i === 0 ? 1 - seg(f, 64, 84) : 1;
        return (
          <div
            key={l.en}
            dir="rtl"
            style={{
              position: "absolute",
              textAlign: "center",
              fontFamily: FSTACK,
              opacity: inn * out * (i === 1 ? 1 - seg(f, 128, 146) : 1),
              transform: `translateY(${(1 - inn) * 26}px)`,
              background: "rgba(246,243,235,0.86)",
              borderRadius: 24,
              padding: "26px 34px",
            }}
          >
            <div style={{ fontSize: 42, fontWeight: 700, color: C.ink }}>{l.ar}</div>
            <div dir="ltr" style={{ fontSize: 28, color: C.gold, marginTop: 10, fontWeight: 600 }}>
              {l.en}
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          opacity: markIn,
          transform: `scale(${0.9 + markIn * 0.1})`,
          textAlign: "center",
        }}
      >
        <FrameworkMark />
        <div
          dir="ltr"
          style={{
            marginTop: 26,
            fontFamily: FSTACK,
            fontSize: 24,
            color: C.green,
            fontWeight: 600,
            lineHeight: 1.6,
            opacity: seg(f, 160, 190),
          }}
        >
          Data → Understanding → Decision →
          <br />
          Action → Outcome → Learning ↻
        </div>
      </div>
    </AbsoluteFill>
  );
};
