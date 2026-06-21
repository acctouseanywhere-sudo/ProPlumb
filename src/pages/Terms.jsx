import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <div className="min-h-screen bg-background text-ink font-body">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link to="/" className="text-primary text-sm font-medium hover:underline">← Back to Home</Link>
        <h1 className="font-display font-bold text-4xl mt-8 mb-6">Terms of Service</h1>
        <div className="space-y-4 text-muted leading-relaxed">
          <p>Last updated: January 2026</p>
          <p>By using the Bute Plumbing Services website, you agree to these terms.</p>
          <h2 className="font-display font-semibold text-xl text-ink pt-4">Services</h2>
          <p>All plumbing services are subject to availability and scheduling. Estimates provided are indicative and may vary based on actual conditions.</p>
          <h2 className="font-display font-semibold text-xl text-ink pt-4">Warranty</h2>
          <p>We stand behind our work. Specific warranty terms are provided with each service agreement.</p>
          <h2 className="font-display font-semibold text-xl text-ink pt-4">Limitation</h2>
          <p>Bute Plumbing Services Ltd is not liable for damages resulting from misuse of plumbing systems or unauthorized modifications.</p>
        </div>
      </div>
    </div>
  )
}
