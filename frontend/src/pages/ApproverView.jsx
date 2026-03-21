import { useState } from 'react'
import API from '../api'

const pending = [
  { id: 'APP-38291', project: 'Wind Energy Gujarat', tonnes: 320, confidence: 78, ipfs: 'Qm...abc123', sensor: 'Avg CO₂: 410ppm, Energy: 1.2kWh' },
  { id: 'APP-38290', project: 'Biogas Plant Pune', tonnes: 210, confidence: 85, ipfs: 'Qm...def456', sensor: 'Avg CO₂: 395ppm, Energy: 0.9kWh' },
  { id: 'APP-38289', project: 'Reforestation Assam', tonnes: 430, confidence: 95, ipfs: 'Qm...ghi789', sensor: 'Avg CO₂: 382ppm, Energy: 1.4kWh' },
]

const confidenceColor = (score) => {
  if (score >= 85) return 'text-emerald-400'
  if (score >= 70) return 'text-yellow-400'
  return 'text-red-400'
}

export default function ApproverView() {
  const [apps, setApps] = useState(pending)
  const [approving, setApproving] = useState(null)
  const [error, setError] = useState(null)

  const handleApprove = async (id) => {
    setApproving(id)
    setError(null)
    try {
      await API.post('/approve-credit', { applicationId: id })
      setApps((prev) => prev.filter((a) => a.id !== id))
    } catch (err) {
      setError('Approval failed. Is the backend running?')
    } finally {
      setApproving(null)
    }
  }

  return (
    <div className="w-full px-10 py-10">
      <div className="mb-8">
        <p className="text-emerald-400 text-sm font-medium uppercase tracking-widest mb-1">Government Body</p>
        <h1 className="text-3xl font-bold text-white">Approver View</h1>
        <p className="text-stone-400 mt-1">Review AI-verified applications and approve credit minting</p>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {apps.length === 0 ? (
        <div className="text-center py-20 text-stone-500">
          <p className="text-4xl mb-4">✓</p>
          <p className="text-lg font-medium text-stone-400">All applications reviewed</p>
        </div>
      ) : (
        <div className="space-y-4">
          {apps.map((app) => (
            <div key={app.id} className="bg-stone-900 border border-stone-800 rounded-2xl p-6 hover:border-emerald-800/40 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs text-stone-500">{app.id}</span>
                    <span className={`text-sm font-bold ${confidenceColor(app.confidence)}`}>
                      AI Score: {app.confidence}%
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{app.project}</h3>
                  <p className="text-stone-400 text-sm mb-3">{app.tonnes} tonnes CO₂ reduction claimed</p>
                  <div className="flex flex-wrap gap-4 text-xs text-stone-400">
                    <span className="bg-stone-800 px-3 py-1.5 rounded-lg">📡 {app.sensor}</span>
                    <a href="#" className="bg-stone-800 px-3 py-1.5 rounded-lg text-emerald-400 hover:text-emerald-300 transition-colors">
                      🔗 IPFS: {app.ipfs}
                    </a>
                  </div>
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-stone-500 mb-1">
                      <span>Confidence</span><span>{app.confidence}%</span>
                    </div>
                    <div className="h-1.5 bg-stone-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${app.confidence >= 85 ? 'bg-emerald-500' : app.confidence >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${app.confidence}%` }} />
                    </div>
                  </div>
                </div>
                <button onClick={() => handleApprove(app.id)} disabled={approving === app.id}
                  className="shrink-0 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-stone-950 font-bold px-6 py-2.5 rounded-xl text-sm transition-colors">
                  {approving === app.id ? 'Minting...' : 'Approve'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}