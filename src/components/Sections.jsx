import { useRef, useState } from 'react'
import { motion, useScroll } from 'motion/react'
import { wedding } from '../config'
import Reveal, { SectionTitle } from './Reveal'
import { Breathe, RoseCluster, Rose } from './Botanical'
import { TornBand } from './Paper'

/* ───────────── Quote / welcome (torn paper band) ───────────── */
export function Quote() {
  const { blessing, lines, greeting, message } = wedding.quote
  return (
    <TornBand id="quote">
      <div className="px-6 pb-14 pt-24 text-center">
        {blessing && (
          <Reveal from="fade">
            <p className="mb-6 font-serif text-2xl text-gold">{blessing}</p>
          </Reveal>
        )}
        {lines.map((l, i) => (
          <Reveal key={l} delay={0.2 + i * 0.35} from="fade">
            <p className="px-[0.2em] font-script text-[clamp(34px,9.5vw,44px)] leading-[1.15] text-gold">{l}</p>
          </Reveal>
        ))}
        <Reveal delay={0.4} className="mt-6">
          <p className="mx-auto max-w-xs font-serif text-lg leading-snug text-muted">
            {greeting}
            <br />
            {message}
          </p>
        </Reveal>
      </div>
    </TornBand>
  )
}

/* ───────────── Schedule (torn band, time | line | event) ───────────── */
function Diamond() {
  return <span className="block size-2.5 rotate-45 bg-taupe/80" />
}

export function Schedule() {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 85%', 'end 60%'] })
  const items = wedding.schedule
  return (
    <TornBand>
      <div className="px-4 pb-14 pt-12">
        <SectionTitle title="Schedule of Events" flourish="sides" className="mb-10" />
        <div ref={listRef} className="relative">
          {/* the centre line draws itself as you scroll */}
          <motion.span
            className="absolute bottom-6 left-1/2 top-6 w-px origin-top -translate-x-1/2 bg-taupe/60"
            style={{ scaleY: scrollYProgress }}
          />
          <ol>
            {items.map((e, i) => {
              const edge = i === 0 || i === items.length - 1
              return (
                <li key={e.title + e.time} className="grid grid-cols-[1fr_56px_1fr] items-center py-3">
                  <motion.span
                    className="text-center font-serif text-[clamp(24px,7vw,30px)] text-muted"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {e.time}
                  </motion.span>
                  <motion.span
                    className="relative z-10 flex justify-center"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ type: 'spring', stiffness: 160, damping: 12, delay: 0.2 }}
                  >
                    {edge ? (
                      <Breathe scale={1.08} tilt={i ? -4 : 4}>
                        <svg viewBox="-50 -50 100 100" className="size-14 drop-shadow-sm" aria-hidden="true">
                          <Rose tone="blush" s={0.95} />
                        </svg>
                      </Breathe>
                    ) : (
                      <Diamond />
                    )}
                  </motion.span>
                  <motion.span
                    className="text-center font-serif text-xl leading-tight text-muted"
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {e.title}
                  </motion.span>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </TornBand>
  )
}

/* ───────────── Venue + map + calendar ───────────── */
function calendarLinks() {
  const start = new Date(wedding.date)
  const end = new Date(start.getTime() + 8 * 3600000)
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const title = `Wedding of ${wedding.partner1} & ${wedding.partner2}`
  const where = [wedding.venue.name, wedding.venue.address].filter(Boolean).join(', ')
  const google = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${fmt(start)}/${fmt(end)}&location=${encodeURIComponent(where)}`
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//wedding-invite//EN',
    'BEGIN:VEVENT',
    `UID:${fmt(start)}@wedding-invite`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:${title}`,
    `LOCATION:${where}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  return { google, ics: `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}` }
}

/* Gold line drawing of an elegant venue that draws itself in */
function VenueDrawing() {
  const d = (delay) => ({
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { delay, duration: 2.2, ease: 'easeInOut' } },
  })
  const arch = (x, y, w, h) => `M${x} ${y + h} V${y + w / 2} A${w / 2} ${w / 2} 0 0 1 ${x + w} ${y + w / 2} V${y + h} Z`
  const columns = [104, 122, 140, 180, 198, 216]
  return (
    <motion.svg
      viewBox="0 0 320 175"
      className="mx-auto w-full max-w-sm"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      aria-hidden="true"
    >
      <g fill="none" stroke="var(--color-gold)" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
        {/* soft fill for depth */}
        <motion.path d="M22 150 V98 H72 V74 H248 V98 H298 V150 Z" fill="var(--color-gold-light)" fillOpacity="0.12" stroke="none" variants={d(0)} />
        <motion.path d="M8 166 C 90 160, 230 160, 312 166" variants={d(0)} />
        {/* steps */}
        <motion.path d="M118 150 H202 M112 155 H208 M106 160 H214" variants={d(0.3)} />
        {/* wings */}
        <motion.path d="M22 150 V98 H72 M298 150 V98 H248 M18 98 H76 M244 98 H302" variants={d(0.4)} />
        {[30, 46, 262, 278].map((x, i) => (
          <motion.path key={x} d={arch(x, 108, 10, 26)} variants={d(0.7 + i * 0.1)} />
        ))}
        {/* main hall + pediment */}
        <motion.path d="M72 150 V74 H248 V150" variants={d(0.5)} />
        <motion.path d="M66 74 H254 M92 74 L160 40 L228 74" variants={d(0.8)} />
        <motion.circle cx="160" cy="60" r="7" variants={d(1.2)} />
        {/* cupola */}
        <motion.path d="M146 46 V30 A14 14 0 0 1 174 30 V46 M160 16 V8 M156 11 H164" variants={d(1)} />
        {/* columns with capitals */}
        {columns.map((x, i) => (
          <motion.path key={x} d={`M${x} 80 V146 M${x - 4} 80 H${x + 4} M${x - 4} 146 H${x + 4}`} variants={d(1 + i * 0.08)} />
        ))}
        {/* doors and windows */}
        <motion.path d={arch(151, 112, 18, 38)} variants={d(1.4)} />
        {[82, 230].map((x, i) => (
          <motion.path key={x} d={arch(x, 96, 12, 30)} variants={d(1.5 + i * 0.1)} />
        ))}
        {/* garden shrubs */}
        <motion.path
          d="M2 150 C 2 136, 18 134, 20 148 M300 148 C 302 134, 318 136, 318 150 M60 150 C 60 140, 72 140, 72 150 M248 150 C 248 140, 260 140, 260 150"
          variants={d(1.8)}
        />
      </g>
    </motion.svg>
  )
}

/* Pale gold petals drifting around the drawing */
function DriftingPetals() {
  const petals = [
    [6, 8, 0, 26],
    [86, 20, 1.2, 22],
    [80, 70, 0.6, 26],
    [14, 62, 1.8, 18],
  ]
  return petals.map(([left, top, delay, size]) => (
    <motion.svg
      key={`${left}-${top}`}
      viewBox="0 0 20 25"
      className="pointer-events-none absolute"
      style={{ left: `${left}%`, top: `${top}%`, width: size }}
      animate={{ y: [0, -10, 0], x: [0, 6, 0], rotate: [-10, 12, -10] }}
      transition={{ duration: 6, delay, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <path d="M3 23 C 0 14, 4 4, 17 1 C 19 10, 14 20, 3 23 Z" fill="#f1dfb6" />
      <path d="M3 23 C 7 15, 11 8, 17 1" stroke="#cfb07a" strokeWidth="0.6" fill="none" />
    </motion.svg>
  ))
}

/* Gold ornament that sits on the map frame's top and bottom edges */
function FrameOrnament({ className }) {
  return (
    <svg viewBox="0 0 120 24" className={`absolute left-1/2 w-32 -translate-x-1/2 ${className}`} aria-hidden="true">
      <rect x="18" y="7" width="84" height="10" fill="var(--color-paper)" />
      <g fill="none" stroke="var(--color-gold)" strokeWidth="1.2" strokeLinecap="round">
        <path d="M60 4 C 52 12, 44 14, 34 12 C 26 10, 22 14, 24 18 M60 4 C 68 12, 76 14, 86 12 C 94 10, 98 14, 96 18" />
        <path d="M60 4 V20 M54 14 C 58 16, 62 16, 66 14" />
      </g>
      <circle cx="60" cy="4" r="2" fill="var(--color-gold)" />
    </svg>
  )
}

export function Venue() {
  const cal = calendarLinks()
  const { name, address, mapQuery } = wedding.venue
  const q = encodeURIComponent(mapQuery || address || name)
  return (
    <section className="relative px-6 pb-16 pt-14 text-center">
      <SectionTitle title="Location" flourish="under" className="mb-4" />
      <Reveal from="fade">
        <h3 className="font-serif text-2xl text-muted">{name}</h3>
        {address && <p className="mt-1 font-serif text-lg leading-snug text-muted">Address: {address}</p>}
      </Reveal>

      <div className="relative mt-4">
        <DriftingPetals />
        <VenueDrawing />
      </div>

      <Reveal from="zoom" className="relative mt-12">
        <FrameOrnament className="-top-3" />
        <div className="rounded-[18px] border-[1.5px] border-gold/80 p-1.5 shadow-[0_6px_18px_rgba(108,81,63,0.12)]">
          <div className="overflow-hidden rounded-xl">
            <iframe
              title="Venue map"
              src={`https://www.google.com/maps?q=${q}&output=embed`}
              className="block h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <FrameOrnament className="-bottom-3 -scale-y-100" />
      </Reveal>

      <Reveal from="fade" className="mt-8 font-serif text-muted">
        Add to calendar:{' '}
        <a href={cal.google} target="_blank" rel="noreferrer" className="text-gold underline underline-offset-4">
          Google
        </a>
        {' · '}
        <a href={cal.ics} download="wedding.ics" className="text-gold underline underline-offset-4">
          Apple / Outlook
        </a>
      </Reveal>
    </section>
  )
}

/* Soft painted meadow shown until the couple add their own photo */
function MeadowScene({ className }) {
  const flowers = Array.from({ length: 170 }, (_, i) => {
    const r1 = (Math.sin(i * 12.9898) * 43758.5453) % 1
    const r2 = (Math.sin(i * 78.233) * 12543.1234) % 1
    const t = Math.abs(r2) // 0 = horizon, 1 = foreground
    const y = 352 + t * t * 210
    return { x: Math.abs(r1) * 400 - 5, y, r: 1.2 + t * t * 5.5, c: ['#efc3b4', '#f7e3d2', '#e7a995', '#fbefe2'][i % 4] }
  })
  return (
    <svg viewBox="0 0 390 560" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="mSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbf4e6" />
          <stop offset="1" stopColor="#f6dcc4" />
        </linearGradient>
        <linearGradient id="mField" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e2c3a5" />
          <stop offset="1" stopColor="#b98d6c" />
        </linearGradient>
        <radialGradient id="mSun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fffaf0" stopOpacity="1" />
          <stop offset="1" stopColor="#fffaf0" stopOpacity="0" />
        </radialGradient>
        <filter id="mBlur">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <rect width="390" height="560" fill="url(#mSky)" />
      <motion.circle
        cx="195"
        cy="320"
        r="150"
        fill="url(#mSun)"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <path d="M0 340 C 60 318, 120 326, 180 334 C 250 322, 320 316, 390 332 V360 H0 Z" fill="#d8cdb8" filter="url(#mBlur)" opacity="0.8" />
      <path d="M0 350 C 100 342, 290 342, 390 350 V560 H0 Z" fill="url(#mField)" />
      {flowers.map((f, i) => (
        <circle key={i} cx={f.x} cy={f.y} r={f.r} fill={f.c} opacity={0.85} />
      ))}
    </svg>
  )
}

/* ───────────── Closing ───────────── */
export function Closing() {
  const [photoOk, setPhotoOk] = useState(true)
  const fade = { maskImage: 'linear-gradient(to bottom, transparent 0%, #000 26%)', WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 26%)' }
  return (
    <section className="relative pt-10 text-center">
      <Reveal from="fade">
        <p className="px-[0.2em] font-script text-[clamp(38px,10vw,48px)] leading-tight text-gold">Hope to see you there!</p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mt-2 font-serif text-3xl text-gold">
          {wedding.partner1} and {wedding.partner2}
        </p>
      </Reveal>

      <div className="relative -mt-4 aspect-[390/560] w-full">
        <motion.div
          className="absolute inset-0 overflow-hidden"
          style={fade}
          initial={{ opacity: 0, scale: 1.08 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {photoOk ? (
            <img
              src={wedding.photo}
              alt={`${wedding.partner1} and ${wedding.partner2}`}
              className="h-full w-full object-cover"
              onError={() => setPhotoOk(false)}
            />
          ) : (
            <MeadowScene className="h-full w-full" />
          )}
        </motion.div>
        <Breathe className="pointer-events-none absolute -bottom-4 -left-10 w-52" tilt={2}>
          <RoseCluster corner="bl" />
        </Breathe>
        <Breathe className="pointer-events-none absolute -bottom-4 -right-10 w-52" tilt={-2} delay={0.7}>
          <RoseCluster corner="br" />
        </Breathe>
      </div>
      <p className="relative bg-paper py-6 font-serif text-sm tracking-[0.2em] text-muted">{wedding.hashtag}</p>
    </section>
  )
}
