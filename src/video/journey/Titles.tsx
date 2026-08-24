import React from "react";
import { useCurrentFrame } from "remotion";
import { CHAPTERS } from "./timeline";
import { C } from "../theme";
import { FSTACK } from "../font";

const win = (f: number, dur: number) => {
  const inn = Math.max(0, Math.min(1, f / 16));
  const out = Math.max(0, Math.min(1, (dur - f) / 14));
  return Math.min(inn, out);
};

/** طبقة النصوص فقط: هي وحدها التي تتبدل بـ cross-fade */
export const Titles: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <div
      dir="rtl"
      style={{
        position: "absolute",
        top: 150,
        right: 80,
        left: 80,
        fontFamily: FSTACK,
        pointerEvents: "none",
      }}
    >
      {CHAPTERS.filter((c) => c.ar).map((c) => {
        const f = frame - c.start;
        if (f < -8 || f > c.dur + 8) return null;
        const o = win(f, c.dur);
        const applied = c.part === "applied";
        return (
          <div
            key={c.id}
            style={{
              position: "absolute",
              right: 0,
              left: 0,
              opacity: o,
              transform: `translateY(${(1 - o) * 14}px)`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: applied ? C.green : C.gold,
                  letterSpacing: 2,
                  background: applied ? C.greenLight : "transparent",
                  padding: applied ? "4px 14px" : 0,
                  borderRadius: 999,
                  whiteSpace: "nowrap",
                }}
              >
                {c.index}
              </div>
              <div style={{ height: 2, flex: 1, background: C.line }} />
            </div>
            <div
              style={{
                marginTop: 12,
                display: "flex",
                alignItems: "baseline",
                gap: 14,
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: 50, fontWeight: 700, color: C.ink }}>
                {c.ar}
              </span>
              <span style={{ color: C.line }}>|</span>
              <span
                dir="ltr"
                style={{ fontSize: 34, fontWeight: 600, color: C.greenSoft }}
              >
                {c.en}
              </span>
            </div>
            <div
              style={{
                marginTop: 10,
                fontSize: 27,
                color: C.muted,
                lineHeight: 1.5,
              }}
            >
              {c.desc}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const IllustrativeTag: React.FC<{ opacity?: number }> = ({
  opacity = 1,
}) => (
  <div
    dir="rtl"
    style={{
      position: "absolute",
      bottom: 92,
      right: 0,
      left: 0,
      textAlign: "center",
      fontFamily: FSTACK,
      fontSize: 22,
      color: C.muted,
      opacity: opacity * 0.9,
      pointerEvents: "none",
    }}
  >
    أرقام توضيحية <span dir="ltr">| Illustrative figures</span>
  </div>
);
