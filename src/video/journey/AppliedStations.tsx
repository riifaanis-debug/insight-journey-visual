import React from "react";
import { C, seg, groupColor } from "../theme";
import { FSTACK } from "../font";
import { Station } from "./Station";
import { Wrap, P, Lines, track, PulseTrack, Pod, Card, Tag, Note } from "./stationKit";
import { Gauge, Alt, EngineBox, PackItem, Phone } from "./widgets";
import { Ring } from "../components/Ui";
import { CASE } from "./caseData";
import { LANES } from "./ProfileCore";

const SRC = [
  { ar: "١٢٬٤٠٠ ر.س متأخرة", en: "Past Due 38 days", i: 0 },
  { ar: "٤ من ٦ في الموعد", en: "Payment History", i: 1 },
  { ar: "٣ اتصالات بلا رد", en: "No Answer ×3", i: 2 },
];

const G = {
  data: groupColor("data"),
  understanding: groupColor("understanding"),
  decision: groupColor("decision"),
  action: groupColor("action"),
  outcome: groupColor("outcome"),
  learning: groupColor("learning"),
};

export const AppliedStations: React.FC = () => (
  <>
    {/* 01 — استلام بيانات العميل */}
    <Station id="a1" top={520} pad={90}>
      {(f) => (
        <Wrap>
          <Lines>
            {SRC.map((s, i) => (
              <PulseTrack
                key={s.en}
                path={track([(i - 1) * 400, 430], [0, -150], 0.18)}
                progress={seg(f, 16 + i * 10, 66 + i * 10)}
                flow={(f * 0.014 + i * 0.33) % 1}
                color={LANES[i]!.color}
                count={4}
              />
            ))}
          </Lines>
          {SRC.map((s, i) => (
            <P key={s.en} x={(i - 1) * 400} y={520} o={seg(f, 8 + i * 8, 38 + i * 8)}>
              <Pod ar={s.ar} en={s.en} color={LANES[i]!.color} />
            </P>
          ))}
          <P y={720} o={seg(f, 110, 145)}>
            <Note
              ar="نفس المكوّنات — لكن بأرقام هذا العميل"
              en="Same Components, Real Values"
            />
          </P>
        </Wrap>
      )}
    </Station>

    {/* 02 — توحيد سجلاته */}
    <Station id="a2" top={180} pad={80}>
      {(f) => {
        const m = seg(f, 18, 78);
        return (
          <Wrap>
            <Lines>
              {LANES.map((l, i) => (
                <PulseTrack
                  key={l.en}
                  path={track([(i - 1) * 230, 260], [0, -60], 0.1)}
                  progress={m}
                  flow={(f * 0.02 + i * 0.3) % 1}
                  color={l.color}
                  count={2}
                  dot={9}
                />
              ))}
            </Lines>
            <P y={180} o={m} s={0.6 + m * 0.4}>
              <div
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 999,
                  background: `linear-gradient(135deg, ${G.data.main}, ${C.gold})`,
                  boxShadow: `0 0 0 ${m * 18}px rgba(195,154,62,0.12)`,
                }}
              />
            </P>
            {CASE.conflicts.map((c, i) => {
              const o = seg(f, 60 + i * 20, 96 + i * 20);
              const fixed = seg(f, 84 + i * 20, 116 + i * 20);
              return (
                <P key={c.en} y={300 + i * 168} o={o}>
                  <Card w={940}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          borderRadius: 999,
                          background: fixed > 0.5 ? G.data.light : "#F7E5E1",
                          color: fixed > 0.5 ? G.data.main : C.red,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 26,
                          fontWeight: 700,
                        }}
                      >
                        {fixed > 0.5 ? "✓" : "!"}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 30, fontWeight: 700, color: C.ink }}>
                          {c.ar}{" "}
                          <span dir="ltr" style={{ fontSize: 23, color: C.muted }}>
                            | {c.en}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: 26,
                            color: G.data.main,
                            fontWeight: 600,
                            marginTop: 6,
                            opacity: fixed,
                          }}
                        >
                          {c.fix}
                        </div>
                      </div>
                    </div>
                  </Card>
                </P>
              );
            })}
            <P y={800} o={seg(f, 130, 162)}>
              <Tag ar="سجل واحد للعميل" en="Single Customer Record" tone="gold" />
            </P>
          </Wrap>
        );
      }}
    </Station>

    {/* 03 — الفهم */}
    <Station id="a3" top={60} pad={70}>
      {(f) => (
        <Wrap>
          <Lines>
            {CASE.insights.map((_, i) => (
              <PulseTrack
                key={i}
                path={track([0, -180], [0, 30 + i * 200], 0.06)}
                progress={seg(f, 10 + i * 16, 64 + i * 16)}
                flow={(f * 0.02 + i * 0.4) % 1}
                color={G.understanding.soft}
                count={2}
                dot={8}
              />
            ))}
          </Lines>
          {CASE.insights.map((it, i) => (
            <P key={it.en} y={60 + i * 210} o={seg(f, 26 + i * 18, 66 + i * 18)}>
              <Card w={940} style={{ borderColor: G.understanding.light }}>
                <div style={{ fontSize: 34, fontWeight: 700, color: G.understanding.main }}>
                  {it.ar}{" "}
                  <span dir="ltr" style={{ fontSize: 25, color: C.muted }}>
                    | {it.en}
                  </span>
                </div>
                <div style={{ fontSize: 28, color: C.ink, marginTop: 10, lineHeight: 1.5 }}>
                  {it.d}
                </div>
              </Card>
            </P>
          ))}
          <P y={760} o={seg(f, 130, 162)}>
            <Note ar="المشكلة ليست القدرة — بل الوصول" en="Not Ability — Access" />
          </P>
        </Wrap>
      )}
    </Station>

    {/* 04 — الأبعاد بقيمه الفعلية */}
    <Station id="a4" top={-520} pad={120}>
      {(f) => (
        <Wrap>
          <Lines>
            {CASE.dims.map((_, i) => {
              const a = (-90 + (360 / 7) * i) * (Math.PI / 180);
              return (
                <PulseTrack
                  key={i}
                  path={track([0, 0], [Math.cos(a) * 560, Math.sin(a) * 470], 0.05)}
                  progress={seg(f, 6 + i * 7, 46 + i * 7)}
                  flow={(f * 0.018 + i * 0.2) % 1}
                  color={G.understanding.soft}
                  count={2}
                  dot={8}
                />
              );
            })}
          </Lines>
          {CASE.dims.map((d, i) => {
            const a = (-90 + (360 / 7) * i) * (Math.PI / 180);
            const hi = d.v > 0.8 || d.v < 0.4 ? seg(f, 140, 175) : 0;
            return (
              <P
                key={d.en}
                x={Math.cos(a) * 620}
                y={Math.sin(a) * 520}
                o={seg(f, 18 + i * 7, 54 + i * 7)}
              >
                <Gauge
                  ar={d.ar}
                  en={d.en}
                  v={d.v}
                  progress={seg(f, 28 + i * 7, 112 + i * 7)}
                  size={190}
                  note={seg(f, 106 + i * 5, 136 + i * 5) > 0.5 ? d.note : undefined}
                  highlight={hi}
                />
              </P>
            );
          })}
        </Wrap>
      )}
    </Station>

    {/* 05 — الشخصية */}
    <Station id="a5" top={-40} pad={90}>
      {(f) => (
        <Wrap>
          {CASE.personas.map((p, i) => {
            const grow = seg(f, 16 + i * 12, 88 + i * 12);
            const decide = seg(f, 104, 142);
            const win = i === 0;
            return (
              <P
                key={p.en}
                y={-40 + i * 205}
                o={seg(f, 8 + i * 12, 40 + i * 12) * (win ? 1 : 1 - decide * 0.55)}
                s={win ? 1 + decide * 0.05 : 1 - decide * 0.05}
              >
                <Card w={950} glow={win && decide > 0.4}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{ fontSize: 34, fontWeight: 700, color: C.ink }}>
                      {p.ar}{" "}
                      <span dir="ltr" style={{ fontSize: 24, color: C.muted }}>
                        | {p.en}
                      </span>
                    </div>
                    <div style={{ fontSize: 36, fontWeight: 700, color: win ? G.decision.main : C.muted }}>
                      {Math.round(p.match * grow * 100)}%
                    </div>
                  </div>
                  <div style={{ marginTop: 14, height: 18, background: "#EFECE3", borderRadius: 999, overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${p.match * grow * 100}%`,
                        background: win
                          ? `linear-gradient(90deg, ${G.decision.main}, ${C.gold})`
                          : "#C9C2B2",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      fontSize: 26,
                      color: win ? G.decision.main : C.red,
                      fontWeight: 600,
                      opacity: decide,
                    }}
                  >
                    {win ? `رفعها: ${p.up?.join("، ")}` : `خفّضها: ${p.down?.join("، ")}`}
                  </div>
                </Card>
              </P>
            );
          })}
          <P y={620} o={seg(f, 145, 172)}>
            <Tag ar="نسبة تطابق توضيحية" en="Illustrative Match" tone="muted" />
          </P>
        </Wrap>
      )}
    </Station>

    {/* 06 — تركيب الدرجة */}
    <Station id="a6" top={40} pad={180}>
      {(f) => {
        const g = seg(f, 16, 96);
        return (
          <Wrap>
            <P y={40}>
              <Ring progress={(g * CASE.score) / 100} label={`${Math.round(g * CASE.score)}`} size={340} />
            </P>
            <P y={300} o={seg(f, 60, 92)}>
              <Tag ar="درجة الشخصية" en="Persona Score — Illustrative" tone="gold" size={28} />
            </P>
            <P y={620} o={seg(f, 70, 104)}>
              <Card w={950}>
                <div style={{ fontSize: 30, fontWeight: 700, color: G.decision.main, marginBottom: 10 }}>
                  العوامل المرجّحة{" "}
                  <span dir="ltr" style={{ fontSize: 23, color: C.muted }}>
                    | Weighted Factors
                  </span>
                </div>
                {CASE.scoreParts.map((s, i) => {
                  const o = seg(f, 84 + i * 14, 116 + i * 14);
                  return (
                    <div key={s.en} style={{ marginBottom: 12, opacity: o, fontFamily: FSTACK }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26 }}>
                        <span style={{ fontWeight: 700, color: C.ink }}>
                          {s.ar}{" "}
                          <span dir="ltr" style={{ color: C.muted, fontSize: 21 }}>
                            | {s.en}
                          </span>
                        </span>
                        <span dir="ltr" style={{ fontWeight: 700, color: G.decision.main }}>
                          {s.v} / {s.w}
                        </span>
                      </div>
                      <div style={{ height: 12, background: "#EFECE3", borderRadius: 999, marginTop: 6, overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${(s.v / s.w) * 100 * o}%`,
                            background: `linear-gradient(90deg, ${G.decision.main}, ${G.decision.soft})`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </Card>
            </P>
          </Wrap>
        );
      }}
    </Station>

    {/* 07 — الجاهزية بقيم فعلية */}
    <Station id="a7" top={-90} pad={70}>
      {(f) => (
        <Wrap>
          {CASE.readiness.map((it, i) => {
            const done = seg(f, 22 + i * 16, 40 + i * 16);
            return (
              <P key={it.en} y={-90 + i * 132} o={seg(f, 8 + i * 14, 38 + i * 14)}>
                <Card
                  w={900}
                  style={{ borderColor: done > 0.5 ? G.decision.light : C.line, padding: "18px 26px" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 999,
                        background: done > 0.5 ? G.decision.light : "#F1EFE8",
                        color: G.decision.main,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 27,
                        fontWeight: 700,
                        transform: `scale(${0.9 + done * 0.1})`,
                      }}
                    >
                      {done > 0.5 ? "✓" : ""}
                    </div>
                    <div style={{ flex: 1, fontSize: 31, fontWeight: 700, color: C.ink }}>
                      {it.ar}{" "}
                      <span dir="ltr" style={{ fontSize: 23, color: C.muted, fontWeight: 500 }}>
                        | {it.en}
                      </span>
                    </div>
                    <div style={{ fontSize: 27, fontWeight: 700, color: G.decision.main, opacity: done }}>
                      {it.v}
                    </div>
                  </div>
                </Card>
              </P>
            );
          })}
          <P y={640} o={seg(f, 120, 152)} s={0.9 + seg(f, 120, 152) * 0.1}>
            <Tag ar="جاهز للقرار" en="Decision Ready" tone="gold" size={34} />
          </P>
        </Wrap>
      )}
    </Station>

    {/* 08 — المحرك والبدائل */}
    <Station id="a8" top={-60} pad={90}>
      {(f) => {
        const verdict = seg(f, 140, 182);
        return (
          <Wrap>
            <Lines>
              {[-2, -1, 0, 1, 2].map((k, i) => (
                <PulseTrack
                  key={k}
                  path={track([k * 150, -320], [0, -130], 0.08)}
                  progress={seg(f, 4 + i * 6, 44 + i * 6)}
                  flow={(f * 0.025 + i * 0.2) % 1}
                  color={C.gold}
                  count={2}
                  dot={9}
                />
              ))}
            </Lines>
            <P y={-60} o={seg(f, 14, 46)}>
              <EngineBox glow={seg(f, 40, 84)} />
            </P>
            {CASE.alternatives.map((a, i) => (
              <P key={a.en} y={180 + i * 180} o={seg(f, 50 + i * 14, 84 + i * 14)}>
                <Alt
                  ar={a.ar}
                  en={a.en}
                  fit={a.fit}
                  progress={seg(f, 62 + i * 14, 134 + i * 14)}
                  ok={a.ok}
                  why={a.why}
                  verdict={verdict}
                  width={960}
                />
              </P>
            ))}
          </Wrap>
        );
      }}
    </Station>

    {/* 09 — NBCA مقابل التقليدي */}
    <Station id="a9" top={40} pad={90}>
      {(f) => (
        <Wrap>
          <P y={40} o={seg(f, 8, 40)}>
            <Card w={950} glow={seg(f, 110, 145) > 0.5}>
              <div style={{ fontSize: 34, fontWeight: 700, color: G.action.main, marginBottom: 10 }}>
                حزمة الإجراء لهذا العميل{" "}
                <span dir="ltr" style={{ fontSize: 24, color: C.muted }}>
                  | NBCA
                </span>
              </div>
              {CASE.nbca.map((it, i) => (
                <PackItem
                  key={it.en}
                  ar={it.ar}
                  en={it.en}
                  v={it.v}
                  o={seg(f, 22 + i * 16, 56 + i * 16)}
                />
              ))}
            </Card>
          </P>
          <P y={560} o={seg(f, 116, 150)}>
            <Card w={950} style={{ background: "#FBF7F5", borderColor: "#EBC7BF" }}>
              <div style={{ fontSize: 30, fontWeight: 700, color: C.red }}>
                الأسلوب التقليدي{" "}
                <span dir="ltr" style={{ fontSize: 23, color: C.muted }}>
                  | Traditional
                </span>
              </div>
              <div style={{ fontSize: 28, color: C.ink, marginTop: 10 }}>
                {CASE.traditional.ar}
              </div>
              <div style={{ fontSize: 27, color: C.red, marginTop: 8, fontWeight: 600 }}>
                النتيجة: {CASE.traditional.result}
              </div>
            </Card>
          </P>
          <P y={780} o={seg(f, 152, 184)}>
            <Note ar="نفس العميل — قرار مختلف تمامًا" en="Same Customer, Different Decision" />
          </P>
        </Wrap>
      )}
    </Station>

    {/* 10 — التنفيذ */}
    <Station id="a10" top={-140} pad={90}>
      {(f) => (
        <Wrap>
          <P x={-300} y={150} o={seg(f, 8, 38)}>
            <Phone
              send={seg(f, 34, 58)}
              arrive={seg(f, 58, 84)}
              tap={seg(f, 104, 132)}
              text="مرفق خطاب تسوية: سداد كامل أو على دفعتين."
              time="٨:٣٠ م — الثلاثاء"
            />
          </P>
          {CASE.execution.map((s, i) => (
            <P key={s.en} x={330} y={-140 + i * 140} o={seg(f, 24 + i * 20, 52 + i * 20)}>
              <Card w={520} style={{ padding: "16px 22px" }}>
                <div style={{ fontSize: 27, fontWeight: 700, color: C.ink }}>
                  {s.ar}{" "}
                  <span dir="ltr" style={{ fontSize: 20, color: C.muted }}>
                    | {s.en}
                  </span>
                </div>
                <div style={{ fontSize: 26, fontWeight: 700, color: G.action.main, marginTop: 4 }}>
                  {s.v}
                </div>
              </Card>
            </P>
          ))}
        </Wrap>
      )}
    </Station>

    {/* 11 — النتيجة بالأرقام */}
    <Station id="a11" top={70} pad={70}>
      {(f) => (
        <Wrap>
          {CASE.metrics.map((m, i) => {
            const o = seg(f, 12 + i * 20, 46 + i * 20);
            const g = seg(f, 26 + i * 20, 96 + i * 20);
            return (
              <P key={m.en} y={70 + i * 190} o={o}>
                <Card w={940} style={{ borderColor: G.outcome.light }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{ fontSize: 32, fontWeight: 700, color: C.ink }}>
                      {m.ar}{" "}
                      <span dir="ltr" style={{ fontSize: 23, color: C.muted }}>
                        | {m.en}
                      </span>
                    </div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: G.outcome.main }}>
                      {m.v}
                    </div>
                  </div>
                  <div style={{ marginTop: 12, height: 14, background: "#EFECE3", borderRadius: 999, overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${m.p * g * 100}%`,
                        background: `linear-gradient(90deg, ${G.outcome.main}, ${C.gold})`,
                      }}
                    />
                  </div>
                </Card>
              </P>
            );
          })}
          <P y={860} o={seg(f, 130, 165)}>
            <Note
              ar="سداد ٧٬٤٠٠ ر.س + وعد بالباقي خلال أسبوع"
              en="Partial Payment + Promise to Pay"
            />
          </P>
        </Wrap>
      )}
    </Station>

    {/* 12 — التعلم والتحديث */}
    <Station id="a12" top={130} pad={80}>
      {(f) => {
        const g = seg(f, 24, 100);
        return (
          <Wrap>
            <Lines>
              <PulseTrack
                path={track([420, 470], [0, -180], 0.5)}
                progress={seg(f, 4, 54)}
                flow={(f * 0.02) % 1}
                color={G.learning.main}
                count={5}
              />
            </Lines>
            <P y={130} o={seg(f, 16, 48)}>
              <Card w={950}>
                <div style={{ fontSize: 32, fontWeight: 700, color: G.learning.main, marginBottom: 16 }}>
                  أثر التغذية الراجعة{" "}
                  <span dir="ltr" style={{ fontSize: 24, color: C.muted }}>
                    | Feedback Impact
                  </span>
                </div>
                {CASE.learning.map((l, i) => {
                  const v = l.before + (l.after - l.before) * seg(f, 30 + i * 14, 96 + i * 14);
                  return (
                    <div key={l.en} style={{ marginBottom: 18 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 27 }}>
                        <span style={{ fontWeight: 700, color: C.ink }}>
                          {l.ar}{" "}
                          <span dir="ltr" style={{ color: C.muted, fontSize: 21 }}>
                            | {l.en}
                          </span>
                        </span>
                        <span dir="ltr" style={{ fontWeight: 700, color: G.learning.main }}>
                          {Math.round(l.before * 100)}% → {Math.round(v * 100)}%
                        </span>
                      </div>
                      <div style={{ height: 14, background: "#EFECE3", borderRadius: 999, marginTop: 8, overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${v * 100}%`,
                            background: `linear-gradient(90deg, ${G.learning.main}, ${C.gold})`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </Card>
            </P>
            <P x={-260} y={560} o={seg(f, 110, 140)}>
              <Tag
                ar={`الدرجة: ${Math.round(CASE.score + (CASE.scoreAfter - CASE.score) * g)}`}
                en="Persona Score"

                tone="gold"
              />
            </P>
            <P x={260} y={560} o={seg(f, 126, 156)}>
              <Tag ar="الأولوية: مرتفعة" en="Priority: High" tone="green" />
            </P>
            <P y={720} o={seg(f, 150, 182)}>
              <Card w={950} glow>
                <div style={{ fontSize: 28, color: C.muted }}>
                  الشخصية تصنيف ديناميكي <span dir="ltr">| Dynamic Classification</span>
                </div>
                <div style={{ fontSize: 34, fontWeight: 700, color: C.ink, marginTop: 10 }}>
                  {CASE.personas[0]!.ar} <span style={{ color: C.gold }}>→</span>{" "}
                  {CASE.personaAfter.ar}
                </div>
                <div dir="ltr" style={{ fontSize: 23, color: C.muted, marginTop: 6 }}>
                  {CASE.personas[0]!.en} → {CASE.personaAfter.en}
                </div>
              </Card>
            </P>
          </Wrap>
        );
      }}
    </Station>
  </>
);
