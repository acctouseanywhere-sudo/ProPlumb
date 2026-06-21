import { Droplets } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SITE } from '../../data/siteConfig'
import { NAV_LINKS } from '../../utils/constants'
import { SERVICES } from '../../data/servicesData'
import { ButtonPrimary } from '../ui/Button'

export default function Footer() {
  return (
    <footer className="relative bg-deep text-white rounded-t-6xl mt-12 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-15" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[40rem] rounded-full bg-primary/20 blur-3xl" />

      <div className="relative px-6 sm:px-10 lg:px-16 pt-20 pb-10 max-w-7xl mx-auto">
        <div className="border-b border-white/10 pb-12 mb-12">
          <h2 className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl leading-[0.92] tracking-tight">
            Plumbing you can
            <span className="font-serif italic font-medium text-primary block">count on.</span>
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mt-8 gap-6">
            <p className="text-white/50 max-w-md">
              {SITE.name} — serving the greater metro area with reliable, professional plumbing services.
            </p>
            <ButtonPrimary href="#contact" className="self-start sm:self-auto">Get a Quote</ButtonPrimary>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-9 w-9 rounded-full bg-primary flex items-center justify-center">
                <Droplets className="h-5 w-5 text-deep" strokeWidth={2.4} />
              </span>
              <span className="font-display font-bold text-lg">{SITE.name}</span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Licensed plumbing professionals with over 15 years of experience in residential and commercial services.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-6">{SITE.license}</p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Services</p>
            <ul className="space-y-2.5">
              {SERVICES.slice(0, 4).map((s, i) => (
                <li key={i}>
                  <a href="#services" className="text-white/65 hover:text-primary transition text-sm">{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Company</p>
            <ul className="space-y-2.5">
              {NAV_LINKS.filter((l) => l.href !== '#home').map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-white/65 hover:text-primary transition text-sm">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-4">Contact</p>
            <ul className="space-y-2.5">
              <li><a href={SITE.phoneLink} className="text-white/65 hover:text-primary transition text-sm">{SITE.phone}</a></li>
              <li><a href={SITE.emailLink} className="text-white/65 hover:text-primary transition text-sm">{SITE.email}</a></li>
              <li className="text-white/65 text-sm">{SITE.address}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping" />
              <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/60">System Operational · Ready for jobs</span>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/50 text-xs font-mono">
            <Link to="/privacy" className="hover:text-primary transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition">Terms of Service</Link>
            <span>© {SITE.year} {SITE.name}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
