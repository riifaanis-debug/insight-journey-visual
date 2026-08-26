import React from "react";
import { AbsoluteFill, Audio, Sequence, useCurrentFrame } from "remotion";
import { Bg } from "./components/Bg";
import { FSTACK } from "./font";
import { C, seg } from "./theme";
import { World, useCameraValue } from "./journey/Camera";
import { WorldRing } from "./journey/WorldRing";
import { CycleStations } from "./journey/CycleStations";
import { PersonaStations } from "./journey/PersonaStations";
import { AppliedStations } from "./journey/AppliedStations";
import { ProfileCore } from "./journey/ProfileCore";
import { useProfileState } from "./journey/profileState";
import { Titles, IllustrativeTag } from "./journey/Titles";
import { byId, chapterAt, CHAPTERS, TOTAL, APPLIED_FIRST, APPLIED_LAST } from "./journey/timeline";
import { VO } from "./journey/vo";
import { useLayout } from "./journey/layout";
import { Intro } from "./scenes/Intro";
import { Bridge } from "./scenes/Bridge";
import { AppliedBg } from "./journey/AppliedBg";
import { Finale } from "./scenes/Finale";

export { TOTAL };

/** التعليق الصوتي: مقطع لكل فصل يبدأ مع بدايته */
const Narration: React.FC = () => (
  <>
    {CHAPTERS.filter((c) => VO[c.id]).map((c) => (
      <Sequence key={`vo-${c.id}`} from={c.start} durationInFrames={c.dur}>
        <Audio src={VO[c.id]!} />
      </Sequence>
    ))}
  </>
);


/** الملف المستمر: مثبّت في نطاق ثابت من الشاشة أسفل العناوين */
const ProfileLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const s = useCameraValue((c) => c.profScale, frame) * L.profK;
  const mode = chapterAt(frame).mode;
  const state = useProfileState();
  const intro = byId("intro");
  const fin = byId("finale");
  const opacity =
    seg(frame, intro.end - 40, intro.end + 20) *
    (1 - seg(frame, fin.start - 20, fin.start + 30));
  return (
    <div
      style={{
        position: "absolute",
        left: L.profLeft,
        top: L.profTop,
        transform: `translateX(-50%) scale(${s})`,
        transformOrigin: "50% 0",
        opacity,
        pointerEvents: "none",
      }}
    >
      <ProfileCore {...state} mode={mode} />
    </div>
  );
};


const OverviewCaption: React.FC = () => {
  const f = useCurrentFrame();
  const ch = byId("overview");
  const o = seg(f, ch.start + 60, ch.start + 100) * (1 - seg(f, ch.end - 30, ch.end));
  if (o <= 0.01) return null;
  return (
    <div
      dir="ltr"
      style={{
        position: "absolute",
        bottom: 180,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: FSTACK,
        fontSize: 30,
        fontWeight: 600,
        color: C.green,
        opacity: o,
        lineHeight: 1.6,
      }}
    >
      Data → Understanding → Decision →
      <br />
      Action → Outcome → Learning ↻
    </div>
  );
};

const AppliedBadge: React.FC = () => {
  const f = useCurrentFrame();
  const start = byId(APPLIED_FIRST).start;
  const end = byId(APPLIED_LAST).end;
  const o = seg(f, start - 20, start + 20) * (1 - seg(f, end - 30, end));
  if (o <= 0.01) return null;
  return (
    <div
      dir="rtl"
      style={{
        position: "absolute",
        top: 60,
        right: 80,
        fontFamily: FSTACK,
        fontSize: 30,
        fontWeight: 700,
        color: C.green,
        background: C.greenLight,
        border: "1px solid #BCD8CC",
        borderRadius: 999,
        padding: "10px 24px",
        opacity: o,
      }}
    >
      حالة تطبيقية <span dir="ltr">| Applied Case</span>
    </div>
  );
};

export const Journey: React.FC<{
  /** التعليق الصوتي — يُطفأ في النسخة الصامتة */
  audio?: boolean;
  /** الاقتصار على الدورة التشغيلية (بدون الحالة التطبيقية والختام) */
  cycleOnly?: boolean;
}> = ({ audio = true, cycleOnly = false }) => {
  const frame = useCurrentFrame();
  const intro = byId("intro");
  const bridge = byId("bridge");
  const fin = byId("finale");
  // الجسر بين الجزأين هو المكان الوحيد الذي يخفت فيه العالم قليلاً
  const bridgeDim =
    seg(frame, bridge.start, bridge.start + 22) *
    (1 - seg(frame, bridge.end - 26, bridge.end));
  const worldOpacity =
    seg(frame, intro.end - 50, intro.end + 10) *
    (1 - seg(frame, fin.start + 10, fin.start + 60)) *
    (1 - bridgeDim);
  const illus =
    seg(frame, byId("s05").start, byId("s05").start + 30) *
    (1 - seg(frame, fin.start - 30, fin.start));

  return (
    <AbsoluteFill style={{ fontFamily: FSTACK, backgroundColor: C.bg }}>
      <Bg />
      {cycleOnly ? null : <AppliedBg />}
      <AbsoluteFill style={{ opacity: worldOpacity }}>
        <World>
          <WorldRing />
          <CycleStations />
          <PersonaStations />
          {cycleOnly ? null : <AppliedStations />}
        </World>
        <ProfileLayer />
      </AbsoluteFill>

      {audio ? <Narration /> : null}

      <Titles />

      {cycleOnly ? null : <AppliedBadge />}
      <OverviewCaption />
      <IllustrativeTag opacity={illus} />

      <Sequence from={intro.start} durationInFrames={intro.dur + 20}>
        <FadeOut hold={intro.dur - 24}>
          <Intro />
        </FadeOut>
      </Sequence>

      {cycleOnly ? null : (
        <>
          <Sequence from={bridge.start} durationInFrames={bridge.dur + 20}>
            <FadeOut hold={bridge.dur - 34} fadeIn>
              <Bridge />
            </FadeOut>
          </Sequence>

          <Sequence from={fin.start} durationInFrames={fin.dur}>
            <FadeOut hold={fin.dur} fadeIn>
              <Finale />
            </FadeOut>
          </Sequence>
        </>
      )}
    </AbsoluteFill>
  );
};

export const MainVideo: React.FC = () => <Journey />;

/** fade مسموح فقط للبداية والانتقال بين الجزأين والختام */
const FadeOut: React.FC<{
  hold: number;
  fadeIn?: boolean;
  children: React.ReactNode;
}> = ({ hold, fadeIn, children }) => {
  const f = useCurrentFrame();
  const o =
    (fadeIn ? seg(f, 0, 18) : 1) * (1 - seg(f, hold, hold + 22));
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

export const CHAPTER_LIST = CHAPTERS;
