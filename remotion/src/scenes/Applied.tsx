import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { C, appear, seg, pop, breathe } from "../theme";
import { FSTACK } from "../font";
import { Bi, Chip, MeterRow, Panel, Ring } from "../components/Ui";
import { CustomerCard } from "../components/CustomerCard";

const Tag: React.FC<{ ar: string; en: string }> = ({ ar, en }) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: 190,
        left: 80,
        right: 80,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        gap: 14,
        opacity: appear(f, 0),
      }}
    >
      <Chip ar="حالة تطبيقية" en="Applied Case" tone="gold" size={22} />
      <Bi ar={ar} en={en} size={44} />
    </div>
  );
};

const Body: React.FC<{ children: React.ReactNode; gap?: number }> = ({
  children,
  gap = 26,
}) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: 400,
        bottom: 150,
        left: 70,
        right: 70,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap,
        opacity: appear(f, 8, 24),
        transform: `translateY(${breathe(f, 4, 0.016)}px)`,
      }}
    >
      {children}
    </div>
  );
};

/* A1 — intake + unification of the case */
export const A1: React.FC = () => {
  const f = useCurrentFrame();
  const fill = seg(f, 22, 80);
  return (
    <AbsoluteFill>
      <Tag ar="دخول ملف العميل" en="Customer Intake" />
      <Body>
        <div style={{ display: "flex", gap: 14 }}>
          <Chip ar="مالية" en="Financial" tone="green" size={22} />
          <Chip ar="سلوكية" en="Behavioral" tone="gold" size={22} />
          <Chip ar="تفاعلية" en="Interaction" tone="green" size={22} />
        </div>
        <svg width={620} height={150}>
          {[130, 310, 490].map((x, i) => {
            const p = seg(f, 10 + i * 6, 55 + i * 6);
            return (
              <g key={x}>
                <path
                  d={`M ${x} 0 C ${x} 80, 310 70, 310 150`}
                  stroke={C.line}
                  strokeWidth={3}
                  fill="none"
                />
                <path
                  d={`M ${x} 0 C ${x} 80, 310 70, 310 150`}
                  stroke={C.greenSoft}
                  strokeWidth={4}
                  fill="none"
                  strokeDasharray={400}
                  strokeDashoffset={400 * (1 - p)}
                />
              </g>
            );
          })}
        </svg>
        <CustomerCard
          width={620}
          fill={fill}
          glow={fill > 0.9}
          rows={[
            { ar: "توحيد البيانات", en: "Data Unification", v: fill > 0.4 ? "مكتمل" : "…" },
            { ar: "بناء فهم العميل", en: "Understanding", v: fill > 0.7 ? "جاهز" : "…" },
          ]}
        />
      </Body>
    </AbsoluteFill>
  );
};

const CASE_DIMS = [
  { ar: "القدرة على السداد", en: "Ability", v: 0.9, l: "مرتفعة | High", tone: C.green },
  { ar: "قابلية الوصول", en: "Reachability", v: 0.25, l: "منخفضة | Low", tone: C.red },
  { ar: "التفاعل", en: "Engagement", v: 0.28, l: "منخفض | Low", tone: C.red },
  { ar: "الالتزام", en: "Commitment", v: 0.55, l: "متوسط | Medium", tone: C.gold },
  {
    ar: "سلوك القنوات",
    en: "Channel Behavior",
    v: 0.75,
    l: "تفاعل رقمي أفضل | Better Digital",
    tone: C.green,
  },
  { ar: "العوائق والسياق", en: "Barriers & Context", v: 0.4, l: "محدودة | Limited", tone: C.gold },
  { ar: "التعقيد", en: "Complexity", v: 0.3, l: "منخفض | Low", tone: C.green },
];

/* A2 — dimensions of the case */
export const A2: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Tag ar="أبعاد العميل" en="Customer Dimensions" />
      <Body gap={0}>
        <Panel style={{ width: "100%", padding: "32px 34px" }}>
          {CASE_DIMS.map((d, i) => (
            <div key={d.en} style={{ opacity: appear(f, 6 + i * 7, 16) }}>
              <MeterRow
                ar={d.ar}
                en={d.en}
                value={d.v}
                progress={seg(f, 10 + i * 7, 52 + i * 7)}
                valueLabel={d.l}
                tone={d.tone}
              />
            </div>
          ))}
        </Panel>
      </Body>
    </AbsoluteFill>
  );
};

/* A3 — persona derived */
export const A3: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(f, fps, 45, 18);
  return (
    <AbsoluteFill>
      <Tag ar="تحديد الشخصية" en="Persona Identification" />
      <Body gap={22}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          {["Ability: High", "Reachability: Low", "Engagement: Low"].map((t, i) => (
            <div
              key={t}
              dir="ltr"
              style={{
                fontFamily: FSTACK,
                fontSize: 22,
                color: C.muted,
                background: C.white,
                border: `1px solid ${C.line}`,
                borderRadius: 999,
                padding: "8px 18px",
                opacity: appear(f, 4 + i * 6),
              }}
            >
              {t}
            </div>
          ))}
        </div>
        <svg width={620} height={140}>
          {[140, 310, 480].map((x, i) => {
            const p = seg(f, 16 + i * 6, 46 + i * 6);
            return (
              <path
                key={x}
                d={`M ${x} 0 C ${x} 70, 310 60, 310 140`}
                stroke={C.gold}
                strokeWidth={4}
                fill="none"
                strokeDasharray={300}
                strokeDashoffset={300 * (1 - p)}
              />
            );
          })}
        </svg>
        <div
          dir="rtl"
          style={{
            width: 660,
            padding: "34px 30px",
            borderRadius: 26,
            background: C.green,
            color: C.white,
            textAlign: "center",
            fontFamily: FSTACK,
            transform: `scale(${0.85 + s * 0.15})`,
            boxShadow: "0 30px 70px rgba(14,75,60,0.28)",
          }}
        >
          <div style={{ fontSize: 26, color: C.goldSoft }}>
            الشخصية <span dir="ltr">| Persona</span>
          </div>
          <div style={{ fontSize: 42, fontWeight: 700, marginTop: 10 }}>
            قادر على السداد لكنه لا يستجيب
          </div>
        </div>
      </Body>
    </AbsoluteFill>
  );
};

/* A4 — score + readiness */
export const A4: React.FC = () => {
  const f = useCurrentFrame();
  const p = seg(f, 10, 65);
  return (
    <AbsoluteFill>
      <Tag ar="درجة الشخصية والجاهزية" en="Score & Readiness" />
      <Body gap={34}>
        <Ring progress={p * 0.78} label={`${Math.round(p * 78)}`} size={330} />
        <Bi ar="درجة الشخصية" en="Persona Score" size={34} />
        <div
          dir="rtl"
          style={{
            marginTop: 10,
            display: "flex",
            gap: 14,
            opacity: appear(f, 55),
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Chip ar="الجاهزية للقرار" en="Decision Readiness" tone="green" size={24} />
          <Chip ar="مكتملة" en="Ready" tone="gold" size={24} />
        </div>
      </Body>
    </AbsoluteFill>
  );
};

/* A5 — decision engine of the case */
export const A5: React.FC = () => {
  const f = useCurrentFrame();
  const opts = [
    { ar: "تكرار الاتصال بنفس الأسلوب", en: "Repeat Same Call", ok: false, t: 24 },
    { ar: "تقديم معالجة مالية غير ضرورية", en: "Unneeded Treatment", ok: false, t: 44 },
    { ar: "تغيير القناة والتوقيت وأسلوب التواصل", en: "Channel, Timing & Approach Shift", ok: true, t: 64 },
  ];
  return (
    <AbsoluteFill>
      <Tag ar="محرك القرار" en="Decision Engine" />
      <Body gap={22}>
        {opts.map((o) => {
          const st = seg(f, o.t, o.t + 20);
          const dim = !o.ok ? st : 0;
          return (
            <div
              key={o.en}
              dir="rtl"
              style={{
                width: "100%",
                padding: "24px 28px",
                borderRadius: 20,
                background: o.ok && st > 0.5 ? C.greenLight : C.white,
                border: `1px solid ${o.ok && st > 0.5 ? "#9EC9B8" : C.line}`,
                fontFamily: FSTACK,
                display: "flex",
                gap: 18,
                alignItems: "center",
                opacity: 1 - dim * 0.55,
                filter: dim > 0.5 ? "grayscale(0.8)" : "none",
                boxShadow: o.ok && st > 0.5 ? "0 22px 50px rgba(14,75,60,0.18)" : "none",
              }}
            >
              <span
                style={{
                  fontSize: 34,
                  color: o.ok ? C.green : C.red,
                  opacity: st > 0.3 ? 1 : 0.2,
                }}
              >
                {o.ok ? "✓" : "✕"}
              </span>
              <span style={{ fontSize: 28, fontWeight: 600, color: C.ink, lineHeight: 1.4 }}>
                {o.ar}
                <div dir="ltr" style={{ fontSize: 21, color: C.muted, fontWeight: 500 }}>
                  {o.en}
                </div>
              </span>
            </div>
          );
        })}
      </Body>
    </AbsoluteFill>
  );
};

/* A6 — NBCA + execution */
export const A6: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(f, fps, 8, 18);
  const send = seg(f, 55, 100);
  return (
    <AbsoluteFill>
      <Tag ar="أفضل إجراء تحصيلي تالٍ" en="Next Best Collection Action (NBCA)" />
      <Body gap={26}>
        <div
          dir="rtl"
          style={{
            width: "100%",
            padding: "28px 30px",
            borderRadius: 24,
            background: C.white,
            border: `2px solid ${C.gold}`,
            fontFamily: FSTACK,
            transform: `scale(${0.9 + s * 0.1})`,
            boxShadow: "0 26px 60px rgba(195,154,62,0.22)",
          }}
        >
          {[
            { ar: "القناة", en: "Channel", v: "قناة رقمية | Digital" },
            { ar: "التوقيت", en: "Timing", v: "توقيت مساء | Evening" },
            { ar: "أسلوب التواصل", en: "Communication Approach", v: "أسلوب مباشر | Direct" },
            { ar: "الأولوية", en: "Priority", v: "مرتفعة | High" },
            { ar: "نوع المعالجة", en: "Treatment", v: "بدون تنازل | No Concession" },
          ].map((r, i) => (
            <div
              key={r.en}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
                padding: "12px 0",
                borderBottom: i < 4 ? "1px solid #F0EDE4" : "none",
                opacity: appear(f, 12 + i * 7, 14),
              }}
            >
              <span style={{ fontSize: 25, fontWeight: 600, color: C.ink }}>
                {r.ar}{" "}
                <span dir="ltr" style={{ fontSize: 20, color: C.muted }}>
                  | {r.en}
                </span>
              </span>
              <span style={{ fontSize: 23, fontWeight: 700, color: C.green }}>{r.v}</span>
            </div>
          ))}
        </div>
        <div style={{ opacity: appear(f, 52) }}>
          <Bi ar="التنفيذ" en="Execution" size={34} />
        </div>
        <div
          style={{
            width: 480,
            height: 10,
            background: "#EAE6DC",
            borderRadius: 99,
            overflow: "hidden",
            opacity: appear(f, 52),
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${send * 100}%`,
              background: `linear-gradient(90deg, ${C.green}, ${C.gold})`,
            }}
          />
        </div>
      </Body>
    </AbsoluteFill>
  );
};

/* A7 — outcome */
export const A7: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Tag ar="النتيجة" en="Outcome" />
      <Body gap={24}>
        <div style={{ opacity: appear(f, 6) }}>
          <Chip ar="استجابة عبر القناة الرقمية" en="Digital Response" tone="green" size={28} />
        </div>
        <div style={{ opacity: appear(f, 22) }}>
          <Chip ar="وعد بالسداد" en="Promise to Pay" tone="gold" size={28} />
        </div>
        <Panel style={{ width: "100%", padding: "26px 30px", opacity: appear(f, 40) }}>
          <MeterRow ar="التفاعل" en="Engagement" value={0.66} progress={seg(f, 42, 80)} valueLabel="تحسّن | Improved" />
          <MeterRow
            ar="قابلية الوصول"
            en="Reachability"
            value={0.6}
            progress={seg(f, 50, 88)}
            valueLabel="تحسّنت | Improved"
          />
        </Panel>
      </Body>
    </AbsoluteFill>
  );
};

/* A8 — learning loop updates persona */
export const A8: React.FC = () => {
  const f = useCurrentFrame();
  const back = seg(f, 6, 55);
  return (
    <AbsoluteFill>
      <Tag ar="التعلم والتحديث" en="Learning & Update" />
      <Body gap={16}>
        <svg width={640} height={140}>
          <path d="M 560 120 C 560 10, 80 10, 80 120" stroke={C.line} strokeWidth={4} fill="none" />
          <path
            d="M 560 120 C 560 10, 80 10, 80 120"
            stroke={C.gold}
            strokeWidth={5}
            fill="none"
            strokeDasharray={800}
            strokeDashoffset={800 * (1 - back)}
          />
          <polygon points="80,128 70,102 90,102" fill={C.gold} opacity={back > 0.9 ? 1 : 0} />
        </svg>
        <CustomerCard
          width={640}
          glow={back > 0.9}
          rows={[
            { ar: "بيانات العميل", en: "Customer Data", v: back > 0.3 ? "محدّثة" : "—" },
            { ar: "المؤشرات", en: "Signals", v: back > 0.45 ? "محدّثة" : "—" },
            { ar: "الشخصية", en: "Persona", v: back > 0.6 ? "قابلة للتغير" : "—" },
            { ar: "درجة الشخصية", en: "Persona Score", v: back > 0.75 ? "84" : "78" },
            { ar: "الأولوية", en: "Priority", v: back > 0.85 ? "متوسطة" : "مرتفعة" },
            { ar: "الإجراء التالي", en: "NBCA", v: back > 0.95 ? "محدّث" : "—" },
          ]}
        />
        <div
          dir="rtl"
          style={{
            fontFamily: FSTACK,
            fontSize: 26,
            color: C.muted,
            textAlign: "center",
            opacity: appear(f, 70),
            lineHeight: 1.5,
          }}
        >
          الشخصية ليست تصنيفًا ثابتًا
          <span dir="ltr" style={{ color: C.green }}> | Persona Is Not Static</span>
        </div>
      </Body>
    </AbsoluteFill>
  );
};
