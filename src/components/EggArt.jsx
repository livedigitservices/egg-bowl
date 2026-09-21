// Flat egg illustrations for the product cards. Gradients are defined once in <EggDefs />.
const EGG = 'M50 4 C75 4 92 45 92 68 C92 90 74 100 50 100 C26 100 8 90 8 68 C8 45 25 4 50 4Z';

export function EggDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <linearGradient id="gBrown" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E9AE72" />
          <stop offset="1" stopColor="#B4652B" />
        </linearGradient>
        <linearGradient id="gWhite" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E6D9C2" />
        </linearGradient>
        <linearGradient id="gCountry" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EBC08F" />
          <stop offset="1" stopColor="#C58C50" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function Egg({ x, y, s = 1, r = 0, fill, speckle }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r} 50 52) scale(${s})`}>
      <path d={EGG} fill={`url(#${fill})`} />
      <path d="M30 30 C36 18 44 13 52 12" stroke="#fff" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.4" />
      {speckle &&
        [[38, 58], [58, 44], [64, 72], [46, 80], [30, 68], [56, 62], [70, 56], [44, 36]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 2 ? 1.4 : 2} fill="#7A4A26" opacity="0.55" />
        ))}
    </g>
  );
}

export default function EggArt({ kind, className = '' }) {
  return (
    <svg viewBox="0 0 320 300" className={className} aria-hidden="true">
      {kind === 'brown' && (
        <>
          <Egg x={30} y={70} s={1.5} r={-12} fill="gBrown" />
          <Egg x={150} y={50} s={1.7} r={8} fill="gBrown" />
          <Egg x={92} y={140} s={1.6} r={-2} fill="gBrown" />
        </>
      )}
      {kind === 'white' && (
        <>
          <Egg x={30} y={70} s={1.5} r={-12} fill="gWhite" />
          <Egg x={150} y={50} s={1.7} r={8} fill="gWhite" />
          <Egg x={92} y={140} s={1.6} r={-2} fill="gWhite" />
        </>
      )}
      {kind === 'country' && (
        <>
          <Egg x={30} y={70} s={1.5} r={-12} fill="gCountry" speckle />
          <Egg x={150} y={50} s={1.7} r={8} fill="gCountry" speckle />
          <Egg x={92} y={140} s={1.6} r={-2} fill="gCountry" speckle />
        </>
      )}
      {kind === 'premium' && (
        <>
          <Egg x={30} y={90} s={1.4} r={-12} fill="gWhite" />
          <Egg x={165} y={80} s={1.5} r={8} fill="gBrown" />
          <Egg x={92} y={30} s={1.9} r={0} fill="gBrown" />
          <g transform="translate(160 178) rotate(-6)">
            <path d="M-70 -20 H70 L58 0 L70 20 H-70 L-58 0Z" fill="#C25A10" />
            <text x="0" y="6" textAnchor="middle" fontSize="15" fontWeight="800" fill="#FCF4E4" fontFamily="Figtree, sans-serif">
              Premium quality
            </text>
          </g>
        </>
      )}
      {kind === 'bulk' && (
        <>
          <path d="M20 170 H300 L280 270 H40Z" fill="#B99A6B" />
          <path d="M20 170 H300 L296 190 H24Z" fill="#9C7F52" />
          {[0, 1, 2].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <Egg
                key={`${row}-${col}`}
                x={38 + col * 52 + row * 6}
                y={row === 0 ? 62 : row === 1 ? 92 : 122}
                s={0.62}
                fill={(row + col) % 3 === 0 ? 'gWhite' : 'gBrown'}
              />
            ))
          )}
        </>
      )}
    </svg>
  );
}
