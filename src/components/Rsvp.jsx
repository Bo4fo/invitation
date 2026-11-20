import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { wedding } from '../config'
import Reveal, { SectionTitle } from './Reveal'
import { WaxSeal } from './Paper'
import { Flourish } from './Botanical'

const input =
  'w-full rounded-md border border-gold/40 bg-paper px-4 py-3 font-serif text-ink outline-none transition placeholder:text-muted/60 focus:border-gold focus:ring-2 focus:ring-gold/20'
const label = 'mb-1 block font-sans text-[10px] uppercase tracking-[0.25em] text-muted'

function Burst() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
      {Array.from({ length: 18 }, (_, i) => {
        const a = (i / 18) * Math.PI * 2
        return (
          <motion.span
            key={i}
            className="absolute text-lg"
            style={{ color: i % 2 ? 'var(--color-wine)' : 'var(--color-gold)' }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{ x: Math.cos(a) * 150, y: Math.sin(a) * 150, scale: 1, opacity: 0, rotate: 180 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
          >
            ♥
          </motion.span>
        )
      })}
    </div>
  )
}

function RsvpForm({ onClose }) {
  const [form, setForm] = useState({ name: '', attending: 'yes', guests: 1, children: '', diet: '', song: '', message: '' })
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const yes = form.attending === 'yes'

  const submit = (e) => {
    e.preventDefault()
    const lines = [
      `RSVP for ${wedding.partner1} & ${wedding.partner2}'s wedding`,
      `Name: ${form.name}`,
      `Attending: ${yes ? 'Accepts with pleasure' : 'Declines with regret'}`,
      yes && `Guests: ${form.guests}`,
      yes && wedding.childrenAllowed && form.children && `Children: ${form.children}`,
      yes && form.diet && `Dietary needs: ${form.diet}`,
      yes && form.song && `Song request: ${form.song}`,
      form.message && `Message: ${form.message}`,
    ].filter(Boolean)
    const body = encodeURIComponent(lines.join('\n'))

    if (wedding.rsvpWhatsApp) {
      window.open(`https://wa.me/${wedding.rsvpWhatsApp}?text=${body}`, '_blank', 'noopener')
    } else if (wedding.rsvpEmail) {
      window.location.href = `mailto:${wedding.rsvpEmail}?subject=${encodeURIComponent('Wedding RSVP – ' + form.name)}&body=${body}`
    } else {
      setError("RSVP isn't set up yet — please contact the couple directly.")
      return
    }
    setError('')
    setSent(true)
  }

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="thanks"
          className="relative py-16 text-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          <Burst />
          <p className="gold-text font-script text-6xl">Thank you!</p>
          <p className="mt-4 font-serif text-muted">
            {yes
              ? `We can't wait to celebrate with you, ${form.name.split(' ')[0]}.`
              : 'You will be missed — thank you for letting us know.'}
          </p>
          <button type="button" onClick={onClose} className="mt-8 font-sans text-[11px] uppercase tracking-[0.25em] text-gold underline underline-offset-4">
            Close
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} className="space-y-4" exit={{ opacity: 0, y: -20 }}>
          <div className="text-center">
            <h3 className="gold-text font-script text-5xl leading-tight">Confirm Your Attendance</h3>
            <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.3em] text-muted">Please RSVP before {wedding.rsvpDeadline}</p>
          </div>

          <label className="block">
            <span className={label}>Your name</span>
            <input required value={form.name} onChange={set('name')} className={input} placeholder="Full name" />
          </label>

          <fieldset>
            <legend className={label}>Will you be attending?</legend>
            <div className="grid grid-cols-2 gap-2">
              {[
                ['yes', 'Accepts with pleasure'],
                ['no', 'Declines with regret'],
              ].map(([v, l]) => (
                <motion.label
                  key={v}
                  whileTap={{ scale: 0.97 }}
                  className={`cursor-pointer rounded-md border px-2 py-3 text-center font-serif text-sm transition ${
                    form.attending === v ? 'border-wine bg-wine text-paper' : 'border-gold/40 bg-paper text-ink'
                  }`}
                >
                  <input type="radio" name="attending" value={v} checked={form.attending === v} onChange={set('attending')} className="sr-only" />
                  {l}
                </motion.label>
              ))}
            </div>
          </fieldset>

          <AnimatePresence initial={false}>
            {yes && (
              <motion.div
                className="space-y-4 overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <label className="block">
                  <span className={label}>Number of guests attending</span>
                  <select value={form.guests} onChange={set('guests')} className={input}>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n}>{n}</option>
                    ))}
                  </select>
                </label>
                {wedding.childrenAllowed && (
                  <label className="block">
                    <span className={label}>Children attending</span>
                    <input value={form.children} onChange={set('children')} className={input} placeholder="Please include names and ages" />
                  </label>
                )}
                <label className="block">
                  <span className={label}>Dietary requirements</span>
                  <input value={form.diet} onChange={set('diet')} className={input} placeholder="Vegetarian, allergies…" />
                </label>
                <label className="block">
                  <span className={label}>A song that gets you dancing</span>
                  <input value={form.song} onChange={set('song')} className={input} placeholder="Song request" />
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          <label className="block">
            <span className={label}>A note for the couple</span>
            <textarea rows={2} value={form.message} onChange={set('message')} className={input} placeholder="Optional" />
          </label>

          <motion.button
            type="submit"
            className="w-full rounded-full bg-wine py-4 font-sans text-xs uppercase tracking-[0.3em] text-paper shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Submit
          </motion.button>
          {error && (
            <p role="alert" className="text-center font-serif italic text-wine">
              {error}
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  )
}

export default function Rsvp() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    document.body.classList.add('locked')
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('locked')
    }
  }, [open])

  return (
    <section id="rsvp" className="px-4 pb-6 pt-16 text-center">
      <SectionTitle title="Confirm Your Attendance" className="mb-3" />
      <Reveal>
        <p className="mx-auto max-w-sm font-serif text-lg leading-snug text-muted">
          We would love to know if you can join us. Please let us know by {wedding.rsvpDeadline}.
        </p>
      </Reveal>

      <Reveal from="zoom" className="mt-8">
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open the RSVP form"
          className="mx-auto block cursor-pointer"
          animate={{ scale: [1, 1.06], rotate: [0, 2] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <WaxSeal className="size-36">
            <span className="gold-text font-sans text-3xl font-semibold tracking-[0.12em]">RSVP</span>
            <svg viewBox="-30 -6 60 12" className="mt-1 w-14" aria-hidden="true">
              <path d="M-28 0 H-6 M6 0 H28 M0 -4 L4 0 L0 4 L-4 0 Z" stroke="#cda95a" strokeWidth="1" fill="#cda95a" />
            </svg>
          </WaxSeal>
        </motion.button>
        <motion.svg
          viewBox="0 0 32 16"
          className="mx-auto mt-4 w-7 text-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <path d="M2 13 L16 3 L30 13" />
        </motion.svg>
        <p className="px-[0.2em] font-script text-3xl text-gold">Click to open</p>
      </Reveal>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-ink/40 px-4 py-10 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="RSVP form"
          >
            <motion.div
              className="paper relative w-full max-w-md rounded-lg border border-gold/40 p-6 text-left shadow-2xl sm:p-8"
              initial={{ y: 60, scale: 0.92, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 40, scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 140, damping: 18 }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full text-2xl text-muted transition hover:bg-sand hover:text-ink"
              >
                ×
              </button>
              <Flourish inView={false} className="mb-2" />
              <RsvpForm onClose={() => setOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
