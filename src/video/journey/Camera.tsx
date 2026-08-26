import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { CHAPTERS, TRANS, type Chapter } from "./timeline";
import { useLayout } from "./layout";

const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/**
 * Continuous camera: never cuts. Between chapters the camera glides
 * (translate + zoom) from the previous station to the next one.
 */
export const useCameraValue = (
  pick: (c: Chapter) => number,
  frame: number,
): number => {
  const frames: number[] = [];
  const values: number[] = [];
  CHAPTERS.forEach((c, i) => {
    const v = pick(c);
    if (i === 0) {
      frames.push(0);
      values.push(v);
    } else {
      frames.push(c.start);
      values.push(pick(CHAPTERS[i - 1]!));
      frames.push(c.start + TRANS);
      values.push(v);
    }
    frames.push(c.end - 1);
    values.push(v);
  });
  // strictly increasing guard
  for (let i = 1; i < frames.length; i++) {
    if (frames[i]! <= frames[i - 1]!) frames[i] = frames[i - 1]! + 1;
  }
  return interpolate(frame, frames, values, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: easeInOut,
  });
};

export const useCamera = () => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const x = useCameraValue((c) => c.camX, frame);
  const y = useCameraValue((c) => c.camY, frame);
  const zoom = useCameraValue((c) => c.zoom * L.zoomK(c), frame);
  return { x, y, zoom };
};

export const World: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { x, y, zoom } = useCamera();
  const L = useLayout();
  const frame = useCurrentFrame();
  const cy = useCameraValue(
    (c) => (c.station === null && !c.pos ? L.camCYCenter : L.camCY),
    frame,
  );
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 0,
          height: 0,
          transform: `translate(${L.camCX - x * zoom}px, ${cy - y * zoom}px) scale(${zoom})`,
          transformOrigin: "0 0",
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

/** places children at a world coordinate, centred */
export const At: React.FC<{
  x: number;
  y: number;
  opacity?: number;
  scale?: number;
  children: React.ReactNode;
  width?: number;
}> = ({ x, y, opacity = 1, scale = 1, width = 1100, children }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width,
      transform: `translate(-50%,-50%) scale(${scale})`,
      opacity,
      pointerEvents: "none",
    }}
  >
    {children}
  </div>
);
