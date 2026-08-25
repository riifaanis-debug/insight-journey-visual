import React, { createContext, useContext } from "react";

/**
 * تخطيط الشاشة: يسمح بعرض نفس الرحلة بصيغة عمودية (جوال 1080×1920)
 * أو أفقية (شاشة 1920×1080) دون تكرار المشاهد.
 */
export type ScreenLayout = {
  w: number;
  h: number;
  /** مركز الكاميرا على الشاشة */
  camCX: number;
  camCY: number;
  /** مركز الكاميرا عموديًا في الفصول التي تعرض الحلقة كاملة */
  camCYCenter: number;
  /** معامل تقريب إضافي يطبَّق على زوم الفصل (حسب ارتفاع ودجات الفصل) */
  zoomK: (c: { widgetTop: number; station: number | null }) => number;
  /** أعلى نطاق ودجات المحطة على الشاشة — يتجاوز قيمة الفصل عند تعريفه */
  widgetTop?: number;
  /** موضع بطاقة ملف العميل */
  profLeft: number;
  profTop: number;
  profK: number;
  /** صندوق العناوين */
  titleTop: number;
  titleLeft: number;
  titleRight: number;
  titleK: number;
};

export const PORTRAIT: ScreenLayout = {
  w: 1080,
  h: 1920,
  camCX: 540,
  camCY: 960,
  camCYCenter: 960,
  zoomK: () => 1,
  profLeft: 540,
  profTop: 600,
  profK: 1,
  titleTop: 130,
  titleLeft: 64,
  titleRight: 64,
  titleK: 1,
};

export const LANDSCAPE: ScreenLayout = {
  w: 1920,
  h: 1080,
  camCX: 680,
  camCY: 340,
  camCYCenter: 520,
  // يحافظ على نفس المساحة الرأسية المتاحة للودجات كما في النسخة العمودية
  zoomK: (c) => ((1080 - 460) / (1920 - c.widgetTop)) * (c.station === null ? 0.7 : 1),
  widgetTop: 460,
  profLeft: 1580,
  profTop: 300,
  profK: 0.62,
  titleTop: 44,
  titleLeft: 60,
  titleRight: 60,
  titleK: 0.62,
};

const Ctx = createContext<ScreenLayout>(PORTRAIT);

export const useLayout = () => useContext(Ctx);

export const LayoutProvider: React.FC<{
  value: ScreenLayout;
  children: React.ReactNode;
}> = ({ value, children }) => <Ctx.Provider value={value}>{children}</Ctx.Provider>;
