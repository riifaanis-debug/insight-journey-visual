import { interpolate, spring } from "remotion";

export const C = {
  bg: "#F6F3EB",
  bg2: "#EDE8DB",
  green: "#0E4B3C",
  greenSoft: "#146B54",
  greenLight: "#DCEAE3",
  gold: "#C39A3E",
  goldSoft: "#E9D8A8",
  ink: "#1C2622",
  muted: "#6B7A73",
  line: "#D9D2C2",
  white: "#FFFFFF",
  red: "#B04A3A",
};

export const FONT_AR = "font-ar";
export const EASE = [0.22, 1, 0.36, 1] as const;

export const appear = (frame: number, delay = 0, dur = 22) =>
  interpolate(frame, [delay, delay + dur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => 1 - Math.pow(1 - t, 3),
  });

export const rise = (frame: number, delay = 0, px = 40) =>
  interpolate(appear(frame, delay), [0, 1], [px, 0]);

export const pop = (frame: number, fps: number, delay = 0, damping = 16) =>
  spring({ frame: frame - delay, fps, config: { damping, stiffness: 180 } });

export const seg = (frame: number, from: number, to: number) =>
  interpolate(frame, [from, to], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  });

export const breathe = (frame: number, amp = 6, speed = 0.02) =>
  Math.sin(frame * speed) * amp;
