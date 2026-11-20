import { motion } from 'motion/react'
import { wedding } from '../config'
import Reveal, { SectionTitle } from './Reveal'
import { TornBand } from './Paper'
import { Breathe, RoseCluster } from './Botanical'

const sway = (x, y, dir, delay) => ({
  style: { transformOrigin: `${x}px ${y}px`, transformBox: 'view-box' },
  animate: { rotate: [-2 * dir, 2 * dir] },
  transition: { duration: 3, delay, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' },
})

function Hanger({ x }) {
  return (
    <g fill="none" strokeLinecap="round">
      <path d={`M${x} 26 C ${x} 16, ${x + 9} 14, ${x + 9} 8 C ${x + 9} 2, ${x + 1} 2, ${x} 6`} stroke="#b08f52" strokeWidth="2" />
      <path d={`M${x - 36} 40 L${x} 26 L${x + 36} 40`} stroke="#c9b48a" strokeWidth="3.5" />
    </g>
  )
}

/** Watercolour-style dress and suit on hangers, gently swaying. */
function Illustration() {
  return (
    <svg viewBox="0 0 270 200" className="mx-auto w-60" aria-hidden="true">
      <defs>
        <linearGradient id="dress" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c6cdbb" />
          <stop offset="1" stopColor="#9da98e" />
        </linearGradient>
        <linearGradient id="suit" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a9ad99" />
          <stop offset="1" stopColor="#727c66" />
        </linearGradient>
      </defs>

      {/* dress */}
      <motion.g {...sway(98, 6, 1, 0)}>
        <Hanger x={98} />
        <path d="M80 38 L84 50 M116 38 L112 50" stroke="#9da98e" strokeWidth="3" />
        <path d="M82 46 C 90 54, 106 54, 114 46 L110 84 L86 84 Z" fill="url(#dress)" />
        <path d="M86 50 L98 66 L110 50" fill="none" stroke="#849078" strokeWidth="1" />
        <path d="M84 84 C 70 120, 54 154, 42 190 C 74 198, 124 200, 158 188 C 144 152, 124 118, 112 84 Z" fill="url(#dress)" />
        <g stroke="#e3d1e4" strokeWidth="1.2" fill="none" opacity="0.8">
          <path d="M92 90 C 86 124, 76 160, 70 192" />
          <path d="M100 90 C 100 126, 100 160, 102 196" />
          <path d="M106 90 C 114 124, 124 156, 134 192" />
        </g>
        <rect x="84" y="80" width="28" height="7" rx="2" fill="#bbc2ae" />
        {/* bow + flowing ribbon */}
        <path d="M88 83 C 80 74, 72 78, 76 85 C 72 92, 80 94, 88 85 Z" fill="#d9decf" stroke="#9da98e" strokeWidth="0.6" />
        <motion.path
          d="M86 86 C 70 100, 52 92, 40 104 C 32 112, 26 108, 20 116"
          fill="none"
          stroke="#c9b48a"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ d: ['M86 86 C 70 100, 52 92, 40 104 C 32 112, 26 108, 20 116', 'M86 86 C 70 96, 54 100, 40 98 C 30 98, 26 112, 18 110'] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        />
      </motion.g>

      {/* suit */}
      <motion.g {...sway(190, 6, -1, 0.6)}>
        <Hanger x={190} />
        <path d="M156 42 L140 150 L153 152 L162 70 Z" fill="url(#suit)" />
        <path d="M224 42 L240 150 L227 152 L218 70 Z" fill="url(#suit)" />
        <path d="M156 42 L190 30 L224 42 L230 158 L196 164 L184 164 L150 158 Z" fill="url(#suit)" />
        <path d="M176 34 L190 92 L204 34 Z" fill="#faf5ea" />
        <path d="M178 54 L190 96 L202 54 L202 128 L178 128 Z" fill="#eadcbf" />
        {[104, 114, 124].map((y) => (
          <circle key={y} cx="190" cy={y - 8} r="1.4" fill="#b8a27a" />
        ))}
        <path d="M176 34 L166 72 L190 104 Z" fill="#748258" />
        <path d="M204 34 L214 72 L190 104 Z" fill="#748258" />
        <path d="M184 36 L190 44 L196 36 L190 33 Z" fill="#c9b48a" />
        <path d="M160 128 H176 M204 128 H220" stroke="#6c7a52" strokeWidth="1" />
        {/* boutonnière */}
        <g transform="translate(212 62)">
          <path d="M0 0 C 6 -2, 10 2, 12 6 M0 0 C -2 6, 2 10, 6 12" stroke="#7d8a63" strokeWidth="1.6" fill="none" />
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} cx="0" cy="-3.5" rx="2.6" ry="3.6" transform={`rotate(${a})`} fill="#f6efe4" />
          ))}
          <circle r="1.4" fill="#cda95a" />
        </g>
      </motion.g>
    </svg>
  )
}

export default function DressCode() {
  const { text, colors } = wedding.dressCode
  return (
    <div className="relative">
      {/* rose vines spilling over the band's corners */}
      <Breathe className="pointer-events-none absolute -right-8 -top-8 z-10 w-48" tilt={-2}>
        <RoseCluster corner="tr" />
      </Breathe>
      <TornBand>
        <div className="px-8 pb-16 pt-16 text-center">
          <Reveal from="zoom">
            <Illustration />
          </Reveal>
          <SectionTitle title="Dress Code" className="mt-2" />
          <Reveal>
            <p className="mx-auto -mt-6 max-w-xs font-serif text-lg leading-snug text-muted">{text}</p>
          </Reveal>
          <div className="mt-6 flex justify-center gap-3">
            {colors.map((c, i) => (
              <motion.span
                key={c}
                className="size-11 rounded-full border-[3px] border-white shadow-[0_0_0_1px_rgba(108,81,63,0.15),0_4px_10px_rgba(108,81,63,0.12)]"
                style={{ background: c }}
                initial={{ scale: 0, y: 20 }}
                whileInView={{ scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: 'spring', stiffness: 180, damping: 12 }}
              />
            ))}
          </div>

          <SectionTitle title="Gift Preference" className="mt-12" />
          <Reveal>
            <p className="mx-auto -mt-6 max-w-xs font-serif text-lg leading-snug text-muted">{wedding.gifts}</p>
          </Reveal>
        </div>
      </TornBand>
      <Breathe className="pointer-events-none absolute -bottom-8 -left-8 z-10 w-48" tilt={2} delay={0.8}>
        <RoseCluster corner="bl" />
      </Breathe>
    </div>
  )
}
