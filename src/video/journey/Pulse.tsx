import React from "react";
import { C } from "../theme";

/** cubic bezier point */
const bez = (
  t: number,
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
): [number, number] => {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const c = 3 * u * t * t;
  const d = t * t * t;
  return [
    a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0],
    a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1],
  ];
};

export type Path = {
  p0: [number, number];
  p1: [number, number];
  p2: [number, number];
  p3: [number, number];
};

export const curve = (
  from: [number, number],
  to: [number, number],
  bow = 0.35,
): Path => {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  return {
    p0: from,
    p1: [from[0] + dx * 0.15 - dy * bow, from[1] + dy * 0.35 + dx * bow * 0.3],
    p2: [to[0] - dx * 0.15 - dy * bow * 0.4, to[1] - dy * 0.35 + dx * bow * 0.1],
    p3: to,
  };
};

export const pathD = (p: Path) =>
  `M ${p.p0[0]} ${p.p0[1]} C ${p.p1[0]} ${p.p1[1]}, ${p.p2[0]} ${p.p2[1]}, ${p.p3[0]} ${p.p3[1]}`;

/**
 * Data pulses that physically travel along a bezier path.
 * `progress` reveals the track, `flow` drives the travelling dots.
 */
export const PulseTrack: React.FC<{
  path: Path;
  progress: number;
  flow: number;
  color?: string;
  count?: number;
  dot?: number;
  width?: number;
  dashed?: boolean;
}> = ({
  path,
  progress,
  flow,
  color = C.greenSoft,
  count = 3,
  dot = 13,
  width = 3,
  dashed,
}) => {
  const len = 2600;
  return (
    <>
      <path
        d={pathD(path)}
        stroke={color}
        strokeOpacity={0.35}
        strokeWidth={width}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={dashed ? "14 16" : len}
        strokeDashoffset={dashed ? 0 : len * (1 - progress)}
        opacity={dashed ? progress : 1}
      />
      {progress > 0.02 &&
        new Array(count).fill(0).map((_, i) => {
          const t = ((flow + i / count) % 1) * progress;
          const [x, y] = bez(t, path.p0, path.p1, path.p2, path.p3);
          const fade = Math.sin(Math.min(1, t / progress) * Math.PI);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={dot}
              fill={color}
              opacity={0.25 + 0.75 * fade}
            />
          );
        })}
    </>
  );
};

export const Svg: React.FC<{
  w: number;
  h: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ w, h, children, style }) => (
  <svg
    width={w}
    height={h}
    viewBox={`${-w / 2} ${-h / 2} ${w} ${h}`}
    style={{
      position: "absolute",
      left: "50%",
      top: "50%",
      transform: "translate(-50%,-50%)",
      overflow: "visible",
      ...style,
    }}
  >
    {children}
  </svg>
);
