import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import IntroVideo from "./components/IntroVideo";
import Services from "./components/Services";
import Reviews from "./components/Reviews";
import Projects from "./components/Projects";
import About from "./components/About";
import Pricing from "./components/Pricing";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import CursorGlow from "./components/CursorGlow";
import BackgroundGrid from "./components/BackgroundGrid";

export default function App() {
  return (
    <div className="relative min-h-screen font-sans bg-brand-dark selection:bg-brand-purple/30 selection:text-white">
      
      {/* Background Interactive Elements & Mouse Aura custom tracking */}
      <CursorGlow />
      <BackgroundGrid />

      {/* Sticky Navigation bar */}
      <Navbar />

      {/* Main Single-View Segment stream container */}
      <main className="relative z-10">
        <Hero />
        <IntroVideo />
        <Services />
        <Reviews />
        <Projects />
        <About />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>

      {/* Brand Footer segments */}
      <Footer />

    </div>
  );
}
