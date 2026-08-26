import React from "react";
import { FAR, FEN } from "../font";
import { Glyph, IconBadge, hexA } from "./icons";
import type { Slide } from "./slideData";

export const W = 1280;
export const H = 1920;

const CREAM = "#FBF7EF";
const CREAM2 = "#F4EFE3";
const GREEN = "#0E4B3C";
const GOLD = "#C39A3E";
const INK = "#233029";
const MUTED = "#54655C";

const CX = 640;
const CY = 975;
const RX = 592;
const RY = 560;

const ringPoint = (deg: number) => {
  const r = (deg * Math.PI) / 180;
  return { x: CX + RX * Math.cos(r), y: CY + RY * Math.sin(r) };
};

export const SlideFrame: React.FC<{ slide: Slide }> = ({ slide }) => {
  const s = slide;
  const dots = [180, 235, 305, 0, 55, 125];
  return (
    <div
      style={{
        width: W,
        height: H,
        position: "relative",
        background: `linear-gradient(180deg, ${CREAM} 0%, ${CREAM} 78%, ${CREAM2} 100%)`,
        overflow: "hidden",
        fontFamily: `${FAR}, ${FEN}, sans-serif`,
      }}
    >
      {/* الحلقة الذهبية */}
      <svg width={W} height={H} style={{ position: "absolute", inset: 0 }}>
        <ellipse
          cx={CX}
          cy={CY}
          rx={RX}
          ry={RY}
          fill="none"
          stroke={GOLD}
          strokeWidth={5}
          opacity={0.95}
        />
        {dots.map((d) => {
          const p = ringPoint(d);
          return (
            <circle
              key={d}
              cx={p.x}
              cy={p.y}
              r={16}
              fill="#FFFFFF"
              stroke={GOLD}
              strokeWidth={5}
            />
          );
        })}
        {/* الدائرة المنقّطة حول المركز */}
        <circle
          cx={CX}
          cy={CY}
          r={195}
          fill="none"
          stroke={INK}
          strokeWidth={4}
          strokeDasharray="2 14"
          strokeLinecap="round"
          opacity={0.55}
        />
        {/* مسارات منقّطة من الأيقونات إلى المركز */}
        <path
          d={`M 330 790 C 430 830, 430 900, 448 950`}
          fill="none"
          stroke={INK}
          strokeWidth={4}
          strokeDasharray="2 14"
          strokeLinecap="round"
          opacity={0.5}
        />
        <path
          d={`M 330 1130 C 420 1120, 425 1080, 448 1035`}
          fill="none"
          stroke={INK}
          strokeWidth={4}
          strokeDasharray="2 14"
          strokeLinecap="round"
          opacity={0.5}
        />
        <path
          d={`M 950 790 C 850 830, 850 900, 832 950`}
          fill="none"
          stroke={INK}
          strokeWidth={4}
          strokeDasharray="2 14"
          strokeLinecap="round"
          opacity={0.5}
        />
        <path
          d={`M 950 1130 C 860 1120, 855 1080, 832 1035`}
          fill="none"
          stroke={INK}
          strokeWidth={4}
          strokeDasharray="2 14"
          strokeLinecap="round"
          opacity={0.5}
        />
      </svg>

      {/* العنوان العام */}
      <div style={{ position: "absolute", top: 62, width: "100%", textAlign: "center" }}>
        <div
          style={{
            fontFamily: `${FEN}, sans-serif`,
            fontSize: 66,
            fontWeight: 800,
            color: GREEN,
            letterSpacing: -1,
          }}
        >
          Collection Persona Framework
          <span style={{ fontSize: 30, verticalAlign: "super" }}>TM</span>
        </div>
        <div
          dir="rtl"
          style={{
            marginTop: 12,
            fontSize: 40,
            fontWeight: 600,
            color: "#2C6455",
          }}
        >
          الدورة التشغيلية
          <span style={{ color: GOLD, margin: "0 16px" }}>|</span>
          <span style={{ fontFamily: `${FEN}, sans-serif` }}>Operating Cycle</span>
        </div>
      </div>

      {/* بطاقة عنوان المرحلة */}
      <div
        style={{
          position: "absolute",
          top: 382,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 26,
          background: "#FFFFFF",
          borderRadius: 26,
          padding: "22px 34px",
          boxShadow: "0 14px 34px rgba(20,50,40,.10)",
          border: `1px solid ${hexA(GOLD, 0.25)}`,
          minWidth: 620,
          justifyContent: "center",
        }}
      >
        <div dir="rtl" style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: s.ar.length > 20 ? 46 : 54,
              fontWeight: 800,
              color: GREEN,
              lineHeight: 1.15,
              whiteSpace: "nowrap",
            }}
          >
            {s.ar}
          </div>
          <div
            style={{
              fontFamily: `${FEN}, sans-serif`,
              fontSize: s.en.length > 22 ? 34 : 42,
              fontWeight: 700,
              color: GREEN,
              marginTop: 4,
              whiteSpace: "nowrap",
            }}
          >
            {s.en}
          </div>
        </div>

        <div
          style={{
            width: 82,
            height: 82,
            borderRadius: "50%",
            background: `linear-gradient(150deg, #EBC163 0%, ${GOLD} 100%)`,
            color: "#FFFFFF",
            fontFamily: `${FEN}, sans-serif`,
            fontSize: 46,
            fontWeight: 800,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 8px 18px ${hexA(GOLD, 0.4)}`,
            border: "3px solid rgba(255,255,255,.9)",
            flexShrink: 0,
          }}
        >
          {s.num}
        </div>
      </div>

      {/* الوصف ثنائي اللغة */}
      <div
        style={{
          position: "absolute",
          top: 572,
          left: 372,
          width: 536,

          textAlign: "center",
        }}
      >
        <div dir="rtl" style={{ fontSize: 34, lineHeight: 1.5, color: INK, fontWeight: 600 }}>
          {s.descAr}
        </div>
        <div
          style={{
            width: 120,
            height: 3,
            background: GOLD,
            margin: "18px auto",
            borderRadius: 2,
            opacity: 0.8,
          }}
        />
        <div
          style={{
            fontFamily: `${FEN}, sans-serif`,
            fontSize: 30,
            lineHeight: 1.45,
            color: MUTED,
            fontWeight: 500,
          }}
        >
          {s.descEn}
        </div>
      </div>

      {/* العناصر الأربعة */}
      <Item item={s.items[0]} x={240} y={700} />
      <Item item={s.items[1]} x={240} y={1040} />
      <Item item={s.items[2]} x={1040} y={700} />
      <Item item={s.items[3]} x={1040} y={1040} />

      {/* العنصر المركزي */}
      <div
        style={{
          position: "absolute",
          left: CX - 118,
          top: CY - 118,
          width: 236,
          height: 236,
          borderRadius: "50%",
          background: "#FFFFFF",
          border: `4px solid ${hexA(s.center.color, 0.35)}`,
          boxShadow: `0 18px 40px ${hexA(s.center.color, 0.22)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Glyph k={s.center.k} size={126} color={s.center.color} />
      </div>

      {/* بطاقة النتيجة */}
      <div
        style={{
          position: "absolute",
          left: 320,
          top: 1252,
          width: 640,

          background: "#FFFFFFEE",
          borderRadius: 22,
          padding: "58px 34px 26px",
          textAlign: "center",
          boxShadow: "0 12px 30px rgba(20,50,40,.08)",
          border: `1px solid ${hexA(GOLD, 0.2)}`,
        }}
      >
        <div dir="rtl" style={{ fontSize: 31, fontWeight: 700, color: INK, lineHeight: 1.45 }}>
          {s.resultAr}
        </div>
        <div
          style={{
            fontFamily: `${FEN}, sans-serif`,
            fontSize: 27,
            color: MUTED,
            marginTop: 12,
            lineHeight: 1.4,
          }}
        >
          {s.resultEn}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: CX - 42,
          top: 1210,
          width: 84,
          height: 84,
          borderRadius: "50%",
          background: "linear-gradient(150deg,#4CAF50 0%, #2E7D32 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 18px rgba(46,125,50,.35)",
          border: "3px solid #FFFFFF",
        }}
      >
        <svg width={46} height={46} viewBox="0 0 32 32">
          <path
            d="M8 16.5l5.5 5.5L24 11"
            fill="none"
            stroke="#fff"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* بطاقة الخلاصة */}
      <div
        style={{
          position: "absolute",
          left: 250,
          top: 1530,
          width: 780,

          background: "#FFFFFFEE",
          borderRadius: 22,
          padding: "26px 32px",
          display: "flex",
          alignItems: "center",
          gap: 26,
          boxShadow: "0 12px 30px rgba(20,50,40,.08)",
          border: `1px solid ${hexA(GOLD, 0.2)}`,
        }}
      >
        <IconBadge k={s.summaryIcon} color={GOLD} size={104} />
        <div style={{ flex: 1, textAlign: "center" }}>
          <div dir="rtl" style={{ fontSize: 32, fontWeight: 700, color: INK }}>
            {s.summaryAr}
          </div>
          <div
            style={{
              width: 96,
              height: 2,
              background: GOLD,
              margin: "12px auto",
              opacity: 0.75,
            }}
          />
          <div style={{ fontFamily: `${FEN}, sans-serif`, fontSize: 27, color: MUTED }}>
            {s.summaryEn}
          </div>
        </div>
      </div>

      {/* الشريط السفلي */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 62,
          display: "flex",
          alignItems: "center",
          padding: "0 46px",
          gap: 26,
        }}
      >
        <CircleBtn kind="pause" />
        <div style={{ flex: 1, position: "relative", height: 74 }}>
          <div
            style={{
              position: "absolute",
              left: 12,
              right: 12,
              top: 16,
              height: 4,
              background: "#DED8C9",
              borderRadius: 2,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            {SLIDE_NUMS.map((n) => {
              const on = n === s.num;
              return (
                <div
                  key={n}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 46,
                  }}
                >
                  <div
                    style={{
                      width: on ? 26 : 16,
                      height: on ? 26 : 16,
                      marginTop: on ? 5 : 10,
                      borderRadius: "50%",
                      background: on ? "#FFFFFF" : "#CFC8B8",
                      border: on ? `5px solid ${GOLD}` : "none",
                    }}
                  />
                  <div
                    style={{
                      marginTop: 12,
                      fontFamily: `${FEN}, sans-serif`,
                      fontSize: 26,
                      fontWeight: on ? 800 : 500,
                      color: on ? GOLD : "#9AA69F",
                    }}
                  >
                    {n}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <CircleBtn kind="play" />
      </div>
    </div>
  );
};

const SLIDE_NUMS = Array.from({ length: 12 }, (_, i) => i + 1);

const CircleBtn: React.FC<{ kind: "play" | "pause" }> = ({ kind }) => (
  <div
    style={{
      width: 92,
      height: 92,
      borderRadius: "50%",
      background: "#FFFFFF",
      boxShadow: "0 8px 20px rgba(20,50,40,.10)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    {kind === "pause" ? (
      <svg width={38} height={38} viewBox="0 0 32 32">
        <rect x="8" y="5" width="6" height="22" rx="3" fill="#14544A" />
        <rect x="18" y="5" width="6" height="22" rx="3" fill="#14544A" />
      </svg>
    ) : (
      <svg width={38} height={38} viewBox="0 0 32 32">
        <path d="M9 5l18 11L9 27z" fill="#14544A" />
      </svg>
    )}
  </div>
);

const Item: React.FC<{ item: Slide["items"][number]; x: number; y: number }> = ({
  item,
  x,
  y,
}) => (
  <div
    style={{
      position: "absolute",
      left: x - 150,
      top: y - 70,
      width: 300,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 14,
    }}
  >
    <IconBadge k={item.k} color={item.color} size={136} />
    <div dir="rtl" style={{ textAlign: "center" }}>
      <div style={{ fontSize: 31, fontWeight: 800, color: INK, lineHeight: 1.3 }}>
        {item.ar}
      </div>
      <div
        style={{
          fontFamily: `${FEN}, sans-serif`,
          fontSize: 27,
          color: MUTED,
          marginTop: 4,
          lineHeight: 1.25,
        }}
      >
        {item.en}
      </div>
    </div>
  </div>
);
