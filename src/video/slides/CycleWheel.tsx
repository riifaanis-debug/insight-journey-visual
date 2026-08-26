import React from "react";
import { FAR, FEN } from "../font";
import { IconBadge, Glyph, hexA } from "./icons";
import { SLIDES } from "./slideData";

export const WW = 1920;
export const WH = 1920;

const CREAM = "#FBF7EF";
const CREAM2 = "#F2ECDF";
const GREEN = "#0E4B3C";
const GOLD = "#C39A3E";
const INK = "#233029";
const MUTED = "#54655C";

const CX = 960;
const CY = 1075;
const R = 500;
const LW = 306;

const GROUPS = [
  { ar: "البيانات", en: "Data", color: "#3E9C4E", from: 0, to: 2 },
  { ar: "الفهم والتحليل", en: "Understanding", color: "#1F6FD0", from: 3, to: 5 },
  { ar: "القرار", en: "Decision", color: "#E29B33", from: 6, to: 8 },
  { ar: "التنفيذ والتعلّم", en: "Execution & Learning", color: "#14887E", from: 9, to: 11 },
];

const ang = (i: number) => (-90 + i * 30) * (Math.PI / 180);
const pt = (i: number, r: number) => ({
  x: CX + r * Math.cos(ang(i)),
  y: CY + r * Math.sin(ang(i)),
});

const arcPath = (from: number, to: number, r: number) => {
  const pad = 0.052;
  const a0 = ang(from) - 0.26 + pad;
  const a1 = ang(to) + 0.26 - pad;
  const p0 = { x: CX + r * Math.cos(a0), y: CY + r * Math.sin(a0) };
  const p1 = { x: CX + r * Math.cos(a1), y: CY + r * Math.sin(a1) };
  const large = a1 - a0 > Math.PI ? 1 : 0;
  return `M ${p0.x} ${p0.y} A ${r} ${r} 0 ${large} 1 ${p1.x} ${p1.y}`;
};

export const CycleWheel: React.FC = () => (
  <div
    style={{
      width: WW,
      height: WH,
      position: "relative",
      overflow: "hidden",
      background: `radial-gradient(1200px 900px at 50% 46%, #FFFDF8 0%, ${CREAM} 58%, ${CREAM2} 100%)`,
      fontFamily: `${FAR}, ${FEN}, sans-serif`,
    }}
  >
    <svg width={WW} height={WH} style={{ position: "absolute", inset: 0 }}>
      {/* الحلقة الأساسية */}
      <circle cx={CX} cy={CY} r={R} fill="none" stroke={hexA(GOLD, 0.45)} strokeWidth={4} />
      <circle
        cx={CX}
        cy={CY}
        r={R - 46}
        fill="none"
        stroke={INK}
        strokeWidth={3}
        strokeDasharray="2 16"
        strokeLinecap="round"
        opacity={0.35}
      />
      {/* أقواس المجموعات */}
      {GROUPS.map((g) => (
        <path
          key={g.en}
          d={arcPath(g.from, g.to, R + 66)}
          fill="none"
          stroke={hexA(g.color, 0.75)}
          strokeWidth={9}
          strokeLinecap="round"
        />
      ))}
      {/* أسهم الاتجاه بين المراحل */}
      {SLIDES.map((_, i) => {
        const a = ang(i) + 0.26;
        const p = { x: CX + (R - 46) * Math.cos(a), y: CY + (R - 46) * Math.sin(a) };
        const deg = (a * 180) / Math.PI + 90;
        return (
          <g key={`ar-${i}`} transform={`translate(${p.x} ${p.y}) rotate(${deg})`}>
            <path
              d="M -13 -9 L 0 6 L 13 -9"
              fill="none"
              stroke={GOLD}
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.85}
            />
          </g>
        );
      })}
      {/* وصلات من العقد إلى المركز */}
      {SLIDES.map((_, i) => {
        const a = pt(i, R - 74);
        const b = pt(i, 268);
        return (
          <line
            key={`l-${i}`}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={INK}
            strokeWidth={3}
            strokeDasharray="2 14"
            strokeLinecap="round"
            opacity={0.28}
          />
        );
      })}
      <circle cx={CX} cy={CY} r={252} fill="#FFFFFF" opacity={0.92} />
      <circle cx={CX} cy={CY} r={252} fill="none" stroke={hexA(GOLD, 0.55)} strokeWidth={4} />
      <circle cx={CX} cy={CY} r={226} fill="none" stroke={hexA(GREEN, 0.18)} strokeWidth={2} />
    </svg>

    {/* العنوان */}
    <div style={{ position: "absolute", top: 74, width: "100%", textAlign: "center" }}>
      <div
        style={{
          fontFamily: `${FEN}, sans-serif`,
          fontSize: 74,
          fontWeight: 800,
          color: GREEN,
          letterSpacing: -1.4,
        }}
      >
        Collection Persona Framework
        <span style={{ fontSize: 32, verticalAlign: "super" }}>TM</span>
      </div>
      <div dir="rtl" style={{ marginTop: 14, fontSize: 44, fontWeight: 600, color: "#2C6455" }}>
        الدورة التشغيلية
        <span style={{ color: GOLD, margin: "0 18px" }}>|</span>
        <span style={{ fontFamily: `${FEN}, sans-serif` }}>Operating Cycle</span>
      </div>
    </div>

    {/* مفتاح المجموعات */}
    <div
      style={{
        position: "absolute",
        top: 272,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        gap: 34,
      }}
    >
      {GROUPS.map((g) => (
        <div
          key={g.en}
          dir="rtl"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            background: "#FFFFFFCC",
            border: `1px solid ${hexA(g.color, 0.35)}`,
            borderRadius: 999,
            padding: "10px 22px",
            fontSize: 26,
            fontWeight: 700,
            color: INK,
          }}
        >
          <span
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: g.color,
              display: "inline-block",
            }}
          />
          {g.ar}
          <span style={{ fontFamily: `${FEN}, sans-serif`, color: MUTED, fontWeight: 500 }}>
            {g.en}
          </span>
        </div>
      ))}
    </div>

    {/* العقد الـ12 */}
    {SLIDES.map((s, i) => {
      const node = pt(i, R);
      const c = Math.cos(ang(i));
      const sn = Math.sin(ang(i));
      const side = c > 0.3 ? "right" : c < -0.3 ? "left" : "center";
      const box: React.CSSProperties =
        side === "right"
          ? { left: node.x + 96, top: node.y - 56, textAlign: "left" }
          : side === "left"
            ? { left: node.x - 96 - LW, top: node.y - 56, textAlign: "right" }
            : {
                left: node.x - LW / 2,
                top: sn < 0 ? node.y - 96 - 116 : node.y + 96,
                textAlign: "center",
              };
      const color = GROUPS.find((g) => i >= g.from && i <= g.to)!.color;
      return (
        <React.Fragment key={s.num}>
          <div
            style={{
              position: "absolute",
              left: node.x - 60,
              top: node.y - 60,
              width: 120,
              height: 120,
            }}
          >
            <IconBadge k={s.center.k} color={color} size={120} />
            <div
              style={{
                position: "absolute",
                right: -12,
                top: -12,
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: `linear-gradient(150deg,#EBC163 0%, ${GOLD} 100%)`,
                border: "3px solid #FFFFFF",
                color: "#FFFFFF",
                fontFamily: `${FEN}, sans-serif`,
                fontSize: 27,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 6px 14px ${hexA(GOLD, 0.45)}`,
              }}
            >
              {s.num}
            </div>
          </div>
          <div
            dir="rtl"
            style={{
              position: "absolute",
              width: LW,
              ...box,
            }}
          >

            <div style={{ fontSize: 34, fontWeight: 800, color: INK, lineHeight: 1.25 }}>
              {s.ar}
            </div>
            <div
              style={{
                fontFamily: `${FEN}, sans-serif`,
                fontSize: 27,
                color: MUTED,
                marginTop: 6,
                lineHeight: 1.2,
              }}
            >
              {s.en}
            </div>
          </div>
        </React.Fragment>
      );
    })}

    {/* المركز */}
    <div
      style={{
        position: "absolute",
        left: CX - 210,
        top: CY - 190,
        width: 420,
        textAlign: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Glyph k="refresh" size={96} color={GOLD} />
      </div>
      <div
        dir="rtl"
        style={{ marginTop: 12, fontSize: 46, fontWeight: 800, color: GREEN, lineHeight: 1.25 }}
      >
        دورة تشغيلية
        <br />
        مستمرة
      </div>
      <div
        style={{
          width: 120,
          height: 3,
          background: GOLD,
          margin: "16px auto",
          opacity: 0.8,
          borderRadius: 2,
        }}
      />
      <div
        style={{
          fontFamily: `${FEN}, sans-serif`,
          fontSize: 30,
          fontWeight: 700,
          color: MUTED,
          letterSpacing: 0.4,
        }}
      >
        OPERATING CYCLE
      </div>
      <div
        style={{
          fontFamily: `${FEN}, sans-serif`,
          fontSize: 26,
          color: GOLD,
          marginTop: 6,
          fontWeight: 700,
        }}
      >
        12 STAGES
      </div>
    </div>
  </div>
);
