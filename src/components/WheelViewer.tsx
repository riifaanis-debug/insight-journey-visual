import React from "react";
import { Player } from "@remotion/player";
import { CycleWheelMotion, WHEEL_TOTAL } from "../video/slides/CycleWheelMotion";
import { WW, WH } from "../video/slides/CycleWheel";

export const WheelViewer: React.FC = () => (
  <main
    dir="rtl"
    style={{
      minHeight: "100dvh",
      background: "#0E4B3C",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 12,
    }}
  >
    <div style={{ width: "100%", maxWidth: 900 }}>
      <h1 style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        دائرة الدورة التشغيلية المتحركة
      </h1>
      <Player
        component={CycleWheelMotion}
        durationInFrames={WHEEL_TOTAL}
        fps={30}
        compositionWidth={WW}
        compositionHeight={WH}
        style={{ width: "100%", aspectRatio: "1 / 1", borderRadius: 16, overflow: "hidden" }}
        autoPlay
        loop
        controls
      />
    </div>
  </main>
);
