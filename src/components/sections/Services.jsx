import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'
import { FEATURES } from '../../data/servicesData'

gsap.registerPlugin(ScrollTrigger)

/* ----------------------------------------------------------------
   Feature Card 1 — Diagnostic Shuffler
---------------------------------------------------------------- */
function DiagnosticShuffler() {
  const items = [
    { tag: 'Leak Detection', label: 'Advanced camera inspection for hidden leaks', temp: '98%' },
    { tag: 'Pipe Health', label: 'Full diagnostic of your plumbing system', temp: '100%' },
    { tag: 'Water Pressure', label: 'Pressure testing and optimization', temp: '45 PSI' },
  ]
  const [stack, setStack] = useState(items)

  useEffect(() => {
    const interval = setInterval(() => {
      setStack((prev) => {
        const next = [...prev]
        next.unshift(next.pop())
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-44 w-full">
      {stack.map((item, i) => (
        <div
          key={item.tag}
          style={{
            transform: `translate(${i * 14}px, ${i * 14}px) scale(${1 - i * 0.05})`,
            zIndex: stack.length - i,
            opacity: 1 - i * 0.25,
            transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease',
          }}
          className="absolute inset-0 bg-white border border-divider rounded-3xl p-5 shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-1 rounded-full">
              {item.tag}
            </span>
            <span className="font-mono text-xs text-muted">{item.temp}</span>
          </div>
          <div className="mt-4 font-display text-lg font-semibold text-ink leading-tight">{item.label}</div>
          <div className="mt-3 flex items-center gap-1.5">
            {Array.from({ length: 24 }).map((_, idx) => (
              <span
                key={idx}
                className="h-1 w-1 rounded-full"
                style={{ background: idx < 24 - i * 6 ? '#85c4eb' : '#E0E0E0' }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 2 — Signature Water Drops Animation
---------------------------------------------------------------- */
const STATUSES = [
  { text: 'System stable · monitoring', label: 'Stable', tone: 'emerald' },
  { text: 'Leak detected · zone 4', label: 'Alert', tone: 'accent' },
  { text: 'Technician en route · 12 min', label: 'Response', tone: 'primary' },
  { text: 'Leak resolved · system sealed', label: 'Fixed', tone: 'emerald' },
]

function MaintenanceRain() {
  const [statusIdx, setStatusIdx] = useState(0)
  const [count, setCount] = useState(7)

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((idx) => {
        const next = (idx + 1) % STATUSES.length
        if (STATUSES[next].label === 'Fixed') setCount((c) => c + 1)
        return next
      })
    }, 2300)
    return () => clearInterval(interval)
  }, [])

  const drops = [
    { left: '15%', delay: '0.0s', dur: '2.6s', size: 16 },
    { left: '25%', delay: '1.3s', dur: '3.0s', size: 13 },
    { left: '38%', delay: '0.6s', dur: '2.8s', size: 18 },
    { left: '50%', delay: '1.8s', dur: '2.4s', size: 14 },
    { left: '62%', delay: '0.9s', dur: '3.1s', size: 17 },
    { left: '74%', delay: '2.0s', dur: '2.7s', size: 13 },
    { left: '85%', delay: '0.4s', dur: '2.9s', size: 16 },
  ]

  const ripples = [
    { left: '22%', delay: '0.2s' },
    { left: '48%', delay: '1.0s' },
    { left: '76%', delay: '1.8s' },
  ]

  const status = STATUSES[statusIdx]
  const toneText =
    status.tone === 'emerald' ? 'text-emerald-600' :
    status.tone === 'accent' ? 'text-accent-dark' :
    'text-primary-dark'
  const toneDot =
    status.tone === 'emerald' ? 'bg-emerald-500' :
    status.tone === 'accent' ? 'bg-accent' :
    'bg-primary'

  return (
    <div
      className="relative h-44 w-full rounded-3xl overflow-hidden border border-primary/15"
      style={{ background: 'linear-gradient(180deg, #F0F8FC 0%, #E2EEF6 70%, #D6E8F2 100%)' }}
    >
      <div className="absolute -top-8 -left-6 h-20 w-32 rounded-full bg-white/60 blur-2xl" />
      <div className="absolute top-2 right-10 h-14 w-24 rounded-full bg-white/50 blur-xl" />

      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2">
          <svg className="h-3.5 w-3.5 text-primary-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-primary-dark">Emergency Response</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="font-display font-bold text-sm text-ink tabular-nums">{String(count).padStart(2, '0')}</span>
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted">today</span>
        </div>
      </div>

      <svg className="absolute left-3 right-3 top-9 h-5" viewBox="0 0 400 20" preserveAspectRatio="none">
        <rect x="0" y="6" width="400" height="8" rx="4" fill="#85c4eb" fillOpacity="0.25" />
        <rect x="0" y="7" width="400" height="2" fill="#5fa9d6" fillOpacity="0.4" />
        <rect x="0" y="4" width="6" height="12" rx="1.5" fill="#5fa9d6" fillOpacity="0.5" />
        <rect x="394" y="4" width="6" height="12" rx="1.5" fill="#5fa9d6" fillOpacity="0.5" />
        {[60, 152, 248, 340].map((x) => (
          <g key={x}>
            <rect x={x - 3} y="2" width="6" height="6" rx="1" fill="#5fa9d6" />
            <rect x={x - 4} y="13" width="8" height="3" rx="1" fill="#5fa9d6" fillOpacity="0.7" />
          </g>
        ))}
      </svg>

      <div className="absolute inset-x-0 top-14 bottom-11 overflow-hidden">
        {drops.map((d, i) => (
          <svg
            key={i}
            className="absolute top-0"
            style={{
              left: d.left,
              width: `${d.size}px`,
              height: `${Math.round(d.size * 1.5)}px`,
              animation: `rain-fall ${d.dur} cubic-bezier(0.55,0.05,0.7,0.45) ${d.delay} infinite`,
              filter: 'drop-shadow(0 1px 2px rgba(95,169,214,0.3))',
              transform: 'translateX(-50%)',
            }}
            viewBox="0 0 24 36"
          >
            <defs>
              <linearGradient id={`drop-${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#b3d9f2" />
                <stop offset="50%" stopColor="#85c4eb" />
                <stop offset="100%" stopColor="#5fa9d6" />
              </linearGradient>
            </defs>
            <path d="M12 2 C 9 9, 4 17, 4 24 a 8 8 0 0 0 16 0 C 20 17, 15 9, 12 2 Z" fill={`url(#drop-${i})`} />
            <ellipse cx="9" cy="22" rx="2" ry="3.5" fill="white" fillOpacity="0.55" />
          </svg>
        ))}
      </div>

      <svg className="absolute bottom-9 left-3 right-3 h-3" viewBox="0 0 200 12" preserveAspectRatio="none">
        <path d="M 0,6 Q 12.5,2 25,6 T 50,6 T 75,6 T 100,6 T 125,6 T 150,6 T 175,6 T 200,6" fill="none" stroke="#5fa9d6" strokeOpacity="0.45" strokeWidth="1.2" />
        <path d="M 0,8 Q 12.5,5 25,8 T 50,8 T 75,8 T 100,8 T 125,8 T 150,8 T 175,8 T 200,8" fill="none" stroke="#85c4eb" strokeOpacity="0.25" strokeWidth="0.8" />
      </svg>

      <div className="absolute bottom-[34px] left-3 right-3 h-2">
        {ripples.map((r, i) => (
          <span
            key={i}
            className="absolute top-0 -translate-x-1/2 rounded-full border border-primary-dark/40"
            style={{ left: r.left, width: '4px', height: '4px', animation: `rain-ripple 2.4s ease-out ${r.delay} infinite` }}
          />
        ))}
      </div>

      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-20">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`relative h-2 w-2 rounded-full ${toneDot}`}>
            {status.tone === 'accent' && <span className={`absolute inset-0 rounded-full ${toneDot} animate-ping`} />}
          </span>
          <span key={status.text} className={`font-mono text-[10px] truncate ${toneText}`} style={{ animation: 'rain-fadein 0.35s ease-out' }}>
            {status.text}
          </span>
        </div>
        <span className={`font-mono text-[9px] uppercase tracking-[0.2em] whitespace-nowrap pl-2 ${toneText}`}>
          {status.label}
        </span>
      </div>

      <style>{`
        @keyframes rain-fall {
          0%   { transform: translate(-50%, -10px); opacity: 0; }
          12%  { opacity: 1; }
          82%  { opacity: 1; }
          100% { transform: translate(-50%, 95px); opacity: 0; }
        }
        @keyframes rain-ripple {
          0%   { transform: translateX(-50%) scale(0.4); opacity: 0.9; }
          80%  { transform: translateX(-50%) scale(3.5); opacity: 0; }
          100% { transform: translateX(-50%) scale(3.5); opacity: 0; }
        }
        @keyframes rain-fadein {
          from { opacity: 0; transform: translateY(2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

/* ----------------------------------------------------------------
   Feature Card 3 — Scheduler
---------------------------------------------------------------- */
function RenovationScheduler() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const [step, setStep] = useState(0)
  const activeDay = 2

  useEffect(() => {
    const interval = setInterval(() => setStep((prev) => (prev + 1) % 5), 1400)
    return () => clearInterval(interval)
  }, [])

  const cursorPos = (() => {
    switch (step) {
      case 0: return { x: 8, y: 110, opacity: 0 }
      case 1: return { x: 60, y: 60, opacity: 1 }
      case 2: return { x: 60 + activeDay * 36, y: 60, opacity: 1 }
      case 3: return { x: 60 + activeDay * 36, y: 60, opacity: 1 }
      case 4: return { x: 130, y: 130, opacity: 1 }
      default: return { x: 8, y: 110, opacity: 0 }
    }
  })()

  return (
    <div className="relative h-44 w-full bg-white border border-divider rounded-3xl p-5 overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Week 14 · April</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2 py-0.5 rounded-full">Booking</span>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((d, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center h-9 rounded-xl text-xs font-medium transition-all duration-300 ${
              step >= 3 && idx === activeDay
                ? 'bg-primary text-deep scale-110 shadow-lg shadow-primary/30'
                : 'bg-background text-ink'
            }`}
          >
            <span className="font-mono text-[9px] text-muted">{d}</span>
            <span className="font-display font-semibold text-sm">{idx + 7}</span>
          </div>
        ))}
      </div>
      <button
        className={`w-full py-2.5 rounded-2xl font-medium text-xs transition-all duration-300 ${
          step === 4 ? 'bg-accent text-white scale-[1.02] shadow-md shadow-accent/30' : 'bg-divider/40 text-muted'
        }`}
      >
        {step >= 3 ? '✓ Booking confirmed' : 'Select a day'}
      </button>
      <div
        className="absolute pointer-events-none transition-all duration-500 ease-out"
        style={{ left: `${cursorPos.x}px`, top: `${cursorPos.y}px`, opacity: cursorPos.opacity, transform: step === 3 ? 'scale(0.85)' : 'scale(1)' }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="#1A1A1A" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

/* ----------------------------------------------------------------
   Features Section
---------------------------------------------------------------- */
export default function Features() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true },
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15,
      })
      gsap.from('.feature-heading > *', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 95%', once: true },
        y: 30, opacity: 0, duration: 0.8, ease: 'power3.out', stagger: 0.08,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const featureCards = [
    { ...FEATURES[0], Component: DiagnosticShuffler },
    { ...FEATURES[1], Component: MaintenanceRain },
    { ...FEATURES[2], Component: RenovationScheduler },
  ]

  return (
    <section id="services" ref={sectionRef} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="feature-heading max-w-3xl mb-16 sm:mb-24">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ What We Do Best</span>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
            Three pillars.
            <span className="block font-serif italic font-medium text-primary-dark mt-1">One standard.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featureCards.map((card, idx) => (
            <article
              key={idx}
              className="feature-card group relative bg-surface border border-divider rounded-5xl p-7 hover:border-primary/40 transition-colors duration-500 shadow-sm hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">{card.eyebrow}</span>
                <ArrowUpRight className="h-5 w-5 text-ink/30 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" strokeWidth={1.8} />
              </div>
              <card.Component />
              <div className="mt-6">
                <h3 className="font-display font-bold text-2xl text-ink leading-tight">{card.heading}</h3>
                <p className="font-serif italic text-primary-dark text-sm mt-1">{card.sub}</p>
                <p className="text-muted text-[15px] mt-4 leading-relaxed">{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
