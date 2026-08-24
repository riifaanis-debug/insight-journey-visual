import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { C, appear, seg, pop } from "../theme";
import { FSTACK } from "../font";
import { Bi } from "../components/Ui";

export const CYCLE = [
  { ar: "البيانات", en: "Data" },
  { ar: "الفهم", en: "Understanding" },
  { ar: "القرار", en: "Decision" },
  { ar: "الإجراء", en: "Action" },
  { ar: "النتيجة", en: "Outcome" },
  { ar: "التعلم", en: "Learning" },
];

export const FrameworkMark: React.FC<{ scale?: number; sub?: string }> = ({
  scale = 1,
  sub,
}) => (
  <div
    style={{
      textAlign: "center",
      fontFamily: FSTACK,
      transform: `scale(${scale})`,
    }}
  >
    <div
      dir="ltr"
      style={{
        fontSize: 54,
        fontWeight: 700,
        color: C.green,
        letterSpacing: -1,
        lineHeight: 1.2,
      }}
    >
      Collection Persona
      <br />
      Framework™
    </div>
    {sub ? (
      <div style={{ fontSize: 26, color: C.muted, marginTop: 12 }}>{sub}</div>
    ) : null}
  </div>
);

export const CycleRing: React.FC<{ progress: number; radius?: number }> = ({
  progress,
  radius = 330,
}) => {
  const f = useCurrentFrame();
  const rot = f * 0.12;
  return (
    <div style={{ position: "relative", width: radius * 2, height: radius * 2 }}>
      <svg width={radius * 2} height={radius * 2} style={{ position: "absolute" }}>
        <circle
          cx={radius}
          cy={radius}
          r={radius - 60}
          stroke={C.line}
          strokeWidth={2}
          fill="none"
        />
        <circle
          cx={radius}
          cy={radius}
          r={radius - 60}
          stroke={C.gold}
          strokeWidth={5}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * (radius - 60)}
          strokeDashoffset={2 * Math.PI * (radius - 60) * (1 - progress)}
          transform={`rotate(${-90 + rot} ${radius} ${radius})`}
        />
      </svg>
      {CYCLE.map((c, i) => {
        const a = (-90 + (360 / CYCLE.length) * i + rot) * (Math.PI / 180);
        const x = radius + Math.cos(a) * (radius - 60);
        const y = radius + Math.sin(a) * (radius - 60);
        return (
          <div
            key={c.en}
            dir="rtl"
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: "translate(-50%,-50%)",
              background: C.white,
              border: `1px solid ${C.line}`,
              borderRadius: 999,
              padding: "10px 18px",
              fontFamily: FSTACK,
              fontSize: 22,
              fontWeight: 600,
              color: C.green,
              opacity: progress > i / CYCLE.length ? 1 : 0.25,
              boxShadow: "0 8px 20px rgba(28,38,34,0.08)",
              whiteSpace: "nowrap",
            }}
          >
            {c.ar}{" "}
            <span dir="ltr" style={{ color: C.muted, fontSize: 19 }}>
              | {c.en}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(f, fps, 6, 22);
  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "center", gap: 40 }}
    >
      <div style={{ opacity: appear(f, 4), transform: `scale(${0.9 + s * 0.1})` }}>
        <FrameworkMark />
      </div>
      <div style={{ opacity: appear(f, 26) }}>
        <Bi ar="الدورة التشغيلية" en="Operating Cycle" size={40} />
      </div>
      <div style={{ opacity: appear(f, 40), marginTop: 10 }}>
        <CycleRing progress={seg(f, 40, 110)} radius={300} />
      </div>
    </AbsoluteFill>
  );
};

export const CycleOverview: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = seg(f, 0, 70);
  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "relative", transform: `scale(${0.82 + zoom * 0.18})` }}>
        <CycleRing progress={Math.min(1, seg(f, 5, 80))} radius={340} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FrameworkMark scale={0.85} />
        </div>
      </div>
      <div
        dir="ltr"
        style={{
          marginTop: 60,
          fontFamily: FSTACK,
          fontSize: 26,
          color: C.green,
          fontWeight: 600,
          opacity: seg(f, 60, 90),
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        Data → Understanding → Decision →
        <br />
        Action → Outcome → Learning ↻
      </div>
    </AbsoluteFill>
  );
};

export const Interstitial: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{ alignItems: "center", justifyContent: "center", padding: 90 }}
    >
      <div
        dir="rtl"
        style={{
          fontFamily: FSTACK,
          fontSize: 46,
          fontWeight: 700,
          color: C.ink,
          textAlign: "center",
          lineHeight: 1.5,
          opacity: appear(f, 6),
          transform: `translateY(${(1 - appear(f, 6)) * 30}px)`,
        }}
      >
        لنشاهد <span dir="ltr">Collection Persona Framework™</span> أثناء العمل
      </div>
      <div
        dir="ltr"
        style={{
          marginTop: 22,
          fontFamily: FSTACK,
          fontSize: 34,
          color: C.gold,
          fontWeight: 600,
          opacity: appear(f, 26),
        }}
      >
        See the Framework in Action
      </div>
      <div
        style={{
          marginTop: 40,
          width: seg(f, 30, 75) * 420,
          height: 4,
          background: C.green,
          borderRadius: 99,
        }}
      />
    </AbsoluteFill>
  );
};
