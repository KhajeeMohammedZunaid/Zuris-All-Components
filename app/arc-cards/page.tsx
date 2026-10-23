import { ArcCards } from "@/components/arc-cards";

export const metadata = {
  title: "Arc & Card Slider Carousel - Embla & Torph",
  description: "Curved arc carousel and single card slider powered by Embla, shadcn Card & Button, and torph text animations.",
};

export default function ArcCardsShowcasePage() {
  return (
    <main className="min-h-screen bg-[#111215]">
      <ArcCards />
    </main>
  );
}
