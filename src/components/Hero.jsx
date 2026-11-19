import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { wedding } from '../config'
import { Breathe, RoseCluster } from './Botanical'
import HeroScene from './HeroScene'

const glow = { textShadow: '0 2px 14px rgba(255,248,235,0.95), 0 0 2px rgba(255,248,235,0.8)' }
const BASE = 1.2 // the envelope is still dissolving for the first moment

function Letters({ text, delay = 0 }) {
  return (
    <span className="block whitespace-nowrap" aria-label={text}>
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ delay: delay + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

const fadeIn = (delay, y = 20) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { delay: BASE + delay, duration: 1.5, ease: [0.22, 1, 0.36, 1] },
})

/* Torn paper edge that leads into the next section */
const TORN = (() => {
  const pts = []
  for (let i = 0; i <= 60; i++) {
    const n = Math.sin(i * 91.7 + 3.1) * 43758.5453
    pts.push(`${(i * 100) / 60} ${(4 + (n - Math.floor(n)) * 7).toFixed(2)}`)
  }
  return `M0 20 L${pts.join(' L')} L100 20 Z`
})()

/** Full-height painted garden arch with the date and the couple's names. */
export default function Hero() {
  const ref = useRef(null)
  const [imgOk, setImgOk] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yScene = useTransform(scrollYProgress, [0, 1], [0, 140])
  const yText = useTransform(scrollYProgress, [0, 1], [0, 220])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative h-svh min-h-[660px]">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div style={{ y: yScene }} className="absolute inset-0">
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroScene className="absolute inset-0 h-full w-full" />
            {/* Optional: your own painted scene at public/hero.jpg replaces the drawing */}
            {wedding.heroImage && (
              <img
                src={wedding.heroImage}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${imgOk ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImgOk(true)}
                onError={() => setImgOk(false)}
              />
            )}
          </motion.div>
        </motion.div>
      </div>

      <motion.div style={{ y: yText, opacity: fade }} className="absolute inset-x-0 top-[18%] z-10 text-center text-gold">
        <motion.p className="font-script text-3xl" style={glow} {...fadeIn(0)}>
          Wedding Day
        </motion.p>
        <motion.p className="mt-1 font-serif text-2xl tracking-[0.12em] text-ink/80" style={glow} {...fadeIn(0.3)}>
          {wedding.dateShort}
        </motion.p>

        <h1 className="mt-6 font-script text-[clamp(64px,19vw,96px)] leading-[1.05]" style={glow}>
          <Letters text={wedding.groom} delay={BASE + 0.6} />
          <motion.span
            className="block font-script text-4xl leading-[1.2]"
            initial={{ opacity: 0, scale: 0.3, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: BASE + 1.2, type: 'spring', stiffness: 90, damping: 10 }}
          >
            &amp;
          </motion.span>
          <Letters text={wedding.bride} delay={BASE + 1.4} />
        </h1>

        <motion.a
          href="#quote"
          className="mt-8 inline-flex flex-col items-center font-script text-3xl"
          style={glow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: BASE + 2.6, duration: 2 }}
        >
          Scroll down
          <motion.svg
            viewBox="0 0 32 16"
            className="mt-1 w-8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <path d="M2 3 L16 13 L30 3" />
          </motion.svg>
        </motion.a>
      </motion.div>

      {/* torn paper edge */}
      <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute -bottom-px left-0 z-[5] h-6 w-full drop-shadow-[0_-3px_4px_rgba(108,81,63,0.12)]" aria-hidden="true">
        <path d={TORN} fill="var(--color-paper)" />
      </svg>

      {/* rose bouquets spilling over the bottom corners (and past the column on desktop) */}
      {!imgOk && (
        <>
          <motion.div
            className="pointer-events-none absolute -bottom-6 -left-16 z-20 w-72 sm:-left-24 sm:w-80"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: BASE }}
          >
            <Breathe tilt={2} scale={1.05}>
              <RoseCluster corner="bl" />
            </Breathe>
          </motion.div>
          <motion.div
            className="pointer-events-none absolute -bottom-6 -right-16 z-20 w-72 sm:-right-24 sm:w-80"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: BASE + 0.3 }}
          >
            <Breathe tilt={-2} scale={1.04} delay={0.6}>
              <RoseCluster corner="br" />
            </Breathe>
          </motion.div>
        </>
      )}
    </section>
  )
}
