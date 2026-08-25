import React from "react";
import { useCurrentFrame } from "remotion";
import { byId, stationPos, TRANS } from "./timeline";
import { At } from "./Camera";
import { useLayout } from "./layout";

/**
 * محطة في العالم: محتواها موجود في مكانه، تظهر عناصره مع اقتراب الكاميرا
 * ولا تُقطَع بانتقال fade بين المراحل.
 */
export const Station: React.FC<{
  id: string;
  /** مركز أعلى عنصر داخل المحطة (بإحداثيات المحطة) */
  top?: number;
  /** نصف ارتفاع ذلك العنصر تقريبًا */
  pad?: number;
  dy?: number;
  width?: number;
  children: (f: number) => React.ReactNode;
}> = ({ id, top = 0, pad = 110, dy = 0, width = 1200, children }) => {
  const frame = useCurrentFrame();
  const L = useLayout();
  const ch = byId(id);
  const [sx, sy] = ch.station === null ? [0, 0] : stationPos(ch.station);
  const f = frame - ch.start;
  const inW = Math.max(0, Math.min(1, (f + TRANS) / TRANS));
  const outW = Math.max(0, Math.min(1, (ch.end - ch.start + TRANS * 0.6 - f) / TRANS));
  const vis = Math.min(inW, outW);
  if (vis <= 0.001) return null;
  // ينزل محتوى المحطة أسفل النطاق المحجوز لبطاقة الملف
  const wTop = L.widgetTop ?? ch.widgetTop;
  const shift = (wTop - L.camCY) / (ch.zoom * L.zoomK(ch)) - (top - pad) + dy;
  return (
    <At x={sx} y={sy + shift} opacity={vis} width={width}>
      <div style={{ position: "relative" }}>{children(f)}</div>
    </At>
  );
};


export const Row: React.FC<{
  children: React.ReactNode;
  gap?: number;
  style?: React.CSSProperties;
}> = ({ children, gap = 18, style }) => (
  <div
    dir="rtl"
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Col: React.FC<{
  children: React.ReactNode;
  gap?: number;
  style?: React.CSSProperties;
}> = ({ children, gap = 18, style }) => (
  <div
    dir="rtl"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap,
      ...style,
    }}
  >
    {children}
  </div>
);
