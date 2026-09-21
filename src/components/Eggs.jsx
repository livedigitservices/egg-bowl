import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '../lib/motion';
import EggArt, { EggDefs } from './EggArt';

const eggs = [
  { kind: 'brown', name: 'Brown eggs', text: 'Rich in nutrition and taste. Perfect for a healthy lifestyle.', card: 'bg-[#F1C99C] text-chestnut' },
  { kind: 'white', name: 'White eggs', text: 'Clean, fresh and wholesome. Ideal for everyday meals.', card: 'bg-[#E9E1CF] text-chestnut' },
  { kind: 'country', name: 'Country eggs', text: 'Naturally laid by healthy hens. Higher nutrition and a richer yolk.', card: 'bg-[#CFDDBB] text-chestnut' },
  { kind: 'premium', name: 'Premium quality eggs', text: 'Selected with care, packed with quality and freshness.', card: 'bg-chestnut text-shell' },
  { kind: 'bulk', name: 'Bulk and wholesale eggs', text: 'The best choice for businesses, retailers and large orders.', card: 'bg-yolk text-chestnut' },
];

export default function Eggs() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const track = root.current.querySelector('.eggs-track');
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 80);
        gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="eggs" ref={root} className="relative bg-shell md:h-svh md:overflow-hidden">
      <EggDefs />
      <div className="flex flex-col justify-center py-24 md:h-full md:py-0">
        <div className="mx-auto w-full max-w-[1400px] px-5 md:px-10">
          <h2 className="font-display text-[clamp(2.6rem,7vw,6.2rem)] font-black leading-[0.95] tracking-[-0.03em]">Our eggs.</h2>
          <p className="mt-3 max-w-xl text-lg text-chestnut/75">Five kinds of good eggs. Choose the one that suits your table, shelf or kitchen.</p>
        </div>

        <div className="eggs-track mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 md:mt-12 md:w-max md:snap-none md:gap-8 md:overflow-visible md:px-10 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {eggs.map((e) => (
            <article
              key={e.kind}
              className={`group relative flex w-[80vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-[2.2rem] p-6 sm:w-[46vw] md:h-[min(58svh,520px)] md:w-[min(30vw,400px)] md:p-8 ${e.card}`}
            >
              <EggArt kind={e.kind} className="egg-art mx-auto w-[78%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110" />
              <div className="mt-6">
                <h3 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">{e.name}</h3>
                <p className="mt-2 max-w-xs text-base opacity-80">{e.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
