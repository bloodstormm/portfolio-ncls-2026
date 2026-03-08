import { CompaniesCarousel } from "../components/CompaniesCarousel";
import { AboutHero } from "@/app/components/about/AboutHero";
import { AboutTimeline } from "@/app/components/about/AboutTimeline";
import { AboutCTA } from "@/app/components/about/AboutCTA";
import { AboutDecorations } from "@/app/components/about/AboutDecorations";

export default function SobreMim() {
  return (
    <div className="relative overflow-hidden">
      <AboutHero />

      <div className="border-y border-primary/10 bg-primary/5">
        <CompaniesCarousel />
      </div>

      <AboutTimeline />
      <AboutCTA />
      <AboutDecorations />
    </div>
  );
}
