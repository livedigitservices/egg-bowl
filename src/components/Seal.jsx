// Rotating "100% fresh & natural" seal (drawn in SVG, no external asset).
const tones = { meadow: 'bg-meadow text-shell', yolk: 'bg-yolk text-chestnut' };

export default function Seal({ className = '', tone = 'meadow' }) {
  return (
    <div
      className={`grid place-items-center rounded-full ${tones[tone]} shadow-[0_12px_30px_-10px_rgba(46,90,42,0.7)] ${className}`}
      role="img"
      aria-label="100% fresh and natural"
    >
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full animate-[spin_26s_linear_infinite]"
        aria-hidden="true"
      >
        <defs>
          <path id="sealPath" d="M60,60 m-47,0 a47,47 0 1,1 94,0 a47,47 0 1,1 -94,0" />
        </defs>
        <text fontSize="8.4" fontWeight="600" fill="currentColor" textLength="292" lengthAdjust="spacing">
          <textPath href="#sealPath">Farm fresh • No antibiotics • No hormones •</textPath>
        </text>
      </svg>
      <div className="text-center leading-none">
        <span className="block font-display text-[1.9em] font-black">100%</span>
        <span className="mt-1 block text-[0.62em] font-semibold">fresh &amp; natural</span>
      </div>
    </div>
  );
}
