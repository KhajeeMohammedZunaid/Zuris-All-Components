import { ZurisAppIcon } from "@/components/zuris-app-icon";

export const metadata = {
  title: "Zuris App Icon",
  description: "Zuris logo app icon with rapid liquid theme variations.",
};

export default function ZurisIconPage() {
  return (
    <main className="min-h-screen w-full bg-[#f8f9fb] dark:bg-[#09090b] flex items-center justify-center p-4 transition-colors duration-200">
      <ZurisAppIcon />
    </main>
  );
}
