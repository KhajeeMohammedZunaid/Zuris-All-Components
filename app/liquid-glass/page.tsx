import { LiquidGlassStudio } from "@/components/liquid-glass/liquid-glass-studio";

export default function LiquidGlass() {
  return (
    <main className="h-screen w-full overflow-hidden bg-[#f7f8fa] dark:bg-[#0a0b0e] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      <LiquidGlassStudio />
    </main>
  );
}

