import { lazy, Suspense, useEffect, useRef, useState } from "react";
import type { PlayerRef } from "@remotion/player";

const LazyPlayer = lazy(async () => {
  const [{ Player }, { MainVideo, TOTAL }] = await Promise.all([
    import("@remotion/player"),
    import("../video/MainVideo"),
  ]);
  const q = new URLSearchParams(window.location.search);
  const f = q.get("frame");
  return {
    default: ({ playerRef }: { playerRef: React.RefObject<PlayerRef | null> }) => (
      <Player
        ref={playerRef}
        initialFrame={f ? Number(f) : 0}
        component={MainVideo}
        durationInFrames={TOTAL}
        compositionWidth={1080}
        compositionHeight={1920}
        fps={30}
        controls
        autoPlay={!f}
        initiallyMuted
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
  const [muted, setMuted] = useState(true);
  const playerRef = useRef<PlayerRef | null>(null);
  useEffect(() => setMounted(true), []);

  const toggleSound = () => {
    const p = playerRef.current;
    if (!p) return;
    if (muted) {
      p.unmute();
      p.setVolume(1);
      if (!p.isPlaying()) p.play();
      setMuted(false);
    } else {
      p.mute();
      setMuted(true);
    }
  };

  return (
    <div data-journey dir="ltr" className="relative h-full w-full overflow-hidden bg-black">
      {mounted ? (
        <Suspense fallback={<Skeleton />}>
          <LazyPlayer playerRef={playerRef} />
        </Suspense>
      ) : (
        <Skeleton />
      )}
      {mounted && (
        <button
          type="button"
          dir="rtl"
          onClick={toggleSound}
          className="absolute left-4 top-4 z-10 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-black/80"
        >
          {muted ? "🔇 تشغيل الصوت" : "🔊 كتم الصوت"}
        </button>
      )}
    </div>
  );
}
