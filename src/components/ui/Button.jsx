import { ArrowRight, ArrowUpRight } from 'lucide-react'

export function ButtonPrimary({ href, children, className = '' }) {
  return (
    <a
      href={href}
      className={`magnetic-btn group inline-flex items-center justify-center gap-2 bg-primary text-deep font-semibold px-7 py-4 rounded-full shadow-2xl shadow-primary/40 ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
    </a>
  )
}

export function ButtonSecondary({ href, children, icon: Icon = ArrowUpRight, className = '' }) {
  return (
    <a
      href={href}
      className={`lift-on-hover inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 font-medium px-7 py-4 rounded-full ${className}`}
    >
      <Icon className="h-4 w-4" />
      {children}
    </a>
  )
}


