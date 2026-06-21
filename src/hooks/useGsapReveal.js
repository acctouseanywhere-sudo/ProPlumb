import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Reusable scroll-reveal hook.
 * Elements with class `gsap-reveal` inside the ref container will animate in.
 * Respects prefers-reduced-motion.
 */
export function useGsapReveal(options = {}) {
  const ref = useRef(null)
  const { stagger = 0.1, delay = 0 } = options

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.from('.gsap-reveal', {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger,
        delay,
      })
    }, el)

    return () => ctx.revert()
  }, [stagger, delay])

  return ref
}
