import { useState, useEffect } from 'react'
import API from '../api'

const confidenceColor = (score) => {
  if (!score) return 'text-stone-400'
  if (score >= 85) return 'text-emerald-600'
  if (score >= 70) return 'text-yellow-600'
  return 'text-red-600'
}

export default function ApproverView() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [approving, setApproving] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    API.get('/pending-applications')
      .then((res) => {
        setApps(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load applications. Is the backend running?')
        setLoading(false)
      })
  }, [])

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

      {loading ? (
        <div className="text-center py-20 text-stone-400">Loading applications from backend...</div>
      ) : apps.length === 0 ? (
        <div className="text-center py-20 text-stone-500">
          <p className="text-4xl mb-4">✓</p>
          <p className="text-lg font-medium text-stone-400">All applications reviewed</p>
          <p className="text-sm mt-1">No pending applications at this time</p>
        </div>
      ) : (
        <div className="space-y-4">
          {apps.map((app) => (
            <div key={app.id} className="bg-stone-900 border border-stone-800 rounded-2xl p-6 hover:border-emerald-800/40 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs text-stone-500">{app.id}</span>
                    {app.aiScore && (
                      <span className={`text-sm font-bold ${confidenceColor(app.aiScore)}`}>
                        AI Score: {app.aiScore}%
                      </span>
                    )}
                    {!app.aiScore && (
                      <span className="text-xs text-stone-500 bg-stone-800 px-2 py-0.5 rounded-full">
                        AI Score pending
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-1">{app.project}</h3>
                  <p className="text-stone-400 text-sm mb-3">{app.tonnes} tonnes CO₂ reduction claimed</p>

                  {app.aiScore && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-stone-500 mb-1">
                        <span>AI Confidence</span>
                        <span>{app.aiScore}%</span>
                      </div>
                      <div className="h-1.5 bg-stone-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${app.aiScore >= 85 ? 'bg-emerald-500' : app.aiScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${app.aiScore}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => handleApprove(app.id)}
                  disabled={approving === app.id}
                  className="shrink-0 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-stone-950 font-bold px-6 py-2.5 rounded-xl text-sm transition-colors"
                >
                  {approving === app.id ? 'Approving...' : 'Approve'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}