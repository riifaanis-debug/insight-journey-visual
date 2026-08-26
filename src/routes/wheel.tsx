import { createFileRoute } from "@tanstack/react-router";
import { WheelViewer } from "../components/WheelViewer";

export const Route = createFileRoute("/wheel")({
  head: () => ({
    meta: [
      { title: "دائرة الدورة التشغيلية المتحركة | Operating Cycle Wheel" },
      {
        name: "description",
        content:
          "عرض متحرك لدائرة الدورة التشغيلية في Collection Persona Framework™ ينتقل تلقائيًا من المرحلة الأولى حتى الثانية عشرة.",
      },
      { property: "og:title", content: "دائرة الدورة التشغيلية المتحركة | Operating Cycle Wheel" },
      {
        property: "og:description",
        content: "حركة تلقائية عبر المراحل الاثنتي عشرة للدورة التشغيلية بعرض ثنائي اللغة.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <WheelViewer />,
});
