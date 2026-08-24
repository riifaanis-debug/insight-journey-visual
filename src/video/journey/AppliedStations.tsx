import React from "react";
import { C, seg } from "../theme";
import { Station } from "./Station";
import { Wrap, P, Lines, track, PulseTrack, Pod, Card, Tag, Note } from "./stationKit";
import { Gauge, Alt, EngineBox, PackItem, Phone } from "./widgets";
import { CASE } from "./caseData";
import { LANES } from "./ProfileCore";

const SRC = [
  { ar: "١٢٬٤٠٠ ر.س متأخرة", en: "Past Due", i: 0 },
  { ar: "٤ من ٦ في الموعد", en: "Payment History", i: 1 },
  { ar: "٣ اتصالات بلا رد", en: "No Answer ×3", i: 2 },
];

export const AppliedStations: React.FC = () => (
  <>
    {/* الحالة — الملف */}
    <Station id="a1">
      {(f) => (
        <Wrap>
          <Lines>
            {SRC.map((s, i) => (
              <PulseTrack
                key={s.en}
                path={track([(i - 1) * 400, 430], [0, -150], 0.18)}
                progress={seg(f, 12 + i * 8, 58 + i * 8)}
                flow={(f * 0.014 + i * 0.33) % 1}
                color={LANES[i]!.color}
                count={4}
              />
            ))}
          </Lines>
          {SRC.map((s, i) => (
            <P key={s.en} x={(i - 1) * 400} y={520} o={seg(f, 6 + i * 6, 32 + i * 6)}>
              <Pod ar={s.ar} en={s.en} color={LANES[i]!.color} />
            </P>
          ))}
          <P y={700} o={seg(f, 100, 130)}>
            <Note
              ar="نفس المكوّنات — لكن بأرقام هذا العميل"
              en="Same Components, Real Values"
            />
          </P>
        </Wrap>
      )}
    </Station>

    {/* الحالة — الأبعاد */}
    <Station id="a2">
      {(f) => (
        <Wrap>
          <Lines>
            {CASE.dims.map((_, i) => {
              const a = (-90 + (360 / 7) * i) * (Math.PI / 180);
              return (
                <PulseTrack
                  key={i}
                  path={track([0, 0], [Math.cos(a) * 560, Math.sin(a) * 640], 0.05)}
                  progress={seg(f, 6 + i * 6, 44 + i * 6)}
                  flow={(f * 0.018 + i * 0.2) % 1}
                  color={C.greenSoft}
                  count={2}
                  dot={8}
                />
              );
            })}
          </Lines>
          {CASE.dims.map((d, i) => {
            const a = (-90 + (360 / 7) * i) * (Math.PI / 180);
            const hi = d.v > 0.8 || d.v < 0.4 ? seg(f, 120, 150) : 0;
            return (
              <P
                key={d.en}
                x={Math.cos(a) * 620}
                y={Math.sin(a) * 700}
                o={seg(f, 16 + i * 6, 50 + i * 6)}
              >
                <Gauge
                  ar={d.ar}
                  en={d.en}
                  v={d.v}
                  progress={seg(f, 26 + i * 6, 104 + i * 6)}
                  size={180}
                  note={seg(f, 96 + i * 4, 124 + i * 4) > 0.5 ? d.note : undefined}
                  highlight={hi}
                />
              </P>
            );
          })}
        </Wrap>
      )}
    </Station>

    {/* الحالة — الشخصية */}
    <Station id="a3">
      {(f) => (
        <Wrap>
          {CASE.personas.map((p, i) => {
            const grow = seg(f, 14 + i * 10, 82 + i * 10);
            const decide = seg(f, 96, 132);
            const win = i === 0;
            return (
              <P
                key={p.en}
                y={-60 + i * 190}
                o={seg(f, 6 + i * 10, 36 + i * 10) * (win ? 1 : 1 - decide * 0.55)}
                s={win ? 1 + decide * 0.05 : 1 - decide * 0.05}
              >
                <Card w={920} glow={win && decide > 0.4}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <div style={{ fontSize: 28, fontWeight: 700, color: C.ink }}>
                      {p.ar}{" "}
                      <span dir="ltr" style={{ fontSize: 20, color: C.muted }}>
                        | {p.en}
                      </span>
                    </div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: win ? C.green : C.muted }}>
                      {Math.round(p.match * grow * 100)}%
                    </div>
                  </div>
                  <div style={{ marginTop: 12, height: 14, background: "#EFECE3", borderRadius: 999, overflow: "hidden" }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${p.match * grow * 100}%`,
                        background: win ? `linear-gradient(90deg, ${C.green}, ${C.gold})` : "#C9C2B2",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: 10,
                      fontSize: 21,
                      color: win ? C.green : C.red,
                      fontWeight: 600,
                      opacity: decide,
                    }}
                  >
                    {win
                      ? `رفعها: ${p.up?.join("، ")}`
                      : `خفّضها: ${p.down?.join("، ")}`}
                  </div>
                </Card>
              </P>
            );
          })}
          <P y={580} o={seg(f, 132, 158)}>
            <Tag ar="نسبة تطابق توضيحية" en="Illustrative Match" tone="muted" />
          </P>
        </Wrap>
      )}
    </Station>

    {/* الحالة — المحرك والبدائل */}
    <Station id="a4">
      {(f) => {
        const verdict = seg(f, 120, 158);
        return (
          <Wrap>
            <Lines>
              {[-2, -1, 0, 1, 2].map((k, i) => (
                <PulseTrack
                  key={k}
                  path={track([k * 150, -300], [0, -120], 0.08)}
                  progress={seg(f, 4 + i * 5, 40 + i * 5)}
                  flow={(f * 0.025 + i * 0.2) % 1}
                  color={C.gold}
                  count={2}
                  dot={9}
                />
              ))}
            </Lines>
            <P y={-40} o={seg(f, 14, 44)}>
              <EngineBox glow={seg(f, 36, 74)} />
            </P>
            {CASE.alternatives.map((a, i) => (
              <P key={a.en} y={170 + i * 168} o={seg(f, 44 + i * 12, 74 + i * 12)}>
                <Alt
                  ar={a.ar}
                  en={a.en}
                  fit={a.fit}
                  progress={seg(f, 54 + i * 12, 118 + i * 12)}
                  ok={a.ok}
                  why={a.why}
                  verdict={verdict}
                  width={940}
                />
              </P>
            ))}
          </Wrap>
        );
      }}
    </Station>

    {/* الحالة — NBCA مقابل التقليدي */}
    <Station id="a5">
      {(f) => (
        <Wrap>
          <P y={60} o={seg(f, 8, 38)}>
            <Card w={900} glow={seg(f, 100, 130) > 0.5}>
              <div style={{ fontSize: 30, fontWeight: 700, color: C.green, marginBottom: 8 }}>
                حزمة الإجراء لهذا العميل{" "}
                <span dir="ltr" style={{ fontSize: 21, color: C.muted }}>
                  | NBCA
                </span>
              </div>
              {CASE.nbca.map((it, i) => (
                <PackItem
                  key={it.en}
                  ar={it.ar}
                  en={it.en}
                  v={it.v}
                  o={seg(f, 20 + i * 14, 50 + i * 14)}
                />
              ))}
            </Card>
          </P>
          <P y={520} o={seg(f, 104, 138)}>
            <Card w={900} style={{ background: "#FBF7F5", borderColor: "#EBC7BF" }}>
              <div style={{ fontSize: 25, fontWeight: 700, color: C.red }}>
                الأسلوب التقليدي{" "}
                <span dir="ltr" style={{ fontSize: 20, color: C.muted }}>
                  | Traditional
                </span>
              </div>
              <div style={{ fontSize: 24, color: C.ink, marginTop: 8 }}>
                {CASE.traditional.ar}
              </div>
              <div style={{ fontSize: 22, color: C.red, marginTop: 6, fontWeight: 600 }}>
                النتيجة: {CASE.traditional.result}
              </div>
            </Card>
          </P>
          <P y={700} o={seg(f, 132, 160)}>
            <Note ar="نفس العميل — قرار مختلف تمامًا" en="Same Customer, Different Decision" />
          </P>
        </Wrap>
      )}
    </Station>

    {/* الحالة — التنفيذ والنتيجة */}
    <Station id="a6">
      {(f) => (
        <Wrap>
          <P x={-280} y={130} o={seg(f, 8, 36)}>
            <Phone
              send={seg(f, 30, 52)}
              arrive={seg(f, 52, 76)}
              tap={seg(f, 92, 118)}
              text="تذكير: مستحق ١٢٬٤٠٠ ر.س. يمكنك السداد الآن أو على دفعتين."
              time="٨:٣٠ م — الثلاثاء"
            />
          </P>
          {CASE.outcome.map((o, i) => (
            <P key={o.en} x={320} y={-60 + i * 170} o={seg(f, 60 + i * 22, 90 + i * 22)}>
              <Card w={520}>
                <div style={{ fontSize: 25, fontWeight: 700, color: C.ink }}>
                  {o.ar}{" "}
                  <span dir="ltr" style={{ fontSize: 19, color: C.muted }}>
                    | {o.en}
                  </span>
                </div>
                <div style={{ fontSize: 24, fontWeight: 700, color: C.green, marginTop: 6 }}>
                  {o.v}
                </div>
              </Card>
            </P>
          ))}
        </Wrap>
      )}
    </Station>

    {/* الحالة — قبل وبعد */}
    <Station id="a7">
      {(f) => {
        const g = seg(f, 24, 96);
        return (
          <Wrap>
            <Lines>
              <PulseTrack
                path={track([420, 470], [0, -180], 0.5)}
                progress={seg(f, 4, 50)}
                flow={(f * 0.02) % 1}
                color={C.gold}
                count={5}
              />
            </Lines>
            <P y={140} o={seg(f, 16, 44)}>
              <Card w={920}>
                <div style={{ fontSize: 27, fontWeight: 700, color: C.ink, marginBottom: 14 }}>
                  أثر التغذية الراجعة{" "}
                  <span dir="ltr" style={{ fontSize: 20, color: C.muted }}>
                    | Feedback Impact
                  </span>
                </div>
                {CASE.learning.map((l, i) => {
                  const v = l.before + (l.after - l.before) * seg(f, 30 + i * 12, 90 + i * 12);
                  return (
                    <div key={l.en} style={{ marginBottom: 16 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22 }}>
                        <span style={{ fontWeight: 700, color: C.ink }}>
                          {l.ar}{" "}
                          <span dir="ltr" style={{ color: C.muted, fontSize: 18 }}>
                            | {l.en}
                          </span>
                        </span>
                        <span dir="ltr" style={{ fontWeight: 700, color: C.green }}>
                          {Math.round(l.before * 100)}% → {Math.round(v * 100)}%
                        </span>
                      </div>
                      <div style={{ height: 12, background: "#EFECE3", borderRadius: 999, marginTop: 6, overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${v * 100}%`,
                            background: `linear-gradient(90deg, ${C.green}, ${C.gold})`,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </Card>
            </P>
            <P x={-250} y={520} o={seg(f, 100, 128)}>
              <Tag
                ar={`الدرجة ${Math.round(74 + (CASE.scoreAfter - 74) * g)}`}
                en="Persona Score 74 → 81"
                tone="gold"
              />
            </P>
            <P x={250} y={520} o={seg(f, 116, 144)}>
              <Tag ar="الأولوية: مرتفعة" en="Priority: High" tone="green" />
            </P>
            <P y={660} o={seg(f, 132, 162)}>
              <Card w={920} glow>
                <div style={{ fontSize: 25, color: C.muted }}>
                  الشخصية تصنيف ديناميكي{" "}
                  <span dir="ltr">| Dynamic Classification</span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 700, color: C.ink, marginTop: 8 }}>
                  {CASE.personas[0]!.ar}{" "}
                  <span style={{ color: C.gold }}>→</span> {CASE.personaAfter.ar}
                </div>
                <div dir="ltr" style={{ fontSize: 20, color: C.muted, marginTop: 4 }}>
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
