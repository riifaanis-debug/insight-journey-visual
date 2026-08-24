import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "../theme";

export const Bg: React.FC<{ drift?: number }> = ({ drift = 1 }) => {
  const f = useCurrentFrame();
  const y = (f * 0.25 * drift) % 90;
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <AbsoluteFill
        style={{
          backgroundImage: `radial-gradient(1100px 900px at 20% 8%, ${C.white} 0%, rgba(255,255,255,0) 60%), radial-gradient(900px 900px at 90% 92%, ${C.greenLight} 0%, rgba(255,255,255,0) 65%)`,
        }}
      />
      <AbsoluteFill
        style={{
          opacity: 0.5,
          transform: `translateY(${-y}px)`,
          backgroundImage: `linear-gradient(${C.line} 1px, transparent 1px), linear-gradient(90deg, ${C.line} 1px, transparent 1px)`,
          backgroundSize: "90px 90px",
          maskImage:
            "radial-gradient(closest-side at 50% 45%, rgba(0,0,0,0.55), rgba(0,0,0,0) 85%)",
          WebkitMaskImage:
            "radial-gradient(closest-side at 50% 45%, rgba(0,0,0,0.55), rgba(0,0,0,0) 85%)",
        }}
      />
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, rgba(246,243,235,0.9) 0%, rgba(246,243,235,0) 22%, rgba(237,232,219,0) 78%, rgba(237,232,219,0.95) 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
