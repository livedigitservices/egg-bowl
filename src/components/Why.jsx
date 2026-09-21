import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { IndianRupee, Leaf, Package, ShieldCheck, Dumbbell } from 'lucide-react';
import { gsap } from '../lib/motion';
import logo from '../assets/logo.webp';

const reasons = [
  { icon: Leaf, title: 'Fresh & hygienic', text: 'Carefully collected and cleanly packed.' },
  { icon: ShieldCheck, title: 'Quality checked', text: 'Every egg is quality tested for your trust.' },
  { icon: Dumbbell, title: 'Nutritious & protein-rich', text: 'Packed with essential nutrients for good health.' },
  { icon: Package, title: 'Carefully packed', text: 'Hygienic packing to retain freshness.' },
  { icon: IndianRupee, title: 'Trusted quality at the right price', text: 'Best quality eggs at an affordable price.' },
];

export default function Why() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.why-line').forEach((line) => {
          gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, transformOrigin: 'left', duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: line, start: 'top 90%', once: true } });
        });
        gsap.fromTo('.why-logo', { rotate: -8 }, { rotate: 8, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
    },
    { scope: root }
  );

  return (
    <section id="why" ref={root} className="bg-shell px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="font-display text-[clamp(2.6rem,6.4vw,5.6rem)] font-black leading-[0.95] tracking-[-0.03em]">
            Why choose Egg Bowl?
          </h2>
          <p className="mt-5 max-w-sm text-lg text-chestnut/75">Five reasons families, shops and kitchens keep coming back to us.</p>
          <img src={logo} alt="Egg Bowl: fresh eggs, healthy choice, every day" width="809" height="773" loading="lazy" className="why-logo mt-10 hidden w-56 lg:block" />
        </div>

        <ul>
          {reasons.map(({ icon: Icon, title, text }) => (
            <li key={title} className="group relative">
              <span className="why-line absolute inset-x-0 top-0 h-[2px] bg-chestnut/25" aria-hidden="true" />
              <div className="relative flex items-center gap-5 overflow-hidden px-2 py-8 md:gap-8 md:px-6 md:py-11">
                <span className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-butter transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" aria-hidden="true" />
                <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-meadow text-shell transition-transform duration-500 group-hover:rotate-[-12deg] group-hover:scale-110 md:h-16 md:w-16">
                  <Icon size={26} aria-hidden="true" />
                </span>
                <div className="relative">
                  <h3 className="font-display text-2xl font-extrabold leading-tight md:text-4xl">{title}</h3>
                  <p className="mt-1.5 text-base text-chestnut/75 md:text-lg">{text}</p>
                </div>
              </div>
            </li>
          ))}
          <li className="why-line h-[2px] bg-chestnut/25" aria-hidden="true" />
        </ul>
      </div>
    </section>
  );
}
