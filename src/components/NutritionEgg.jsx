// A halved egg with a golden yolk, ringed by rotating "per 100g" text.
// Built in SVG so it stays sharp at any size and uses the brand palette.
const EGG =
  'M200 30 C275 30 330 140 330 230 C330 310 275 370 200 370 C125 370 70 310 70 230 C70 140 125 30 200 30 Z';

export default function NutritionEgg({ className = '' }) {
  const unit = 'NUTRITION FACTS \u2022 PER 100G \u2022 ';
  return (
    <div className={`relative aspect-square w-full ${className}`}>
      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-[spin_40s_linear_infinite]" aria-hidden="true">
        <defs>
          <path id="nutRing" d="M200 200 m-176 0 a176 176 0 1 1 352 0 a176 176 0 1 1 -352 0" />
        </defs>
        <text fontSize="17" fontWeight="800" letterSpacing="3" fill="currentColor" className="font-sans" opacity="0.7">
          <textPath href="#nutRing" textLength="1095" lengthAdjust="spacing">
            {unit + unit}
          </textPath>
        </text>
      </svg>

      <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full animate-[bob_7s_ease-in-out_infinite]" role="img" aria-label="A halved egg with a golden yolk">
        <defs>
          <linearGradient id="nutShell" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F5CFA0" />
            <stop offset="1" stopColor="#C57B3E" />
          </linearGradient>
          <linearGradient id="nutWhite" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" />
            <stop offset="1" stopColor="#F3E8CF" />
          </linearGradient>
          <radialGradient id="nutYolk" cx="38%" cy="32%" r="75%">
            <stop offset="0" stopColor="#FFD867" />
            <stop offset="0.55" stopColor="#F4A21D" />
            <stop offset="1" stopColor="#D5700A" />
          </radialGradient>
        </defs>

        <g transform="translate(200 200) scale(0.8) translate(-200 -200)">
          <ellipse cx="200" cy="392" rx="130" ry="13" fill="#3A1D12" opacity="0.22" />
          <path d={EGG} fill="url(#nutShell)" />
          <g transform="translate(200 206) scale(0.92) translate(-200 -206)">
            <path d={EGG} fill="url(#nutWhite)" />
          </g>
          <circle cx="200" cy="236" r="86" fill="url(#nutYolk)" />
          <circle cx="200" cy="236" r="52" fill="#FFD867" opacity="0.35" />
          <ellipse cx="172" cy="200" rx="22" ry="12" fill="#fff" opacity="0.45" transform="rotate(-30 172 200)" />
          <path d="M120 80 C142 56 172 48 196 48" stroke="#fff" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.35" />
        </g>
      </svg>
    </div>
  );
}