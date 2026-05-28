import { HeroSection } from "@/app/components/home/HeroSection";
import { ValueSection } from "@/app/components/home/ValueSection";
import { HomepageProjects } from "@/app/components/home/HomepageProjects";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ValueSection />
      <HomepageProjects />
    </div>
  );
}
