import { useEffect, useState } from 'react';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { brand } from '../config';

const types = ['Brown eggs', 'White eggs', 'Country eggs', 'Premium quality eggs', 'Mixed brown and white'];
const packs = ['6-egg pack', '10-egg pack', 'Bulk / wholesale'];

const field =
  'w-full rounded-2xl border-2 border-chestnut/15 bg-white px-4 py-3.5 text-base outline-none transition-colors placeholder:text-chestnut/40 focus:border-meadow';

export default function Order() {
  const [pack, setPack] = useState(packs[1]);
  const [type, setType] = useState(types[0]);

  useEffect(() => {
    const onPack = (e) => packs.includes(e.detail) && setPack(e.detail);
    window.addEventListener('eggbowl:pack', onPack);
    return () => window.removeEventListener('eggbowl:pack', onPack);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const lines = [
      `Hi Egg Bowl, I'd like to place an order.`,
      `Name: ${d.get('name')}`,
      `Eggs: ${type}, ${pack}`,
      `Quantity: ${d.get('qty')}`,
      d.get('note') ? `Note: ${d.get('note')}` : null,
    ].filter(Boolean);
    window.open(`https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank', 'noopener');
  };

  const contacts = [
    brand.phoneDisplay && { icon: Phone, label: brand.phoneDisplay, href: `tel:${brand.phoneDisplay.replace(/\s/g, '')}` },
    brand.email && { icon: Mail, label: brand.email, href: `mailto:${brand.email}` },
    brand.address && { icon: MapPin, label: brand.address },
  ].filter(Boolean);

  return (
    <section id="order" className="relative overflow-hidden bg-yolk px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-20">
        <div>
          <h2 className="font-display text-[clamp(3rem,8.4vw,7.6rem)] font-black leading-[0.92] tracking-[-0.035em]">
            Start your day with Egg Bowl.
          </h2>
          <p className="mt-6 max-w-lg text-lg text-chestnut/85 md:text-xl">
            Tell us what you need and we'll pick it up on WhatsApp. Orders for homes, shops, hotels, restaurants and wholesale are all welcome.
          </p>

          {contacts.length > 0 && (
            <ul className="mt-8 space-y-3 text-lg font-semibold">
              {contacts.map(({ icon: Icon, label, href }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon size={20} aria-hidden="true" />
                  {href ? (
                    <a href={href} className="link-slide">
                      {label}
                    </a>
                  ) : (
                    <span>{label}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>

        <form onSubmit={submit} className="rounded-[2.2rem] bg-shell p-6 shadow-[0_30px_60px_-30px_rgba(58,29,18,0.6)] md:p-9">
          <h3 className="font-display text-3xl font-extrabold">Place an order</h3>

          <div className="mt-6 grid gap-5">
            <label className="block">
              <span className="mb-1.5 block text-sm font-bold">Your name</span>
              <input name="name" required autoComplete="name" placeholder="Full name" className={field} />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-bold">Type of eggs</span>
              <select value={type} onChange={(e) => setType(e.target.value)} className={field}>
                {types.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>

            <fieldset>
              <legend className="mb-1.5 text-sm font-bold">Pack</legend>
              <div className="grid grid-cols-3 gap-2">
                {packs.map((p) => (
                  <label key={p} className="cursor-pointer">
                    <input type="radio" name="pack" value={p} checked={pack === p} onChange={() => setPack(p)} className="peer sr-only" />
                    <span className="grid h-full place-items-center rounded-2xl border-2 border-chestnut/15 bg-white px-2 py-3 text-center text-sm font-bold transition-colors peer-checked:border-meadow peer-checked:bg-meadow peer-checked:text-shell peer-focus-visible:outline-3 peer-focus-visible:outline-yolk">
                      {p}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="block">
              <span className="mb-1.5 block text-sm font-bold">Quantity</span>
              <input name="qty" required placeholder="For example, 4 packs a week" className={field} />
            </label>

            <label className="block">
              <span className="mb-1.5 block text-sm font-bold">Anything else? (optional)</span>
              <textarea name="note" rows={3} placeholder="Delivery area, timing, questions" className={field} />
            </label>
          </div>

          <button type="submit" className="btn btn-dark mt-7 w-full">
            <MessageCircle size={20} aria-hidden="true" />
            Send order on WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
