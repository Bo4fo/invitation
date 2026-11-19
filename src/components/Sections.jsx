import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { wedding } from '../config'
import Reveal, { SectionTitle } from './Reveal'
import { Breathe, Flourish, RoseCluster, Rose } from './Botanical'

/* ───────────── Quote / welcome ───────────── */
export function Quote() {
  const { lines, greeting, message } = wedding.quote
  return (
    <section id="quote" className="relative px-6 pb-16 pt-28 text-center">
      <Reveal from="fade">
        <p className="mb-8 font-sans text-[11px] uppercase tracking-[0.4em] text-muted">Together with their families</p>
      </Reveal>
      {lines.map((l, i) => (
        <Reveal key={l} delay={i * 0.35} from="fade">
          <p className={`font-script leading-snug ${i === lines.length - 1 ? 'gold-text text-5xl' : 'text-4xl text-ink'}`}>{l}</p>
        </Reveal>
      ))}
      <Flourish className="my-8" />
      <Reveal>
        <p className="font-sans text-sm uppercase tracking-[0.3em] text-ink">{greeting}</p>
      </Reveal>
      <Reveal delay={0.2}>
        <p className="mx-auto mt-4 max-w-sm font-serif text-lg leading-relaxed text-muted">{message}</p>
      </Reveal>
    </section>
  )
}

/* ───────────── Our story ───────────── */
export function Story() {
  return (
    <section className="px-6 py-16">
      <SectionTitle eyebrow="Our love story" title="How it Began" />
      <div className="space-y-10 text-center">
        {wedding.story.map((s, i) => (
          <Reveal key={s.title} from={i % 2 ? 'right' : 'left'}>
            <p className="font-sans text-xs uppercase tracking-[0.35em] text-gold">{s.title}</p>
            <p className="mx-auto mt-3 max-w-sm font-serif text-lg leading-relaxed text-muted">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ───────────── Schedule ───────────── */
const icons = {
  rings: (
    <g fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="9" cy="14" r="5" />
      <circle cx="15" cy="14" r="5" />
      <path d="M10 5l2-2 2 2-2 2z" />
    </g>
  ),
  glass: (
    <g fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M7 3h10l-1 7a4 4 0 01-8 0z" />
      <path d="M12 14v6M8 21h8" />
    </g>
  ),
  dinner: (
    <g fill="none" stroke="currentColor" strokeWidth="1.3">
      <circle cx="12" cy="13" r="6" />
      <path d="M3 4v6a2 2 0 002 2V21M21 4c-2 0-2 4-2 6s2 2 2 2v9" />
    </g>
  ),
  music: (
    <g fill="none" stroke="currentColor" strokeWidth="1.3">
      <path d="M9 18V5l11-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="17" cy="16" r="3" />
    </g>
  ),
}

export function Schedule() {
  return (
    <section className="px-6 py-16">
      <SectionTitle eyebrow="The day" title="Schedule of Events" />
      <ol className="text-center">
        {wedding.schedule.map((e, i) => (
          <li key={e.title}>
            <Reveal delay={0.05}>
              <motion.div
                className="mx-auto flex size-14 items-center justify-center rounded-full border border-gold/60 bg-card text-gold"
                initial={{ scale: 0.6, rotate: -45 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 120, damping: 12 }}
              >
                <svg viewBox="0 0 24 24" className="size-7">{icons[e.icon]}</svg>
              </motion.div>
              <p className="mt-3 font-sans text-xs tracking-[0.3em] text-gold">{e.time}</p>
              <p className="mt-1 font-serif text-2xl text-ink">{e.title}</p>
            </Reveal>
            {i < wedding.schedule.length - 1 && (
              <motion.div
                className="mx-auto my-4 h-12 w-px origin-top bg-linear-to-b from-gold/70 to-gold/10"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />
            )}
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ───────────── Venue + map + calendar ───────────── */
function calendarLinks() {
  const start = new Date(wedding.date)
  const end = new Date(start.getTime() + 8 * 3600000)
  const fmt = (d) => d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
  const title = `Wedding of ${wedding.groom} & ${wedding.bride}`
  const where = `${wedding.venue.name}, ${wedding.venue.address}`
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

/* Gold line-drawn garden arch that draws itself */
function ArchDrawing() {
  const d = (delay) => ({
    hidden: { pathLength: 0, opacity: 0 },
    show: { pathLength: 1, opacity: 1, transition: { delay, duration: 2.4, ease: 'easeInOut' } },
  })
  return (
    <motion.svg viewBox="0 0 200 150" className="mx-auto w-60" initial="hidden" whileInView="show" viewport={{ once: true }} aria-hidden="true">
      <g fill="none" stroke="#a67d2b" strokeWidth="1.3" strokeLinecap="round">
        <motion.path d="M50 145 V70 A50 50 0 0 1 150 70 V145" variants={d(0)} />
        <motion.path d="M60 145 V72 A40 40 0 0 1 140 72 V145" variants={d(0.2)} />
        <motion.path d="M20 145 H180" variants={d(0.4)} />
        <motion.path d="M84 145 V112 H116 V145 M84 112 L100 98 L116 112" variants={d(0.8)} />
        <motion.path d="M40 145 C 30 120, 46 100, 48 80 C 36 66, 44 40, 60 30 M160 145 C 170 120, 154 100, 152 80 C 164 66, 156 40, 140 30" variants={d(1)} />
        {[[46, 95], [38, 120], [56, 48], [154, 95], [162, 120], [144, 48], [100, 18]].map(([x, y], i) => (
          <motion.circle key={i} cx={x} cy={y} r="4" variants={d(1.4 + i * 0.1)} />
        ))}
      </g>
    </motion.svg>
  )
}

export function Venue() {
  const cal = calendarLinks()
  const { name, address, mapQuery } = wedding.venue
  const q = encodeURIComponent(mapQuery || address)
  return (
    <section className="bg-cream/70 px-6 py-16 text-center">
      <SectionTitle eyebrow="Where" title="The Venue" />
      <ArchDrawing />
      <Reveal>
        <h3 className="mt-6 font-sans text-lg uppercase tracking-[0.2em] text-ink">{name}</h3>
        <p className="mt-2 font-serif text-muted">{address}</p>
        <p className="mt-1 font-serif italic text-muted">{wedding.dateLabel}</p>
      </Reveal>
      <Reveal from="zoom" className="mt-8">
        <div className="overflow-hidden rounded-t-[200px] border-4 border-card shadow-lg ring-1 ring-gold/40">
          <iframe
            title="Venue map"
            src={`https://www.google.com/maps?q=${q}&output=embed`}
            className="h-72 w-full grayscale-[40%] sepia-[25%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </Reveal>
      <Reveal className="mt-8 flex flex-wrap justify-center gap-3">
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${q}`}
          target="_blank"
          rel="noreferrer"
          className="rounded-full bg-wine px-6 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-paper shadow transition hover:scale-105"
        >
          Get directions
        </a>
        <a
          href={cal.google}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-gold px-6 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-ink transition hover:scale-105"
        >
          Google Calendar
        </a>
        <a
          href={cal.ics}
          download="wedding.ics"
          className="rounded-full border border-gold px-6 py-3 font-sans text-[11px] uppercase tracking-[0.2em] text-ink transition hover:scale-105"
        >
          Apple / Outlook
        </a>
      </Reveal>
    </section>
  )
}

/* ───────────── Gift preference (taupe band) ───────────── */
export function Gifts() {
  return (
    <section className="relative overflow-hidden bg-taupe px-6 py-20 text-center text-paper">
      <Breathe className="pointer-events-none absolute -right-12 -top-10 w-40 opacity-90" tilt={-2}>
        <RoseCluster corner="tr" />
      </Breathe>
      <Reveal from="zoom">
        <motion.svg
          viewBox="0 0 48 48"
          className="mx-auto mb-4 w-12"
          fill="none"
          stroke="#f0dca4"
          strokeWidth="1.4"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <rect x="8" y="20" width="32" height="22" rx="1.5" />
          <rect x="6" y="14" width="36" height="7" rx="1.5" />
          <path d="M24 14 V42 M24 14 C 18 4, 10 8, 14 13 M24 14 C 30 4, 38 8, 34 13" />
        </motion.svg>
        <h2 className="font-script text-5xl text-[#f0dca4]">Gift Preference</h2>
        <p className="mx-auto mt-4 max-w-sm font-serif text-lg leading-relaxed text-paper/90">{wedding.gifts}</p>
      </Reveal>
      <Breathe className="pointer-events-none absolute -bottom-10 -left-12 w-40 opacity-90" tilt={2} delay={0.8}>
        <RoseCluster corner="bl" />
      </Breathe>
    </section>
  )
}

/* ───────────── FAQ ───────────── */
function FaqItem({ q, a, i }) {
  const [open, setOpen] = useState(false)
  return (
    <Reveal delay={i * 0.08} className="border-b border-gold/30">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between py-4 text-left font-serif text-lg text-ink"
        aria-expanded={open}
      >
        {q}
        <motion.span animate={{ rotate: open ? 45 : 0 }} className="ml-4 text-2xl text-gold">
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <p className="pb-4 font-serif text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  )
}

export function Faq() {
  return (
    <section className="px-6 py-16">
      <SectionTitle eyebrow="Good to know" title="Questions" />
      {wedding.faq.map((f, i) => (
        <FaqItem key={f.q} {...f} i={i} />
      ))}
    </section>
  )
}

/* ───────────── Closing ───────────── */
export function Closing() {
  const [photoOk, setPhotoOk] = useState(true)
  return (
    <section className="relative px-6 pb-20 pt-10 text-center">
      <Reveal from="zoom" className="relative mx-auto w-64">
        <div className="relative aspect-[3/4] overflow-hidden rounded-t-full border-[6px] border-card shadow-xl ring-1 ring-gold/50">
          {photoOk ? (
            <img
              src={wedding.photo}
              alt={`${wedding.groom} and ${wedding.bride}`}
              className="h-full w-full object-cover"
              onError={() => setPhotoOk(false)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-cream">
              <svg viewBox="-60 -60 120 120" className="w-40" aria-hidden="true">
                <Rose s={0.9} tone="cream" x={-14} y={-8} />
                <Rose s={0.6} tone="blush" x={26} y={18} r={20} />
                <Rose s={0.45} tone="peach" x={-26} y={34} />
              </svg>
            </div>
          )}
        </div>
        <Breathe className="pointer-events-none absolute -bottom-10 -left-14 w-36" tilt={2}>
          <RoseCluster corner="bl" />
        </Breathe>
        <Breathe className="pointer-events-none absolute -right-14 -top-8 w-32" tilt={-2} delay={0.7}>
          <RoseCluster corner="tr" />
        </Breathe>
      </Reveal>
      <Reveal className="mt-14">
        <p className="font-sans text-sm uppercase tracking-[0.35em] text-ink">Hope to see you there!</p>
        <p className="gold-text mt-3 font-script text-6xl leading-tight">
          {wedding.groom} &amp; {wedding.bride}
        </p>
        <p className="mt-4 font-sans text-[11px] tracking-[0.3em] text-muted">{wedding.hashtag}</p>
      </Reveal>
    </section>
  )
}

