import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { wedding } from './config'
import Envelope from './components/Envelope'
import Petals from './components/Petals'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Rsvp from './components/Rsvp'
import MusicToggle from './components/MusicToggle'
import DressCode from './components/DressCode'
import { Quote, Story, Schedule, Venue, Gifts, Faq, Closing } from './components/Sections'

export default function App() {
  // Dev-only preview helpers: ?open skips the envelope, ?y=800 scrolls down (stripped from production builds)
  const params = import.meta.env.DEV ? new URLSearchParams(window.location.search) : null
  const [stage, setStage] = useState(params?.has('open') ? 'open' : 'closed') // closed → revealing → open
  const [playing, setPlaying] = useState(false)
  const [musicOk, setMusicOk] = useState(false)
  const audio = useRef(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    if (!import.meta.env.DEV) return
    const y = Number(new URLSearchParams(window.location.search).get('y'))
    if (y) setTimeout(() => window.scrollTo({ top: y, behavior: 'instant' }), 300)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('locked', stage !== 'open')
  }, [stage])

  useEffect(() => {
    const a = new Audio(wedding.music)
    a.loop = true
    a.volume = 0.5
    a.addEventListener('canplay', () => setMusicOk(true), { once: true })
    a.addEventListener('error', () => setMusicOk(false))
    audio.current = a
    return () => a.pause()
  }, [])

  const toggleMusic = () => {
    const a = audio.current
    if (!a) return
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {})
    else {
      a.pause()
      setPlaying(false)
    }
  }

  const handleEnvelope = (s) => {
    if (s === 'start') {
      // The tap is a user gesture, so play() is allowed (needed on iOS, which won't preload first)
      audio.current
        ?.play()
        .then(() => {
          setMusicOk(true)
          setPlaying(true)
        })
        .catch(() => {})
    } else if (s === 'reveal') setStage('revealing')
    else setStage('open')
  }

  return (
    <div id="top" className="paper min-h-svh overflow-x-clip">
      {stage !== 'open' && <Envelope onOpen={handleEnvelope} />}

      {stage !== 'closed' && (
        <>
          <motion.div className="fixed inset-x-0 top-0 z-40 h-0.5 origin-left bg-gold" style={{ scaleX: progress }} />
          <Petals />
          {/* Single centered column, like a card held in the hand */}
          <main className="relative mx-auto max-w-[460px] sm:shadow-[0_0_60px_rgba(108,81,63,0.08)]">
            <Hero />
            <Quote />
            <Countdown />
            <Schedule />
            <Venue />
            <DressCode />
            <Gifts />
            <Story />
            <Faq />
            <Rsvp />
            <Closing />
          </main>
          <MusicToggle playing={playing} available={musicOk} onToggle={toggleMusic} />
        </>
      )}
    </div>
  )
}
