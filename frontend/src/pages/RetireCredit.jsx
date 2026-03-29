import { useState } from 'react'
import API from '../api'

const availableCredits = ['CRD001', 'CRD002', 'CRD003']

export default function RetireCredit() {
  const [selected, setSelected] = useState('')
  const [retired, setRetired] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cert, setCert] = useState(null)
  const [error, setError] = useState(null)

  const handleRetire = async () => {
    if (!selected) return
    setLoading(true)
    setError(null)
    try {
      const res = await API.post('/retire-credit', { creditId: selected })
      setCert({
        ipfs: res.data.certificateIpfs,
        date: new Date().toISOString().split('T')[0]
      })
      setRetired(true)
    } catch (err) {
      setError('Retirement failed. Is the backend running?')
    } finally {
      setLoading(false)
    }
  }

  if (retired && cert) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <div className="mb-8">
          <p className="text-emerald-400 text-sm font-medium uppercase tracking-widest mb-1">Complete</p>
          <h1 className="text-3xl font-bold text-white">Credit Retired</h1>
        </div>
        <div className="bg-stone-900 border border-emerald-800/50 rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🌿</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-1">Retirement Certificate</h2>
            <p className="text-stone-400 text-sm">Credit <span className="font-mono text-emerald-400">{selected}</span> has been permanently retired</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b border-stone-800">
              <span className="text-stone-400 text-sm">Credit ID</span>
              <span className="font-mono text-emerald-400 text-sm">{selected}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-stone-800">
              <span className="text-stone-400 text-sm">Retirement Date</span>
              <span className="text-white text-sm">{cert.date}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-stone-400 text-sm">IPFS Certificate</span>
              <a href={cert.ipfs} target="_blank" rel="noreferrer" className="font-mono text-emerald-400 text-xs hover:text-emerald-300 transition-colors">
                {cert.ipfs} →
              </a>
            </div>
          </div>
        </div>
        <button onClick={() => { setRetired(false); setSelected('') }}
          className="mt-6 text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
          ← Retire another credit
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-emerald-400 text-sm font-medium uppercase tracking-widest mb-1">Permanent Action</p>
        <h1 className="text-3xl font-bold text-white">Retire a Credit</h1>
        <p className="text-stone-400 mt-1">Permanently burn a credit via HTS wipe key. This action cannot be undone.</p>
      </div>
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8">
        <div className="mb-6">
          <label className="block text-sm font-medium text-stone-300 mb-2">Select Credit to Retire</label>
          <select value={selected} onChange={(e) => setSelected(e.target.value)}
            className="w-full bg-stone-800 border border-stone-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors text-sm">
            <option value="">-- Select a credit --</option>
            {availableCredits.map((id) => (
              <option key={id} value={id}>{id}</option>
            ))}
          </select>
        </div>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        {selected && (
          <div className="bg-red-950/30 border border-red-900/40 rounded-xl px-5 py-4 mb-6">
            <p className="text-red-400 text-sm font-medium">⚠ Warning</p>
            <p className="text-stone-400 text-sm mt-1">Retiring <span className="text-white font-mono">{selected}</span> will permanently burn this token on Hedera.</p>
          </div>
        )}
        <button onClick={handleRetire} disabled={!selected || loading}
          className="w-full bg-red-600 hover:bg-red-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors text-sm">
          {loading ? 'Retiring...' : '🔥 Retire Credit Permanently'}
        </button>
      </div>
    </div>
  )
}