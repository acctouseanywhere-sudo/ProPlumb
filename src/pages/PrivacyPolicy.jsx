import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background text-ink font-body">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <Link to="/" className="text-primary text-sm font-medium hover:underline">← Back to Home</Link>
        <h1 className="font-display font-bold text-4xl mt-8 mb-6">Privacy Policy</h1>
        <div className="space-y-4 text-muted leading-relaxed">
          <p>Last updated: January 2026</p>
          <p>Bute Plumbing Services Ltd ("we", "our", "us") respects your privacy. This policy explains how we collect and use your personal information.</p>
          <h2 className="font-display font-semibold text-xl text-ink pt-4">Information We Collect</h2>
          <p>When you submit a contact form, we collect your name, email, phone number, and any information you provide in your message.</p>
          <h2 className="font-display font-semibold text-xl text-ink pt-4">How We Use Your Information</h2>
          <p>We use your information solely to respond to your inquiry and provide requested services. We do not sell or share your data with third parties for marketing purposes.</p>
          <h2 className="font-display font-semibold text-xl text-ink pt-4">Contact</h2>
          <p>For questions about this policy, contact us at info@buteplumbing.co.uk.</p>
        </div>
      </div>
    </div>
  )
}
