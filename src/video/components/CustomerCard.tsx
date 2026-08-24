import React from "react";
import { C } from "../theme";
import { FSTACK } from "../font";

export const CustomerCard: React.FC<{
  width?: number;
  fill?: number;
  glow?: boolean;
  rows?: { ar: string; en: string; v: string }[];
  title?: { ar: string; en: string };
}> = ({
  width = 480,
  fill = 1,
  glow,
  rows,
  title = { ar: "ملف العميل", en: "Customer Profile" },
}) => (
  <div
    dir="rtl"
    style={{
      width,
      background: C.white,
      borderRadius: 26,
      border: `1px solid ${C.line}`,
      boxShadow: glow
        ? `0 26px 60px rgba(14,75,60,0.20), 0 0 0 5px rgba(195,154,62,0.16)`
        : "0 16px 40px rgba(28,38,34,0.10)",
      overflow: "hidden",
      fontFamily: FSTACK,
    }}
  >
    <div
      style={{
        background: `linear-gradient(90deg, ${C.green}, ${C.greenSoft})`,
        padding: "18px 24px",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 999,
          background: "rgba(255,255,255,0.18)",
          border: `1px solid rgba(255,255,255,0.35)`,
        }}
      />
      <div>
        <div style={{ color: C.white, fontSize: 26, fontWeight: 700 }}>
          {title.ar}
        </div>
        <div
          dir="ltr"
          style={{ color: C.goldSoft, fontSize: 20, fontWeight: 500 }}
        >
          {title.en}
        </div>
      </div>
    </div>
    <div style={{ padding: "20px 24px 24px" }}>
      {(rows ?? []).map((r, i) => (
        <div
          key={r.en}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            padding: "10px 0",
            borderBottom: i < (rows ?? []).length - 1 ? `1px solid #F0EDE4` : "none",
            opacity: fill,
          }}
        >
          <div style={{ fontSize: 24, color: C.ink, fontWeight: 600 }}>
            {r.ar}{" "}
            <span dir="ltr" style={{ color: C.muted, fontSize: 19, fontWeight: 500 }}>
              | {r.en}
            </span>
          </div>
          <div style={{ fontSize: 23, fontWeight: 700, color: C.green }}>{r.v}</div>
        </div>
      ))}
      {!rows
        ? [0, 1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                height: 16,
                borderRadius: 8,
                background: "#EFECE3",
                marginBottom: 14,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${Math.max(0, Math.min(1, fill * 1.4 - i * 0.15)) * (90 - i * 12)}%`,
                  background: `linear-gradient(90deg, ${C.greenSoft}, ${C.goldSoft})`,
                }}
              />
            </div>
          ))
        : null}
    </div>
  </div>
);
