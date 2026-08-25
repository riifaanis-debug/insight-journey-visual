import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Journey } from "./MainVideo";
import { LayoutProvider, LANDSCAPE } from "./journey/layout";
import { byId } from "./journey/timeline";
import { C, seg } from "./theme";

/** مدة نسخة الدورة التشغيلية: من المقدمة حتى نهاية المراجعة العامة */
export const CYCLE_TOTAL = byId("overview").end;

/** نسخة أفقية 1920×1080 للدورة التشغيلية فقط — بدون صوت */
export const CycleVideo: React.FC = () => {
  const f = useCurrentFrame();
  const out = seg(f, CYCLE_TOTAL - 45, CYCLE_TOTAL - 5);
  return (
    <LayoutProvider value={LANDSCAPE}>
      <AbsoluteFill style={{ backgroundColor: C.bg }}>
        <Journey audio={false} cycleOnly />
        <AbsoluteFill
          style={{ backgroundColor: C.bg, opacity: out, pointerEvents: "none" }}
        />
      </AbsoluteFill>
    </LayoutProvider>
  );
};
