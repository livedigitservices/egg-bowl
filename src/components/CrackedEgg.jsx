// A cracked egg drawn in SVG. Parts are addressable by class for GSAP:
// .egg-top (upper shell), .egg-yolk, .egg-white
const EGG =
  'M200 30 C275 30 330 140 330 230 C330 310 275 370 200 370 C125 370 70 310 70 230 C70 140 125 30 200 30 Z';
const ZIG = '0,225 60,215 95,195 125,225 160,195 200,228 240,195 275,225 305,195 340,215 400,225';

export default function CrackedEgg({ className = '' }) {
  return (
    <svg viewBox="0 0 400 420" className={`overflow-visible ${className}`} role="img" aria-label="A cracked egg with a golden yolk">
      <defs>
        <linearGradient id="shellG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F5CFA0" />
          <stop offset="1" stopColor="#C57B3E" />
        </linearGradient>
        <radialGradient id="yolkG" cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#FFD867" />
          <stop offset="0.55" stopColor="#F4A21D" />
          <stop offset="1" stopColor="#D5700A" />
        </radialGradient>
        <clipPath id="eggTopClip">
          <polygon points={`0,0 400,0 ${ZIG.split(' ').reverse().join(' ')}`} />
        </clipPath>
        <clipPath id="eggBotClip">
          <polygon points={`${ZIG} 400,420 0,420`} />
        </clipPath>
      </defs>

      <ellipse cx="200" cy="396" rx="120" ry="13" fill="#000" opacity="0.28" />

      <g clipPath="url(#eggBotClip)">
        <path d={EGG} fill="url(#shellG)" />
      </g>
      <ellipse className="egg-white" cx="200" cy="214" rx="126" ry="30" fill="#FFFBF0" />
      <g className="egg-yolk">
        <circle cx="200" cy="200" r="58" fill="url(#yolkG)" />
        <ellipse cx="180" cy="178" rx="16" ry="9" fill="#fff" opacity="0.4" transform="rotate(-30 180 178)" />
      </g>
      <g className="egg-top">
        <g clipPath="url(#eggTopClip)">
          <path d={EGG} fill="url(#shellG)" />
          <path d="M130 70 C150 50 175 44 195 44" stroke="#fff" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.35" />
        </g>
      </g>
    </svg>
  );
}
