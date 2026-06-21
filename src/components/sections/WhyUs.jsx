import { useEffect, useRef, useState } from 'react'
import { PILLARS } from '../../data/servicesData'
import { ArrowRight } from 'lucide-react'
import { ShieldCheck, Award, Clock } from 'lucide-react'
import { TRUST_BADGES } from '../../data/servicesData'

/* ----------------------------------------------------------------
   CountUp — animated counter
---------------------------------------------------------------- */
function CountUp({ target, duration = 1800 }) {
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [count, setCount] = useState(prefersReduced ? target : 0)
  const elemRef = useRef(null)
  const startedRef = useRef(false)

  useEffect(() => {
    if (prefersReduced) return
    const el = elemRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true
            const startTime = performance.now()
            const animate = (now) => {
              const elapsed = now - startTime
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setCount(Math.floor(target * eased))
              if (progress < 1) requestAnimationFrame(animate)
              else setCount(target)
            }
            requestAnimationFrame(animate)
          }
        })
      },
      { threshold: 0.35 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration, prefersReduced])

  return <span ref={elemRef}>{count}</span>
}

/* ----------------------------------------------------------------
   Pillars — Three core numbers
---------------------------------------------------------------- */
function Pillars() {
  const ref = useRef(null)
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [visible, setVisible] = useState(prefersReduced)

  useEffect(() => {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [prefersReduced])

  return (
    <section id="why-us" ref={ref} className="relative py-28 sm:py-40 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[44rem] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/8 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div
          className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-24 ${
            prefersReduced ? '' : 'transition-all duration-1000 ease-out'
          } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
        >
          <div className="max-w-2xl">
            <span className="inline-block font-mono text-xs uppercase tracking-[0.3em] text-primary-dark mb-5">╱ Why Choose Us</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] tracking-tight">
              The numbers behind
              <span className="block font-serif italic font-medium text-primary-dark">our reputation.</span>
            </h2>
          </div>
          <p className="text-muted text-lg leading-relaxed max-w-md lg:text-right">
            Three numbers that define how we work. Not marketing — just what we deliver every time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-divider rounded-5xl overflow-hidden border border-divider shadow-xl shadow-primary/5">
          {PILLARS.map((p, i) => (
            <article
              key={i}
              style={!prefersReduced ? { transitionDelay: visible ? `${i * 150}ms` : '0ms' } : undefined}
              className={`pillar-card relative bg-surface p-9 sm:p-12 group overflow-hidden ${
                prefersReduced ? '' : 'transition-all duration-1000 ease-out'
              } ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="flex items-center justify-between mb-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted">{p.n} / {p.title}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary group-hover:scale-150 transition-all duration-500" />
              </div>
              <div className="flex items-end gap-1 leading-none">
                <span className="font-display font-extrabold text-[6rem] sm:text-[8rem] md:text-[9rem] leading-[0.85] text-ink tabular-nums tracking-tight">
                  <CountUp target={p.target} duration={1800 + i * 200} />
                </span>
                <span className="font-serif italic font-medium text-4xl sm:text-5xl md:text-6xl text-primary-dark mb-3 sm:mb-4">{p.suffix}</span>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary-dark mt-5">{p.label}</p>
              <p className="text-muted text-[15px] mt-6 leading-relaxed max-w-xs">{p.desc}</p>
              <div className="absolute bottom-0 left-9 right-9 sm:left-12 sm:right-12 h-px bg-divider overflow-hidden">
                <div className="h-full bg-gradient-to-r from-transparent via-primary to-transparent" style={{ animation: `pillar-sweep 4s ease-in-out ${i * 0.4}s infinite` }} />
              </div>
              <span className="absolute top-9 right-9 sm:top-12 sm:right-12 font-mono text-[9px] uppercase tracking-widest text-primary/30">{p.n}.com</span>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pillar-sweep {
          0%   { transform: translateX(-100%); }
          50%  { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  )
}

/* ----------------------------------------------------------------
   Trust Signals
---------------------------------------------------------------- */
const TRUST_ICONS = [ShieldCheck, Award, Clock]

function TrustSignals() {
  const ref = useRef(null)
  const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [visible, setVisible] = useState(prefersReduced)

  useEffect(() => {
    if (prefersReduced) return
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [prefersReduced])

  return (
    <section ref={ref} className="relative py-14 sm:py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Why Trust Us</span>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink mt-3 tracking-tight">More than a quote.</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {TRUST_BADGES.map(({ title, text }, i) => {
            const Icon = TRUST_ICONS[i]
            return (
              <div
                key={i}
                style={!prefersReduced ? { transitionDelay: visible ? `${i * 120}ms` : '0ms' } : undefined}
                className={`bg-white border border-divider rounded-4xl p-6 hover:border-primary/40 ${
                  prefersReduced ? '' : 'transition-all duration-700 ease-out'
                } shadow-sm ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
              >
                <Icon className="h-6 w-6 text-primary mb-3" strokeWidth={1.8} />
                <h3 className="font-display font-bold text-lg text-ink mb-1.5">{title}</h3>
                <p className="text-muted text-sm leading-relaxed">{text}</p>
              </div>
            )
          })}
        </div>
        <div className="text-center">
          <a href="#contact" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full shadow-xl shadow-primary/30">
            Get a Quote
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}

export default function WhyUs() {
  return (
    <>
      <Pillars />
      <TrustSignals />
    </>
  )
}
