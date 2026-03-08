import { HeroSection } from "@/app/components/home/HeroSection";
import { DesktopDecorations } from "@/app/components/home/DesktopDecorations";

export default function Home() {
  return (
    <div className="relative overflow-hidden pb-10">
      <HeroSection />
      <DesktopDecorations />
    </div>
  );
}
