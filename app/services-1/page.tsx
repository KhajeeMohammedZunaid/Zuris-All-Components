import { ServicesSection } from "@/components/ServicesSection";

export const metadata = {
  title: "Services 1 | Component Library",
  description: "Architectural services showcase with expanding horizontal image accordion",
};

export default function Services1Page() {
  return (
    <main className="min-h-screen bg-white">
      <ServicesSection />
    </main>
  );
}
