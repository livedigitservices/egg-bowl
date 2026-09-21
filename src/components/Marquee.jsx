import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/motion';

const words = ['Farm fresh', 'Vegetarian feed', 'No hormones', 'No antibiotics', 'Protein rich', 'Quality checked', 'Hygienically packed'];

function EggDot() {
  return (
    <svg viewBox="0 0 100 104" className="mx-8 h-6 w-6 shrink-0 text-yolk md:mx-12 md:h-8 md:w-8" aria-hidden="true">
      <path fill="currentColor" d="M50 4 C75 4 92 45 92 68 C92 90 74 100 50 100 C26 100 8 90 8 68 C8 45 25 4 50 4Z" />
    </svg>
  );
}

export default function Marquee() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('.marquee-track', { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
      });
    },
    { scope: root }
  );

  const group = (n) => (
    <div className="flex shrink-0 items-center" aria-hidden={n > 0}>
      {words.map((w) => (
        <span key={w + n} className="flex items-center">
          <span className="whitespace-nowrap font-display text-3xl font-extrabold italic md:text-5xl">{w}</span>
          <EggDot />
        </span>
      ))}
    </div>
  );

  return (
    <div ref={root} className="overflow-hidden bg-chestnut py-6 text-shell md:py-8" aria-label="Farm fresh, vegetarian feed, no hormones, no antibiotics, protein rich, quality checked, hygienically packed">
      <div className="marquee-track flex w-max">
        {group(0)}
        {group(1)}
      </div>
    </div>
  );
}
