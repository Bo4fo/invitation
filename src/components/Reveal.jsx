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

export function SectionTitle({ eyebrow, title }) {
  return (
    <div className="mb-10 text-center">
      {eyebrow && (
        <Reveal from="fade">
          <p className="mb-1 font-sans text-[11px] uppercase tracking-[0.4em] text-muted">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2 className="gold-text font-script text-5xl leading-tight sm:text-6xl">{title}</h2>
      </Reveal>
      <Flourish className="mt-2" />
    </div>
  )
}
