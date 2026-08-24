import { createFileRoute } from "@tanstack/react-router";
import videoAsset from "../assets/cpf-framework.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Collection Persona Framework™ | الدورة التشغيلية" },
      {
        name: "description",
        content:
          "فيديو Motion Graphics يوضح الدورة التشغيلية لـ Collection Persona Framework™ من استلام البيانات حتى التعلم والتحديث، مع حالة تطبيقية.",
      },
      { property: "og:title", content: "Collection Persona Framework™ | الدورة التشغيلية" },
      {
        property: "og:description",
        content:
          "شاهد كيف تتحول البيانات إلى فهم ثم قرار ثم إجراء تحصيلي، ثم تعود النتيجة لتحسين القرار التالي.",
      },
      { property: "og:type", content: "video.other" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main
      dir="rtl"
      className="min-h-screen bg-background px-4 py-10 sm:py-14"
      style={{
        backgroundImage:
          "radial-gradient(120% 80% at 50% 0%, color-mix(in oklch, var(--color-primary) 8%, transparent), transparent 70%)",
      }}
    >
      <div className="mx-auto flex w-full max-w-md flex-col items-center gap-6">
        <header className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Collection Persona Framework™
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            الدورة التشغيلية | Operating Cycle
            <br />
            وحالة تطبيقية | Applied Case
          </p>
        </header>

        <div className="w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg">
          <video
            className="block h-auto w-full"
            src={videoAsset.url}
            controls
            playsInline
            preload="metadata"
            poster=""
          >
            <track kind="captions" />
          </video>
        </div>

        <p className="text-center text-xs leading-relaxed text-muted-foreground">
          Data → Understanding → Decision → Action → Outcome → Learning ↻
        </p>
      </div>
    </main>
  );
}
