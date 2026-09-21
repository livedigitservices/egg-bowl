import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Home, Leaf, PackageCheck, ShieldCheck, Wheat } from 'lucide-react';
import { gsap, ScrollTrigger } from '../lib/motion';
import basket from '../assets/basket.webp';
import Seal from './Seal';

const steps = [
  { icon: Wheat, title: 'Farm fresh', text: 'Eggs from healthy hens on vegetarian feed, with no hormones and no antibiotics.' },
  { icon: Leaf, title: 'Carefully collected', text: 'Collected with care so every shell reaches the pack clean and whole.' },
  { icon: ShieldCheck, title: 'Quality checked', text: 'Every egg is quality tested before it goes anywhere near a box.' },
  { icon: PackageCheck, title: 'Hygienically packed', text: 'Sealed into 6 and 10 egg packs that keep the freshness in.' },
  { icon: Home, title: 'At your home', text: 'Fresh from the farm to your kitchen, shop or restaurant.' },
];

export default function Journey() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ isDesktop: '(min-width: 1024px)', reduce: '(prefers-reduced-motion: reduce)' }, (ctx) => {
        const { isDesktop, reduce } = ctx.conditions;
        if (reduce) return;
        gsap.fromTo(
          '.line-fill',
          isDesktop ? { scaleX: 0 } : { scaleY: 0 },
          {
            ...(isDesktop ? { scaleX: 1 } : { scaleY: 1 }),
            ease: 'none',
            scrollTrigger: { trigger: '.steps', start: isDesktop ? 'top 70%' : 'top 60%', end: isDesktop ? 'bottom 50%' : 'bottom 65%', scrub: true },
          }
        );
        gsap.utils.toArray('.step').forEach((step) => {
          ScrollTrigger.create({ trigger: step, start: isDesktop ? 'top 70%' : 'top 62%', toggleClass: { targets: step, className: 'is-on' } });
        });
        gsap.fromTo('.journey-img', { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.journey-frame', start: 'top bottom', end: 'bottom 40%', scrub: true } });
      });
    },
    { scope: root }
  );

  return (
    <section id="journey" ref={root} className="relative overflow-hidden bg-chestnut px-5 py-24 text-shell md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="max-w-4xl font-display text-[clamp(2.6rem,7vw,6.2rem)] font-black leading-[0.95] tracking-[-0.03em]">
          From our farm to your home.
        </h2>

        <div className="steps relative mt-16 md:mt-24">
          <span className="absolute bottom-0 left-[1.35rem] top-0 w-[2px] bg-shell/20 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[1.35rem] lg:h-[2px] lg:w-auto" aria-hidden="true" />
          <span className="line-fill absolute bottom-0 left-[1.35rem] top-0 w-[2px] origin-top bg-yolk lg:bottom-auto lg:left-0 lg:right-0 lg:top-[1.35rem] lg:h-[2px] lg:w-auto lg:origin-left" aria-hidden="true" />

          <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="step group relative flex gap-5 pl-0 opacity-60 transition-opacity duration-500 lg:flex-col lg:gap-6 [&.is-on]:opacity-100">
                <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-bark text-shell transition-all duration-500 group-[.is-on]:scale-110 group-[.is-on]:bg-yolk group-[.is-on]:text-chestnut">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-extrabold leading-tight">{title}</h3>
                  <p className="mt-2 max-w-xs text-base text-shell/75">{text}</p>
                </div>
                <span className="sr-only">Step {i + 1} of {steps.length}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="journey-frame relative mx-auto mt-20 max-w-4xl md:mt-28">
          <div className="overflow-hidden rounded-[2.5rem]">
            <img src={basket} alt="A woven basket of fresh brown and white eggs" width="655" height="295" loading="lazy" className="journey-img aspect-[16/9] w-full object-cover" />
          </div>
          <Seal tone="yolk" className="absolute -bottom-8 -right-2 h-28 w-28 rotate-6 text-[0.7rem] md:-right-8 md:h-36 md:w-36 md:text-xs" />
        </div>
      </div>
    </section>
  );
}
