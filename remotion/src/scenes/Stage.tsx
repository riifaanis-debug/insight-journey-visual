import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { StageHeader } from "../components/Ui";
import { appear, breathe } from "../theme";

export const Stage: React.FC<{
  index: string;
  ar: string;
  en: string;
  desc: string;
  children: React.ReactNode;
}> = ({ index, ar, en, desc, children }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <StageHeader index={index} ar={ar} en={en} desc={desc} />
      <div
        style={{
          position: "absolute",
          top: 480,
          bottom: 300,

          left: 70,
          right: 70,
          opacity: appear(f, 10, 26),
          transform: `translateY(${breathe(f, 5, 0.018)}px)`,
        }}
      >
        {children}
      </div>
    </AbsoluteFill>
  );
};

export const Center: React.FC<{ children: React.ReactNode; gap?: number }> = ({
  children,
  gap = 0,
}) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap,
    }}
  >
    {children}
  </div>
);
