import { createFileRoute } from "@tanstack/react-router";
import { SlidesViewer } from "../components/SlidesViewer";

export const Route = createFileRoute("/slides")({
  head: () => ({
    meta: [
      { title: "شرائح الدورة التشغيلية | Operating Cycle Slides" },
      {
        name: "description",
        content:
          "اثنتا عشرة شريحة توضح مراحل الدورة التشغيلية لـ Collection Persona Framework™ من استلام البيانات حتى التعلم والتحديث.",
      },
      { property: "og:title", content: "شرائح الدورة التشغيلية | Operating Cycle Slides" },
      {
        property: "og:description",
        content:
          "استعرض المراحل الاثنتي عشرة للدورة التشغيلية بتصميم ثنائي اللغة عربي وإنجليزي.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <SlidesViewer />,
});
