import { Footer4 } from "@/components/footer-4";

export default function Footer4Page() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-end bg-white dark:bg-[#09090b] transition-colors duration-300">
      {/* Top half page space */}
      <div className="flex-1" />

      {/* Footer 4 occupying bottom half */}
      <Footer4 />
    </main>
  );
}
