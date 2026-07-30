const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type PanelProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  skew: number;
  cols: number;
  rows: number;
  opacity: number;
};

function Panel({ x, y, w, h, skew, cols, rows, opacity }: PanelProps) {
  const tlX = x + skew;
  const trX = x + w + skew;
  const blX = x;
  const brX = x + w;
  const bottom = y + h;

  const lines = [];
  for (let i = 1; i < cols; i++) {
    const t = i / cols;
    lines.push(
      <line
        key={`v${i}`}
        x1={lerp(tlX, trX, t)}
        y1={y}
        x2={lerp(blX, brX, t)}
        y2={bottom}
      />
    );
  }
  for (let j = 1; j < rows; j++) {
    const t = j / rows;
    lines.push(
      <line
        key={`h${j}`}
        x1={lerp(tlX, blX, t)}
        y1={lerp(y, bottom, t)}
        x2={lerp(trX, brX, t)}
        y2={lerp(y, bottom, t)}
      />
    );
  }

  const postX = x + w / 2;

  return (
    <g opacity={opacity}>
      {/* Mounting post */}
      <line
        x1={postX}
        y1={bottom - 4}
        x2={postX}
        y2={bottom + h * 0.5}
        stroke="#10B981"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />
      {/* Panel face */}
      <polygon
        points={`${tlX},${y} ${trX},${y} ${brX},${bottom} ${blX},${bottom}`}
        fill="url(#panelFace)"
        stroke="#10B981"
        strokeOpacity="0.45"
        strokeWidth="1"
      />
      <g stroke="#10B981" strokeOpacity="0.28" strokeWidth="0.75">
        {lines}
      </g>
    </g>
  );
}

/**
 * Row of tilted photovoltaic panels, drawn as a low-contrast silhouette.
 * Sits behind content — always render inside a pointer-events-none wrapper.
 */
export function SolarPanelArray({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 240"
      preserveAspectRatio="xMidYMax meet"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="panelFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#162444" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0A0F1C" stopOpacity="0.75" />
        </linearGradient>
        <linearGradient id="arrayFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0A0F1C" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#0A0F1C" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Back row — smaller, fainter, reads as distance */}
      <Panel x={80} y={92} w={150} h={52} skew={34} cols={4} rows={2} opacity={0.4} />
      <Panel x={268} y={92} w={150} h={52} skew={34} cols={4} rows={2} opacity={0.4} />
      <Panel x={1022} y={92} w={150} h={52} skew={34} cols={4} rows={2} opacity={0.4} />
      <Panel x={1210} y={92} w={150} h={52} skew={34} cols={4} rows={2} opacity={0.4} />

      {/* Front row */}
      <Panel x={-30} y={140} w={210} h={72} skew={48} cols={5} rows={3} opacity={0.75} />
      <Panel x={210} y={140} w={210} h={72} skew={48} cols={5} rows={3} opacity={0.75} />
      <Panel x={450} y={140} w={210} h={72} skew={48} cols={5} rows={3} opacity={0.75} />
      <Panel x={780} y={140} w={210} h={72} skew={48} cols={5} rows={3} opacity={0.75} />
      <Panel x={1020} y={140} w={210} h={72} skew={48} cols={5} rows={3} opacity={0.75} />
      <Panel x={1260} y={140} w={210} h={72} skew={48} cols={5} rows={3} opacity={0.75} />

      {/* Fade the top of the array into the section background */}
      <rect x="0" y="0" width="1440" height="240" fill="url(#arrayFade)" />
    </svg>
  );
}

/** Warm low sun sitting behind the panel array. */
export function SunGlow({ className = "" }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <div className="absolute inset-0 rounded-full bg-solar-400/20 blur-3xl" />
      <div className="absolute inset-[28%] rounded-full bg-solar-300/25 blur-2xl" />
    </div>
  );
}
