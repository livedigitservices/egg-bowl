import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/motion';

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function NoHormonesIcon() {
  return (
    <svg viewBox="0 0 96 96" {...stroke} aria-hidden="true">
      <circle cx="48" cy="48" r="42" />
      <g>
        <circle cx="48" cy="48" r="6" />
        <circle cx="48" cy="22" r="4.5" />
        <circle cx="73" cy="48" r="4.5" />
        <circle cx="48" cy="74" r="4.5" />
        <circle cx="23" cy="48" r="4.5" />
        <path d="M48 42V26.5M54 48h14.5M48 54v15.5M42 48H27.5" />
      </g>
      <path d="M18 18 78 78" />
    </svg>
  );
}

function NoSteroidsIcon() {
  return (
    <svg viewBox="0 0 96 96" {...stroke} aria-hidden="true">
      <circle cx="48" cy="48" r="42" />
      <g transform="rotate(45 48 48)">
        <rect x="41" y="32" width="14" height="28" rx="2.5" />
        <path d="M48 32V22M40 22h16M48 60v16M41 42h5M41 50h5" />
      </g>
      <path d="M18 18 78 78" />
    </svg>
  );
}

function NoAntibioticsIcon() {
  return (
    <svg viewBox="0 0 96 96" {...stroke} aria-hidden="true">
      <g transform="rotate(-42 58 60)">
        <rect x="26" y="44" width="64" height="32" rx="16" />
        <path d="M58 44v32" />
      </g>
      <circle cx="36" cy="34" r="24" style={{ fill: 'var(--badge-bg)' }} />
      <g strokeWidth="2.2">
        <ellipse cx="36" cy="34" rx="11" ry="7.5" transform="rotate(-35 36 34)" />
        <path d="M30 30l2 2M36 26l2 2M38 36l2 2M30 38l2 2" />
      </g>
      <path d="M20 18 52 50" />
    </svg>
  );
}

function HighProteinIcon() {
  return (
    <svg viewBox="0 0 96 96" {...stroke} aria-hidden="true">
      <defs>
        <path id="hp-top" d="M22 50 A26 26 0 0 1 74 50" />
        <path id="hp-bottom" d="M16 52 A32 32 0 0 0 80 52" />
      </defs>
      <path d="M17 38A33 33 0 0 0 24 72" />
      <path d="M79 38A33 33 0 0 1 72 72" />
      <text fill="currentColor" stroke="none" fontFamily="Figtree, system-ui, sans-serif" fontWeight="800" fontSize="9.5" letterSpacing="1.6" textAnchor="middle">
        <textPath href="#hp-top" startOffset="50%">HIGH</textPath>
      </text>
      <text fill="currentColor" stroke="none" fontFamily="Figtree, system-ui, sans-serif" fontWeight="800" fontSize="9.5" letterSpacing="1.6" textAnchor="middle">
        <textPath href="#hp-bottom" startOffset="50%" dy="9">PROTEIN</textPath>
      </text>
      <path d="M36 66c-5-5-6-13-2-19l4-8c1-3 5-4 7-1l2 4c3-2 8-2 11 1 4 4 5 11 2 16l-2 7H38Z" />
      <path d="M41 36l-3-9c-.5-3 3-5 5-3l5 8" />
      <path d="M45 52c3-2 7-1 9 2" />
    </svg>
  );
}

function FarmFreshIcon() {
  return (
    <svg viewBox="0 0 96 96" {...stroke} aria-hidden="true">
      <path d="M6 86h84" />
      <path d="M10 86V50l28-20 28 20v36" />
      <path d="M6 54l32-23 32 23" />
      <rect x="29" y="62" width="18" height="24" />
      <path d="M29 62l18 24M47 62 29 86" />
      <rect x="34" y="44" width="8" height="8" />
      <path d="M72 86V36h16v50" />
      <path d="M72 36c0-8 16-8 16 0" />
      <path d="M78 24V18h4v6M72 48h16M72 58h16M72 68h16M72 78h16" />
    </svg>
  );
}

function UvIcon() {
  return (
    <svg viewBox="0 0 96 96" {...stroke} aria-hidden="true">
      <path d="M48 6 84 19v28c0 21-16 34-36 43C28 81 12 68 12 47V19Z" />
      <path d="M48 15 76 25v22c0 16-12 27-28 35-16-8-28-19-28-35V25Z" />
      <text x="48" y="58" fill="currentColor" stroke="none" fontFamily="Figtree, system-ui, sans-serif" fontWeight="800" fontSize="24" textAnchor="middle">UV</text>
    </svg>
  );
}

const items = [
  { label: 'No Hormones', Icon: NoHormonesIcon },
  { label: 'No Steroids', Icon: NoSteroidsIcon },
  { label: 'No Antibiotics', Icon: NoAntibioticsIcon },
  { label: 'High Protein', Icon: HighProteinIcon },
  { label: 'Farm Fresh', Icon: FarmFreshIcon },
  { label: 'UV Sanitized', Icon: UvIcon },
];

export default function OurPromise() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.promise-card',
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', stagger: 0.1, scrollTrigger: { trigger: '.promise-grid', start: 'top 85%', once: true } }
        );
      });
    },
    { scope: root }
  );

  return (
    <section id="promise" ref={root} className="bg-butter px-5 py-24 md:px-10 md:py-36" style={{ '--badge-bg': 'var(--color-shell)' }}>
      <div className="mx-auto max-w-[1400px]">
        <div className="max-w-3xl">
          <h2 className="font-display text-[clamp(2.6rem,7vw,6.2rem)] font-black leading-[0.95] tracking-[-0.03em]">Our promise.</h2>
          <p className="mt-5 max-w-md text-lg text-chestnut/75">Six things we stand behind in every Egg Bowl egg.</p>
        </div>

        <ul className="promise-grid mt-12 grid grid-cols-2 gap-4 md:mt-16 md:gap-6 lg:grid-cols-3 lg:gap-8">
          {items.map(({ label, Icon }) => (
            <li key={label} className="promise-card group relative overflow-hidden rounded-[2rem] bg-shell md:rounded-[2.5rem]">
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-yolk transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" aria-hidden="true" />
              <div className="relative flex flex-col items-center gap-5 px-4 py-9 text-center text-chestnut md:gap-7 md:py-14">
                <span className="block h-24 w-24 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 md:h-32 md:w-32 lg:h-36 lg:w-36">
                  <Icon />
                </span>
                <h3 className="font-display text-xl font-extrabold leading-tight md:text-3xl">{label}</h3>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}