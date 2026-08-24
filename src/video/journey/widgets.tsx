import React from "react";
import { C } from "../theme";
import { FSTACK } from "../font";

export const Gauge: React.FC<{
  ar: string;
  en: string;
  v: number;
  progress: number;
  size?: number;
  note?: string;
  tone?: string;
  highlight?: number;
}> = ({ ar, en, v, progress, size = 200, note, tone, highlight = 0 }) => {
  const val = v * Math.max(0, Math.min(1, progress));
  const color = tone ?? (val > 0.65 ? C.green : val > 0.45 ? C.gold : "#B0793A");
  const r = size / 2 - 14;
  const cir = 2 * Math.PI * r;
  return (
    <div
      style={{
        width: size + 90,
        textAlign: "center",
        fontFamily: FSTACK,
        transform: `scale(${1 + highlight * 0.08})`,
      }}
    >
      <div style={{ position: "relative", width: size, height: size, margin: "0 auto" }}>
        <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={r} stroke="#E7E3D8" strokeWidth={14} fill="none" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={14}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={cir}
            strokeDashoffset={cir * (1 - val)}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: size * 0.26,
            fontWeight: 700,
            color: C.ink,
          }}
        >
          {Math.round(val * 100)}
        </div>
      </div>
      <div dir="rtl" style={{ marginTop: 8, fontSize: 24, fontWeight: 700, color: C.ink }}>
        {ar}
      </div>
      <div dir="ltr" style={{ fontSize: 19, color: C.muted }}>
        {en}
      </div>
      {note ? (
        <div dir="rtl" style={{ fontSize: 19, color: color, marginTop: 4, fontWeight: 600 }}>
          {note}
        </div>
      ) : null}
    </div>
  );
};

export const Alt: React.FC<{
  ar: string;
  en: string;
  fit: number;
  progress: number;
  ok: boolean;
  why?: string;
  verdict: number;
  width?: number;
}> = ({ ar, en, fit, progress, ok, why, verdict, width = 900 }) => {
  const val = fit * Math.max(0, Math.min(1, progress));
  const tone = ok ? C.green : C.red;
  return (
    <div
      dir="rtl"
      style={{
        width,
        background: C.white,
        border: `1px solid ${verdict > 0.3 && ok ? C.gold : C.line}`,
        borderRadius: 22,
        padding: "16px 22px",
        fontFamily: FSTACK,
        boxShadow:
          verdict > 0.3 && ok
            ? "0 22px 50px rgba(14,75,60,0.18)"
            : "0 10px 26px rgba(28,38,34,0.07)",
        opacity: verdict > 0.3 && !ok ? 0.55 : 1,
        transform: `scale(${1 + (ok ? verdict * 0.04 : -verdict * 0.03)})`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 999,
            background: verdict > 0.3 ? (ok ? C.greenLight : "#F7E5E1") : "#F1EFE8",
            color: verdict > 0.3 ? tone : C.muted,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            fontWeight: 700,
            opacity: verdict > 0.1 ? verdict : 0.35,
          }}
        >
          {verdict > 0.3 ? (ok ? "✓" : "✕") : "…"}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 26, fontWeight: 700, color: C.ink }}>{ar}</div>
          <div dir="ltr" style={{ fontSize: 19, color: C.muted }}>
            {en}
          </div>
        </div>
        <div style={{ fontSize: 26, fontWeight: 700, color: tone }}>
          {Math.round(val * 100)}%
        </div>
      </div>
      <div
        style={{
          marginTop: 12,
          height: 12,
          background: "#EFECE3",
          borderRadius: 999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${val * 100}%`,
            background: `linear-gradient(90deg, ${tone}, ${ok ? C.gold : "#D9A08F"})`,
          }}
        />
      </div>
      {why && verdict > 0.35 ? (
        <div
          style={{
            marginTop: 10,
            fontSize: 21,
            color: ok ? C.green : C.red,
            fontWeight: 600,
            opacity: Math.min(1, (verdict - 0.35) / 0.3),
          }}
        >
          {ok ? "سبب الاعتماد: " : "سبب الاستبعاد: "}
          <span style={{ color: C.muted, fontWeight: 500 }}>{why}</span>
        </div>
      ) : null}
    </div>
  );
};

export const EngineBox: React.FC<{ glow: number; label?: string }> = ({
  glow,
  label = "محرك القرار",
}) => (
  <div
    dir="rtl"
    style={{
      width: 420,
      padding: "26px 28px",
      borderRadius: 30,
      background: `linear-gradient(135deg, ${C.green}, ${C.greenSoft})`,
      color: C.white,
      textAlign: "center",
      fontFamily: FSTACK,
      boxShadow: `0 ${20 + glow * 22}px ${50 + glow * 40}px rgba(14,75,60,${0.2 + glow * 0.2}), 0 0 0 ${glow * 8}px rgba(195,154,62,0.16)`,
    }}
  >
    <div style={{ fontSize: 32, fontWeight: 700 }}>{label}</div>
    <div dir="ltr" style={{ fontSize: 22, color: C.goldSoft, marginTop: 4 }}>
      Decision Engine
    </div>
  </div>
);

export const Check: React.FC<{ ar: string; en: string; done: number }> = ({
  ar,
  en,
  done,
}) => (
  <div
    dir="rtl"
    style={{
      display: "flex",
      alignItems: "center",
      gap: 16,
      background: C.white,
      border: `1px solid ${done > 0.5 ? "#BCD8CC" : C.line}`,
      borderRadius: 18,
      padding: "14px 22px",
      width: 760,
      fontFamily: FSTACK,
      boxShadow: "0 10px 24px rgba(28,38,34,0.06)",
    }}
  >
    <div
      style={{
        width: 40,
        height: 40,
        borderRadius: 999,
        background: done > 0.5 ? C.greenLight : "#F1EFE8",
        color: C.green,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 24,
        fontWeight: 700,
        transform: `scale(${0.9 + done * 0.1})`,
      }}
    >
      {done > 0.5 ? "✓" : ""}
    </div>
    <div style={{ fontSize: 26, fontWeight: 700, color: C.ink }}>{ar}</div>
    <div dir="ltr" style={{ fontSize: 20, color: C.muted }}>
      | {en}
    </div>
  </div>
);

export const PackItem: React.FC<{
  ar: string;
  en: string;
  v: string;
  o: number;
}> = ({ ar, en, v, o }) => (
  <div
    dir="rtl"
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      gap: 18,
      padding: "12px 4px",
      borderBottom: `1px solid #F0EDE4`,
      opacity: o,
      transform: `translateY(${(1 - o) * 18}px)`,
      fontFamily: FSTACK,
    }}
  >
    <div style={{ fontSize: 24, fontWeight: 700, color: C.ink }}>
      {ar}{" "}
      <span dir="ltr" style={{ fontSize: 19, color: C.muted, fontWeight: 500 }}>
        | {en}
      </span>
    </div>
    <div style={{ fontSize: 23, fontWeight: 700, color: C.green, textAlign: "left" }}>
      {v}
    </div>
  </div>
);

export const Phone: React.FC<{
  send: number;
  arrive: number;
  tap: number;
  text: string;
  time: string;
}> = ({ send, arrive, tap, text, time }) => (
  <div
    style={{
      width: 330,
      height: 620,
      borderRadius: 46,
      background: C.white,
      border: `10px solid #232C28`,
      boxShadow: `0 30px 70px rgba(28,38,34,${0.16 + tap * 0.1})`,
      position: "relative",
      overflow: "hidden",
      fontFamily: FSTACK,
    }}
  >
    <div
      style={{
        height: 74,
        background: "#F3F1EA",
        borderBottom: `1px solid ${C.line}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 20,
        color: C.muted,
      }}
    >
      {time}
    </div>
    <div
      dir="rtl"
      style={{
        margin: 18,
        background: C.greenLight,
        border: `1px solid #BCD8CC`,
        borderRadius: 20,
        padding: "16px 18px",
        fontSize: 21,
        color: C.green,
        fontWeight: 600,
        lineHeight: 1.5,
        opacity: arrive,
        transform: `translateY(${(1 - arrive) * -24}px)`,
      }}
    >
      {text}
      <div
        style={{
          marginTop: 14,
          background: `linear-gradient(90deg, ${C.green}, ${C.greenSoft})`,
          color: C.white,
          borderRadius: 14,
          padding: "10px 0",
          textAlign: "center",
          fontSize: 20,
          transform: `scale(${1 + tap * 0.06})`,
          boxShadow: tap > 0.2 ? `0 0 0 ${tap * 10}px rgba(195,154,62,0.18)` : "none",
        }}
      >
        سداد الآن | Pay Now
      </div>
    </div>
    <div
      style={{
        position: "absolute",
        bottom: 26,
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: 19,
        color: C.muted,
        opacity: send,
      }}
    >
      SMS
    </div>
  </div>
);
