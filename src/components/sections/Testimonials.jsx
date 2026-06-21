import { useEffect, useRef, useState } from 'react'
import { Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    name: 'Margaret Macleod',
    role: 'Homeowner, Rothesay',
    text: "I can't praise Robert highly enough, from looking over the potential work required and then sending a full quotation the same evening. On starting the bathroom refurbishment Robert turned up on time and worked...",
  },
  {
    name: 'Nicole Booth',
    role: 'Homeowner, Rothesay',
    text: 'Robert serviced our boiler after installing it a year ago. 10 out of 10 service, great workmanship, reliable and trustworthy. I would highly recommend Bute Plumbing Services.',
  },
  {
    name: 'Georgina Holt',
    role: 'Homeowner, Rothesay',
    text: 'Robert did a brilliant job repairing my plumbing. All pipes were replaced with new materials and the angle corrected so as to ensure proper flow and drainage. All the work was done in one day and was reasonably priced. I would definitely recommend him.',
  },
]

export default function Testimonials() {
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
    <section id="testimonials" ref={ref} className="relative py-20 sm:py-28 px-6 sm:px-10 lg:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-primary-dark">╱ What Our Customers Say</span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-ink mt-3 tracking-tight">
            Trusted by Bute homeowners.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <blockquote
              key={i}
              style={!prefersReduced ? { transitionDelay: visible ? `${i * 120}ms` : '0ms' } : undefined}
              className={`relative bg-white border border-divider rounded-4xl p-8 hover:border-primary/40 ${
                prefersReduced ? '' : 'transition-all duration-700 ease-out'
              } shadow-sm ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            >
              <Quote className="h-8 w-8 text-primary/25 mb-4" strokeWidth={1.5} />
              <p className="text-ink text-[15px] leading-relaxed mb-6">{t.text}</p>
              <footer>
                <cite className="not-italic font-display font-bold text-ink text-sm block">{t.name}</cite>
                <span className="text-muted text-xs">{t.role}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
