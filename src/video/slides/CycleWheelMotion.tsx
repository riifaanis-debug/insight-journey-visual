import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from "remotion";
import { CycleWheel } from "./CycleWheel";

export const INTRO = 45;
export const PER = 88;
export const STAGES = 12;
export const OUTRO = 110;
export const WHEEL_TOTAL = INTRO + PER * STAGES + OUTRO;

export const CycleWheelMotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const intro = interpolate(frame, [0, 26], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const t = frame - INTRO;
  const cycleEnd = PER * STAGES;
  const inCycle = t >= 0 && t < cycleEnd;
  const idx = Math.max(0, Math.min(STAGES - 1, Math.floor(t / PER)));
  const local = t - idx * PER;

  // المؤشّر ينتقل بسلاسة من المرحلة السابقة إلى الحالية ثم يتوقف
  const travel = interpolate(local, [0, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.4, 0, 0.2, 1),
  });
  const headRaw = idx - 1 + travel;
  const head = t < 0 ? -1 : Math.max(-1, headRaw);

  const all = interpolate(frame, [INTRO + cycleEnd + 8, INTRO + cycleEnd + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ringBase = t < 0 ? 0 : Math.min(1, (head + 1) / STAGES);
  const ring = Math.max(ringBase, all);

  const pop = inCycle
    ? spring({ frame: local - 26, fps, config: { damping: 14, stiffness: 170 } })
    : 0;

  const active = inCycle && local >= 22 ? idx : inCycle ? Math.max(0, idx - 1) : -1;

  const breathe = 1 + Math.sin(frame / 26) * 0.004;

  return (
    <div style={{ transform: `scale(${breathe})`, transformOrigin: "center center" }}>
      <CycleWheel
        anim={{
          ring,
          head: Math.max(0, head),
          active: all > 0.5 ? -1 : active,
          pop,
          all,
          intro,
        }}
      />
    </div>
  );
};
