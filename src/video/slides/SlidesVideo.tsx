import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { SlideFrame } from "./SlideFrame";
import { SLIDES } from "./slideData";

export const SLIDES_TOTAL = SLIDES.length;

/** إطار واحد لكل مرحلة — يُستخدم لتصدير 12 صورة PNG */
export const SlidesVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const slide = SLIDES[Math.min(SLIDES.length - 1, Math.max(0, frame))]!;
  return (
    <AbsoluteFill>
      <SlideFrame slide={slide} />
    </AbsoluteFill>
  );
};
