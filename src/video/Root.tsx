import React from "react";
import { Composition } from "remotion";
import { MainVideo, TOTAL } from "./MainVideo";

/** تركيبة واحدة يستخدمها المشغّل الحي داخل الموقع وأي رندر لاحق */
export const RemotionRoot: React.FC = () => (
  <Composition
    id="main"
    component={MainVideo}
    durationInFrames={TOTAL}
    fps={30}
    width={1080}
    height={1920}
  />
);
