import { lazy, Suspense, useEffect, useState } from "react";

const LazySlide = lazy(async () => {
  const [{ SlideFrame, W, H }, { SLIDES }] = await Promise.all([
    import("../video/slides/SlideFrame"),
    import("../video/slides/slideData"),
  ]);
  return {
    default: ({ index, scale }: { index: number; scale: number }) => (
      <div
        style={{
          width: W * scale,
          height: H * scale,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
          <SlideFrame slide={SLIDES[index]!} />
        </div>
      </div>
    ),
  };
});

const TOTAL = 12;

export function SlidesViewer() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    const fit = () => {
      const pad = 24;
      const s = Math.min(
        (window.innerWidth - pad) / 1280,
        (window.innerHeight - 120) / 1920,
      );
      setScale(Math.max(0.15, s));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % TOTAL), 5000);
    return () => clearInterval(t);
  }, [playing]);

  return (
    <div dir="rtl" className="flex min-h-[100dvh] w-full flex-col items-center gap-4 bg-[#EFE9DC] py-4">
      <Suspense
        fallback={
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
            جارٍ تحميل الشرائح…
          </div>
        }
      >
        <LazySlide index={index} scale={scale} />
      </Suspense>

      <div className="flex flex-wrap items-center justify-center gap-2 px-3">
        <button
          onClick={() => setPlaying((p) => !p)}
          className="rounded-full bg-[#0E4B3C] px-5 py-2 text-sm font-semibold text-white"
        >
          {playing ? "إيقاف" : "تشغيل"}
        </button>
        {Array.from({ length: TOTAL }, (_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`المرحلة ${i + 1}`}
            className={
              "h-9 w-9 rounded-full text-sm font-bold transition " +
              (i === index
                ? "bg-[#C39A3E] text-white"
                : "bg-white text-[#54655C] hover:bg-[#F6EEDC]")
            }
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
