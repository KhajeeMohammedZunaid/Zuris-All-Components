import { Sections1 } from "@/components/sections-1";

export default function Sections1ShowcasePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-main)] transition-colors duration-300">
      <Sections1 showThemeBar={true} />
    </div>
  );
}
