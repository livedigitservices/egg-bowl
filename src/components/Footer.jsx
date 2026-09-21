import { scrollToId } from '../lib/motion';
import logo from '../assets/logo.webp';

const links = [
  { href: '#packs', label: 'Packs' },
  { href: '#eggs', label: 'Our eggs' },
  { href: '#why', label: 'Why Egg Bowl' },
  { href: '#journey', label: 'Farm to home' },
  { href: '#order', label: 'Order' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-chestnut px-5 pb-8 pt-20 text-shell md:px-10 md:pt-28">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[auto_1fr] md:items-center md:gap-20">
        <img src={logo} alt="Egg Bowl: fresh eggs, healthy choice, every day" width="809" height="773" loading="lazy" className="w-44 md:w-56" />
        <div className="md:justify-self-end md:text-right">
          <p className="font-script text-2xl text-yolk md:text-3xl">Fresh eggs. Healthy choice. Every day.</p>
          <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3 md:justify-end">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToId(l.href);
                  }}
                  className="link-slide font-semibold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p aria-hidden="true" className="pointer-events-none mt-16 select-none text-center font-display text-[clamp(4rem,23vw,22rem)] font-black leading-[0.8] tracking-[-0.04em] text-bark md:mt-24">
        Egg Bowl
      </p>

      <p className="relative mt-6 text-center text-sm text-shell/60">&copy; {new Date().getFullYear()} Egg Bowl. Good eggs, better life.</p>
    </footer>
  );
}
