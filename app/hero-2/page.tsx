import { Hero2 } from "@/components/hero-section-2";
import { ScrollArea } from "@/components/ui/scroll-area";

export const metadata = {
  title: "Zuris - Headless CMS & Content Platform",
  description:
    "Create, manage, and publish content across your sites and apps in one fast workspace.",
};

export default function Hero2Page() {
  return (
    <main className="w-full h-screen h-[100dvh] overflow-hidden bg-white dark:bg-[#09090b]">
      <ScrollArea className="w-full h-full">
        <Hero2 />
      </ScrollArea>
    </main>
  );
}
