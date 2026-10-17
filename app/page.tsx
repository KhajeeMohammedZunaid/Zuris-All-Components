import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="w-full min-h-screen min-h-[100dvh] md:h-screen md:max-h-screen md:overflow-hidden font-sans text-zinc-950 dark:text-zinc-50 bg-[#fafafa] dark:bg-[#09090b] flex flex-col antialiased m-0 p-0">
      {/* Canvas Container */}
      <div className="w-full flex-1 flex flex-col px-2 sm:px-4 md:px-6 lg:px-8 pb-0 min-h-0 overflow-hidden 4k:px-12">
        <div className="relative w-full max-w-[1400px] 4k:max-w-[1960px] mx-auto flex-1 min-h-0 border-x border-solid border-zinc-200 dark:border-zinc-800 bg-[#fafafa] dark:bg-[#09090b] flex flex-col">
          <Navbar />
          <Hero />
        </div>
      </div>
    </div>
  );
}
