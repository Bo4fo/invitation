import { useId } from 'react'

/* Deterministic jagged edge so the torn paper looks the same every render */
function tornPath(seed) {
  const pts = []
  for (let i = 0; i <= 50; i++) {
    const x = i * 2
    const n = Math.sin(i * 12.9898 + seed * 78.233) * 43758.5453
    const y = 2 + (n - Math.floor(n)) * 6
    pts.push(`${x} ${y.toFixed(2)}`)
  }
  return `M0 12 L${pts.join(' L')} L100 12 Z`
}

const TOP = tornPath(1)
const BOTTOM = tornPath(2)

const BAND_TOP = tornPath(3)
const BAND_BOTTOM = tornPath(4)

/**
 * Full-width band of darker, grainy paper with hand-torn top and bottom edges.
 * Florals can overlap its edges (they sit outside it with a higher z-index).
 */
export function TornBand({ children, className = '', id }) {
  return (
    <section id={id} className={`relative z-0 my-2 drop-shadow-[0_4px_10px_rgba(108,81,63,0.12)] ${className}`}>
      <svg viewBox="0 0 100 12" preserveAspectRatio="none" className="block h-5 w-full" aria-hidden="true">
        <path d={BAND_TOP} fill="var(--color-sand)" />
      </svg>
      <div className="band-paper -my-px">{children}</div>
      <svg viewBox="0 0 100 12" preserveAspectRatio="none" className="block h-5 w-full -scale-y-100" aria-hidden="true">
        <path d={BAND_BOTTOM} fill="var(--color-sand)" />
      </svg>
    </section>
  )
}

/** A cream card with hand-torn top and bottom edges. */
export function TornCard({ children, className = '', innerClassName = '' }) {
  return (
    <div className={`relative drop-shadow-[0_8px_14px_rgba(108,81,63,0.14)] ${className}`}>
      <svg viewBox="0 0 100 12" preserveAspectRatio="none" className="block h-3 w-full" aria-hidden="true">
        <path d={TOP} fill="var(--color-card)" />
      </svg>
      <div className={`-my-px bg-card ${innerClassName}`}>{children}</div>
      <svg viewBox="0 0 100 12" preserveAspectRatio="none" className="block h-3 w-full -scale-y-100" aria-hidden="true">
        <path d={BOTTOM} fill="var(--color-card)" />
      </svg>
    </div>
  )
}

/* Wavy wax-seal outline */
function sealPath(R = 50) {
  const pts = []
  for (let i = 0; i < 120; i++) {
    const t = (i / 120) * Math.PI * 2
    const r = R + 3.2 * Math.sin(t * 7) + 1.6 * Math.sin(t * 13 + 1) + 1 * Math.sin(t * 3 + 2)
    pts.push(`${(r * Math.cos(t)).toFixed(2)} ${(r * Math.sin(t)).toFixed(2)}`)
  }
  return `M${pts.join(' L')} Z`
}
const SEAL = sealPath()

/** Wax seal (colours come from the theme in index.css); children are rendered on top of it (letters, "RSVP"…). */
export function WaxSeal({ children, className = '' }) {
  const id = 'seal' + useId().replace(/[^a-zA-Z0-9]/g, '')
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="-60 -60 120 120" className="h-full w-full drop-shadow-[0_6px_10px_var(--seal-shadow)]" aria-hidden="true">
        <defs>
          <radialGradient id={id} cx="-14" cy="-18" r="80" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="var(--seal-hi)" />
            <stop offset="0.45" stopColor="var(--seal-mid)" />
            <stop offset="1" stopColor="var(--seal-lo)" />
          </radialGradient>
        </defs>
        <path d={SEAL} fill={`url(#${id})`} />
        <circle r="38" fill="var(--seal-face)" stroke="var(--seal-edge)" strokeWidth="2.2" />
        <circle r="38" fill="none" stroke="var(--seal-rim)" strokeOpacity="0.45" strokeWidth="1" transform="translate(-0.8 -0.8)" />
        <circle r="33" fill="none" stroke="#cda95a" strokeOpacity="0.5" strokeWidth="0.6" />
        <path d="M-30 -36 C -18 -46, 6 -48, 20 -42" stroke="#fff" strokeOpacity="0.18" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  )
}
