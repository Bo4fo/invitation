import { motion } from 'motion/react'
import { Leaf } from './Botanical'

/*
 * Painted garden scene for the hero: a carved stone arch on columns,
 * vines and blossoms, sun rays, a misty lake and two swans forming a heart.
 * Drawn in a 460 × 860 box; scaled to cover the hero.
 */

/* Broad Moorish arch with a soft point at the top */
const OPENING =
  'M95 860 V300 C95 190, 130 120, 200 92 C216 85, 226 76, 230 62 C234 76, 244 85, 260 92 C330 120, 365 190, 365 300 V860 Z'
const MOULD_1 =
  'M81 860 V300 C81 180, 120 104, 194 76 C212 68, 224 58, 230 42 C236 58, 248 68, 266 76 C340 104, 379 180, 379 300 V860'
const MOULD_2 =
  'M89 860 V300 C89 186, 126 112, 197 84 C214 77, 225 67, 230 52 C235 67, 246 77, 263 84 C334 112, 371 186, 371 300 V860'
const VINE_LEFT = 'M102 600 V300 C102 194, 136 126, 204 99 C218 93, 227 84, 230 72'

const bez = (a, b, c, d, t) => {
  const u = 1 - t
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d
}

/* Leaf positions along the inside of the arch (left half; mirrored for the right) */
const LEFT_LEAVES = (() => {
  const pts = []
  for (let y = 590; y > 300; y -= 26) pts.push([102, y, -90])
  const c = [
    [102, 300],
    [102, 194],
    [136, 126],
    [204, 99],
  ]
  for (let t = 0.04; t < 1; t += 0.07) {
    const x = bez(c[0][0], c[1][0], c[2][0], c[3][0], t)
    const y = bez(c[0][1], c[1][1], c[2][1], c[3][1], t)
    const x2 = bez(c[0][0], c[1][0], c[2][0], c[3][0], t + 0.01)
    const y2 = bez(c[0][1], c[1][1], c[2][1], c[3][1], t + 0.01)
    pts.push([x, y, (Math.atan2(y2 - y, x2 - x) * 180) / Math.PI])
  }
  return pts.map(([x, y, a], i) => [x, y, a + (i % 2 ? 50 : -50), 0.32 + (i % 3) * 0.05])
})()

/* Hanging tendrils (x, y on the arch, length) */
const TENDRILS = [
  [106, 240, 90],
  [128, 160, 70],
  [168, 116, 55],
  [104, 420, 60],
]

function Blossom({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="0" cy="-5.5" rx="4.2" ry="5.8" transform={`rotate(${a})`} fill="#fffaf0" stroke="#e6d3b3" strokeWidth="0.5" />
      ))}
      <circle r="2" fill="#d9b25f" />
    </g>
  )
}

function Swan() {
  return (
    <g>
      <path
        d="M138 758 C 130 742, 134 728, 146 722 C 150 736, 156 742, 166 740 C 186 728, 214 732, 222 748 C 226 760, 214 770, 190 772 C 165 774, 145 770, 138 758 Z"
        fill="url(#swanBody)"
      />
      <path d="M158 746 C 172 724, 202 722, 214 742 C 198 736, 180 740, 166 754 Z" fill="#f7f4ef" stroke="#d8d2c8" strokeWidth="0.6" />
      <path d="M164 750 C 176 738, 192 736, 204 742" fill="none" stroke="#d8d2c8" strokeWidth="0.6" />
      {/* neck curves up and bows toward the other swan, forming half a heart */}
      <path
        d="M206 744 C 186 716, 182 688, 194 670 C 202 658, 214 660, 216 670"
        fill="none"
        stroke="url(#swanNeck)"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path d="M210 666 C 214 664, 220 666, 221 671 C 219 674, 213 675, 210 673 Z" fill="#fdfcf9" />
      <path d="M220 668.5 C 223 670, 225 672.5, 226 676 C 223 675, 220.5 673.5, 219.5 671.5 Z" fill="#d9874a" />
      <path d="M219 668.2 C 220 668.8, 220.4 670.4, 219.6 671.8" stroke="#3a332d" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <circle cx="215.4" cy="668.6" r="0.75" fill="#3a332d" />
    </g>
  )
}

function Column({ x }) {
  return (
    <g>
      <rect x={x} y="335" width="52" height="525" fill="url(#column)" />
      {[9, 18, 26, 34, 43].map((o) => (
        <line key={o} x1={x + o} y1="345" x2={x + o} y2="860" stroke="#cdb995" strokeWidth="0.8" opacity="0.7" />
      ))}
      <path d={`M${x - 6} 336 H${x + 58} L${x + 52} 312 H${x} Z`} fill="#ecdfc8" stroke="#cbb791" strokeWidth="0.8" />
      <path d={`M${x + 8} 334 C ${x + 14} 320, ${x + 20} 320, ${x + 26} 330 C ${x + 32} 320, ${x + 38} 320, ${x + 44} 334`} fill="none" stroke="#c9b48f" />
      <circle cx={x + 2} cy="318" r="6" fill="none" stroke="#c4ad85" strokeWidth="1.4" />
      <circle cx={x + 50} cy="318" r="6" fill="none" stroke="#c4ad85" strokeWidth="1.4" />
      <rect x={x - 12} y="294" width="76" height="18" fill="#efe4cf" stroke="#cbb791" strokeWidth="0.8" />
      <path d={`M${x - 12} 300 H${x + 64}`} stroke="#d8c7a7" strokeWidth="0.6" />
    </g>
  )
}

function VineHalf() {
  return (
    <g>
      <path d={VINE_LEFT} fill="none" stroke="#8b9670" strokeWidth="1.6" />
      {LEFT_LEAVES.map(([x, y, r, s], i) => (
        <Leaf key={i} x={x} y={y} r={r} s={s} />
      ))}
      {TENDRILS.map(([x, y, len], i) => (
        <motion.g
          key={i}
          style={{ transformOrigin: `${x}px ${y}px`, transformBox: 'view-box' }}
          animate={{ rotate: [-3, 3] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        >
          <path d={`M${x} ${y} C ${x + 8} ${y + len * 0.3}, ${x - 6} ${y + len * 0.6}, ${x + 3} ${y + len}`} fill="none" stroke="#8b9670" strokeWidth="1" />
          {[0.25, 0.5, 0.75, 1].map((f, j) => (
            <Leaf key={j} x={x + (j % 2 ? 3 : -1)} y={y + len * f} r={j % 2 ? 60 : 120} s={0.22} />
          ))}
        </motion.g>
      ))}
      {[
        [104, 470, 0.9],
        [106, 330, 1],
        [118, 200, 0.8],
        [160, 128, 0.9],
        [208, 98, 0.7],
      ].map(([x, y, s]) => (
        <Blossom key={`${x}${y}`} x={x} y={y} s={s} />
      ))}
    </g>
  )
}

export default function HeroScene({ className = '' }) {
  return (
    <svg viewBox="0 0 460 860" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#efe2c8" />
          <stop offset="0.45" stopColor="#fbf3e3" />
          <stop offset="0.72" stopColor="#f4ecdc" />
        </linearGradient>
        <linearGradient id="lake" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eee8d8" />
          <stop offset="0.5" stopColor="#ddd8c6" />
          <stop offset="1" stopColor="#cdc7b3" />
        </linearGradient>
        <linearGradient id="stone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ddcbab" />
          <stop offset="0.18" stopColor="#efe4d0" />
          <stop offset="0.82" stopColor="#efe4d0" />
          <stop offset="1" stopColor="#ddcbab" />
        </linearGradient>
        <linearGradient id="column" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#dccaa9" />
          <stop offset="0.45" stopColor="#f6eedf" />
          <stop offset="1" stopColor="#d6c3a0" />
        </linearGradient>
        <linearGradient id="swanBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#e2ddd3" />
        </linearGradient>
        <linearGradient id="swanNeck" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ece8e0" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
        <pattern id="carve" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M8 2 C 10 6, 10 10, 8 14 C 6 10, 6 6, 8 2 Z M2 8 C 6 6, 10 6, 14 8 C 10 10, 6 10, 2 8 Z" fill="none" stroke="#c4ab80" strokeWidth="0.45" />
          <path d="M0 0 L4 4 M16 0 L12 4 M0 16 L4 12 M16 16 L12 12" stroke="#c4ab80" strokeWidth="0.4" />
        </pattern>
        <filter id="blur6" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
        <filter id="blur2">
          <feGaussianBlur stdDeviation="1.6" />
        </filter>
      </defs>

      {/* sky + distant landscape */}
      <rect width="460" height="860" fill="url(#sky)" />
      <g filter="url(#blur6)" fill="#bcc19f" opacity="0.6">
        <ellipse cx="110" cy="592" rx="42" ry="30" />
        <ellipse cx="150" cy="582" rx="30" ry="36" />
        <ellipse cx="190" cy="600" rx="40" ry="16" />
        <ellipse cx="300" cy="590" rx="36" ry="26" />
        <ellipse cx="340" cy="580" rx="34" ry="38" />
        <ellipse cx="372" cy="598" rx="30" ry="20" />
      </g>
      <path d="M244 600 L248 548 L252 600 Z" fill="#c9c6ae" opacity="0.6" filter="url(#blur2)" />
      <path d="M90 606 C 160 596, 300 596, 370 606 L370 640 L90 640 Z" fill="#d9d8b9" />
      <rect x="90" y="628" width="280" height="232" fill="url(#lake)" />

      {/* shimmering water */}
      {[650, 672, 700, 730, 800, 830].map((y, i) => (
        <motion.path
          key={y}
          d={`M${150 + (i % 3) * 30} ${y} h${40 + (i % 2) * 30}`}
          stroke="#fff"
          strokeWidth="1.2"
          strokeLinecap="round"
          animate={{ opacity: [0.15, 0.7, 0.15], x: [0, 10, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
        />
      ))}
      {[0, 1.5].map((d) => (
        <motion.ellipse
          key={d}
          cx="230"
          cy="772"
          fill="none"
          stroke="#fff"
          strokeWidth="1"
          initial={{ rx: 70, ry: 5, opacity: 0.7 }}
          animate={{ rx: [70, 130], ry: [5, 10], opacity: [0.7, 0] }}
          transition={{ duration: 3, delay: d, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}

      {/* swans + reflection, gently bobbing */}
      <motion.g animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <g transform="translate(0 1544) scale(1 -1)" opacity="0.22" filter="url(#blur2)">
          <motion.g animate={{ x: [0, -7, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
            <Swan />
          </motion.g>
          <motion.g animate={{ x: [0, 7, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
            <g transform="translate(460 0) scale(-1 1)">
              <Swan />
            </g>
          </motion.g>
        </g>
        {/* the two swans drift apart and back together */}
        <motion.g animate={{ x: [0, -7, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
          <Swan />
        </motion.g>
        <motion.g animate={{ x: [0, 7, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
          <g transform="translate(460 0) scale(-1 1)">
            <Swan />
          </g>
        </motion.g>
      </motion.g>

      {/* carved stone arch */}
      <path d={`M0 0 H460 V860 H0 Z ${OPENING}`} fillRule="evenodd" fill="url(#stone)" />
      <path d={`M0 0 H460 V860 H0 Z ${OPENING}`} fillRule="evenodd" fill="url(#carve)" opacity="0.3" />
      <path d={MOULD_1} fill="none" stroke="#cdb995" strokeWidth="2.4" />
      <path d={MOULD_2} fill="none" stroke="#fffaf0" strokeWidth="1.4" opacity="0.8" />
      <path d={OPENING} fill="none" stroke="#c7b088" strokeWidth="3" opacity="0.6" />
      <Column x={22} />
      <Column x={386} />

      {/* vines and blossoms */}
      <VineHalf />
      <g transform="translate(460 0) scale(-1 1)">
        <VineHalf />
      </g>
      {[
        [392, 26, 1.5], [414, 58, 1.3], [380, 66, 1.1], [426, 104, 1.4], [398, 112, 1.2],
        [436, 150, 1], [370, 100, 0.9], [352, 36, 1.1], [410, 186, 0.9], [440, 30, 1],
      ].map(([x, y, s], i) => (
        <motion.g
          key={i}
          style={{ transformOrigin: `${x}px ${y}px`, transformBox: 'view-box' }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 3, delay: i * 0.3, repeat: Infinity }}
        >
          <Blossom x={x} y={y} s={s} />
        </motion.g>
      ))}

      {/* sun rays */}
      <motion.g
        filter="url(#blur6)"
        fill="#fffdf6"
        animate={{ opacity: [0.35, 0.7, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <polygon points="40,0 80,0 300,700 250,700" opacity="0.5" />
        <polygon points="110,0 135,0 360,640 330,640" opacity="0.35" />
        <polygon points="0,30 20,0 200,640 170,640" opacity="0.3" />
      </motion.g>
    </svg>
  )
}
