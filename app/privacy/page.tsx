export const metadata = {
  title: "Privacy Policy | SafarUp",
  description: "Our commitment to protecting your travel data and privacy.",
}

export default function PrivacyPage() {
  const lastUpdated = "February 17, 2026";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-6 py-20">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100">
        <header className="mb-12 border-b border-slate-100 pb-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wider">
            Last Updated: {lastUpdated}
          </p>
        </header>

        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
              Data Collection & Usage
            </h2>
            <p className="text-slate-600 leading-relaxed">
              SafarUp collects essential information to provide a personalized travel discovery experience. This includes account identifiers (name, email), geolocation data for destination recommendations, and device analytics to optimize our interface.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
              Cookies and Tracking
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We utilize first-party cookies to maintain your session and preferences. Third-party analytics (such as Vercel Analytics and Google Analytics) help us understand how users navigate our travel guides to improve content quality.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
              Your Rights (GDPR & CCPA)
            </h2>
            <p className="text-slate-600 leading-relaxed">
              You retain full control over your data. You may request a data export, object to processing, or request total deletion of your SafarUp profile at any time by contacting our privacy team.
            </p>
          </section>

          <section className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h2 className="text-lg font-bold text-blue-900 mb-2">Security Note</h2>
            <p className="text-blue-800/80 text-sm leading-relaxed">
              We employ industry-standard TLS encryption for all data in transit and utilize encrypted databases to ensure your travel plans and personal details remain confidential.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}