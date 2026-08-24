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
        style={{ width: "100%", height: "100%" }}
      />
    ),
  };
});

const Skeleton = () => (
  <div className="flex h-full w-full items-center justify-center bg-muted/40 text-sm text-muted-foreground">
    جارٍ تحميل الرحلة البصرية…
  </div>
);

export function JourneyPlayer() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <div data-journey dir="ltr" className="h-full w-full overflow-hidden bg-black">
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
