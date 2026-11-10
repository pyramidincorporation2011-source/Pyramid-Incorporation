import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Featured from './components/Featured';
import Services from './components/Services';
import Process from './components/Process';
import WhyUs from './components/WhyUs';
import Projects from './components/Projects';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingContact from './components/FloatingContact';

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-sm bg-navy px-4 py-3 text-sm font-semibold text-white transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1} className="outline-none">
          <Hero />
          <About />
          <Featured />
          <Services />
          <Process />
          <WhyUs />
          <Projects />
          <Reviews />
          <Contact />
        </main>
        <Footer />
        <FloatingContact />
      </MotionConfig>
    </LazyMotion>
  );
}
