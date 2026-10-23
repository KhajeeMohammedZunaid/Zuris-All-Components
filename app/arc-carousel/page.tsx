import { TravelCarouselShowcase } from "@/components/arc-embla-carousel";

export const metadata = {
  title: "Travel Carousels — Embla + Torph + Shadcn",
  description:
    "Curved Arc Carousel and Single Destination Card Carousel powered by Embla, torph TextMorph, and shadcn components.",
};

export default function ArcCarouselPage() {
  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-[#0c0d10] text-zinc-950 dark:text-zinc-50 transition-colors duration-200">
      <TravelCarouselShowcase />
    </main>
  );
}
