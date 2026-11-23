import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { About } from "@/components/sections/About";
import { YouTubeTop } from "@/components/sections/YouTubeTop";
import { Clients } from "@/components/sections/Clients";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <YouTubeTop />
        <Clients />
      </main>
    </>
  );
}
