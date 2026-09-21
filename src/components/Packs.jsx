import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { HeartPulse, Leaf, ShieldCheck, Dumbbell } from 'lucide-react';
import { gsap, scrollToId } from '../lib/motion';
import pack6 from '../assets/pack6.webp';
import pack10 from '../assets/pack10.webp';
import label6 from '../assets/label6.webp';
import label10 from '../assets/label10.webp';

const facts = [
  { icon: Leaf, title: 'Natural & fresh', text: 'Farm fresh eggs for your family' },
  { icon: Dumbbell, title: 'Rich in protein', text: 'High in quality protein' },
  { icon: HeartPulse, title: 'Good for heart', text: 'Supports a healthy heart' },
  { icon: ShieldCheck, title: 'Hygienic & safe', text: 'Carefully collected & packed' },
];

const copy = {
  6: 'Six premium quality eggs in a box sized for everyday breakfasts.',
  10: 'Ten premium quality eggs in a sturdy carton for busy family kitchens.',
};

export default function Packs() {
  const root = useRef(null);
  const [size, setSize] = useState(10);

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.packs-stage', {
          scale: 0.8,
          rotate: -3,
          ease: 'none',
          scrollTrigger: { trigger: '.packs-stage', start: 'top 92%', end: 'top 30%', scrub: true },
        });
      });
      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const stage = root.current.querySelector('.packs-stage');
        const tilt = root.current.querySelector('.pack-tilt');
        gsap.set(tilt, { transformPerspective: 1000 });
        const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.5, ease: 'power3' });
        const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.5, ease: 'power3' });
        const move = (e) => {
          const r = stage.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 14);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 10);
        };
        const leave = () => {
          rx(0);
          ry(0);
        };
        stage.addEventListener('pointermove', move);
        stage.addEventListener('pointerleave', leave);
        return () => {
          stage.removeEventListener('pointermove', move);
          stage.removeEventListener('pointerleave', leave);
        };
      });
    },
    { scope: root }
  );

  const choose = contextSafe((next) => {
    if (next === size) return;
    const dir = next === 6 ? -1 : 1;
    const outs = root.current.querySelectorAll(`[data-pack="${size}"]`);
    const ins = root.current.querySelectorAll(`[data-pack="${next}"]`);
    gsap.to(outs, { opacity: 0, xPercent: -10 * dir, rotate: -4 * dir, duration: 0.45, ease: 'power3.in', overwrite: true });
    gsap.fromTo(ins, { opacity: 0, xPercent: 10 * dir, rotate: 4 * dir }, { opacity: 1, xPercent: 0, rotate: 0, duration: 0.8, delay: 0.15, ease: 'power3.out', overwrite: true });
    setSize(next);
  });

  const order = () => {
    window.dispatchEvent(new CustomEvent('eggbowl:pack', { detail: `${size}-egg pack` }));
    scrollToId('#order');
  };

  return (
    <section id="packs" ref={root} className="relative bg-butter px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <h2 className="max-w-3xl font-display text-[clamp(2.6rem,7vw,6.2rem)] font-black leading-[0.95] tracking-[-0.03em]">
            Pick your pack.
          </h2>

          <div role="radiogroup" aria-label="Pack size" className="relative flex w-fit rounded-full bg-chestnut p-1.5 text-shell">
            <span
              aria-hidden="true"
              className="absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full bg-yolk transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ transform: size === 10 ? 'translateX(100%)' : 'none' }}
            />
            {[6, 10].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={size === n}
                onClick={() => choose(n)}
                className={`relative z-10 w-28 rounded-full py-3 text-base font-bold transition-colors duration-300 ${size === n ? 'text-chestnut' : ''}`}
              >
                {n} eggs
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:mt-16 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div className="packs-stage relative">
            <div className="pack-tilt relative aspect-[16/10]">
              <img data-pack="6" src={pack6} alt="Egg Bowl 6 egg pack" width="1227" height="817" loading="lazy" className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_30px_30px_rgba(58,29,18,0.35)]" style={{ opacity: size === 6 ? 1 : 0 }} />
              <img data-pack="10" src={pack10} alt="Egg Bowl 10 egg pack" width="1640" height="816" loading="lazy" className="absolute inset-0 h-full w-full object-contain drop-shadow-[0_30px_30px_rgba(58,29,18,0.35)]" style={{ opacity: size === 10 ? 1 : 0 }} />
            </div>
            <div className="pointer-events-none absolute -bottom-8 -right-2 w-[26%] max-w-[190px] rotate-6 md:-right-6">
              <div className="relative aspect-[599/765]">
                <img data-pack="6" src={label6} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full drop-shadow-[0_14px_16px_rgba(58,29,18,0.35)]" style={{ opacity: size === 6 ? 1 : 0 }} />
                <img data-pack="10" src={label10} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full drop-shadow-[0_14px_16px_rgba(58,29,18,0.35)]" style={{ opacity: size === 10 ? 1 : 0 }} />
              </div>
            </div>
          </div>

          <div key={size} className="animate-[fade-up_0.7s_ease_both]">
            <p className="font-display text-7xl font-black leading-none md:text-8xl">
              {size}
              <span className="ml-3 text-3xl font-extrabold text-ember md:text-4xl">eggs</span>
            </p>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-chestnut/80">{copy[size]}</p>

            <ul className="mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {facts.map(({ icon: Icon, title, text }) => (
                <li key={title} className="flex gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-meadow text-shell">
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-bold leading-tight">{title}</span>
                    <span className="text-sm text-chestnut/70">{text}</span>
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 inline-block rounded-full bg-meadow px-5 py-2.5 text-sm font-bold text-shell">
              Vegetarian feed. No hormones. No antibiotics.
            </p>

            <div className="mt-8">
              <button type="button" onClick={order} className="btn btn-dark">
                Order the {size}-egg pack
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
