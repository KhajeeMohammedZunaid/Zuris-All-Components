import { Hero5 } from "@/components/hero-5";

export const metadata = {
  title: "Hero 5 — The humans behind the prompts & pixels",
  description: "Community and team hero showcase with depth of field blur and floating cards",
};

export default function Hero5Page() {
  return (
    <main className="min-h-screen w-full bg-[#fafafa] dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 transition-colors duration-200">
      <Hero5 />
    </main>
  );
}
