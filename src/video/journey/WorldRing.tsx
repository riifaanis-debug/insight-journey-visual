import React from "react";
import { useCurrentFrame } from "remotion";
import { C, seg } from "../theme";
import { FSTACK } from "../font";
import { RING_R, byId } from "./timeline";

const PHASES = [
  { ar: "البيانات", en: "Data" },
  { ar: "الفهم", en: "Understanding" },
  { ar: "القرار", en: "Decision" },
  { ar: "الإجراء", en: "Action" },
  { ar: "النتيجة", en: "Outcome" },
  { ar: "التعلم", en: "Learning" },
];

/** الدائرة الحقيقية التي تسير عليها الرحلة داخل العالم */
export const WorldRing: React.FC = () => {
  const f = useCurrentFrame();
  const ov = byId("overview");
  const fin = byId("finale");
  // تظهر تسميات المراحل فقط في لقطة النظرة الشاملة ثم تعود للاختفاء
  const reveal = Math.max(
    seg(f, ov.start - 40, ov.start + 50) * (1 - seg(f, ov.end - 40, ov.end + 10)),
    seg(f, fin.start - 60, fin.start - 10),
  );
  const base = 0.16 + reveal * 0.84;
  const r = RING_R;
  const cir = 2 * Math.PI * r;
  const walked = Math.min(1, Math.max(0, (f - byId("s01").start) / (byId("overview").start - byId("s01").start)));
  const spin = (f * 0.15) % 360;
  return (
    <div
      style={{
        position: "absolute",
        left: -r - 200,
        top: -r - 200,
        width: (r + 200) * 2,
        height: (r + 200) * 2,
        opacity: base,
        pointerEvents: "none",
      }}
    >
      <svg width={(r + 200) * 2} height={(r + 200) * 2}>
        <circle
          cx={r + 200}
          cy={r + 200}
          r={r}
          stroke={C.line}
          strokeWidth={6}
          fill="none"
        />
        <circle
          cx={r + 200}
          cy={r + 200}
          r={r}
          stroke={C.gold}
          strokeWidth={12}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={cir}
          strokeDashoffset={cir * (1 - walked)}
          transform={`rotate(-90 ${r + 200} ${r + 200})`}
          opacity={0.85}
        />
        <circle
          cx={r + 200 + Math.cos(((spin - 90) * Math.PI) / 180) * r}
          cy={r + 200 + Math.sin(((spin - 90) * Math.PI) / 180) * r}
          r={26}
          fill={C.gold}
          opacity={reveal}
        />
      </svg>
      {PHASES.map((p, i) => {
        const a = ((-90 + (360 / 6) * i) * Math.PI) / 180;
        return (
          <div
            key={p.en}
            dir="rtl"
            style={{
              position: "absolute",
              left: r + 200 + Math.cos(a) * (r + 320),
              top: r + 200 + Math.sin(a) * (r + 320),
              transform: "translate(-50%,-50%)",
              background: C.white,
              border: `2px solid ${C.line}`,
              borderRadius: 999,
              padding: "22px 46px",
              fontFamily: FSTACK,
              fontSize: 96,
              fontWeight: 700,
              color: C.green,
              whiteSpace: "nowrap",
              opacity: reveal,
              boxShadow: "0 20px 60px rgba(28,38,34,0.10)",
            }}
          >
            {p.ar}{" "}
            <span dir="ltr" style={{ color: C.muted, fontSize: 74 }}>
              | {p.en}
            </span>
          </div>
        );
      })}
      <div
        dir="ltr"
        style={{
          position: "absolute",
          left: r + 200,
          top: r + 200,
          transform: "translate(-50%,-50%)",
          textAlign: "center",
          fontFamily: FSTACK,
          fontSize: 190,
          fontWeight: 700,
          color: C.green,
          lineHeight: 1.15,
          opacity: reveal,
        }}
      >
        Collection Persona
        <br />
        Framework™
      </div>
    </div>
  );
};
