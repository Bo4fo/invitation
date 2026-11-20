import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { wedding } from '../config'
import Reveal, { SectionTitle } from './Reveal'

function diff(target) {
  const ms = Math.max(0, new Date(target) - new Date())
  return [
    ['Days', Math.floor(ms / 86400000)],
    ['Hours', Math.floor(ms / 3600000) % 24],
    ['Minutes', Math.floor(ms / 60000) % 60],
    ['Seconds', Math.floor(ms / 1000) % 60],
  ]
}

/** One number that rolls up as it changes. */
function Unit({ label, value }) {
  const str = String(value).padStart(2, '0')
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-16 items-center justify-center overflow-hidden px-1">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={str}
            className="font-serif text-[clamp(38px,11vw,48px)] leading-none text-gold"
            initial={{ y: '60%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '-60%', opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {str}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="font-serif text-lg text-gold">{label}</span>
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
    <section id="countdown" className="px-3 pb-10 pt-12">
      <SectionTitle title="The Celebration Begins In" className="mb-2" />
      <Reveal from="up">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start">
          {t.map(([k, v], i) => (
            <div key={k} className="contents">
              <Unit label={k} value={v} />
              {i < 3 && <span className="pt-3 font-serif text-4xl leading-none text-gold">:</span>}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
