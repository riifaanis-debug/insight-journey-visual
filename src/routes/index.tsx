import { createFileRoute } from "@tanstack/react-router";
import { JourneyPlayer } from "../components/JourneyPlayer";

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
    <main dir="rtl" className="h-[100dvh] w-full overflow-hidden bg-black">
      <JourneyPlayer />
    </main>
  );
}
