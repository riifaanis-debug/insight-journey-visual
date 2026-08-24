import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, seg } from "../theme";
import bridgeImg from "../assets/applied-bridge.jpg";

/**
 * الفاصل البصري بين الدورة التشغيلية والحالة التطبيقية:
 * لقطة كاملة كما هي، مع حركة كاميرا بطيئة فقط.
 */
export const Bridge: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = 1.02 + seg(f, 0, 200) * 0.06;
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: C.bg }}>
      <AbsoluteFill
        style={{
          backgroundImage: `url(${bridgeImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(${zoom})`,
        }}
      />
    </AbsoluteFill>
  );
};
