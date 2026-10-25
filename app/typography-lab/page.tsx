import { TypographyLab } from "@/components/typography-lab";

export const metadata = {
  title: "Typography Tool — Interactive Font & Kerning Studio",
  description:
    "Interactive typography tool to refine HTML tags, tracking, weight, word spacing, and line height with zero scroll jumping.",
};

export default function TypographyLabPage() {
  return (
    <main className="min-h-screen w-full bg-[#fafafa] dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 p-3 sm:p-5 md:p-7 font-sans">
      <div className="max-w-[1380px] mx-auto w-full">
        <TypographyLab />
      </div>
    </main>
  );
}
