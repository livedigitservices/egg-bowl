import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap, getLenis, scrollToId } from '../lib/motion';
import logo from '../assets/logo.webp';

const links = [
  { href: '#packs', label: 'Packs' },
  { href: '#eggs', label: 'Our eggs' },
  { href: '#why', label: 'Why Egg Bowl' },
  { href: '#journey', label: 'Farm to home' },
  { href: '#audience', label: 'Who we supply' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const menu = useRef(null);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 240);
        last = y;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open || !menu.current) return;
    const el = menu.current;
    getLenis()?.stop();
    gsap.fromTo(
      el,
      { clipPath: 'circle(0% at 92% 4%)' },
      { clipPath: 'circle(150% at 92% 4%)', duration: 0.8, ease: 'power3.inOut' }
    );
    gsap.fromTo(
      el.querySelectorAll('[data-item]'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.06, delay: 0.3, duration: 0.6, ease: 'power3.out' }
    );
    return () => getLenis()?.start();
  }, [open]);

  const go = (href) => (e) => {
    e.preventDefault();
    if (!open) return scrollToId(href);
    gsap.to(menu.current, {
      clipPath: 'circle(0% at 92% 4%)',
      duration: 0.5,
      ease: 'power3.in',
      onComplete: () => {
        setOpen(false);
        requestAnimationFrame(() => scrollToId(href));
      },
    });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ${
          hidden && !open ? '-translate-y-full' : ''
        }`}
      >
        <nav
          aria-label="Main"
          className={`mx-3 mt-3 flex max-w-[1400px] items-center justify-between rounded-full px-3 py-2 transition-all duration-500 md:mx-auto md:mt-4 md:px-4 xl:w-[calc(100%-5rem)] ${
            solid ? 'bg-shell/85 shadow-[0_10px_30px_-18px_rgba(58,29,18,0.6)] backdrop-blur-md' : ''
          }`}
        >
          <a href="#top" onClick={go('#top')} className="flex items-center gap-2.5" aria-label="Egg Bowl, back to top">
            <img src={logo} alt="" width="52" height="50" className="h-14 w-auto md:h-16" />
            <span className="font-display text-3xl font-black tracking-tight">Egg Bowl</span>
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={go(l.href)} className="link-slide text-sm font-semibold">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href="#order" onClick={go('#order')} className="btn btn-dark hidden !py-3 text-sm sm:inline-flex">
              Order eggs
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full bg-chestnut text-shell lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      {open && (
        <div ref={menu} className="fixed inset-0 z-[60] flex flex-col bg-chestnut px-6 pb-10 pt-6 text-shell" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="flex items-center justify-between">
            <span className="font-display text-2xl font-black">Egg Bowl</span>
            <button
              type="button"
              onClick={go('#top')}
              className="grid h-11 w-11 place-items-center rounded-full bg-shell text-chestnut"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>
          <ul className="mt-12 flex flex-1 flex-col justify-center gap-2">
            {links.map((l) => (
              <li key={l.href} data-item>
                <a href={l.href} onClick={go(l.href)} className="block py-1 font-display text-4xl font-extrabold sm:text-5xl">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a data-item href="#order" onClick={go('#order')} className="btn btn-yolk self-start">
            Order eggs
          </a>
          <p data-item className="mt-8 font-script text-lg text-yolk">
            Fresh eggs. Healthy choice. Every day.
          </p>
        </div>
      )}
    </>
  );
}
