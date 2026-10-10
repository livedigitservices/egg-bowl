import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { Bone, Brain, Droplet, Droplets, Dumbbell, Eye, Fish, Flame, ShieldCheck, Sparkles, Sun, Wheat, Zap } from 'lucide-react';
import { gsap, scrollToId } from '../lib/motion';
import NutritionEgg from './NutritionEgg';

// Values per 100g of egg. Edit the numbers here if anything needs correcting.
const macros = [
  { label: 'Energy', value: 163.28, unit: 'kcal', icon: Flame, card: 'bg-yolk text-chestnut', soft: 'text-chestnut/70', chip: 'bg-chestnut text-yolk' },
  { label: 'Protein', value: 14.47, unit: 'g', icon: Dumbbell, card: 'bg-chestnut text-shell', soft: 'text-yolk', chip: 'bg-yolk text-chestnut' },
  { label: 'Total fat', value: 11.2, unit: 'g', icon: Droplet, card: 'bg-butter text-chestnut', soft: 'text-ember', chip: 'bg-chestnut text-shell' },
  { label: 'Carbohydrates', value: 1.15, unit: 'g', icon: Wheat, card: 'bg-butter text-chestnut', soft: 'text-ember', chip: 'bg-chestnut text-shell' },
];

const micros = [
  { label: 'Calcium', value: 77.95, unit: 'mg', icon: Bone },
  { label: 'Iron', value: 1.83, unit: 'mg', icon: Zap },
  { label: 'Omega 3', value: 0.47, unit: 'g', icon: Fish },
  { label: 'Omega 6', value: 1.83, unit: 'g', icon: Droplets },
  { label: 'Vitamin A', value: 175.12, unit: 'mcg', icon: Eye },
  { label: 'Vitamin B12', value: 2.91, unit: 'mcg', icon: Sparkles },
  { label: 'Vitamin D', value: 1.44, unit: 'mcg', icon: Sun },
  { label: 'Vitamin E', value: 2.39, unit: 'mg', icon: ShieldCheck },
  { label: 'Choline', value: 538.22, unit: 'mg', icon: Brain },
];

// Share of protein, fat and carbohydrate by weight.
const split = (() => {
  const [, protein, fat, carbs] = macros.map((m) => m.value);
  const total = protein + fat + carbs;
  return [
    { label: 'Protein', pct: (protein / total) * 100, bar: 'bg-chestnut' },
    { label: 'Fat', pct: (fat / total) * 100, bar: 'bg-yolk' },
    { label: 'Carbs', pct: (carbs / total) * 100, bar: 'bg-meadow' },
  ];
})();

const fmt = (n) => n.toFixed(2);

function Value({ value, unit, unitClass = '', size = 'text-5xl md:text-6xl' }) {
  return (
    <p className={`font-display font-black leading-none tabular-nums ${size}`}>
      <span aria-hidden="true" className="count" data-value={value}>
        {fmt(value)}
      </span>
      <span className="sr-only">{fmt(value)}</span>
      <span className={`ml-1.5 text-lg font-extrabold md:text-xl ${unitClass}`}>{unit}</span>
    </p>
  );
}

export default function Nutrition() {
  const root = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const counters = gsap.utils.toArray('.count');

        gsap.from('.nut-visual', {
          opacity: 0,
          scale: 0.86,
          rotate: -4,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.nut-visual', start: 'top 85%', once: true },
        });
        gsap.from('.nut-card', {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.nut-macros', start: 'top 85%', once: true },
        });
        gsap.fromTo(
          '.nut-seg',
          { scaleX: 0 },
          { scaleX: 1, transformOrigin: 'left', duration: 1.2, stagger: 0.12, ease: 'expo.out', scrollTrigger: { trigger: '.nut-split', start: 'top 90%', once: true } }
        );
        gsap.from('.nut-tile', {
          opacity: 0,
          y: 28,
          duration: 0.6,
          stagger: { each: 0.06, grid: 'auto' },
          ease: 'power3.out',
          scrollTrigger: { trigger: '.nut-micros', start: 'top 88%', once: true },
        });

        counters.forEach((el) => {
          const target = Number(el.dataset.value);
          const state = { v: 0 };
          el.textContent = fmt(0);
          gsap.to(state, {
            v: target,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = fmt(state.v);
            },
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          });
        });

        return () => {
          counters.forEach((el) => {
            el.textContent = fmt(Number(el.dataset.value));
          });
        };
      });
    },
    { scope: root }
  );

  return (
    <section id="nutrition" ref={root} className="relative bg-shell px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="max-w-3xl font-display text-[clamp(2.6rem,7vw,6.2rem)] font-black leading-[0.95] tracking-[-0.03em]">Nutrition, per 100g.</h2>
          <p className="max-w-sm text-lg text-chestnut/75">What 100g of Egg Bowl eggs brings to your plate, straight from the shell.</p>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:mt-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-28">
            <div className="nut-visual relative mx-auto w-full max-w-[520px] overflow-hidden rounded-[2.2rem] bg-butter p-6 text-chestnut sm:p-10 lg:max-w-none">
              <NutritionEgg />
            </div>
          </div>

          <div>
            <ul className="nut-macros grid grid-cols-2 gap-3 md:gap-5">
              {macros.map(({ label, value, unit, icon: Icon, card, soft, chip }) => (
                <li key={label} className={`nut-card flex flex-col justify-between gap-8 rounded-[1.8rem] p-5 md:gap-12 md:rounded-[2.2rem] md:p-8 ${card}`}>
                  <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="order-2 text-sm font-bold sm:order-1 md:text-base">{label}</span>
                    <span className={`order-1 grid h-10 w-10 shrink-0 place-items-center rounded-full sm:order-2 md:h-11 md:w-11 ${chip}`}>
                      <Icon size={20} aria-hidden="true" />
                    </span>
                  </div>
                  <Value value={value} unit={unit} unitClass={soft} size="text-[2.4rem] sm:text-5xl md:text-6xl" />
                </li>
              ))}
            </ul>

            <div className="nut-split mt-5 rounded-[1.8rem] bg-white/70 p-5 md:mt-6 md:rounded-[2.2rem] md:p-7">
              <p className="text-sm font-bold md:text-base">Protein, fat and carbs, by weight</p>
              <div className="mt-4 flex h-4 gap-1 overflow-hidden rounded-full" role="img" aria-label={split.map((s) => `${s.label} ${Math.round(s.pct)} percent`).join(', ')}>
                {split.map((s) => (
                  <span key={s.label} className={`nut-seg block h-full first:rounded-l-full last:rounded-r-full ${s.bar}`} style={{ width: `${s.pct}%` }} />
                ))}
              </div>
              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                {split.map((s) => (
                  <li key={s.label} className="flex items-center gap-2">
                    <span className={`h-3 w-3 rounded-full ${s.bar}`} aria-hidden="true" />
                    {s.label} <span className="text-chestnut/70">{Math.round(s.pct)}%</span>
                  </li>
                ))}
              </ul>
            </div>

            <h3 className="mt-12 font-display text-2xl font-extrabold md:text-3xl">Fats, vitamins and minerals</h3>
            <ul className="nut-micros mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
              {micros.map(({ label, value, unit, icon: Icon }) => (
                <li key={label} className="nut-tile group relative overflow-hidden rounded-3xl border-2 border-chestnut/10 bg-white/60 p-4 last:col-span-2 sm:last:col-span-1 md:p-5">
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-butter transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-100" aria-hidden="true" />
                  <div className="relative">
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-meadow text-shell transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110">
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <p className="mt-4 text-sm font-bold md:text-base">{label}</p>
                    <Value value={value} unit={unit} unitClass="text-ember" size="mt-1 text-2xl md:text-3xl" />
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <button type="button" onClick={() => scrollToId('#packs')} className="btn btn-dark">
                Pick your pack
              </button>
              <p className="text-sm text-chestnut/60">Values shown per 100g of egg.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}