import Hero from "./components/Hero";
import Navigation from "./components/Navigation";
import About from "./components/About";
import Skills from "./components/Skills";
import Cards from "./components/Cards";
import ContactMe from "./components/ContactMe";
import Footer from "./components/Footer";
import BackgroundGraphics from "./components/BackgroundGraphics";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#e8ecf5] dark:bg-[#1a2847] transition-colors duration-300">
      <BackgroundGraphics />
      <div className="relative z-10">
        <Navigation />
        <main className="overflow-x-hidden">
          <Hero />
          <About />
          <Skills />
          <Cards />
          <ContactMe />
        </main>
        <Footer />
      </div>
    </div>
  );
}
