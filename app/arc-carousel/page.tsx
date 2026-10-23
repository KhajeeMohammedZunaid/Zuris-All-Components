import { TravelCarouselShowcase } from "@/components/arc-embla-carousel";

export const metadata = {
  title: "Travel Carousels — Embla + Torph + Shadcn",
  description:
    "Curved Arc Carousel and Single Destination Card Carousel powered by Embla, torph TextMorph, and shadcn components.",
};

export default function ArcCarouselPage() {
  return (
    <main className="min-h-screen bg-[#0e1013]">
      <TravelCarouselShowcase />
    </main>
  );
}
