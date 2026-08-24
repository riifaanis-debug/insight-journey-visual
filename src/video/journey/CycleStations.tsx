import React from "react";
import { C, seg } from "../theme";
import { FSTACK } from "../font";
import { Station } from "./Station";
import {
  Wrap,
  P,
  Lines,
  track,
  PulseTrack,
  Pod,
  Card,
  Tag,
  Note,
} from "./stationKit";
import { Gauge, Alt, EngineBox, Check, PackItem, Phone } from "./widgets";
import { Ring } from "../components/Ui";
import { LANES } from "./ProfileCore";

const DIMS = [
  { ar: "القدرة", en: "Ability", v: 0.8 },
  { ar: "قابلية الوصول", en: "Reachability", v: 0.55 },
  { ar: "التفاعل", en: "Engagement", v: 0.68 },
  { ar: "الالتزام", en: "Commitment", v: 0.6 },
  { ar: "سلوك القنوات", en: "Channel Behavior", v: 0.75 },
  { ar: "العوائق والسياق", en: "Barriers & Context", v: 0.45 },
  { ar: "التعقيد", en: "Complexity", v: 0.35 },
];

const PERSONAS = [
  { ar: "قادر يصعب الوصول إليه", en: "Able but Hard to Reach", m: 0.78 },
  { ar: "متعثر مالياً", en: "Financially Strained", m: 0.36 },
  { ar: "متجاهل متكرر", en: "Persistent Avoider", m: 0.29 },
];

export const CycleStations: React.FC = () => (
  <>
    {/* 01 — استلام البيانات */}
    <Station id="s01">
      {(f) => (
        <Wrap>
          <Lines>
            {LANES.map((l, i) => (
              <PulseTrack
                key={l.en}
                path={track([(i - 1) * 400, 430], [0, -150], 0.18)}
                progress={seg(f, 14 + i * 8, 62 + i * 8)}
                flow={(f * 0.012 + i * 0.33) % 1}
                color={l.color}
                count={4}
              />
            ))}
          </Lines>
          {LANES.map((l, i) => (
            <P key={l.en} x={(i - 1) * 400} y={520} o={seg(f, 6 + i * 6, 34 + i * 6)}>
              <Pod
                ar={`بيانات ${l.ar}`}
                en={`${l.en} Data`}
                color={l.color}
              />
            </P>
          ))}
          <P y={700} o={seg(f, 90, 118)}>
            <Note
              ar="ثلاثة مصادر تصل إلى ملف واحد"
              en="Three Sources, One File"
            />
          </P>
        </Wrap>
      )}
    </Station>

    {/* 02 — توحيد البيانات */}
    <Station id="s02">
      {(f) => {
        const m = seg(f, 20, 78);
        return (
          <Wrap>
            <Lines>
              {LANES.map((l, i) => (
                <PulseTrack
                  key={l.en}
                  path={track([(i - 1) * 230, 120], [0, -120], 0.1)}
                  progress={m}
                  flow={(f * 0.02 + i * 0.3) % 1}
                  color={l.color}
                  count={2}
                  dot={9}
                />
              ))}
            </Lines>
            {LANES.map((l, i) => (
              <P
                key={l.en}
                x={(i - 1) * 230 * (1 - m)}
                y={120 - m * 40}
                s={1 - m * 0.35}
                o={1 - m * 0.7}
              >
                <div
                  style={{
                    width: 92,
                    height: 92,
                    borderRadius: 999,
                    background: l.color,
                    opacity: 0.9,
                  }}
                />
              </P>
            ))}
            <P y={90} o={m} s={0.6 + m * 0.4}>
              <div
                style={{
                  width: 130,
                  height: 130,
                  borderRadius: 999,
                  background: `linear-gradient(135deg, ${C.green}, ${C.gold})`,
                  boxShadow: `0 0 0 ${m * 16}px rgba(195,154,62,0.12)`,
                }}
              />
            </P>
            <P y={300} o={seg(f, 70, 100)}>
              <Tag ar="سجل واحد للعميل" en="Single Customer Record" tone="gold" />
            </P>
            <P y={430} o={seg(f, 86, 116)}>
              <Note
                ar="لا تعارض بين المصادر — مصدر حقيقة واحد"
                en="One Source of Truth"
              />
            </P>
          </Wrap>
        );
      }}
    </Station>

    {/* 03 — بناء الفهم */}
    <Station id="s03">
      {(f) => {
        const items = [
          { ar: "الحالة المالية", en: "Financial State", d: "قدرة السداد وأنماط الدفع" },
          { ar: "السلوك", en: "Behavior", d: "الاستجابة والتجاهل والتكرار" },
          { ar: "الظروف والسياق", en: "Context", d: "العوائق المؤقتة والمؤثرات" },
        ];
        return (
          <Wrap>
            <Lines>
              {items.map((_, i) => (
                <PulseTrack
                  key={i}
                  path={track([0, -180], [(i - 1) * 0, 20 + i * 190], 0.06)}
                  progress={seg(f, 10 + i * 14, 60 + i * 14)}
                  flow={(f * 0.02 + i * 0.4) % 1}
                  color={C.greenSoft}
                  count={2}
                  dot={8}
                />
              ))}
            </Lines>
            {items.map((it, i) => (
              <P key={it.en} y={40 + i * 190} o={seg(f, 24 + i * 16, 62 + i * 16)}>
                <Card w={820}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      justifyContent: "space-between",
                      gap: 16,
                    }}
                  >
                    <div style={{ fontSize: 30, fontWeight: 700, color: C.green }}>
                      {it.ar}{" "}
                      <span dir="ltr" style={{ fontSize: 22, color: C.muted }}>
                        | {it.en}
                      </span>
                    </div>
                  </div>
                  <div style={{ fontSize: 24, color: C.muted, marginTop: 8 }}>
                    {it.d}
                  </div>
                </Card>
              </P>
            ))}
            <P y={660} o={seg(f, 96, 126)}>
              <Note ar="البيانات صارت فهمًا" en="Data becomes Insight" />
            </P>
          </Wrap>
        );
      }}
    </Station>

    {/* 04 — الأبعاد */}
    <Station id="s04">
      {(f) => (
        <Wrap>
          <Lines>
            {DIMS.map((_, i) => {
              const a = (-90 + (360 / 7) * i) * (Math.PI / 180);
              return (
                <PulseTrack
                  key={i}
                  path={track(
                    [0, 0],
                    [Math.cos(a) * 560, Math.sin(a) * 640],
                    0.05,
                  )}
                  progress={seg(f, 8 + i * 7, 48 + i * 7)}
                  flow={(f * 0.018 + i * 0.2) % 1}
                  color={C.greenSoft}
                  count={2}
                  dot={8}
                />
              );
            })}
          </Lines>
          {DIMS.map((d, i) => {
            const a = (-90 + (360 / 7) * i) * (Math.PI / 180);
            return (
              <P
                key={d.en}
                x={Math.cos(a) * 620}
                y={Math.sin(a) * 700}
                o={seg(f, 20 + i * 7, 56 + i * 7)}
              >
                <Gauge
                  ar={d.ar}
                  en={d.en}
                  v={d.v}
                  progress={seg(f, 30 + i * 7, 110 + i * 7)}
                  size={180}
                />
              </P>
            );
          })}
        </Wrap>
      )}
    </Station>

    {/* 05 — تحديد الشخصية */}
    <Station id="s05">
      {(f) => (
        <Wrap>
          {PERSONAS.map((p, i) => {
            const grow = seg(f, 18 + i * 10, 86 + i * 10);
            const decide = seg(f, 100, 136);
            const win = i === 0;
            return (
              <P
                key={p.en}
                y={-40 + i * 175}
                o={seg(f, 8 + i * 10, 40 + i * 10) * (win ? 1 : 1 - decide * 0.55)}
                x={win ? decide * 0 : decide * -40}
                s={win ? 1 + decide * 0.06 : 1 - decide * 0.05}
              >
                <Card w={900} glow={win && decide > 0.4}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <div style={{ fontSize: 28, fontWeight: 700, color: C.ink }}>
                      {p.ar}{" "}
                      <span dir="ltr" style={{ fontSize: 21, color: C.muted }}>
                        | {p.en}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 28,
                        fontWeight: 700,
                        color: win ? C.green : C.muted,
                      }}
                    >
                      {Math.round(p.m * grow * 100)}%
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      height: 14,
                      background: "#EFECE3",
                      borderRadius: 999,
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${p.m * grow * 100}%`,
                        background: win
                          ? `linear-gradient(90deg, ${C.green}, ${C.gold})`
                          : "#C9C2B2",
                      }}
                    />
                  </div>
                </Card>
              </P>
            );
          })}
          <P y={560} o={seg(f, 120, 148)}>
            <Tag ar="نسبة تطابق توضيحية" en="Illustrative Match" tone="muted" />
          </P>
        </Wrap>
      )}
    </Station>

    {/* 06 — درجة الشخصية */}
    <Station id="s06">
      {(f) => {
        const g = seg(f, 16, 90);
        const outs = [
          { ar: "التصنيف", en: "Classification" },
          { ar: "الأولوية", en: "Priority" },
          { ar: "اتخاذ القرار", en: "Decision Making" },
        ];
        return (
          <Wrap>
            <P y={60} s={1}>
              <Ring progress={g * 0.74} label={`${Math.round(g * 74)}`} size={340} />
            </P>
            <P y={290} o={seg(f, 60, 88)}>
              <Tag ar="درجة توضيحية" en="Illustrative Score" tone="muted" size={22} />
            </P>
            {outs.map((o, i) => (
              <P key={o.en} x={(i - 1) * 330} y={440} o={seg(f, 74 + i * 12, 106 + i * 12)}>
                <Tag ar={o.ar} en={o.en} tone={i === 1 ? "gold" : "green"} />
              </P>
            ))}
          </Wrap>
        );
      }}
    </Station>

    {/* 07 — الجاهزية للقرار */}
    <Station id="s07">
      {(f) => {
        const items = [
          { ar: "البيانات", en: "Data" },
          { ar: "الفهم", en: "Understanding" },
          { ar: "الأبعاد", en: "Dimensions" },
          { ar: "الشخصية", en: "Persona" },
          { ar: "درجة الشخصية", en: "Persona Score" },
        ];
        return (
          <Wrap>
            {items.map((it, i) => (
              <P key={it.en} y={-40 + i * 108} o={seg(f, 6 + i * 12, 34 + i * 12)}>
                <Check ar={it.ar} en={it.en} done={seg(f, 20 + i * 14, 34 + i * 14)} />
              </P>
            ))}
            <P y={560} o={seg(f, 88, 116)} s={0.9 + seg(f, 88, 116) * 0.1}>
              <Tag ar="جاهز للقرار" en="Decision Ready" tone="gold" size={30} />
            </P>
          </Wrap>
        );
      }}
    </Station>

    {/* 08 — محرك القرار */}
    <Station id="s08">
      {(f) => {
        const alts = [
          { ar: "تذكير رقمي", en: "Digital Reminder", fit: 0.86, ok: true },
          { ar: "اتصال هاتفي", en: "Phone Call", fit: 0.42, ok: false },
          { ar: "تصعيد", en: "Escalation", fit: 0.2, ok: false },
        ];
        const verdict = seg(f, 118, 150);
        return (
          <Wrap>
            <Lines>
              {[-2, -1, 0, 1, 2].map((k, i) => (
                <PulseTrack
                  key={k}
                  path={track([k * 150, -320], [0, -110], 0.08)}
                  progress={seg(f, 6 + i * 6, 44 + i * 6)}
                  flow={(f * 0.025 + i * 0.2) % 1}
                  color={C.gold}
                  count={2}
                  dot={9}
                />
              ))}
            </Lines>
            <P y={-30} o={seg(f, 20, 50)}>
              <EngineBox glow={seg(f, 40, 80)} />
            </P>
            {alts.map((a, i) => (
              <P key={a.en} y={180 + i * 150} o={seg(f, 52 + i * 12, 84 + i * 12)}>
                <Alt
                  ar={a.ar}
                  en={a.en}
                  fit={a.fit}
                  progress={seg(f, 62 + i * 12, 120 + i * 12)}
                  ok={a.ok}
                  verdict={verdict}
                  width={860}
                />
              </P>
            ))}
            <P y={660} o={seg(f, 150, 175)}>
              <Note ar="يخرج الخيار الأعلى ملاءمة" en="Best-Fit Action Selected" />
            </P>
          </Wrap>
        );
      }}
    </Station>

    {/* 09 — NBCA */}
    <Station id="s09">
      {(f) => {
        const items = [
          { ar: "القناة", en: "Channel", v: "رسالة نصية" },
          { ar: "التوقيت", en: "Timing", v: "مساءً" },
          { ar: "أسلوب التواصل", en: "Approach", v: "تذكير ودّي" },
          { ar: "الأولوية", en: "Priority", v: "مرتفعة" },
          { ar: "نوع المعالجة", en: "Treatment", v: "سداد كامل" },
        ];
        return (
          <Wrap>
            <P y={120} o={seg(f, 10, 40)}>
              <Card w={880} glow={seg(f, 110, 140) > 0.5}>
                <div style={{ fontSize: 30, fontWeight: 700, color: C.green, marginBottom: 8 }}>
                  حزمة الإجراء{" "}
                  <span dir="ltr" style={{ fontSize: 22, color: C.muted }}>
                    | Action Package
                  </span>
                </div>
                {items.map((it, i) => (
                  <PackItem
                    key={it.en}
                    ar={it.ar}
                    en={it.en}
                    v={it.v}
                    o={seg(f, 26 + i * 16, 58 + i * 16)}
                  />
                ))}
              </Card>
            </P>
            <P y={520} o={seg(f, 118, 146)}>
              <Tag ar="أفضل إجراء تحصيلي تالٍ" en="NBCA" tone="gold" size={28} />
            </P>
          </Wrap>
        );
      }}
    </Station>

    {/* 10 — التنفيذ */}
    <Station id="s10">
      {(f) => (
        <Wrap>
          <P x={-260} y={140} o={seg(f, 12, 42)}>
            <Phone
              send={seg(f, 40, 62)}
              arrive={seg(f, 62, 86)}
              tap={seg(f, 100, 126)}
              text="تذكير ودّي بمستحقات حسابك — مرفق خطاب تسوية لحسابك."
              time="٨:٣٠ م"
            />
          </P>
          {[
            { ar: "اختيار القناة", en: "Channel", d: 16 },
            { ar: "انتظار التوقيت", en: "Timing", d: 40 },
            { ar: "إرسال", en: "Send", d: 62 },
            { ar: "وصول", en: "Delivered", d: 84 },
            { ar: "تفاعل العميل", en: "Customer Action", d: 104 },
          ].map((s, i) => (
            <P key={s.en} x={330} y={-90 + i * 118} o={seg(f, s.d, s.d + 24)}>
              <Tag ar={s.ar} en={s.en} tone={i === 4 ? "gold" : "green"} />
            </P>
          ))}
        </Wrap>
      )}
    </Station>

    {/* 11 — قياس النتائج */}
    <Station id="s11">
      {(f) => {
        const res = [
          { ar: "تم الوصول", en: "Reached", d: 12 },
          { ar: "تم التفاعل", en: "Engaged", d: 36 },
          { ar: "وعد بالسداد", en: "Promise to Pay", d: 60 },
        ];
        return (
          <Wrap>
            {res.map((r, i) => (
              <P key={r.en} y={40 + i * 150} o={seg(f, r.d, r.d + 26)}>
                <Card w={720}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontSize: 30, fontWeight: 700, color: C.ink }}>
                      {r.ar}{" "}
                      <span dir="ltr" style={{ fontSize: 22, color: C.muted }}>
                        | {r.en}
                      </span>
                    </div>
                    <div style={{ fontSize: 30, color: C.green, fontWeight: 700 }}>
                      ✓
                    </div>
                  </div>
                </Card>
              </P>
            ))}
            <Lines>
              <PulseTrack
                path={track([0, 520], [0, 760], 0.4)}
                progress={seg(f, 84, 120)}
                flow={(f * 0.02) % 1}
                color={C.gold}
                count={4}
              />
            </Lines>
            <P y={800} o={seg(f, 96, 124)}>
              <Note ar="النتيجة تتحول إلى بيانات جديدة" en="Outcome becomes Data" />
            </P>
          </Wrap>
        );
      }}
    </Station>

    {/* 12 — التعلم والتحديث */}
    <Station id="s12">
      {(f) => {
        const upd = [
          { ar: "المؤشرات", en: "Dimensions" },
          { ar: "درجة الشخصية", en: "Persona Score" },
          { ar: "الأولوية", en: "Priority" },
          { ar: "الإجراء التالي", en: "Next Action" },
        ];
        return (
          <Wrap>
            <Lines>
              <PulseTrack
                path={track([420, 480], [0, -180], 0.5)}
                progress={seg(f, 8, 60)}
                flow={(f * 0.02) % 1}
                color={C.gold}
                count={5}
              />
            </Lines>
            {upd.map((u, i) => (
              <P key={u.en} x={(i % 2 === 0 ? -1 : 1) * 250} y={100 + Math.floor(i / 2) * 130} o={seg(f, 30 + i * 12, 60 + i * 12)}>
                <Tag ar={`تحديث ${u.ar}`} en={u.en} tone="green" size={22} />
              </P>
            ))}
            <P y={420} o={seg(f, 90, 118)}>
              <Card w={880} glow>
                <div style={{ fontSize: 28, fontWeight: 700, color: C.ink }}>
                  الشخصية تصنيف ديناميكي{" "}
                  <span dir="ltr" style={{ fontSize: 21, color: C.muted }}>
                    | Dynamic Classification
                  </span>
                </div>
                <div style={{ display: "flex", gap: 14, marginTop: 16 }}>
                  <div
                    style={{
                      flex: 1,
                      background: C.greenLight,
                      borderRadius: 16,
                      padding: "14px 16px",
                      fontSize: 22,
                      color: C.green,
                      fontWeight: 700,
                      opacity: 0.6 + Math.abs(Math.sin(f * 0.05)) * 0.4,
                    }}
                  >
                    قد تبقى كما هي <span dir="ltr">| May stay</span>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      background: "#F7EED6",
                      borderRadius: 16,
                      padding: "14px 16px",
                      fontSize: 22,
                      color: "#8A6A1E",
                      fontWeight: 700,
                      opacity: 0.6 + Math.abs(Math.cos(f * 0.05)) * 0.4,
                    }}
                  >
                    وقد تتغير <span dir="ltr">| May change</span>
                  </div>
                </div>
              </Card>
            </P>
            <P y={640} o={seg(f, 128, 156)}>
              <Note
                ar="كل نتيجة تُحسّن القرار التالي"
                en="Every Outcome Improves the Next Decision"
              />
            </P>
          </Wrap>
        );
      }}
    </Station>
  </>
);

export const cycleFonts = FSTACK;
