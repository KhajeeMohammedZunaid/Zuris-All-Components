import { Features1 } from "@/components/features-1";

export default function Features1ShowcasePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text-main)] transition-colors duration-300">
      <Features1 variant="all" showVariantNav={true} />
    </div>
  );
}
