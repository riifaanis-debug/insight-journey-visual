import { lazy, Suspense, useEffect, useState } from "react";

const LazyPlayer = lazy(async () => {
  const [{ Player }, { MainVideo, TOTAL }] = await Promise.all([
    import("@remotion/player"),
    import("../video/MainVideo"),
  ]);
  return {
    default: () => (
      <Player
        component={MainVideo}
        durationInFrames={TOTAL}
        compositionWidth={1080}
        compositionHeight={1920}
        fps={30}
        controls
        autoPlay
        loop
        clickToPlay
        doubleClickToFullscreen
        style={{ width: "100%" }}
      />
    ),
  };
});

const Skeleton = () => (
  <div className="flex aspect-[9/16] w-full items-center justify-center bg-muted/40 text-sm text-muted-foreground">
    جارٍ تحميل الرحلة البصرية…
  </div>
);

export function JourneyPlayer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div dir="ltr" className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
      {mounted ? (
        <Suspense fallback={<Skeleton />}>
          <LazyPlayer />
        </Suspense>
      ) : (
        <Skeleton />
      )}
    </div>
  );
}
