import { useEffect } from 'react';
import { ScrollTrigger, initSmooth } from './lib/motion';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Statement from './components/Statement';
import Power from './components/Power';
import Packs from './components/Packs';
import Eggs from './components/Eggs';
import Why from './components/Why';
import Journey from './components/Journey';
import Audience from './components/Audience';
import Order from './components/Order';
import Footer from './components/Footer';

export default function App() {
  useEffect(() => {
    const stop = initSmooth();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    document.fonts?.ready.then(refresh);
    return () => {
      window.removeEventListener('load', refresh);
      stop();
    };
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Statement />
        <Power />
        <Packs />
        <Eggs />
        <Why />
        <Journey />
        <Audience />
        <Order />
      </main>
      <Footer />
    </>
  );
}
