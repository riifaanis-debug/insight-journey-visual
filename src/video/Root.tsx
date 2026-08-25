import React from "react";
import { Composition } from "remotion";
import { MainVideo, TOTAL } from "./MainVideo";
import { CycleVideo, CYCLE_TOTAL } from "./CycleVideo";

/** تركيبة واحدة يستخدمها المشغّل الحي داخل الموقع وأي رندر لاحق */
export const RemotionRoot: React.FC = () => (
  <>
    <Composition
      id="main"
      component={MainVideo}
      durationInFrames={TOTAL}
      fps={30}
      width={1080}
      height={1920}
    />
    <Composition
      id="cycle-landscape"
      component={CycleVideo}
      durationInFrames={CYCLE_TOTAL}
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
