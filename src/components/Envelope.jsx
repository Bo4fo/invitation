import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { wedding } from '../config'
import { EmbossVine } from './Botanical'
import { WaxSeal } from './Paper'

const ease = [0.65, 0, 0.35, 1]

/* One folded flap of the envelope, clipped to a triangle. */
function Flap({ clip, open, to, delay, bg, z, children }) {
  return (
    <motion.div
      className="absolute inset-0"
      style={{ zIndex: z }}
      animate={open ? to : { x: 0, y: 0 }}
      transition={{ duration: 1.6, delay, ease }}
    >
      <div className="h-full w-full drop-shadow-[0_0_7px_rgba(108,81,63,0.25)]">
        <div className="relative h-full w-full" style={{ clipPath: clip, background: bg }}>
          {children}
        </div>
      </div>
    </motion.div>
  )
}

/**
 * Full-screen portrait envelope with embossed vines and a glowing wax seal.
 * Tap → the flaps part with warm light glowing through the seams, the seal
 * lifts away, and the envelope dissolves into the garden scene behind it.
 */
export default function Envelope({ onOpen }) {
  const [open, setOpen] = useState(false)
  const [gone, setGone] = useState(false)

  const start = () => {
    if (open) return
    setOpen(true)
    onOpen?.('start')
    setTimeout(() => {
      setGone(true)
      onOpen?.('reveal')
    }, 2100)
  }

  // Dev-only: ?autotap opens the envelope by itself (for previews)
  useEffect(() => {
    if (import.meta.env.DEV && new URLSearchParams(window.location.search).has('autotap')) {
      const id = setTimeout(() => {
        setOpen(true)
        setTimeout(() => setGone(true), 2100)
      }, 300)
      return () => clearTimeout(id)
    }
  }, [])

  return (
    <AnimatePresence onExitComplete={() => onOpen?.('done')}>
      {!gone && (
        <motion.div
          key="envelope"
          className="fixed inset-0 z-50 flex items-center justify-center"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        >
          <div className="absolute inset-0 bg-paper" />
          <motion.button
            type="button"
            onClick={start}
            aria-label="Tap to open the invitation"
            className="relative h-svh w-full max-w-[min(100vw,62svh)] cursor-pointer overflow-hidden outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {/* warm light inside the envelope */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,#fffbf0_0%,#fbecc9_40%,#f2d9a6_100%)]" />

            {/* top flap (lighter, it lifts slightly) */}
            <Flap
              z={2}
              clip="polygon(0 0, 100% 0, 50% 50%)"
              bg="linear-gradient(180deg,#fbf6ee 0%,#f3eadb 100%)"
              open={open}
              to={{ y: '-3%' }}
              delay={0.5}
            >
              <EmbossVine className="absolute left-[24%] top-[3%] h-[24%] -rotate-[28deg]" />
              <EmbossVine className="absolute right-[24%] top-[3%] h-[24%] rotate-[28deg]" />
            </Flap>
            {/* bottom flap (slides down) */}
            <Flap
              z={2}
              clip="polygon(0 100%, 100% 100%, 50% 50%)"
              bg="linear-gradient(0deg,#ece2d1 0%,#e2d5bf 100%)"
              open={open}
              to={{ y: '7%' }}
              delay={0.5}
            >
              <EmbossVine className="absolute bottom-[3%] left-[24%] h-[24%] rotate-[208deg]" />
              <EmbossVine className="absolute bottom-[3%] right-[24%] h-[24%] -rotate-[208deg]" />
            </Flap>
            {/* side flaps (part left and right) */}
            <Flap
              z={3}
              clip="polygon(0 0, 50% 50%, 0 100%)"
              bg="linear-gradient(90deg,#f1e8d9 0%,#ebe0cd 100%)"
              open={open}
              to={{ x: '-8%' }}
              delay={0.25}
            >
              <EmbossVine className="absolute left-[4%] top-1/2 h-[62%] -translate-y-1/2" />
            </Flap>
            <Flap
              z={3}
              clip="polygon(100% 0, 50% 50%, 100% 100%)"
              bg="linear-gradient(270deg,#f1e8d9 0%,#ebe0cd 100%)"
              open={open}
              to={{ x: '8%' }}
              delay={0.25}
            >
              <EmbossVine className="absolute right-[4%] top-1/2 h-[62%] -translate-y-1/2 -scale-x-100" />
            </Flap>

            {/* golden light leaking through the seams */}
            <motion.svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 z-[4] h-full w-full"
              initial={{ opacity: 0 }}
              animate={open ? { opacity: [0, 1, 1, 0] } : { opacity: 0 }}
              transition={{ duration: 2, times: [0, 0.25, 0.7, 1] }}
              aria-hidden="true"
            >
              <defs>
                <filter id="seamGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="1.4" />
                </filter>
              </defs>
              <g stroke="#ffd98a" strokeWidth="1.6" fill="none" filter="url(#seamGlow)">
                <path d="M2 0 L50 50 L98 0" />
                <path d="M2 100 L50 50 L98 100" />
              </g>
              <g stroke="#fff3d2" strokeWidth="0.35" fill="none">
                <path d="M2 0 L50 50 L98 0" />
                <path d="M2 100 L50 50 L98 100" />
              </g>
            </motion.svg>

            {/* wax seal with a pulsing golden rim */}
            <motion.div
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
              animate={open ? { y: '-140%', scale: 1.08, opacity: [1, 1, 0] } : { y: 0 }}
              transition={{ duration: 1.8, delay: 0.3, ease }}
            >
              <motion.div
                className="absolute inset-[9%] rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 8px 2px rgba(255,214,140,0.35), inset 0 0 6px 1px rgba(255,214,140,0.4)',
                    '0 0 28px 8px rgba(255,214,140,0.85), inset 0 0 12px 3px rgba(255,224,160,0.9)',
                  ],
                }}
                transition={{ duration: 1.6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              />
              <WaxSeal className="relative size-28 sm:size-32">
                <span className="gold-text px-[0.2em] font-script text-4xl sm:text-5xl">{wedding.initials}</span>
              </WaxSeal>
            </motion.div>

            {/* hint */}
            <motion.span
              className="absolute inset-x-0 bottom-[12%] z-10 font-sans text-xs uppercase tracking-[0.45em] text-ink"
              animate={open ? { opacity: 0 } : { opacity: [0.35, 1, 0.35] }}
              transition={open ? { duration: 0.3 } : { duration: 2.2, repeat: Infinity }}
            >
              Tap to open
            </motion.span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
