import { profile } from "@/data/content";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav name={profile.name} />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
      <footer className="mx-auto max-w-5xl px-6 py-10 text-sm text-mute dark:text-mute-dark">© {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
