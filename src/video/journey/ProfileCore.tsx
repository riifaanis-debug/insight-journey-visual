import React from "react";
import { C } from "../theme";
import { FSTACK } from "../font";

export type Lane = { ar: string; en: string; color: string };

export const LANES: Lane[] = [
  { ar: "مالية", en: "Financial", color: "#0E4B3C" },
  { ar: "سلوكية", en: "Behavioral", color: "#C39A3E" },
  { ar: "تفاعلية", en: "Interaction", color: "#146B54" },
];

export type ProfileState = {
  /** 0..1 per source lane */
  lanes: [number, number, number];
  /** lanes merge into a single unified bar */
  unify: number;
  /** insight layers appear */
  insight: number;
  rows?: { ar: string; en: string; v: string }[];
  rowsReveal?: number;
  persona?: { ar: string; en: string } | null;
  personaIn?: number;
  score?: number | null;
  scoreIn?: number;
  glow?: number;
  width?: number;
  id?: string;
};

const INSIGHTS = [
  { ar: "الحالة المالية", en: "Financial State" },
  { ar: "السلوك", en: "Behavior" },
  { ar: "الظروف والسياق", en: "Context" },
];

/**
 * العنصر المستمر: ملف العميل. لا يختفي ولا يُعاد إنشاؤه —
 * يتحول فقط بين المراحل حاملاً مخرجاتها.
 */
export const ProfileCore: React.FC<ProfileState> = ({
  lanes,
  unify,
  insight,
  rows,
  rowsReveal = 1,
  persona,
  personaIn = 1,
  score,
  scoreIn = 1,
  glow = 0,
  width = 620,
  id = "CUST-48219",
}) => {
  return (
    <div
      dir="rtl"
      style={{
        width,
        background: C.white,
        borderRadius: 30,
        border: `1px solid ${C.line}`,
        boxShadow: `0 20px 50px rgba(28,38,34,0.10), 0 0 0 ${6 * glow}px rgba(195,154,62,${0.18 * glow}), 0 ${30 * glow}px ${80 * glow}px rgba(14,75,60,${0.2 * glow})`,
        overflow: "hidden",
        fontFamily: FSTACK,
      }}
    >
      <div
        style={{
          background: `linear-gradient(90deg, ${C.green}, ${C.greenSoft})`,
          padding: "20px 26px",
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: 999,
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.35)",
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ color: C.white, fontSize: 28, fontWeight: 700 }}>
            ملف العميل
          </div>
          <div dir="ltr" style={{ color: C.goldSoft, fontSize: 21, fontWeight: 500 }}>
            Customer Profile
          </div>
        </div>
        <div
          dir="ltr"
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: 19,
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          {id}
        </div>
      </div>

      <div style={{ padding: "22px 26px 26px" }}>
        {/* مسارات المصادر ← شريط موحّد */}
        <div style={{ position: "relative", height: 3 * 34 + 8 }}>
          {LANES.map((l, i) => {
            const shift = (1 - unify) * 0 + unify * (34 * (1 - i));
            const merged = unify;
            return (
              <div
                key={l.en}
                style={{
                  position: "absolute",
                  top: i * 34,
                  left: 0,
                  right: 0,
                  transform: `translateY(${shift}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 96,
                    fontSize: 20,
                    fontWeight: 600,
                    color: C.muted,
                    opacity: (1 - merged) * 0.9,
                    whiteSpace: "nowrap",
                  }}
                >
                  {l.ar}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: 14 + merged * 4,
                    borderRadius: 999,
                    background: "#EFECE3",
                    overflow: "hidden",
                    marginRight: -96 * merged,
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${Math.max(0, Math.min(1, lanes[i] ?? 0)) * 100}%`,
                      background:
                        merged > 0.02
                          ? `linear-gradient(90deg, ${C.green}, ${C.gold})`
                          : l.color,
                      opacity: i > 0 ? 1 - merged * 0.85 : 1,
                      transition: "none",
                    }}
                  />
                </div>
              </div>
            );
          })}
          {unify > 0.6 ? (
            <div
              style={{
                position: "absolute",
                top: 34,
                left: 0,
                right: 0,
                textAlign: "center",
                fontSize: 19,
                fontWeight: 700,
                color: C.green,
                opacity: (unify - 0.6) / 0.4,
                transform: "translateY(30px)",
              }}
            >
              ملف موحّد <span dir="ltr">| Unified Profile</span>
            </div>
          ) : null}
        </div>

        {/* طبقات الفهم */}
        {insight > 0.01 ? (
          <div
            style={{
              display: "flex",
              gap: 10,
              marginTop: 26 + (1 - insight) * 10,
              opacity: insight,
            }}
          >
            {INSIGHTS.map((s, i) => (
              <div
                key={s.en}
                style={{
                  flex: 1,
                  background: C.greenLight,
                  border: `1px solid #BCD8CC`,
                  borderRadius: 16,
                  padding: "12px 10px",
                  textAlign: "center",
                  opacity: Math.max(0, Math.min(1, insight * 3 - i)),
                }}
              >
                <div style={{ fontSize: 20, fontWeight: 700, color: C.green }}>
                  {s.ar}
                </div>
                <div dir="ltr" style={{ fontSize: 16, color: C.muted }}>
                  {s.en}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* حقائق الحالة */}
        {rows?.length ? (
          <div style={{ marginTop: 20 }}>
            {rows.map((r, i) => {
              const o = Math.max(0, Math.min(1, rowsReveal * rows.length - i));
              return (
                <div
                  key={r.en}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    padding: "9px 0",
                    borderBottom:
                      i < rows.length - 1 ? `1px solid #F0EDE4` : "none",
                    opacity: o,
                    transform: `translateX(${(1 - o) * -20}px)`,
                  }}
                >
                  <div style={{ fontSize: 22, color: C.ink, fontWeight: 600 }}>
                    {r.ar}{" "}
                    <span dir="ltr" style={{ color: C.muted, fontSize: 18 }}>
                      | {r.en}
                    </span>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: C.green }}>
                    {r.v}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {/* الشخصية والدرجة */}
        {persona && personaIn > 0.01 ? (
          <div
            style={{
              marginTop: 20,
              background: "#F7EED6",
              border: `1px solid ${C.goldSoft}`,
              borderRadius: 18,
              padding: "14px 18px",
              opacity: personaIn,
              transform: `translateY(${(1 - personaIn) * 16}px)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontSize: 23, fontWeight: 700, color: "#8A6A1E" }}>
                {persona.ar}
              </div>
              <div dir="ltr" style={{ fontSize: 18, color: C.muted }}>
                {persona.en}
              </div>
            </div>
            {score != null && scoreIn > 0.01 ? (
              <div
                style={{
                  textAlign: "center",
                  opacity: scoreIn,
                  background: C.white,
                  borderRadius: 14,
                  padding: "8px 16px",
                  border: `1px solid ${C.line}`,
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 700, color: C.green }}>
                  {Math.round(score)}
                </div>
                <div dir="ltr" style={{ fontSize: 14, color: C.muted }}>
                  Persona Score
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};
