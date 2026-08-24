import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C, seg } from "../theme";
import { FSTACK } from "../font";
import lobby from "../assets/bank-lobby.jpg";

/**
 * الفاصل البصري بين الدورة التشغيلية والحالة التطبيقية:
 * لقطة مصرفية فاخرة + نص كبير يدخل على مراحل.
 */
export const Bridge: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = 1.08 + seg(f, 0, 190) * 0.1;
  const line = seg(f, 36, 96);
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: C.bg }}>
      <AbsoluteFill
        style={{
          backgroundImage: `url(${lobby})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(${zoom})`,
          filter: "saturate(0.92)",
        }}
      />
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(180deg, rgba(246,243,235,0.94) 0%, rgba(246,243,235,0.72) 34%, rgba(14,45,38,0.60) 100%)",
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
          fontFamily: FSTACK,
        }}
      >
        <div
          dir="rtl"
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: C.gold,
            letterSpacing: 6,
            opacity: seg(f, 8, 34),
          }}
        >
          الجزء الثاني <span dir="ltr">| Part Two</span>
        </div>

        <div
          dir="rtl"
          style={{
            marginTop: 26,
            fontSize: 150,
            fontWeight: 700,
            color: C.green,
            lineHeight: 1.1,
            textAlign: "center",
            opacity: seg(f, 18, 52),
            transform: `translateY(${(1 - seg(f, 18, 52)) * 46}px)`,
          }}
        >
          حالة تطبيقية
        </div>

        <div
          style={{
            marginTop: 30,
            width: line * 560,
            height: 6,
            background: `linear-gradient(90deg, ${C.gold}, ${C.green})`,
            borderRadius: 99,
          }}
        />

        <div
          dir="ltr"
          style={{
            marginTop: 30,
            fontSize: 62,
            fontWeight: 700,
            color: C.ink,
            opacity: seg(f, 60, 96),
          }}
        >
          Applied Case
        </div>

        <div
          dir="rtl"
          style={{
            marginTop: 60,
            fontSize: 46,
            fontWeight: 700,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.6,
            opacity: seg(f, 96, 132),
            textShadow: "0 6px 24px rgba(0,0,0,0.35)",
          }}
        >
          لنشاهد <span dir="ltr">Collection Persona Framework™</span>
          <br /> أثناء العمل على عميل واحد
        </div>
        <div
          dir="ltr"
          style={{
            marginTop: 16,
            fontSize: 34,
            fontWeight: 600,
            color: C.goldSoft,
            opacity: seg(f, 116, 150),
            textShadow: "0 6px 24px rgba(0,0,0,0.35)",
          }}
        >
          See the Framework in Action
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
