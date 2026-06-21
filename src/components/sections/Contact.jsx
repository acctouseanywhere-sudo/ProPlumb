import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2, Upload, AlertCircle } from 'lucide-react'
import { SITE } from '../../data/siteConfig'
import { MAP_EMBED } from '../../utils/constants'
import { SERVICES } from '../../data/servicesData'
import { Tile } from '../ui/Card'
import { SectionHeadingLight } from '../ui/SectionHeading'

gsap.registerPlugin(ScrollTrigger)

const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY' // ponytail: replace with real key
const HCAPTCHA_SITE_KEY = 'YOUR_HCAPTCHA_SITE_KEY' // ponytail: replace with real key

function Field({ label, type = 'text', required, value, onChange, maxLength, minLength, pattern }) {
  const id = `field-${label.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <div>
      <label htmlFor={id} className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">
        {label} {required && '*'}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition font-body"
      />
    </div>
  )
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', zip: '', message: '', website: '' })
  const [files, setFiles] = useState([])
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('')
  const dropRef = useRef(null)
  const captchaRef = useRef(null)
  const captchaWidgetId = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const tryRender = () => {
      if (window.hcaptcha && captchaRef.current && captchaWidgetId.current === null) {
        captchaWidgetId.current = window.hcaptcha.render(captchaRef.current, {
          sitekey: HCAPTCHA_SITE_KEY,
          theme: 'light',
        })
      }
    }
    if (window.hcaptcha) { tryRender(); return }
    const interval = setInterval(tryRender, 200)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return

    // Honeypot check — bots fill this, humans don't
    if (form.website) return

    // Verify hCaptcha
    let captchaToken = ''
    if (window.hcaptcha && captchaWidgetId.current !== null) {
      captchaToken = window.hcaptcha.getResponse(captchaWidgetId.current)
      if (!captchaToken) {
        setErrorMsg('Please complete the captcha verification.')
        return
      }
    }

    setStatus('sending')
    setErrorMsg('')

    try {
      const payload = {
        access_key: WEB3FORMS_KEY,
        subject: `New inquiry from ${form.name}`,
        from_name: form.name,
        name: form.name,
        email: form.email,
        phone: form.phone,
        zip: form.zip,
        message: form.message,
        'g-recaptcha-response': captchaToken,
      }

      const res = await fetch('https://web3forms.com/api/v1/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Submission failed')
      setStatus('sent')
    } catch {
      setStatus('error')
      setErrorMsg('Something went wrong. Please try again or call us directly.')
      if (window.hcaptcha && captchaWidgetId.current !== null) {
        window.hcaptcha.reset(captchaWidgetId.current)
      }
    }
  }

  const handleFiles = (newFiles) => {
    setFiles((prev) => [...prev, ...Array.from(newFiles)].slice(0, 5))
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32 px-6 sm:px-10 lg:px-16 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary-dark">╱ Contact</span>
            <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-ink mt-4 leading-[1.05] tracking-tight">
              How can
              <span className="block font-serif italic font-medium text-primary-dark">we help?</span>
            </h2>
            <p className="text-muted text-lg mt-6 leading-relaxed max-w-md">
              Fill out the form and we will get back to you as soon as possible to discuss your needs.
            </p>

            <div className="mt-10 space-y-4">
              <a href={SITE.phoneLink} className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Phone className="h-5 w-5 text-primary group-hover:text-white" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Call us</span>
                  <span className="font-display font-semibold text-ink text-lg">{SITE.phone}</span>
                </span>
              </a>
              <a href={SITE.emailLink} className="lift-on-hover flex items-center gap-4 group">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary transition">
                  <Mail className="h-5 w-5 text-primary group-hover:text-white" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Email us</span>
                  <span className="font-display font-semibold text-ink text-lg">{SITE.email}</span>
                </span>
              </a>
              <div className="flex items-center gap-4">
                <span className="h-12 w-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </span>
                <span>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">Service Area</span>
                  <span className="font-display font-semibold text-ink text-lg">{SITE.address}</span>
                </span>
              </div>
            </div>

            <div className="mt-10 p-5 rounded-3xl bg-primary/5 border border-primary/15">
              <p className="font-mono text-[10px] uppercase tracking-widest text-primary-dark mb-2">Data Security</p>
              <p className="text-sm text-muted leading-relaxed">
                Your data is safe with us. We only contact you regarding your inquiry,
                and information is stored securely. We do not work with third-party marketing.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-surface border border-divider rounded-5xl p-7 sm:p-10 shadow-xl shadow-primary/5">
              {status !== 'sent' ? (
                <>
                  {/* Honeypot — hidden from humans, bots will fill it */}
                  <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={(e) => setForm({ ...form, website: e.target.value })}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} maxLength={100} minLength={2} />
                    <Field label="Email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} maxLength={254} />
                    <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} maxLength={20} />
                    <Field label="Zip Code" value={form.zip} onChange={(v) => setForm({ ...form, zip: v })} maxLength={10} />
                  </div>
                  <div className="mt-5">
                    <label htmlFor="field-message" className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted mb-2 block">Your Message *</label>
                    <textarea
                      id="field-message"
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      maxLength={2000}
                      minLength={10}
                      placeholder="Describe your plumbing needs..."
                      className="w-full bg-background border border-divider rounded-2xl px-4 py-3.5 text-ink placeholder-muted/60 focus:border-primary focus:ring-4 focus:ring-primary/15 outline-none transition resize-none font-body"
                    />
                    <p className="text-xs text-muted/50 mt-1 text-right">{form.message.length}/2000</p>
                  </div>
                  <div
                    ref={dropRef}
                    onDragOver={(e) => { e.preventDefault(); dropRef.current?.classList.add('!border-primary', '!bg-primary/5') }}
                    onDragLeave={() => { dropRef.current?.classList.remove('!border-primary', '!bg-primary/5') }}
                    onDrop={(e) => { e.preventDefault(); dropRef.current?.classList.remove('!border-primary', '!bg-primary/5'); handleFiles(e.dataTransfer.files) }}
                    className="mt-5 border-2 border-dashed border-divider rounded-3xl p-6 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  >
                    <input type="file" multiple id="file-up" className="hidden" onChange={(e) => handleFiles(e.target.files)} accept="image/*" />
                    <label htmlFor="file-up" className="cursor-pointer block">
                      <Upload className="h-6 w-6 mx-auto text-primary-dark mb-2" />
                      <p className="font-display font-semibold text-ink text-sm">Attach photos of your project</p>
                      <p className="text-xs text-muted mt-1">Click or drag files here (max 5 images)</p>
                      {files.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                          {files.map((f, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 bg-primary/10 text-primary-dark text-xs px-3 py-1.5 rounded-full font-mono">
                              <CheckCircle2 className="h-3 w-3" />
                              {f.name.length > 22 ? f.name.slice(0, 22) + '…' : f.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </label>
                  </div>

                  {/* hCaptcha widget */}
                  <div className="mt-5 flex justify-center">
                    <div ref={captchaRef} />
                  </div>

                  {errorMsg && (
                    <div className="mt-4 flex items-center gap-2 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      {errorMsg}
                    </div>
                  )}

                  <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-xs text-muted">We will contact you as soon as possible. Fields with * are required.</p>
                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="magnetic-btn inline-flex items-center gap-2 bg-primary text-deep font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-primary/30 disabled:opacity-50"
                    >
                      {status === 'sending' ? 'Sending...' : 'Send Message'}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="h-16 w-16 mx-auto rounded-full bg-primary/15 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-8 w-8 text-primary-dark" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-ink mb-3">Thank you for reaching out</h3>
                  <p className="text-muted max-w-md mx-auto">We will get back to you shortly to discuss your plumbing needs.</p>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* ponytail: static embed, swap query for real address */}
        <div className="mt-16 rounded-3xl overflow-hidden border border-divider shadow-lg shadow-primary/5">
          <iframe
            title="Bute Plumbing Services service area"
            src={MAP_EMBED}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   ServicesGrid — 6 dark tiles
---------------------------------------------------------------- */
function ServicesGrid() {
  const ref = useRef(null)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const ctx = gsap.context(() => {
      gsap.from('.svc-tile', {
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06,
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} className="relative py-24 px-6 sm:px-10 lg:px-16 bg-deep text-white overflow-hidden rounded-t-6xl">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative max-w-7xl mx-auto">
        <SectionHeadingLight
          eyebrow="Everything We Offer"
          title="Full range,"
          titleAccent="under one roof."
          description="We handle jobs of all sizes — residential and commercial. Serving Rothesay, Port Bannatyne, and the wider Isle of Bute."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-4xl overflow-hidden">
          {SERVICES.map((svc, i) => (
            <Tile key={i} icon={svc.icon} title={svc.title} text={svc.text} number={String(i + 1).padStart(2, '0')} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Contact() {
  return (
    <>
      <ServicesGrid />
      <ContactForm />
    </>
  )
}
