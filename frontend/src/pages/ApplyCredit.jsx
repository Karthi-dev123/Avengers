import { useState } from 'react'

export default function ApplyCredit() {
  const [form, setForm] = useState({ project: '', gps: '', tonnes: '', evidence: '' })
  const [submitted, setSubmitted] = useState(false)
  const [appId] = useState(() => 'APP-' + Math.floor(Math.random() * 90000 + 10000))

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-20 text-center">
        <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✓</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Application Submitted!</h2>
        <p className="text-stone-400 mb-4">Your credit application has been received and is under review.</p>
        <div className="bg-stone-900 border border-stone-800 rounded-xl px-6 py-4 inline-block">
          <p className="text-stone-400 text-sm">Application ID</p>
          <p className="text-emerald-400 font-mono font-bold text-lg">{appId}</p>
        </div>
        <br />
        <button onClick={() => setSubmitted(false)} className="mt-6 text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
          Submit another application →
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-emerald-400 text-sm font-medium uppercase tracking-widest mb-1">New Application</p>
        <h1 className="text-3xl font-bold text-white">Apply for Carbon Credit</h1>
        <p className="text-stone-400 mt-1">Submit your project details for AI verification and credit minting</p>
      </div>
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-stone-300 mb-2">Project Name</label>
            <input name="project" value={form.project} onChange={handleChange} required placeholder="e.g. Solar Farm Tamil Nadu"
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-300 mb-2">GPS Location</label>
            <input name="gps" value={form.gps} onChange={handleChange} required placeholder="e.g. 13.0827° N, 80.2707° E"
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-300 mb-2">Emission Reduction Claimed (tonnes CO₂)</label>
            <input name="tonnes" type="number" value={form.tonnes} onChange={handleChange} required placeholder="e.g. 500"
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-300 mb-2">Evidence / Notes</label>
            <textarea name="evidence" value={form.evidence} onChange={handleChange} rows={4} placeholder="Describe your project evidence..."
              className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-white placeholder-stone-500 focus:outline-none focus:border-emerald-500 transition-colors text-sm resize-none" />
          </div>
          <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold py-3 rounded-xl transition-colors text-sm">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  )
}