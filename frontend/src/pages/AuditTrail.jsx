import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import API from '../api'

export default function AuditTrail() {
  const { creditId } = useParams()
  const [trail, setTrail] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    API.get(`/audit/${creditId}`)
      .then((res) => {
        setTrail(res.data.trail)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load audit trail. Is the backend running?')
        setLoading(false)
      })
  }, [creditId])

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-emerald-400 text-sm font-medium uppercase tracking-widest mb-1">Provenance</p>
        <h1 className="text-3xl font-bold text-white">Audit Trail</h1>
        <p className="text-stone-400 mt-1">Full lifecycle of credit <span className="font-mono text-emerald-400">{creditId}</span></p>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8">
        {loading ? (
          <p className="text-stone-400 text-center py-10">Loading audit trail...</p>
        ) : error ? (
          <p className="text-red-400 text-center py-10">{error}</p>
        ) : (
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-stone-700" />
            <div className="space-y-8">
              {trail.map((step, i) => (
                <div key={i} className="relative flex gap-6 pl-12">
                  <div className="absolute left-0 w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm bg-emerald-500/20 border-emerald-500 text-emerald-400">
                    ✓
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-sm text-white">{step.step}</h3>
                      {i === trail.length - 1 && (
                        <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">Current</span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600 font-mono">{new Date(step.timestamp).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}