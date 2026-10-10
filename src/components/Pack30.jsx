// 30-egg tray illustration (6 x 5), drawn in the same flat style as EggArt.
// Swap it for a real packaging photo whenever you have one (see Packs.jsx).
const EGG = 'M50 4 C75 4 92 45 92 68 C92 90 74 100 50 100 C26 100 8 90 8 68 C8 45 25 4 50 4Z';
const COLS = 6;
const ROWS = 5;

export default function Pack30({ className = '', style, ...rest }) {
  const cells = [];
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cx = 116 + 64 + c * 128;
      const cy = 128 + 46 + r * 92;
      const white = (r + c) % 3 === 0;
      const tilt = (((r * 7 + c * 3) % 5) - 2) * 3;
      cells.push({ key: `${r}-${c}`, cx, cy, white, tilt });
    }
  }

  return (
    <svg viewBox="0 0 1000 625" className={className} style={style} role="img" aria-label="Egg Bowl 30 egg tray" {...rest}>
      <defs>
        <linearGradient id="p30Tray" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CDAE7B" />
          <stop offset="1" stopColor="#A98450" />
        </linearGradient>
        <linearGradient id="p30Brown" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E9AE72" />
          <stop offset="1" stopColor="#B4652B" />
        </linearGradient>
        <linearGradient id="p30White" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E6D9C2" />
        </linearGradient>
      </defs>

      {/* tray */}
      <rect x="70" y="112" width="860" height="500" rx="46" fill="url(#p30Tray)" />
      <rect x="70" y="112" width="860" height="500" rx="46" fill="none" stroke="#fff" strokeOpacity="0.28" strokeWidth="3" />
      <rect x="96" y="132" width="808" height="460" rx="30" fill="#8F6F43" opacity="0.28" />

      {/* cups and eggs */}
      {cells.map(({ key, cx, cy, white, tilt }) => (
        <g key={key}>
          <ellipse cx={cx} cy={cy + 6} rx="55" ry="40" fill="#8F6F43" opacity="0.55" />
          <ellipse cx={cx} cy={cy + 2} rx="51" ry="36" fill="#A98450" />
          <g transform={`translate(${cx - 40} ${cy - 44}) rotate(${tilt} 40 44) scale(0.8)`}>
            <path d={EGG} fill={white ? 'url(#p30White)' : 'url(#p30Brown)'} />
            <path d="M30 30 C36 18 44 13 52 12" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.4" />
          </g>
        </g>
      ))}

      {/* hanging tag */}
      <g transform="translate(500 30)">
        <path d="M-210 0 H210 V70 Q210 86 194 86 H-194 Q-210 86 -210 70Z" fill="#3A1D12" />
        <text x="-118" y="62" textAnchor="middle" fontSize="64" fontWeight="900" fill="#FCF4E4" fontFamily="Fraunces, Georgia, serif">
          30
        </text>
        <text x="-42" y="40" fontSize="26" fontWeight="800" fill="#FCF4E4" fontFamily="Fraunces, Georgia, serif" letterSpacing="2">
          EGGS
        </text>
        <rect x="-44" y="52" width="170" height="24" rx="12" fill="#C25A10" />
        <text x="41" y="69" textAnchor="middle" fontSize="14" fontWeight="800" fill="#FCF4E4" fontFamily="Figtree, sans-serif" letterSpacing="1.5">
          PREMIUM QUALITY
        </text>
        <text x="168" y="54" textAnchor="middle" fontSize="15" fontWeight="800" fill="#F4A21D" fontFamily="Fraunces, Georgia, serif">
          Egg
        </text>
        <text x="168" y="72" textAnchor="middle" fontSize="15" fontWeight="800" fill="#F4A21D" fontFamily="Fraunces, Georgia, serif">
          Bowl
        </text>
      </g>
    </svg>
  );
}