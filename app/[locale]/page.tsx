import { Preloader } from "@/app/components/home/Preloader";
import { HomeHero } from "@/app/components/home/HomeHero";
import { HomeClients } from "@/app/components/home/HomeClients";
import { HomeIntro } from "@/app/components/home/HomeIntro";
import { HomeProjects } from "@/app/components/home/HomeProjects";
import { getProjects } from "@/app/lib/getProjects";

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <Preloader />
      <HomeHero />
      <HomeClients />
      <HomeIntro />
      <HomeProjects projects={projects} />
    </>
  );
}
