import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/motion';
import nest from '../assets/nest.webp';
import basket from '../assets/basket.webp';

const tokens = [
  'Farm', 'fresh,', 'carefully', 'collected', { chip: nest, alt: 'Brown and white eggs resting in straw' },
  'and', 'cleanly', 'packed.', 'Egg', 'Bowl', 'eggs', 'are', 'made', 'for', 'tables', 'where',
  'good', 'food', 'matters', { chip: basket, alt: 'A woven basket of fresh eggs' }, 'every', 'single', 'morning.',
];

export default function Statement() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '.st-word',
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.12,
            ease: 'none',
            scrollTrigger: { trigger: root.current, start: 'top 72%', end: 'bottom 55%', scrub: true },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="bg-shell px-5 py-28 md:px-10 md:py-44">
      <p className="mx-auto max-w-[1180px] font-display text-[clamp(2.1rem,5.6vw,5.2rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-balance">
        {tokens.map((t, i) =>
          typeof t === 'string' ? (
            <span key={i} className="st-word inline-block">
              {t}&nbsp;
            </span>
          ) : (
            <span key={i} className="st-word egg-frame mx-1 inline-block h-[0.95em] w-[1.25em] overflow-hidden align-[-0.12em]">
              <img src={t.chip} alt={t.alt} loading="lazy" className="h-full w-full object-cover" />
            </span>
          )
        )}
      </p>
    </section>
  );
}
