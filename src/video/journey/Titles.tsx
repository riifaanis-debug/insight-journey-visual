import React from "react";
import { useCurrentFrame } from "remotion";
import { CHAPTERS } from "./timeline";
import { C, groupColor } from "../theme";
import { FSTACK } from "../font";
import { useLayout } from "./layout";

const win = (f: number, dur: number) => {
  const inn = Math.max(0, Math.min(1, f / 18));
  const out = Math.max(0, Math.min(1, (dur - f) / 16));
  return Math.min(inn, out);
};

/** طبقة النصوص فقط: هي وحدها التي تتبدل بـ cross-fade */
export const Titles: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const k = L.titleK;
  const S = (n: number) => Math.round(n * k);
  return (
    <div
      dir="rtl"
      style={{
        position: "absolute",
        top: L.titleTop,
        right: L.titleRight,
        left: L.titleLeft,
        fontFamily: FSTACK,
        pointerEvents: "none",
      }}
    >
      {CHAPTERS.filter((c) => c.ar).map((c) => {
        const f = frame - c.start;
        if (f < -8 || f > c.dur + 8) return null;
        const o = win(f, c.dur);
        const g = groupColor(c.group);
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
            {c.index ? (
              <div style={{ display: "flex", alignItems: "center", gap: S(16) }}>
                <div
                  style={{
                    fontSize: S(32),
                    fontWeight: 700,
                    color: applied ? "#FFFFFF" : g.main,
                    letterSpacing: 1.5,
                    background: applied ? g.main : g.light,
                    padding: `${S(8)}px ${S(20)}px`,
                    borderRadius: 999,
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.index}
                </div>
                <div style={{ height: 3, flex: 1, background: g.light }} />
              </div>
            ) : null}

            <div
              style={{
                marginTop: c.index ? S(16) : 0,
                display: "flex",
                alignItems: "baseline",
                gap: S(16),
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontSize: S(66), fontWeight: 700, color: C.ink, lineHeight: 1.15 }}>
                {c.ar}
              </span>
              <span style={{ color: C.line, fontSize: S(40) }}>|</span>
              <span
                dir="ltr"
                style={{ fontSize: S(44), fontWeight: 600, color: g.soft }}
              >
                {c.en}
              </span>
            </div>
            <div
              style={{
                marginTop: S(14),
                fontSize: S(34),
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
}) => {
  const L = useLayout();
  return (
  <div
    dir="rtl"
    style={{
      position: "absolute",
      bottom: L.titleK < 1 ? 30 : 84,
      right: L.titleK < 1 ? 60 : 0,
      left: L.titleK < 1 ? undefined : 0,
      textAlign: L.titleK < 1 ? "right" : "center",
      fontFamily: FSTACK,
      fontSize: Math.round(26 * Math.max(0.7, L.titleK)),
      color: C.muted,
      opacity: opacity * 0.9,
      pointerEvents: "none",
    }}
  >
    أرقام توضيحية <span dir="ltr">| Illustrative figures</span>
    </div>
  );
};
