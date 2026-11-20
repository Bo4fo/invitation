import { motion } from 'motion/react'

/** Burgundy round play / pause button, bottom-right. */
export default function MusicToggle({ playing, available, onToggle }) {
  if (!available) return null
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      data-music-toggle
      aria-label={playing ? 'Pause music' : 'Play music'}
      className="fixed bottom-5 right-5 z-40 flex size-16 items-center justify-center rounded-full bg-wine text-paper shadow-[0_6px_18px_rgba(90,15,27,0.4)]"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      {playing ? (
        <svg viewBox="0 0 24 24" className="size-6" fill="currentColor" aria-hidden="true">
          <rect x="6" y="5" width="4" height="14" rx="1" />
          <rect x="14" y="5" width="4" height="14" rx="1" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="ml-1 size-6" fill="currentColor" aria-hidden="true">
          <path d="M7 4.5 L19 12 L7 19.5 Z" />
        </svg>
      )}
    </motion.button>
  )
}
