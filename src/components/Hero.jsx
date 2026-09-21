import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { HeartPulse, Leaf, ShieldCheck } from 'lucide-react';
import { gsap } from '../lib/motion';
import { scrollToId } from '../lib/motion';
import Seal from './Seal';
import pack10 from '../assets/pack10.webp';
import bowl from '../assets/bowl.webp';

const trust = [
  { icon: ShieldCheck, label: 'Hygienic & safe' },
  { icon: Leaf, label: 'Vegetarian feed' },
  { icon: HeartPulse, label: 'Good for heart' },
];

export default function Hero() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        tl.from('.hero-line', { yPercent: 115, duration: 1.15, stagger: 0.12 })
          .from('.hero-fade', { y: 22, opacity: 0, duration: 0.9, stagger: 0.09 }, '-=0.7')
          .from('.hero-sun', { scale: 0.3, opacity: 0, duration: 1.5, ease: 'expo.out' }, 0.05)
          .from('.hero-pack', { y: 90, rotate: -12, opacity: 0, duration: 1.3 }, 0.25)
          .from('.hero-chip', { scale: 0, opacity: 0, duration: 0.8, stagger: 0.14, ease: 'back.out(1.8)' }, '-=0.7');

        const scrub = { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true };
        gsap.to('.hero-visual', { yPercent: -10, ease: 'none', scrollTrigger: scrub });
        gsap.to('.hero-sun', { scale: 1.3, ease: 'none', scrollTrigger: scrub });
        gsap.to('.hero-copy', { yPercent: 8, opacity: 0.2, ease: 'none', scrollTrigger: scrub });
      });

      mm.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
        const tilt = root.current.querySelector('.hero-tilt');
        gsap.set(tilt, { transformPerspective: 1100 });
        const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.7, ease: 'power3' });
        const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.7, ease: 'power3' });
        const move = (e) => {
          ry((e.clientX / window.innerWidth - 0.5) * 14);
          rx(-(e.clientY / window.innerHeight - 0.5) * 10);
        };
        window.addEventListener('pointermove', move);
        return () => window.removeEventListener('pointermove', move);
      });
    },
    { scope: root }
  );

  return (
    <section id="top" ref={root} className="relative overflow-hidden bg-shell pb-16 pt-28 md:pt-32 lg:pb-24">
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 md:px-10 lg:min-h-[calc(100svh-8rem)] lg:grid-cols-[1.2fr_1fr]">
        <div className="hero-copy relative z-10">
          <p className="hero-fade font-script text-xl text-ember md:text-2xl">Fresh eggs. Healthy choice. Every day.</p>

          <h1 className="mt-4 font-display text-[clamp(3.3rem,12vw,6.4rem)] lg:text-[clamp(4.5rem,7.7vw,8rem)] font-black leading-[0.92] tracking-[-0.03em]">
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="hero-line block lg:whitespace-nowrap">Good eggs,</span>
            </span>
            <span className="block overflow-hidden pb-[0.1em] text-ember">
              <span className="hero-line block lg:whitespace-nowrap">better life.</span>
            </span>
          </h1>

          <p className="hero-fade mt-6 max-w-[34rem] text-lg leading-relaxed text-chestnut/80 md:text-xl">
            Farm fresh, protein rich eggs from Egg Bowl. Carefully collected and cleanly packed for your family, your shop or your
            kitchen.
          </p>

          <div className="hero-fade mt-8 flex flex-wrap gap-3">
            <a
              href="#order"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('#order');
              }}
              className="btn btn-dark"
            >
              Order eggs
            </a>
            <a
              href="#packs"
              onClick={(e) => {
                e.preventDefault();
                scrollToId('#packs');
              }}
              className="btn btn-ghost"
            >
              See our packs
            </a>
          </div>

          <ul className="hero-fade mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-chestnut/80">
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon size={18} className="text-meadow" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual relative mx-auto w-full max-w-[680px]">
          <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
            <div className="hero-sun aspect-square w-[84%] rounded-full bg-yolk" />
          </div>

          <div className="hero-tilt relative">
            <img
              src={pack10}
              alt="Egg Bowl 10 egg pack of brown and white eggs"
              width="1640"
              height="816"
              fetchPriority="high"
              className="hero-pack relative w-full drop-shadow-[0_36px_36px_rgba(58,29,18,0.38)]"
            />
          </div>

          <div className="hero-chip egg-frame absolute -bottom-10 -left-2 w-[24%] overflow-hidden border-[5px] border-shell shadow-[0_18px_30px_-12px_rgba(58,29,18,0.55)] md:left-[1%]">
            <img src={bowl} alt="A wooden bowl of brown and white eggs" width="510" height="268" className="aspect-[4/5] w-full object-cover object-[35%_50%]" />
          </div>

          <Seal className="hero-chip absolute -top-6 left-[4%] h-24 w-24 text-[0.7rem] md:h-32 md:w-32 md:text-xs" />
        </div>
      </div>
    </section>
  );
}
