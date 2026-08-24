import React from "react";
import { useCurrentFrame } from "remotion";
import { C, appear, rise, seg } from "../theme";
import { FSTACK } from "../font";

export const Bi: React.FC<{
  ar: string;
  en?: string;
  size?: number;
  color?: string;
  weight?: number;
  enSize?: number;
  enColor?: string;
}> = ({ ar, en, size = 46, color = C.ink, weight = 700, enSize, enColor }) => (
  <div
    dir="rtl"
    style={{
      fontFamily: FSTACK,
      fontSize: size,
      fontWeight: weight,
      color,
      lineHeight: 1.25,
      display: "flex",
      alignItems: "baseline",
      gap: 14,
      flexWrap: "wrap",
      justifyContent: "flex-start",
    }}
  >
    <span>{ar}</span>
    {en ? (
      <>
        <span style={{ color: C.line, fontWeight: 400 }}>|</span>
        <span
          dir="ltr"
          style={{
            fontSize: enSize ?? size * 0.78,
            color: enColor ?? C.greenSoft,
            fontWeight: 600,
            letterSpacing: -0.4,
          }}
        >
          {en}
        </span>
      </>
    ) : null}
  </div>
);

export const StageHeader: React.FC<{
  index: string;
  ar: string;
  en: string;
  desc: string;
}> = ({ index, ar, en, desc }) => {
  const f = useCurrentFrame();
  return (
    <div
      dir="rtl"
      style={{
        position: "absolute",
        top: 210,
        right: 90,
        left: 90,
        fontFamily: FSTACK,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          opacity: appear(f, 0),
          transform: `translateY(${rise(f, 0, 26)}px)`,
        }}
      >
        <div
          style={{
            fontFamily: FSTACK,
            fontSize: 30,
            fontWeight: 700,
            color: C.gold,
            letterSpacing: 2,
          }}
        >
          {index}
        </div>
        <div style={{ height: 2, flex: 1, background: C.line }} />
      </div>
      <div
        style={{
          marginTop: 16,
          opacity: appear(f, 6),
          transform: `translateY(${rise(f, 6, 30)}px)`,
        }}
      >
        <Bi ar={ar} en={en} size={52} />
      </div>
      <div
        style={{
          marginTop: 14,
          fontSize: 30,
          color: C.muted,
          fontWeight: 400,
          lineHeight: 1.5,
          opacity: appear(f, 14),
          transform: `translateY(${rise(f, 14, 24)}px)`,
        }}
      >
        {desc}
      </div>
    </div>
  );
};

export const Panel: React.FC<{
  children?: React.ReactNode;
  style?: React.CSSProperties;
  glow?: boolean;
}> = ({ children, style, glow }) => (
  <div
    style={{
      background: C.white,
      borderRadius: 28,
      border: `1px solid ${C.line}`,
      boxShadow: glow
        ? `0 30px 70px rgba(14,75,60,0.18), 0 0 0 6px rgba(195,154,62,0.12)`
        : "0 18px 44px rgba(28,38,34,0.10)",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Chip: React.FC<{
  ar: string;
  en?: string;
  tone?: "green" | "gold" | "muted" | "red";
  style?: React.CSSProperties;
  size?: number;
}> = ({ ar, en, tone = "muted", style, size = 26 }) => {
  const map = {
    green: { bg: C.greenLight, fg: C.green, bd: "#BCD8CC" },
    gold: { bg: "#F7EED6", fg: "#8A6A1E", bd: C.goldSoft },
    muted: { bg: "#F1EFE8", fg: C.muted, bd: C.line },
    red: { bg: "#F7E5E1", fg: C.red, bd: "#EBC7BF" },
  }[tone];
  return (
    <div
      dir="rtl"
      style={{
        fontFamily: FSTACK,
        fontSize: size,
        fontWeight: 600,
        color: map.fg,
        background: map.bg,
        border: `1px solid ${map.bd}`,
        borderRadius: 999,
        padding: "10px 22px",
        display: "inline-flex",
        gap: 10,
        alignItems: "baseline",
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <span>{ar}</span>
      {en ? (
        <span dir="ltr" style={{ fontSize: size * 0.8, opacity: 0.75 }}>
          {en}
        </span>
      ) : null}
    </div>
  );
};

export const MeterRow: React.FC<{
  ar: string;
  en: string;
  value: number;
  progress: number;
  valueLabel?: string;
  tone?: string;
}> = ({ ar, en, value, progress, valueLabel, tone = C.green }) => (
  <div dir="rtl" style={{ fontFamily: FSTACK, marginBottom: 22 }}>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 8,
      }}
    >
      <div style={{ fontSize: 27, fontWeight: 600, color: C.ink }}>
        {ar}{" "}
        <span dir="ltr" style={{ color: C.muted, fontSize: 22, fontWeight: 500 }}>
          | {en}
        </span>
      </div>
      {valueLabel ? (
        <div dir="rtl" style={{ fontSize: 23, fontWeight: 700, color: tone }}>
          {valueLabel}
        </div>
      ) : null}
    </div>
    <div
      style={{
        height: 12,
        background: "#EDEAE1",
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${Math.max(0, Math.min(1, progress)) * value * 100}%`,
          background: `linear-gradient(90deg, ${tone}, ${C.gold})`,
          borderRadius: 999,
        }}
      />
    </div>
  </div>
);

export const Ring: React.FC<{
  progress: number;
  label: string;
  size?: number;
  color?: string;
}> = ({ progress, label, size = 300, color = C.green }) => {
  const r = size / 2 - 18;
  const cir = 2 * Math.PI * r;
  return (
    <div style={{ position: "relative", width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#E7E3D8"
          strokeWidth={18}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={18}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={cir}
          strokeDashoffset={cir * (1 - progress)}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FSTACK,
          fontSize: size * 0.24,
          fontWeight: 700,
          color: C.ink,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const FlowLine: React.FC<{
  d: string;
  progress: number;
  color?: string;
  width?: number;
  dash?: boolean;
}> = ({ d, progress, color = C.greenSoft, width = 3, dash }) => (
  <path
    d={d}
    stroke={color}
    strokeWidth={width}
    fill="none"
    strokeLinecap="round"
    strokeDasharray={dash ? "10 12" : 2000}
    strokeDashoffset={dash ? 0 : 2000 * (1 - progress)}
    opacity={dash ? progress : 1}
  />
);

export const useSeg = (from: number, to: number) => {
  const f = useCurrentFrame();
  return seg(f, from, to);
};
