import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { STEPS } from '../../data/servicesData'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const containerRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.protocol-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top top+=100',
            endTrigger: cards[cards.length - 1],
            end: 'top top+=120',
            scrub: 1,
          },
          scale: 0.92,
          filter: 'blur(6px) saturate(0.7)',
          opacity: 0.5,
          ease: 'none',
        })
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={containerRef} className="relative px-6 sm:px-10 lg:px-16 py-28 sm:py-40">
      <div className="max-w-7xl mx-auto mb-16 px-2 sm:px-10">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ How We Work</span>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight max-w-3xl">
          Three steps.
          <span className="block font-serif italic font-medium text-primary-dark">No surprises.</span>
        </h2>
      </div>

      <div className="space-y-8">
        {STEPS.map((step, idx) => (
          <article
            key={idx}
            className="protocol-card sticky top-24 sm:top-28 mx-auto max-w-6xl bg-gradient-to-br from-surface to-background border border-divider rounded-6xl overflow-hidden shadow-2xl shadow-primary/5"
          >
            <div className="grid lg:grid-cols-5 gap-0 min-h-[60vh] lg:min-h-[70vh]">
              <div className="lg:col-span-3 p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted">{step.meta}</span>
                   <span className="font-mono text-[10px] uppercase tracking-widest text-primary-dark bg-primary/10 px-2.5 py-1 rounded-full">Bute Plumbing Process</span>
                </div>
                <div className="my-12">
                  <span className="font-display font-extrabold text-[7rem] sm:text-[10rem] leading-none text-primary/15 -mb-4 block">{step.num}</span>
                  <h3 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.02] tracking-tight">{step.title}</h3>
                  <p className="font-serif italic text-primary-dark text-2xl sm:text-3xl mt-3">{step.tagline}</p>
                </div>
                <p className="text-muted text-base sm:text-lg leading-relaxed max-w-lg">{step.text}</p>
              </div>
              <div className="lg:col-span-2 relative overflow-hidden min-h-[300px] lg:min-h-full bg-deep">
                <img src={step.image} alt={step.alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-deep/60 via-transparent to-deep/15" />
                <div className="absolute top-5 left-5 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full pl-3 pr-4 py-1.5 shadow-lg">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink">Step {step.num}</span>
                </div>
                <div className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-widest text-white/70">{step.num} / Bute Plumbing</div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
