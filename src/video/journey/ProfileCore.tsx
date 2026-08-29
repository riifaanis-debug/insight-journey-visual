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
  rows?: { ar: string; en: string; v: string }[] | undefined;
  rowsReveal?: number;
  /** بيانات تعريفية خام تظهر في المراحل الأولى */
  meta?: { ar: string; en: string; v: string }[] | undefined;
  metaReveal?: number;
  /** نسبة اكتمال البيانات 0..1 */
  completeness?: number;
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
export const ProfileCore: React.FC<ProfileState & { mode?: "full" | "compact" | "mini" }> = ({
  lanes,
  unify,
  insight,
  rows,
  rowsReveal = 1,
  meta,
  metaReveal = 1,
  completeness = 0,
  persona,
  personaIn = 1,
  score,
  scoreIn = 1,
  glow = 0,
  width = 880,
  id = "CUST-48219",
  mode = "full",
}) => {
  const k = width / 620;
  const sz = (n: number) => Math.round(n * k);
  const allRows = rows ?? [];
  const shownRows =
    mode === "mini" ? [] : mode === "compact" ? allRows.slice(0, 3) : allRows;
  const showInsight = mode !== "mini";
  // البيانات الخام تملأ البطاقة في المراحل الأولى، وتتراجع حين تظهر مخرجات التحليل
  const allMeta = meta ?? [];
  const shownMeta =
    metaReveal <= 0.01
      ? []
      : mode === "mini"
        ? allMeta
        : mode === "compact"
          ? allMeta.slice(0, 3)
          : [];

  return (
    <div
      dir="rtl"
      style={{
        width,
        background: C.white,
        borderRadius: sz(30),
        border: `1px solid ${C.line}`,
        boxShadow: `0 20px 50px rgba(28,38,34,0.10), 0 0 0 ${6 * glow}px rgba(195,154,62,${0.18 * glow}), 0 ${30 * glow}px ${80 * glow}px rgba(14,75,60,${0.2 * glow})`,
        overflow: "hidden",
        fontFamily: FSTACK,
      }}
    >
      <div
        style={{
          background: `linear-gradient(90deg, ${C.green}, ${C.greenSoft})`,
          padding: `${sz(20)}px ${sz(26)}px`,
          display: "flex",
          alignItems: "center",
          gap: sz(16),
        }}
      >
        <div
          style={{
            width: sz(46),
            height: sz(46),
            borderRadius: 999,
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.35)",
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ color: C.white, fontSize: sz(28), fontWeight: 700 }}>
            ملف العميل
          </div>
          <div dir="ltr" style={{ color: C.goldSoft, fontSize: sz(21), fontWeight: 500 }}>
            Customer Profile
          </div>
        </div>
        <div
          dir="ltr"
          style={{
            color: "rgba(255,255,255,0.75)",
            fontSize: sz(19),
            fontWeight: 600,
            letterSpacing: 0.5,
          }}
        >
          {id}
        </div>
      </div>

      <div style={{ padding: `${sz(22)}px ${sz(26)}px ${sz(26)}px` }}>
        {/* اكتمال البيانات */}
        {completeness > 0.01 ? (
          <div style={{ marginBottom: sz(18) }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                marginBottom: sz(8),
              }}
            >
              <span style={{ fontSize: sz(20), fontWeight: 600, color: C.muted }}>
                اكتمال البيانات
              </span>
              <span dir="ltr" style={{ fontSize: sz(24), fontWeight: 700, color: C.green }}>
                {Math.round(completeness * 100)}%
              </span>
            </div>
            <div
              style={{
                height: sz(12),
                borderRadius: 999,
                background: "#EFECE3",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${completeness * 100}%`,
                  background: `linear-gradient(90deg, ${C.green}, ${C.gold})`,
                }}
              />
            </div>
          </div>
        ) : null}

        {/* بيانات تعريفية خام */}
        {shownMeta.length ? (
          <div style={{ marginBottom: sz(20) }}>
            {shownMeta.map((r, i) => {
              const o = Math.max(0, Math.min(1, metaReveal * shownMeta.length - i));
              return (
                <div
                  key={r.en}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    padding: `${sz(9)}px 0`,
                    borderBottom:
                      i < shownMeta.length - 1 ? `1px solid #F0EDE4` : "none",
                    opacity: o,
                    transform: `translateX(${(1 - o) * -18}px)`,
                  }}
                >
                  <div style={{ fontSize: sz(21), color: C.muted, fontWeight: 600 }}>
                    {r.ar}{" "}
                    <span dir="ltr" style={{ fontSize: sz(17), opacity: 0.8 }}>
                      | {r.en}
                    </span>
                  </div>
                  <div style={{ fontSize: sz(22), fontWeight: 700, color: C.ink }}>
                    {r.v}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}

        {/* مسارات المصادر ← شريط موحّد */}
        <div style={{ position: "relative", height: sz(3 * 34 + 8) }}>
          {LANES.map((l, i) => {
            const shift = (1 - unify) * 0 + unify * (sz(34) * (1 - i));
            const merged = unify;
            return (
              <div
                key={l.en}
                style={{
                  position: "absolute",
                  top: i * sz(34),
                  left: 0,
                  right: 0,
                  transform: `translateY(${shift}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: sz(14),
                }}
              >
                <div
                  style={{
                    width: sz(96),
                    fontSize: sz(20),
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
                    height: sz(14) + merged * sz(4),
                    borderRadius: 999,
                    background: "#EFECE3",
                    overflow: "hidden",
                    marginRight: -sz(96) * merged,
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
                top: sz(34),
                left: 0,
                right: 0,
                textAlign: "center",
                fontSize: sz(19),
                fontWeight: 700,
                color: C.green,
                opacity: (unify - 0.6) / 0.4,
                transform: `translateY(${sz(30)}px)`,
              }}
            >
              ملف موحّد <span dir="ltr">| Unified Profile</span>
            </div>
          ) : null}
        </div>

        {/* طبقات الفهم */}
        {showInsight && insight > 0.01 ? (
          <div
            style={{
              display: "flex",
              gap: sz(10),
              marginTop: sz(26) + (1 - insight) * 10,
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
                  borderRadius: sz(16),
                  padding: `${sz(12)}px ${sz(10)}px`,
                  textAlign: "center",
                  opacity: Math.max(0, Math.min(1, insight * 3 - i)),
                }}
              >
                <div style={{ fontSize: sz(20), fontWeight: 700, color: C.green }}>
                  {s.ar}
                </div>
                <div dir="ltr" style={{ fontSize: sz(16), color: C.muted }}>
                  {s.en}
                </div>
              </div>
            ))}
          </div>
        ) : null}

        {/* حقائق الحالة */}
        {shownRows.length ? (
          <div style={{ marginTop: sz(20) }}>
            {shownRows.map((r, i) => {
              const o = Math.max(0, Math.min(1, rowsReveal * shownRows.length - i));
              return (
                <div
                  key={r.en}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    padding: `${sz(9)}px 0`,
                    borderBottom:
                      i < shownRows.length - 1 ? `1px solid #F0EDE4` : "none",
                    opacity: o,
                    transform: `translateX(${(1 - o) * -20}px)`,
                  }}
                >
                  <div style={{ fontSize: sz(22), color: C.ink, fontWeight: 600 }}>
                    {r.ar}{" "}
                    <span dir="ltr" style={{ color: C.muted, fontSize: sz(18) }}>
                      | {r.en}
                    </span>
                  </div>
                  <div style={{ fontSize: sz(22), fontWeight: 700, color: C.green }}>
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
              marginTop: sz(20),
              background: "#F7EED6",
              border: `1px solid ${C.goldSoft}`,
              borderRadius: sz(18),
              padding: `${sz(14)}px ${sz(18)}px`,
              opacity: personaIn,
              transform: `translateY(${(1 - personaIn) * 16}px)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <div style={{ fontSize: sz(23), fontWeight: 700, color: "#8A6A1E" }}>
                {persona.ar}
              </div>
              <div dir="ltr" style={{ fontSize: sz(18), color: C.muted }}>
                {persona.en}
              </div>
            </div>
            {score != null && scoreIn > 0.01 ? (
              <div
                style={{
                  textAlign: "center",
                  opacity: scoreIn,
                  background: C.white,
                  borderRadius: sz(14),
                  padding: `${sz(8)}px ${sz(16)}px`,
                  border: `1px solid ${C.line}`,
                }}
              >
                <div style={{ fontSize: sz(28), fontWeight: 700, color: C.green }}>
                  {Math.round(score)}
                </div>
                <div dir="ltr" style={{ fontSize: sz(14), color: C.muted }}>
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
