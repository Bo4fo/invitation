import { motion } from 'motion/react'
import { Flourish } from './Botanical'

// Timings mirror the reference: fade 2s, fade-up 1.5s / 40px, zoom-in from 0.9
const presets = {
  up: { from: { y: 40 }, duration: 1.5 },
  fade: { from: {}, duration: 2 },
  left: { from: { x: -40 }, duration: 1.5 },
  right: { from: { x: 40 }, duration: 1.5 },
  zoom: { from: { scale: 0.9 }, duration: 1.5 },
}

export default function Reveal({ children, from = 'up', delay = 0, className = '' }) {
  const p = presets[from]
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...p.from }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: p.duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

/** Gold script heading. flourish: 'under' (small ornament below) | 'sides' (scrolls either side) | none */
export function SectionTitle({ title, flourish, className = 'mb-8' }) {
  if (flourish === 'sides') {
    return (
      <Reveal from="fade" className={`flex items-center justify-center gap-2 ${className}`}>
        <SideScroll />
        <h2 className="shrink-0 px-1 font-script text-[clamp(34px,9.5vw,44px)] leading-tight text-gold">{title}</h2>
        <SideScroll flip />
      </Reveal>
    )
  }
  return (
    <div className={`text-center ${className}`}>
      <Reveal from="fade">
        <h2 className="px-[0.2em] font-script text-[clamp(40px,11vw,52px)] leading-tight text-gold">{title}</h2>
      </Reveal>
      {flourish === 'under' && <Flourish className="-mt-1 h-6 w-32" />}
    </div>
  )
}

/** Small gold scroll used either side of a heading; draws itself in. */
function SideScroll({ flip = false }) {
  return (
    <motion.svg
      viewBox="0 0 60 20"
      className={`w-10 shrink sm:w-14 ${flip ? '-scale-x-100' : ''}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.8, ease: 'easeInOut' }}
      aria-hidden="true"
      style={{ color: 'var(--color-gold)' }}
    >
      <motion.path d="M2 10 H30 C 36 10, 40 4, 46 4 C 52 4, 54 10, 50 12 C 47 14, 44 11, 46 9" />
      <motion.path d="M14 10 C 18 15, 24 16, 30 14 C 34 13, 36 15, 34 17" />
      <circle cx="56" cy="10" r="1.6" fill="currentColor" stroke="none" />
    </motion.svg>
  )
}
