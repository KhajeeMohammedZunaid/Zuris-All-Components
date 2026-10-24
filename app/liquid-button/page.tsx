import { LiquidButtonStudio } from "@/components/buttons/liquid-button-studio";

export const metadata = {
  title: "Liquid Button — Interactive WebGL Shader Button (Base UI)",
  description:
    "Interactive liquid shader button powered by WebGL, Base UI, and 14 dynamic elemental themes.",
};

export default function LiquidButtonPage() {
  return (
    <main className="min-h-screen w-full bg-[#f7f8fa] dark:bg-[#0c0d10] text-zinc-950 dark:text-zinc-50 transition-colors duration-200">
      <LiquidButtonStudio />
    </main>
  );
}
