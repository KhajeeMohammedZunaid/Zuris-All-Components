import type { Metadata } from "next";
import PageCurlTransition from "@/components/animation";

export const metadata: Metadata = {
  title: "Duo Animation — Page Curl Transition",
  description: "WebGL page curl transition animation with image upload and responsive viewport",
};

// Page route for WebGL page curl transition with Full Cover and Center Card display modes
export default function DuoAnimationPage() {
  return (
    <main className="w-full h-screen h-[100dvh] overflow-hidden">
      <PageCurlTransition />
    </main>
  );
}
