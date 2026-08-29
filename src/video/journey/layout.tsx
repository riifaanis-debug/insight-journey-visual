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
  zoomK: (c: {
    widgetTop: number;
    station: number | null;
    pos?: [number, number] | undefined;
  }) => number;
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

/** لقطة تعرض الحلقة كاملة (لا محطة ولا لوحة) */
const wideShot = (c: { station: number | null; pos?: [number, number] | undefined }) =>
  c.station === null && !c.pos;

export const LANDSCAPE: ScreenLayout = {
  w: 1920,
  h: 1080,
  camCX: 560,
  camCY: 300,
  camCYCenter: 540,
  // يستفيد من كامل الارتفاع المتبقي بعد شريط العناوين حتى تظهر البيانات أكبر
  zoomK: (c) =>
    c.pos ? 1.22 : ((1080 - 300) / (1920 - c.widgetTop)) * (wideShot(c) ? 0.72 : 1.02),
  widgetTop: 330,
  profLeft: 1505,
  profTop: 215,
  profK: 0.84,
  titleTop: 40,
  titleLeft: 56,
  titleRight: 56,
  titleK: 0.9,
};


const Ctx = createContext<ScreenLayout>(PORTRAIT);

export const useLayout = () => useContext(Ctx);

export const LayoutProvider: React.FC<{
  value: ScreenLayout;
  children: React.ReactNode;
}> = ({ value, children }) => <Ctx.Provider value={value}>{children}</Ctx.Provider>;
