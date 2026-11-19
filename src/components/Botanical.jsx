import { useId } from 'react'
import { motion } from 'motion/react'

/* ───────── palettes ───────── */
const ROSE = {
  blush: ['#fde9e1', '#eebcad', '#c98776'],
  cream: ['#fffaf0', '#f1dfc4', '#d6b48d'],
  peach: ['#fdeadb', '#f3c6a5', '#d69a76'],
}

const PETAL = 'M0 0 C -26 -6, -30 -40, 0 -46 C 30 -40, 26 -6, 0 0 Z'

function useSvgId(prefix) {
  return prefix + useId().replace(/[^a-zA-Z0-9]/g, '')
}

/* ───────── single rose (drawn in a -50..50 box) ───────── */
export function Rose({ x = 0, y = 0, s = 1, tone = 'blush', r = 0 }) {
  const id = useSvgId('rose')
  const [light, mid, dark] = ROSE[tone]
  const ring = (n, scale, offset) =>
    Array.from({ length: n }, (_, i) => (
      <path
        key={`${scale}-${i}`}
        d={PETAL}
        transform={`rotate(${offset + (360 / n) * i}) scale(${scale})`}
        fill={`url(#${id})`}
        stroke={dark}
        strokeOpacity="0.35"
        strokeWidth={0.8 / scale}
      />
    ))
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <defs>
        <radialGradient id={id} cx="0" cy="0" r="48" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor={dark} />
          <stop offset="0.45" stopColor={mid} />
          <stop offset="1" stopColor={light} />
        </radialGradient>
      </defs>
      {ring(6, 1, 0)}
      {ring(5, 0.74, 32)}
      {ring(4, 0.5, 12)}
      <ellipse rx="13" ry="11" fill={mid} stroke={dark} strokeOpacity="0.4" strokeWidth="0.8" />
      <path
        d="M-8 2 C -8 -8, 8 -8, 8 0 C 8 6, -2 8, -3 2 C -4 -2, 2 -3, 2 0"
        fill="none"
        stroke={dark}
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </g>
  )
}

export function Leaf({ x, y, r = 0, s = 1 }) {
  const id = useSvgId('leaf')
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <defs>
        <linearGradient id={id} x1="0" y1="-8" x2="0" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#b9c19f" />
          <stop offset="1" stopColor="#7d8a63" />
        </linearGradient>
      </defs>
      <path d="M0 0 C 12 -11, 32 -11, 44 0 C 32 11, 12 11, 0 0 Z" fill={`url(#${id})`} />
      <path d="M2 0 L 40 0" stroke="#5f6c48" strokeWidth="0.7" opacity="0.5" />
    </g>
  )
}

function Bud({ x, y, r = 0, s = 1, tone = 'blush' }) {
  const [, mid, dark] = ROSE[tone]
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C -8 -6, -6 -18, 0 -22 C 6 -18, 8 -6, 0 0 Z" fill={mid} stroke={dark} strokeOpacity="0.4" />
      <path d="M0 0 C -6 -4, -9 -8, -8 -12 M0 0 C 6 -4, 9 -8, 8 -12" stroke="#7d8a63" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
  )
}

function Filler({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <circle key={a} cx="0" cy="-3.2" r="2.6" fill="#fffaf0" stroke="#d6b48d" strokeWidth="0.4" transform={`rotate(${a})`} />
      ))}
      <circle r="1.6" fill="#cda95a" />
    </g>
  )
}

/* ───────── corner bouquet (viewBox anchored to the top-left corner) ───────── */
export function RoseCluster({ corner = 'tl', className = '', style }) {
  const flip = { tl: '', tr: '-scale-x-100', bl: '-scale-y-100', br: '-scale-100' }[corner]
  return (
    <svg viewBox="0 0 260 260" className={`${flip} ${className}`} style={style} aria-hidden="true">
      <path d="M-5 30 C 60 40, 150 10, 255 22" stroke="#8b9670" strokeWidth="1.6" fill="none" />
      <path d="M30 -5 C 40 70, 10 160, 24 255" stroke="#8b9670" strokeWidth="1.6" fill="none" />
      <path d="M60 60 C 110 80, 150 110, 190 120" stroke="#8b9670" strokeWidth="1.2" fill="none" />
      {[
        [200, 18, -10, 0.7], [230, 26, 20, 0.55], [160, 28, 200, 0.7], [120, 22, -30, 0.8],
        [26, 200, 100, 0.7], [20, 235, 80, 0.55], [32, 170, -70, 0.7], [22, 130, 120, 0.8],
        [150, 108, 20, 0.7], [180, 124, -20, 0.6], [100, 120, 40, 0.9], [120, 70, -60, 0.9],
        [70, 130, 70, 0.9], [100, 30, 160, 1],
      ].map(([x, y, r, s], i) => (
        <Leaf key={i} x={x} y={y} r={r} s={s} />
      ))}
      <Rose x={68} y={64} s={1.05} tone="cream" r={10} />
      <Rose x={130} y={46} s={0.62} tone="blush" r={-20} />
      <Rose x={44} y={128} s={0.66} tone="blush" r={30} />
      <Rose x={110} y={104} s={0.45} tone="peach" />
      <Bud x={182} y={24} r={70} s={0.9} />
      <Bud x={26} y={188} r={170} s={0.9} tone="peach" />
      <Bud x={196} y={124} r={100} s={0.7} tone="cream" />
      {[[160, 62], [172, 50], [80, 150], [64, 168], [150, 90], [96, 140]].map(([x, y], i) => (
        <Filler key={i} x={x} y={y} s={0.9} />
      ))}
    </svg>
  )
}

/** Wraps decoration in the gentle "breathing" loop (scale + tilt, 2s each way). */
export function Breathe({ children, className = '', tilt = 2, scale = 1.05, delay = 0 }) {
  return (
    <motion.div
      className={className}
      style={{ willChange: 'transform' }}
      animate={{ scale: [1, scale], rotate: [0, tilt] }}
      transition={{ duration: 2, delay, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

/* ───────── embossed vine for the envelope ───────── */
export function EmbossVine({ className = '', style }) {
  const flower = (x, y, s = 1) => (
    <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-6" rx="4" ry="6" transform={`rotate(${a})`} />
      ))}
      <circle r="1.8" />
    </g>
  )
  const leaves = [
    [22, 40, -40], [38, 62, 40], [20, 92, -35], [40, 118, 35], [22, 150, -40], [38, 182, 40],
    [20, 214, -35], [40, 240, 35], [24, 270, -30],
  ]
  return (
    <svg viewBox="0 0 60 300" className={`emboss ${className}`} style={style} aria-hidden="true">
      <g fill="#fbf6ec" stroke="#fffdf8" strokeWidth="1">
        <path d="M30 298 C 22 250, 38 210, 30 160 S 22 70, 30 4" fill="none" strokeWidth="1.4" />
        {leaves.map(([x, y, r]) => (
          <ellipse key={`${x}${y}`} cx={x} cy={y} rx="8" ry="3.6" transform={`rotate(${r} ${x} ${y})`} />
        ))}
        {flower(30, 6, 0.9)}
        {flower(18, 128, 1.1)}
        {flower(42, 200)}
      </g>
    </svg>
  )
}

/* ───────── gold flourish divider (draws itself) ───────── */
const SCROLL_HALF =
  'M6 0 C 26 -14, 56 -14, 76 -3 C 92 5, 108 2, 112 -8 C 115 -16, 105 -20, 100 -13 C 96 -8, 101 -3, 105 -6 M8 6 C 26 16, 46 15, 60 6'

export function Flourish({ className = '', inView = true }) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    show: (d = 0) => ({
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { delay: d, duration: 2, ease: 'easeInOut' }, opacity: { delay: d, duration: 0.2 } },
    }),
  }
  const pop = {
    hidden: { scale: 0, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { delay: 0.8, type: 'spring', stiffness: 140, damping: 12 } },
  }
  const anim = inView
    ? { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.5 } }
    : { initial: 'hidden', animate: 'show' }
  return (
    <motion.svg viewBox="-125 -26 250 52" className={`mx-auto h-8 w-52 ${className}`} {...anim} aria-hidden="true">
      <defs>
        <linearGradient id="goldStroke" x1="-120" x2="120" y1="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a67d2b" />
          <stop offset="0.5" stopColor="#e2c992" />
          <stop offset="1" stopColor="#a67d2b" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#goldStroke)" strokeWidth="2" strokeLinecap="round">
        <motion.path d={SCROLL_HALF} variants={draw} custom={0.2} />
        <motion.path d={SCROLL_HALF} transform="scale(-1 1)" variants={draw} custom={0.2} />
      </g>
      <motion.g variants={pop} style={{ transformOrigin: '0px 0px', transformBox: 'view-box' }} fill="#b48c3d">
        <path d="M0 -12 C -5 -2, -4 6, 0 14 C 4 6, 5 -2, 0 -12 Z" />
        <path d="M-2 8 C -10 4, -16 8, -18 14 C -10 14, -5 12, -2 8 Z" />
        <path d="M2 8 C 10 4, 16 8, 18 14 C 10 14, 5 12, 2 8 Z" />
      </motion.g>
    </motion.svg>
  )
}
