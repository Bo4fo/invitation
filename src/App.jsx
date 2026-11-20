import { useEffect, useRef, useState } from 'react'

import { wedding } from './config'
import Envelope from './components/Envelope'
import Petals from './components/Petals'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import Rsvp from './components/Rsvp'
import MusicToggle from './components/MusicToggle'
import DressCode from './components/DressCode'
import { Quote, Schedule, Venue, Closing } from './components/Sections'

export default function App() {
  // Dev-only preview helpers: ?open skips the envelope, ?y=800 scrolls down (stripped from production builds)
  const params = import.meta.env.DEV ? new URLSearchParams(window.location.search) : null
  const [stage, setStage] = useState(params?.has('open') ? 'open' : 'closed') // closed → revealing → open
  const [playing, setPlaying] = useState(false)
  const [musicError, setMusicError] = useState(false)
  const audio = useRef(null)
  const userPaused = useRef(false) // true only when the guest pressed pause themselves

  useEffect(() => {
    if (!import.meta.env.DEV) return
    const y = Number(new URLSearchParams(window.location.search).get('y'))
    if (y) setTimeout(() => window.scrollTo({ top: y, behavior: 'instant' }), 300)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('locked', stage !== 'open')
  }, [stage])

  useEffect(() => {
    if (!wedding.music) return
    const a = new Audio(wedding.music)
    a.loop = true
    a.volume = 0.5
    a.preload = 'auto'
    // Keep the button in sync with what the audio is really doing
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onError = () => setMusicError(true)
    a.addEventListener('playing', onPlay)
    a.addEventListener('pause', onPause)
    a.addEventListener('error', onError)
    audio.current = a
    return () => {
      a.removeEventListener('playing', onPlay)
      a.removeEventListener('pause', onPause)
      a.removeEventListener('error', onError)
      a.pause()
    }
  }, [])

  // Browsers only allow sound after a tap/click, so it must start inside one
  const playMusic = () => {
    const a = audio.current
    if (!a || !a.paused) return
    a.play().catch(() => {}) // refused → the next tap anywhere retries (see below)
  }

  const toggleMusic = () => {
    const a = audio.current
    if (!a) return
    if (a.paused) {
      userPaused.current = false
      playMusic()
    } else {
      userPaused.current = true
      a.pause()
    }
  }

  // Safety net: if the music isn't playing (refused, interrupted by a call,
  // the tab was in the background, the page reloaded code…), the next tap
  // anywhere starts it again — unless the guest paused it on purpose.
  useEffect(() => {
    if (stage === 'closed') return
    const kick = (e) => {
      if (e?.target?.closest?.('[data-music-toggle]')) return // the button handles itself
      if (!userPaused.current) playMusic()
    }
    const onVisible = () => document.visibilityState === 'visible' && kick()
    window.addEventListener('click', kick)
    window.addEventListener('touchend', kick)
    window.addEventListener('keydown', kick)
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      window.removeEventListener('click', kick)
      window.removeEventListener('touchend', kick)
      window.removeEventListener('keydown', kick)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [stage])

  const handleEnvelope = (s) => {
    if (s === 'start') playMusic() // the envelope tap counts as the guest's permission for sound
    else if (s === 'reveal') setStage('revealing')
    else setStage('open')
  }

  return (
    <div id="top" className="paper min-h-svh overflow-x-clip">
      {stage !== 'open' && <Envelope onOpen={handleEnvelope} />}

      {stage !== 'closed' && (
        <>
          <Petals />
          {/* Single centered column, like a card held in the hand */}
          <main className="relative mx-auto max-w-[460px] sm:shadow-[0_0_60px_rgba(108,81,63,0.08)]">
            <Hero />
            <Quote />
            <Countdown />
            <Schedule />
            <Venue />
            <DressCode />
            <Rsvp />
            <Closing />
          </main>
          <MusicToggle playing={playing} available={!!wedding.music && !musicError} onToggle={toggleMusic} />
        </>
      )}
    </div>
  )
}
