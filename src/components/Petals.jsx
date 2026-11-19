import { useState } from 'react'

const COLORS = ['#f6e2c0', '#f3d2c6', '#fbefe0', '#ecc9a4', '#f1d6cc']

export default function Petals({ count = 16 }) {
  const [petals] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 10 + Math.random() * 12,
      dur: 11 + Math.random() * 10,
      delay: -Math.random() * 20,
      drift: (Math.random() - 0.5) * 220,
      spin: 300 + Math.random() * 500,
      color: COLORS[i % COLORS.length],
    })),
  )

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {petals.map((p) => (
        <svg
          key={p.id}
          className="petal"
          width={p.size}
          height={p.size * 1.25}
          viewBox="0 0 20 25"
          style={{
            left: `${p.left}%`,
            '--dur': `${p.dur}s`,
            '--delay': `${p.delay}s`,
            '--drift': `${p.drift}px`,
            '--spin': `${p.spin}deg`,
          }}
        >
          {/* curled petal */}
          <path d="M3 23 C 0 14, 4 4, 17 1 C 19 10, 14 20, 3 23 Z" fill={p.color} />
          <path d="M3 23 C 7 15, 11 8, 17 1" stroke="#d9b98f" strokeWidth="0.5" fill="none" opacity="0.6" />
        </svg>
      ))}
    </div>
  )
}
