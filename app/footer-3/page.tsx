import { Footer3 } from "@/components/footer-3";

export default function Footer3Page() {
  return (
    <main className="min-h-screen w-full flex flex-col justify-end bg-white dark:bg-[#09090b] transition-colors duration-300">
      {/* Top page space (pure seamless background, no divider line or color difference) */}
      <div className="flex-1" />

      {/* Footer 3 */}
      <Footer3 />
    </main>
  );
}
