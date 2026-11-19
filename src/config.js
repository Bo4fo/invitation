// ─────────────────────────────────────────────────────────────
//  Edit everything about the invitation here.
//  Values marked PLACEHOLDER are examples — replace with your own.
// ─────────────────────────────────────────────────────────────

export const wedding = {
  groom: 'Boafo',
  bride: 'Princess',
  initials: 'B&P',

  // PLACEHOLDER — ceremony date/time. Keep an explicit UTC offset
  // ('Z' = UTC, which is Ghana time; e.g. '+01:00' elsewhere) so guests
  // in other countries see the correct countdown and calendar time.
  date: '2027-06-12T10:00:00Z',
  dateLabel: 'Saturday, 12 June 2027',
  dateShort: '12 · 06 · 27',
  city: 'Accra, Ghana', // PLACEHOLDER

  // Opening words under the names — personalise freely
  quote: {
    lines: ['Two hearts', 'One promise', 'A lifetime of love'],
    greeting: 'Dear Friends and Family',
    message:
      'Join us for a day of love, laughter, prayer and unforgettable memories as we begin our forever.',
  },

  story: [
    {
      title: 'How we met',
      text: 'PLACEHOLDER — A chance meeting, a shared laugh, and a conversation that never really ended.',
    },
    {
      title: 'The proposal',
      text: 'PLACEHOLDER — One question, one answer, and a lifetime of yes ahead of us.',
    },
    {
      title: 'Forever begins',
      text: 'We would love for you to be there as we begin this new chapter together.',
    },
  ],

  // PLACEHOLDER schedule
  schedule: [
    { time: '10:00 AM', title: 'Guest Arrival', icon: 'glass' },
    { time: '10:30 AM', title: 'Wedding Ceremony', icon: 'rings' },
    { time: '1:00 PM', title: 'Reception & Lunch', icon: 'dinner' },
    { time: '4:00 PM', title: 'First Dance & Party', icon: 'music' },
  ],

  // PLACEHOLDER venue — mapQuery is what the embedded Google map searches for
  venue: {
    name: 'Replace with venue name',
    address: 'Replace with venue address',
    mapQuery: 'Accra, Ghana',
  },

  dressCode: {
    subtitle: 'Elegant and comfortable',
    text: 'Formal attire in natural and warm tones is encouraged.',
    colors: ['#23443f', '#3fa98a', '#e8d9ad', '#a8203a'],
  },

  gifts:
    'Your presence is the greatest gift. Should you wish to honour us further, a contribution towards our new home would be warmly appreciated.',

  faq: [
    { q: 'Can I bring a plus-one?', a: 'Please indicate on your RSVP — we have planned seating carefully.' },
    { q: 'Is there parking?', a: 'PLACEHOLDER — Yes, free parking is available at the venue.' },
    { q: 'When should I RSVP by?', a: 'Kindly respond by 1 May 2027.' },
  ],

  // RSVP: responses open WhatsApp with a prefilled message.
  // PLACEHOLDER — international format, digits only (e.g. 233201234567)
  rsvpWhatsApp: '',
  // Fallback if no WhatsApp number: opens the guest's email app
  rsvpEmail: '',
  rsvpDeadline: '1 May 2027',
  childrenAllowed: true, // shows a "children attending" field on the RSVP

  // Optional files you can drop into the /public folder:
  music: '/music.mp3', // background music, starts when the envelope is tapped
  photo: '/couple.jpg', // your photo in the closing section
  heroImage: '/hero.jpg', // optional painted scene that replaces the drawn garden arch

  hashtag: '#BoafoAndPrincess2027',
}
