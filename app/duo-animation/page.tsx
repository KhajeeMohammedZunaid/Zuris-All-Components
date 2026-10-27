import type { Metadata } from "next";
import PageCurlTransition from "@/components/animation";

export const metadata: Metadata = {
  title: "Duo Animation — Page Curl Transition",
  description: "WebGL page curl transition animation with image upload and responsive viewport",
};

export default function DuoAnimationPage() {
  return (
    <main className="w-full h-screen h-[100dvh] overflow-hidden bg-[#fafafa] dark:bg-[#09090b]">
      <PageCurlTransition />
    </main>
  );
}
