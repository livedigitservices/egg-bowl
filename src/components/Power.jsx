import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Bone, Brain, Dumbbell, HeartPulse, Sparkles } from 'lucide-react';
import { gsap } from '../lib/motion';
import CrackedEgg from './CrackedEgg';

const items = [
  { icon: Dumbbell, title: 'High in protein', text: 'Quality protein in every egg.', pos: 'items-start md:left-[3%] md:top-[26%] lg:left-[8%]' },
  { icon: Sparkles, title: 'Rich in vitamins', text: 'Vitamins A, D, E and B12.', pos: 'items-start md:left-[3%] md:bottom-[20%] lg:left-[12%]' },
  { icon: Brain, title: 'Good for the brain', text: 'A smart start to the day.', pos: 'items-start md:right-[3%] md:top-[26%] lg:right-[8%] md:text-right md:flex-row-reverse' },
  { icon: Bone, title: 'Strengthens bones', text: 'Part of a balanced diet.', pos: 'items-start md:right-[3%] md:bottom-[20%] lg:right-[12%] md:text-right md:flex-row-reverse' },
  { icon: HeartPulse, title: 'Supports a healthy heart', text: 'A wholesome choice, every day.', pos: 'col-span-2 items-center text-center md:inset-x-0 md:bottom-[3%] md:mx-auto md:w-72 md:justify-center' },
];

/* Light layer: sits on the cream background */
function IntroLight() {
  return (
    <div
      className="pointer-events-none absolute inset-0 hidden flex-col items-center justify-center px-10 text-center text-chestnut motion-reduce:hidden md:flex"
      aria-hidden="true"
    >
      <p className="font-script text-2xl text-ember lg:text-8xl">Ever wondered what's inside?</p>
      {/* <p className="mt-3 font-display text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] tracking-[-0.03em]">
        Crack open
        <br />
        <span className="text-ember">the goodness.</span>
      </p> */}

      <div className="mt-10 flex flex-col items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-chestnut/70">
        <span>Scroll to find out</span>
        <span className="relative block h-10 w-6 rounded-full border-2 border-chestnut/50">
          <span className="power-cue-dot absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ember" />
        </span>
      </div>
    </div>
  );
}

/* Dark layer: lives inside the expanding circle, with its own copy */
function IntroDark() {
  return (
    <div
      className="power-intro pointer-events-none absolute inset-0 hidden flex-col items-center justify-center px-10 text-center text-shell motion-reduce:hidden md:flex"
      aria-hidden="true"
    >
      {/* <p className="font-script text-2xl text-yolk lg:text-3xl">Nature's little powerhouse</p> */}
       <p className="mt-3 font-display text-[clamp(3rem,8vw,7rem)] font-black leading-[0.95] tracking-[-0.03em]">
        Crack open
        <br />
        <span className="text-ember">the goodness.</span>
      </p>

      <div className="mt-10 flex flex-col items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-shell/80">
        <span>Keep scrolling</span>
        <span className="relative block h-10 w-6 rounded-full border-2 border-shell/60">
          <span className="power-cue-dot absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-yolk" />
        </span>
      </div>
    </div>
  );
}

export default function Power() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.power-cue-dot', { y: 0, opacity: 1 }, { y: 16, opacity: 0, duration: 1.2, ease: 'power1.in', repeat: -1 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=280%', pin: true, scrub: 0.6, anticipatePin: 1 },
        });
        tl.fromTo('.power-fill', { clipPath: 'circle(0% at 50% 52%)' }, { clipPath: 'circle(82% at 50% 52%)', ease: 'power2.inOut', duration: 1.5 })
          .to('.power-intro', { opacity: 0, y: -50, scale: 0.94, duration: 0.5, ease: 'power2.in' }, 0.9)
          .from('.power-head', { opacity: 0, y: 40, duration: 0.6 }, '-=0.3')
          .from('.egg-wrap', { scale: 0.55, opacity: 0, y: 70, duration: 0.8 }, '<')
          .to('.egg-top', { y: -62, rotate: -14, svgOrigin: '330 215', duration: 0.9, ease: 'power3.out' })
          .from('.egg-yolk', { scale: 0.4, svgOrigin: '200 210', duration: 0.7, ease: 'back.out(1.6)' }, '<0.1')
          .from('.callout', { opacity: 0, y: 34, duration: 0.5, stagger: 0.3 }, '-=0.2')
          .to({}, { duration: 0.6 });
      });

      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.power-fill',
          { clipPath: 'circle(0% at 50% 8%)' },
          { clipPath: 'circle(150% at 50% 8%)', ease: 'none', scrollTrigger: { trigger: root.current, start: 'top 75%', end: 'top 5%', scrub: true } }
        );
        gsap.from('.power-head, .egg-wrap', { opacity: 0, y: 40, stagger: 0.15, duration: 0.8, scrollTrigger: { trigger: root.current, start: 'top 25%', once: true } });
        gsap.to('.egg-top', { y: -62, rotate: -14, svgOrigin: '330 215', duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '.egg-wrap', start: 'top 60%', once: true } });
        gsap.from('.callout', { opacity: 0, y: 26, stagger: 0.12, duration: 0.6, scrollTrigger: { trigger: '.callout-grid', start: 'top 85%', once: true } });
      });
    },
    { scope: root }
  );

  return (
    <section id="power" ref={root} className="relative overflow-hidden bg-shell text-shell md:h-svh">
      <IntroLight />

      <div className="power-fill absolute inset-0 bg-chestnut" aria-hidden="true">
        <IntroDark />
      </div>

      <div className="relative mx-auto flex max-w-[1400px] flex-col items-center px-5 pb-20 pt-24 md:h-full md:justify-start md:px-10 md:pb-0 md:pt-28">
        <div className="power-head text-center">
          <h2 className="font-display text-[clamp(2.6rem,7vw,6rem)] font-black leading-none tracking-[-0.02em]">The power of eggs</h2>
          <p className="mt-3 text-lg text-shell/75">Protein rich. Natural. Delicious.</p>
        </div>

        <div className="egg-wrap mt-10 w-[62%] max-w-[300px] md:mt-14 md:w-auto md:max-w-none">
          <CrackedEgg className="mx-auto h-auto w-full md:h-[min(42svh,380px)] md:w-auto" />
        </div>

        <ul className="callout-grid mt-10 grid w-full grid-cols-2 gap-x-4 gap-y-6 md:mt-0 md:contents">
          {items.map(({ icon: Icon, title, text, pos }) => (
            <li key={title} className={`callout flex flex-col gap-3 md:absolute md:w-64 md:flex-row md:items-center ${pos}`}>
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-yolk text-chestnut">
                <Icon size={22} aria-hidden="true" />
              </span>
              <span>
                <span className="block font-display text-lg font-extrabold leading-tight">{title}</span>
                <span className="mt-0.5 block text-sm text-shell/70">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}