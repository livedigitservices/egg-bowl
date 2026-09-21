import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

let lenis = null;
let tick = null;

export const getLenis = () => lenis;

export function initSmooth() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  tick = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    lenis = null;
  };
}

export function scrollToId(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.5, easing: (t) => 1 - Math.pow(1 - t, 4) });
  } else {
    el.scrollIntoView();
  }
}

export { gsap, ScrollTrigger };
