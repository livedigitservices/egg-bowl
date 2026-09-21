import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Home, Hotel, Store, UtensilsCrossed, Warehouse } from 'lucide-react';
import { gsap } from '../lib/motion';

const rows = [
  { icon: Home, name: 'Home', text: 'Everyday eggs for the family table.' },
  { icon: Store, name: 'Retail shops', text: 'Packed and ready for the shelf.' },
  { icon: Hotel, name: 'Hotels', text: 'Consistent quality for every guest.' },
  { icon: UtensilsCrossed, name: 'Restaurants', text: 'Fresh eggs for busy kitchens.' },
  { icon: Warehouse, name: 'Wholesale', text: 'Bulk supply for retailers and large orders.' },
];

export default function Audience() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray('.aud-row').forEach((row) => {
          gsap.from(row.querySelector('.aud-name'), { yPercent: 100, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: row, start: 'top 88%', once: true } });
        });
      });
    },
    { scope: root }
  );

  return (
    <section id="audience" ref={root} className="bg-shell px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="font-display text-[clamp(2.6rem,7vw,6.2rem)] font-black leading-[0.95] tracking-[-0.03em]">Available for</h2>

        <ul className="mt-12 md:mt-16">
          {rows.map(({ icon: Icon, name, text }) => (
            <li key={name} className="aud-row group relative border-t-2 border-chestnut/25 last:border-b-2">
              <div className="relative flex items-center justify-between gap-6 overflow-hidden px-1 py-6 md:px-6 md:py-9">
                <span className="absolute inset-0 origin-left scale-x-0 bg-yolk transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-within:scale-x-100" aria-hidden="true" />
                <div className="relative flex-1 overflow-hidden">
                  <h3 className="aud-name font-display text-[clamp(2.4rem,8vw,6.5rem)] font-black leading-[1.02] tracking-[-0.03em] transition-transform duration-500 group-hover:translate-x-3 md:group-hover:translate-x-6">
                    {name}
                  </h3>
                </div>
                <p className="relative hidden max-w-[16rem] text-right text-lg font-medium opacity-70 transition-opacity duration-300 group-hover:opacity-100 md:block">{text}</p>
                <Icon size={34} aria-hidden="true" className="relative shrink-0 md:hidden" />
                <Icon size={44} aria-hidden="true" className="relative hidden shrink-0 -translate-x-4 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 md:block" />
              </div>
              <p className="pb-6 pl-1 text-base text-chestnut/75 md:hidden">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
