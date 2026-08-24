import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Stage, Center } from "./Stage";
import { CustomerCard } from "../components/CustomerCard";
import { Bi, Chip, MeterRow, Ring, Panel } from "../components/Ui";
import { C, seg, appear, pop } from "../theme";
import { FSTACK } from "../font";

const SRC = [
  { ar: "بيانات مالية", en: "Financial" },
  { ar: "بيانات سلوكية", en: "Behavioral" },
  { ar: "بيانات تفاعلية", en: "Interaction" },
];

/* 01 — Data Intake */
export const S01: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Stage
      index="01"
      ar="استلام البيانات"
      en="Data Intake"
      desc="تجميع البيانات المالية والسلوكية والتفاعلية المرتبطة بالعميل."
    >
      <svg width="100%" height="100%" viewBox="0 0 940 1050" style={{ position: "absolute" }}>
        {[0, 1, 2].map((i) => {
          const x = 150 + i * 320;
          const p = seg(f, 18 + i * 8, 70 + i * 8);
          return (
            <g key={i}>
              <path
                d={`M ${x} 150 C ${x} 400, 470 420, 470 640`}
                stroke={C.line}
                strokeWidth={3}
                fill="none"
              />
              <path
                d={`M ${x} 150 C ${x} 400, 470 420, 470 640`}
                stroke={C.greenSoft}
                strokeWidth={4}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={900}
                strokeDashoffset={900 * (1 - p)}
              />
              {[0, 1, 2].map((k) => {
                const t = ((f * 0.012 + k * 0.33 + i * 0.15) % 1) * p;
                const yy = 150 + t * 490;
                const xx = x + (470 - x) * (t * t);
                return (
                  <circle key={k} cx={xx} cy={yy} r={7} fill={C.gold} opacity={p} />
                );
              })}
            </g>
          );
        })}
      </svg>
      <div style={{ position: "absolute", inset: 0 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            paddingTop: 90,
          }}
        >
          {SRC.map((s, i) => (
            <div
              key={s.en}
              style={{
                opacity: appear(f, 6 + i * 6),
                transform: `translateY(${interpolate(appear(f, 6 + i * 6), [0, 1], [-24, 0])}px)`,
              }}
            >
              <Chip ar={s.ar} en={s.en} tone={i === 1 ? "gold" : "green"} size={24} />
            </div>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CustomerCard width={560} fill={seg(f, 45, 95)} />
        </div>
      </div>
    </Stage>
  );
};

/* 02 — Data Unification */
export const S02: React.FC = () => {
  const f = useCurrentFrame();
  const merge = seg(f, 10, 70);
  const frags = [
    [-300, -260],
    [300, -300],
    [-340, 60],
    [330, 90],
    [-160, 300],
    [190, 320],
  ];
  return (
    <Stage
      index="02"
      ar="توحيد البيانات"
      en="Data Unification"
      desc="ربط البيانات المتفرقة لتكوين ملف موحد ومتكامل للعميل."
    >
      <Center>
        <div style={{ position: "relative" }}>
          {frags.map(([x, y], i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                marginLeft: x * (1 - merge) - 55,
                marginTop: y * (1 - merge) - 22,

                width: 110 - 60 * merge,
                height: 44 - 24 * merge,
                borderRadius: 12,
                background: i % 2 ? C.goldSoft : C.greenLight,
                border: `1px solid ${C.line}`,
                opacity: 1 - merge * 0.95,
                transform: `rotate(${(i % 2 ? 6 : -6) * (1 - merge)}deg)`,
              }}
            />
          ))}
          <div style={{ opacity: 0.2 + merge * 0.8, transform: `scale(${0.9 + merge * 0.1})` }}>
            <CustomerCard width={560} fill={merge} glow={merge > 0.85} />
          </div>
        </div>
      </Center>
    </Stage>
  );
};

/* 03 — Customer Understanding */
export const S03: React.FC = () => {
  const f = useCurrentFrame();
  const t = seg(f, 12, 75);
  return (
    <Stage
      index="03"
      ar="بناء فهم العميل"
      en="Customer Understanding"
      desc="تحويل البيانات الخام إلى فهم أعمق لحالة العميل وسلوكه وظروفه."
    >
      <Center gap={30}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: 12,
            width: 640,
            opacity: 1 - t,
            transform: `translateY(${-40 * t}px)`,
            fontFamily: FSTACK,
          }}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                fontSize: 24,
                color: C.muted,
                background: C.white,
                border: `1px solid ${C.line}`,
                borderRadius: 8,
                padding: "6px 0",
              }}
            >
              {((i * 37) % 97).toString().padStart(2, "0")}
            </div>
          ))}
        </div>
        <Panel
          style={{
            position: "absolute",
            width: 640,
            padding: 30,
            opacity: t,
            transform: `translateY(${40 * (1 - t)}px)`,
          }}
          glow={t > 0.9}
        >
          <Bi ar="فهم حالة العميل" en="Customer Understanding" size={34} />
          <div style={{ height: 24 }} />
          {[
            { ar: "الحالة المالية", en: "Financial State", v: 0.72 },
            { ar: "السلوك", en: "Behavior", v: 0.54 },
            { ar: "الظروف", en: "Context", v: 0.63 },
          ].map((r) => (
            <MeterRow key={r.en} ar={r.ar} en={r.en} value={r.v} progress={t} />
          ))}
        </Panel>
      </Center>
    </Stage>
  );
};

export const DIMS = [
  { ar: "القدرة على السداد", en: "Ability", v: 0.86 },
  { ar: "قابلية الوصول", en: "Reachability", v: 0.28 },
  { ar: "التفاعل", en: "Engagement", v: 0.3 },
  { ar: "الالتزام", en: "Commitment", v: 0.55 },
  { ar: "سلوك القنوات", en: "Channel Behavior", v: 0.7 },
  { ar: "العوائق والسياق", en: "Barriers & Context", v: 0.45 },
  { ar: "التعقيد", en: "Complexity", v: 0.38 },
];

/* 04 — Dimensions */
export const S04: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <Stage
      index="04"
      ar="تحليل أبعاد العميل"
      en="Customer Dimensions Analysis"
      desc="تحليل المؤشرات التي تكشف قدرة العميل وسلوكه واستجابته والعوامل المؤثرة عليه."
    >
      <Panel style={{ position: "absolute", inset: "10px 0 40px", padding: "34px 36px" }}>
        {DIMS.map((d, i) => (
          <div key={d.en} style={{ opacity: appear(f, 8 + i * 6, 16) }}>
            <MeterRow
              ar={d.ar}
              en={d.en}
              value={d.v}
              progress={seg(f, 12 + i * 6, 60 + i * 6)}
            />
          </div>
        ))}
      </Panel>
    </Stage>
  );
};

/* 05 — Persona Identification */
export const S05: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scan = seg(f, 15, 70);
  const picked = 2;
  const items = [
    { ar: "نمط محتمل أ", en: "Pattern A" },
    { ar: "نمط محتمل ب", en: "Pattern B" },
    { ar: "النمط الأكثر ملاءمة", en: "Best Match" },
    { ar: "نمط محتمل د", en: "Pattern D" },
  ];
  return (
    <Stage
      index="05"
      ar="تحديد الشخصية"
      en="Persona Identification"
      desc="تحديد الـ Persona الأكثر تعبيرًا عن حالة العميل وسلوكه الحالي."
    >
      <Center gap={22}>
        {items.map((it, i) => {
          const active = i === picked;
          const lit = scan > (i + 1) / 5;
          const sel = active ? pop(f, fps, 72) : 0;
          return (
            <div
              key={it.en}
              dir="rtl"
              style={{
                width: 660 + sel * 60,
                padding: "24px 30px",
                borderRadius: 20,
                fontFamily: FSTACK,
                background: active && sel > 0.2 ? C.green : C.white,
                color: active && sel > 0.2 ? C.white : C.ink,
                border: `1px solid ${active && sel > 0.2 ? C.green : C.line}`,
                boxShadow:
                  active && sel > 0.2
                    ? "0 24px 60px rgba(14,75,60,0.25)"
                    : "0 10px 26px rgba(28,38,34,0.07)",
                opacity: lit || active ? 1 : 0.45,
                transform: `scale(${1 + sel * 0.03})`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: 30, fontWeight: 700 }}>
                {it.ar}{" "}
                <span dir="ltr" style={{ fontSize: 24, opacity: 0.7, fontWeight: 500 }}>
                  | {it.en}
                </span>
              </span>
              <span style={{ fontSize: 28, color: active && sel > 0.2 ? C.goldSoft : C.line }}>
                {active && sel > 0.4 ? "✓" : "—"}
              </span>
            </div>
          );
        })}
      </Center>
    </Stage>
  );
};

/* 06 — Persona Score */
export const S06: React.FC = () => {
  const f = useCurrentFrame();
  const p = seg(f, 15, 80);
  return (
    <Stage
      index="06"
      ar="درجة الشخصية"
      en="Persona Score"
      desc="احتساب درجة تدعم التصنيف والأولوية واتخاذ القرار."
    >
      <Center gap={40}>
        <Ring progress={p * 0.78} label={`${Math.round(p * 78)}`} size={380} />
        <Bi ar="درجة الشخصية" en="Persona Score" size={38} />
        <div style={{ display: "flex", gap: 16 }}>
          <Chip ar="الأولوية" en="Priority" tone="gold" />
          <Chip ar="التصنيف" en="Classification" tone="green" />
        </div>
      </Center>
    </Stage>
  );
};

/* 07 — Decision Readiness */
export const S07: React.FC = () => {
  const f = useCurrentFrame();
  const items = [
    { ar: "اكتمال البيانات", en: "Data Completeness" },
    { ar: "وضوح المؤشرات", en: "Signal Clarity" },
    { ar: "حداثة البيانات", en: "Recency" },
    { ar: "كفاية المعلومات", en: "Sufficiency" },
  ];
  return (
    <Stage
      index="07"
      ar="الجاهزية للقرار"
      en="Decision Readiness"
      desc="تقييم مدى كفاية المعلومات ووضوح الحالة للانتقال إلى القرار."
    >
      <Center gap={20}>
        {items.map((it, i) => {
          const on = seg(f, 14 + i * 12, 34 + i * 12);
          return (
            <div
              key={it.en}
              dir="rtl"
              style={{
                width: 660,
                padding: "22px 28px",
                borderRadius: 18,
                background: C.white,
                border: `1px solid ${on > 0.6 ? "#BCD8CC" : C.line}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: FSTACK,
                boxShadow: "0 10px 26px rgba(28,38,34,0.06)",
              }}
            >
              <span style={{ fontSize: 29, fontWeight: 600, color: C.ink }}>
                {it.ar}{" "}
                <span dir="ltr" style={{ fontSize: 23, color: C.muted }}>
                  | {it.en}
                </span>
              </span>
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 999,
                  background: on > 0.6 ? C.green : "#EFECE3",
                  color: C.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  transform: `scale(${0.8 + on * 0.2})`,
                }}
              >
                ✓
              </span>
            </div>
          );
        })}
      </Center>
    </Stage>
  );
};

/* 08 — Decision Engine */
export const S08: React.FC = () => {
  const f = useCurrentFrame();
  const enter = seg(f, 8, 40);
  const paths = [
    { ar: "تكرار الاتصال", en: "Repeat Call", keep: false },
    { ar: "معالجة مالية", en: "Financial Treatment", keep: false },
    { ar: "تغيير القناة", en: "Channel Shift", keep: true },
    { ar: "تصعيد مبكر", en: "Early Escalation", keep: false },
  ];
  return (
    <Stage
      index="08"
      ar="محرك القرار"
      en="Decision Engine"
      desc="تحليل الحالة ومقارنة البدائل لتحديد المعالجة الأكثر ملاءمة."
    >
      <Center gap={26}>
        <div
          style={{
            width: 560,
            padding: "26px 30px",
            borderRadius: 22,
            background: `linear-gradient(90deg, ${C.green}, ${C.greenSoft})`,
            color: C.white,
            fontFamily: FSTACK,
            textAlign: "center",
            transform: `translateY(${(1 - enter) * -30}px)`,
            boxShadow: "0 26px 60px rgba(14,75,60,0.25)",
          }}
          dir="rtl"
        >
          <div style={{ fontSize: 34, fontWeight: 700 }}>محرك القرار</div>
          <div dir="ltr" style={{ fontSize: 25, color: C.goldSoft }}>
            Decision Engine
          </div>
        </div>
        <svg width={660} height={70}>
          {paths.map((_, i) => (
            <path
              key={i}
              d={`M 330 0 C 330 40, ${90 + i * 160} 30, ${90 + i * 160} 70`}
              stroke={C.line}
              strokeWidth={3}
              fill="none"
              opacity={seg(f, 30 + i * 4, 55 + i * 4)}
            />
          ))}
        </svg>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {paths.map((p, i) => {
            const out = p.keep ? 0 : seg(f, 62 + i * 6, 88 + i * 6);
            return (
              <div
                key={p.en}
                dir="rtl"
                style={{
                  width: 620,
                  padding: "18px 26px",
                  borderRadius: 16,
                  background: C.white,
                  border: `1px solid ${p.keep ? "#BCD8CC" : C.line}`,
                  fontFamily: FSTACK,
                  display: "flex",
                  justifyContent: "space-between",
                  opacity: (1 - out * 0.75) * seg(f, 40 + i * 5, 62),
                  filter: out > 0.5 ? "grayscale(1)" : "none",
                  transform: `translateX(${out * 40}px)`,
                }}
              >
                <span style={{ fontSize: 27, fontWeight: 600, color: C.ink }}>
                  {p.ar}{" "}
                  <span dir="ltr" style={{ fontSize: 22, color: C.muted }}>
                    | {p.en}
                  </span>
                </span>
                <span style={{ fontSize: 26, color: p.keep ? C.green : C.red }}>
                  {p.keep ? "✓" : out > 0.4 ? "✕" : "…"}
                </span>
              </div>
            );
          })}
        </div>
      </Center>
    </Stage>
  );
};

/* 09 — NBCA */
export const S09: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = pop(f, fps, 20);
  const attrs = [
    { ar: "القناة", en: "Channel" },
    { ar: "التوقيت", en: "Timing" },
    { ar: "أسلوب التواصل", en: "Communication Approach" },
    { ar: "الأولوية", en: "Priority" },
    { ar: "نوع المعالجة", en: "Treatment" },
  ];
  return (
    <Stage
      index="09"
      ar="أفضل إجراء تحصيلي تالٍ"
      en="Next Best Collection Action (NBCA)"
      desc="اختيار أفضل إجراء تحصيلي تالٍ وفق حالة العميل الحالية."
    >
      <Center gap={34}>
        <div
          dir="rtl"
          style={{
            width: 640,
            padding: "34px 32px",
            borderRadius: 26,
            background: C.white,
            border: `2px solid ${C.gold}`,
            boxShadow: "0 30px 70px rgba(195,154,62,0.25)",
            transform: `scale(${0.86 + s * 0.14})`,
            fontFamily: FSTACK,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 34, fontWeight: 700, color: C.green }}>
            الإجراء المختار
          </div>
          <div dir="ltr" style={{ fontSize: 24, color: C.muted, marginTop: 4 }}>
            Selected Action
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "center",
            width: 700,
          }}
        >
          {attrs.map((a, i) => (
            <div key={a.en} style={{ opacity: appear(f, 40 + i * 8, 16) }}>
              <Chip ar={a.ar} en={a.en} tone={i % 2 ? "gold" : "green"} size={24} />
            </div>
          ))}
        </div>
      </Center>
    </Stage>
  );
};

/* 10 — Execution */
export const S10: React.FC = () => {
  const f = useCurrentFrame();
  const send = seg(f, 20, 80);
  return (
    <Stage
      index="10"
      ar="التنفيذ"
      en="Execution"
      desc="تنفيذ الإجراء عبر القناة والتوقيت والأسلوب الأنسب للعميل."
    >
      <Center gap={30}>
        <div style={{ display: "flex", gap: 16 }}>
          <Chip ar="قناة رقمية" en="Digital" tone="green" />
          <Chip ar="التوقيت الأنسب" en="Optimal Timing" tone="gold" />
        </div>
        <div
          style={{
            width: 340,
            height: 480,
            borderRadius: 40,
            background: C.white,
            border: `10px solid ${C.ink}`,
            boxShadow: "0 30px 70px rgba(28,38,34,0.22)",
            padding: 22,
            fontFamily: FSTACK,
            position: "relative",
            overflow: "hidden",
          }}
          dir="rtl"
        >
          <div
            style={{
              background: C.greenLight,
              borderRadius: 16,
              padding: "16px 18px",
              fontSize: 22,
              color: C.green,
              opacity: seg(f, 26, 46),
              transform: `translateY(${(1 - seg(f, 26, 46)) * 20}px)`,
            }}
          >
            رسالة موجّهة عبر القناة المناسبة
          </div>
          <div
            style={{
              marginTop: 16,
              background: C.green,
              color: C.white,
              borderRadius: 16,
              padding: "16px 18px",
              fontSize: 22,
              opacity: seg(f, 50, 70),
              transform: `translateY(${(1 - seg(f, 50, 70)) * 20}px)`,
            }}
          >
            أسلوب تواصل مخصص للحالة
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 26,
              left: 22,
              right: 22,
              height: 8,
              background: "#EFECE3",
              borderRadius: 99,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${send * 100}%`,
                background: C.gold,
              }}
            />
          </div>
        </div>
      </Center>
    </Stage>
  );
};

/* 11 — Outcome */
export const S11: React.FC = () => {
  const f = useCurrentFrame();
  const rows = [
    { ar: "استجابة", en: "Response", tone: "green" as const },
    { ar: "وعد بالسداد", en: "Promise to Pay", tone: "gold" as const },
    { ar: "سداد", en: "Payment", tone: "green" as const },
    { ar: "عدم استجابة", en: "No Response", tone: "red" as const },
  ];
  return (
    <Stage
      index="11"
      ar="قياس النتائج"
      en="Outcome Measurement"
      desc="رصد استجابة العميل ونتيجة الإجراء ومؤشرات النجاح."
    >
      <Center gap={22}>
        {rows.map((r, i) => (
          <div
            key={r.en}
            style={{
              opacity: appear(f, 12 + i * 10, 18),
              transform: `translateX(${(1 - appear(f, 12 + i * 10, 18)) * 30}px)`,
            }}
          >
            <Chip ar={r.ar} en={r.en} tone={r.tone} size={30} style={{ padding: "16px 34px" }} />
          </div>
        ))}
        <div style={{ marginTop: 20, opacity: appear(f, 60) }}>
          <Bi ar="تغير حالة العميل" en="Customer State Change" size={30} />
        </div>
      </Center>
    </Stage>
  );
};

/* 12 — Learning & Update */
export const S12: React.FC = () => {
  const f = useCurrentFrame();
  const back = seg(f, 12, 62);
  return (
    <Stage
      index="12"
      ar="التعلم والتحديث"
      en="Learning & Update"
      desc="إعادة النتائج إلى الإطار لتحديث الفهم وتحسين القرار والإجراء التالي."
    >
      <Center gap={20}>
        <svg width={700} height={200} style={{ position: "absolute", top: 20 }}>
          <path
            d="M 620 150 C 620 30, 90 30, 90 150"
            stroke={C.line}
            strokeWidth={4}
            fill="none"
          />
          <path
            d="M 620 150 C 620 30, 90 30, 90 150"
            stroke={C.gold}
            strokeWidth={5}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={900}
            strokeDashoffset={900 * (1 - back)}
          />
          <polygon points="90,158 80,132 100,132" fill={C.gold} opacity={back > 0.9 ? 1 : 0} />
        </svg>
        <div style={{ marginTop: 210 }}>
          <CustomerCard
            width={620}
            glow={back > 0.9}
            rows={[
              { ar: "المؤشرات", en: "Signals", v: back > 0.5 ? "محدّثة" : "—" },
              { ar: "الشخصية", en: "Persona", v: back > 0.7 ? "محدّثة" : "—" },
              { ar: "درجة الشخصية", en: "Persona Score", v: back > 0.85 ? "84" : "78" },
              { ar: "الإجراء التالي", en: "NBCA", v: back > 0.95 ? "محدّث" : "—" },
            ]}
          />
        </div>
      </Center>
    </Stage>
  );
};
