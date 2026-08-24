import React from "react";
import { C } from "../theme";
import { FSTACK } from "../font";
import { curve, PulseTrack, type Path } from "./Pulse";

export const W = 1200;
export const H = 1500;
export const CX = W / 2;
export const CY = H / 2;

/** absolute placement inside a station, coordinates relative to station centre */
export const P: React.FC<{
  x?: number;
  y: number;
  o?: number;
  s?: number;
  children: React.ReactNode;
}> = ({ x = 0, y, o = 1, s = 1, children }) => (
  <div
    style={{
      position: "absolute",
      left: CX + x,
      top: CY + y,
      transform: `translate(-50%,-50%) scale(${s})`,
      opacity: o,
    }}
  >
    {children}
  </div>
);

export const Wrap: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div style={{ position: "relative", width: W, height: H }}>{children}</div>
);

export const Lines: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <svg
    width={W}
    height={H}
    viewBox={`0 0 ${W} ${H}`}
    style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}
  >
    {children}
  </svg>
);

export const track = (
  from: [number, number],
  to: [number, number],
  bow = 0.25,
): Path => curve([CX + from[0], CY + from[1]], [CX + to[0], CY + to[1]], bow);

export { PulseTrack };

export const Pod: React.FC<{
  ar: string;
  en: string;
  color: string;
  o?: number;
}> = ({ ar, en, color, o = 1 }) => (
  <div
    dir="rtl"
    style={{
      background: C.white,
      border: `1px solid ${C.line}`,
      borderRadius: 22,
      padding: "20px 28px",
      textAlign: "center",
      fontFamily: FSTACK,
      boxShadow: "0 14px 32px rgba(28,38,34,0.08)",
      opacity: o,
      minWidth: 290,
    }}
  >
    <div
      style={{
        width: 16,
        height: 16,
        borderRadius: 999,
        background: color,
        margin: "0 auto 10px",
      }}
    />
    <div style={{ fontSize: 33, fontWeight: 700, color: C.ink }}>{ar}</div>
    <div dir="ltr" style={{ fontSize: 24, color: C.muted }}>
      {en}
    </div>
  </div>
);

export const Card: React.FC<{
  children: React.ReactNode;
  w?: number;
  glow?: boolean;
  style?: React.CSSProperties;
}> = ({ children, w = 760, glow, style }) => (
  <div
    dir="rtl"
    style={{
      width: w,
      background: C.white,
      border: `1px solid ${glow ? C.gold : C.line}`,
      borderRadius: 26,
      padding: "26px 30px",
      fontFamily: FSTACK,
      boxShadow: glow
        ? "0 26px 60px rgba(14,75,60,0.18)"
        : "0 14px 34px rgba(28,38,34,0.08)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Tag: React.FC<{
  ar: string;
  en?: string;
  tone?: "green" | "gold" | "muted" | "red";
  size?: number;
}> = ({ ar, en, tone = "green", size = 30 }) => {
  const map = {
    green: { bg: C.greenLight, fg: C.green, bd: "#BCD8CC" },
    gold: { bg: "#F7EED6", fg: "#8A6A1E", bd: C.goldSoft },
    muted: { bg: "#F1EFE8", fg: C.muted, bd: C.line },
    red: { bg: "#F7E5E1", fg: C.red, bd: "#EBC7BF" },
  }[tone];
  return (
    <span
      dir="rtl"
      style={{
        display: "inline-flex",
        gap: 8,
        alignItems: "baseline",
        background: map.bg,
        color: map.fg,
        border: `1px solid ${map.bd}`,
        borderRadius: 999,
        padding: "9px 20px",
        fontFamily: FSTACK,
        fontSize: size,
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {ar}
      {en ? (
        <span dir="ltr" style={{ fontSize: size * 0.8, opacity: 0.7, fontWeight: 500 }}>
          {en}
        </span>
      ) : null}
    </span>
  );
};

export const Note: React.FC<{ ar: string; en?: string; o?: number }> = ({
  ar,
  en,
  o = 1,
}) => (
  <div
    dir="rtl"
    style={{
      fontFamily: FSTACK,
      fontSize: 31,
      color: C.muted,
      textAlign: "center",
      opacity: o,
      lineHeight: 1.5,
    }}
  >
    <div>{ar}</div>
    {en ? (
      <div dir="ltr" style={{ color: C.greenSoft, fontSize: 26 }}>{en}</div>
    ) : null}
  </div>
);
