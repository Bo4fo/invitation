import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { wedding } from '../config'
import Reveal from './Reveal'
import { TornCard } from './Paper'
import { Flourish } from './Botanical'

function diff(target) {
  const ms = Math.max(0, new Date(target) - new Date())
  return [
    ['Days', Math.floor(ms / 86400000)],
    ['Hours', Math.floor(ms / 3600000) % 24],
    ['Minutes', Math.floor(ms / 60000) % 60],
    ['Seconds', Math.floor(ms / 1000) % 60],
  ]
}

function Unit({ label, value }) {
  const str = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-14 min-w-12 items-center justify-center overflow-hidden px-1">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={str}
            className="font-serif text-4xl text-ink sm:text-5xl"
            initial={{ y: '60%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-60%', opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {str}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1 font-sans text-[9px] uppercase tracking-[0.25em] text-muted sm:text-[10px]">{label}</span>
    </div>
  )
}

export default function Countdown() {
  const [t, setT] = useState(() => diff(wedding.date))
  useEffect(() => {
    const id = setInterval(() => setT(diff(wedding.date)), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="countdown" className="px-4 py-16">
      <Reveal from="zoom">
        <TornCard innerClassName="px-3 py-8 text-center">
          <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-muted">The celebration begins in</p>
          <h2 className="gold-text mt-1 font-script text-5xl leading-tight">Countdown Timer</h2>
          <div className="mt-6 flex items-start justify-center gap-1 sm:gap-2">
            {t.map(([k, v], i) => (
              <div key={k} className="flex items-start">
                <Unit label={k} value={v} />
                {i < 3 && <span className="px-1 pt-3 font-serif text-3xl text-gold">:</span>}
              </div>
            ))}
          </div>
          <Flourish className="mt-6" />
        </TornCard>
      </Reveal>
    </section>
  )
}
