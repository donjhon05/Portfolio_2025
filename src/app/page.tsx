
import Hero from "./components/Hero";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import ContactMe from "./components/ContactMe";


export default function Home() {
  return (
    <div className="">
      <main className="">
        <Hero />
        <Cards/>
       <ContactMe/>
       </main>
       <Footer />
    </div>
  );
}
