import { ZurisLogoAnimation } from "@/components/zuris-logo-animation";

export const metadata = {
  title: "Zuris Logo Animation",
  description: "Micro-interactive logo entrance with side-revealing text animation.",
};

export default function LogoAnimationPage() {
  return (
    <main className="min-h-screen w-full bg-[#f8f9fb] dark:bg-[#09090b] flex items-center justify-center p-4 transition-colors duration-200">
      <ZurisLogoAnimation />
    </main>
  );
}
