import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import API from '../api'

const statusStyle = {
  Minted: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  Pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
  Retired: 'bg-stone-500/15 text-stone-400 border-stone-500/30',
  Traded: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  Approved: 'bg-teal-500/15 text-teal-400 border-teal-500/30',
}

export default function Dashboard() {
  const [credits, setCredits] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    API.get('/credits')
      .then((res) => {
        setCredits(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError('Failed to load credits. Is the backend running?')
        setLoading(false)
      })
  }, [])

  const stats = [
    { label: 'Credits Minted', value: credits.filter(c => c.status === 'Minted').length },
    { label: 'Credits Retired', value: credits.filter(c => c.status === 'Retired').length },
    { label: 'Active Projects', value: credits.length },
    { label: 'Tonnes CO₂ Offset', value: credits.reduce((sum, c) => sum + c.tonnes, 0).toLocaleString() },
  ]

  return (
    <div className="w-full px-10 py-10">
      <div className="mb-10">
        <p className="text-emerald-400 text-sm font-medium uppercase tracking-widest mb-1">Overview</p>
        <h1 className="text-3xl font-bold text-white">Carbon Credit Dashboard</h1>
        <p className="text-stone-400 mt-1">Real-time lifecycle management on Hedera testnet</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-stone-900 border border-stone-800 rounded-2xl p-5 hover:border-emerald-800/50 transition-colors">
            <p className="text-stone-400 text-xs uppercase tracking-wider mb-2">{stat.label}</p>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-800 flex items-center justify-between">
          <h2 className="font-semibold text-white">Recent Credits</h2>
          <Link to="/apply" className="text-xs bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-semibold px-4 py-2 rounded-lg transition-colors">
            + Apply for Credit
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-16 text-stone-400">Loading credits from backend...</div>
        ) : error ? (
          <div className="text-center py-16 text-red-400">{error}</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-stone-800">
                  <th className="text-left text-xs text-stone-500 uppercase tracking-wider px-6 py-3">Credit ID</th>
                  <th className="text-left text-xs text-stone-500 uppercase tracking-wider px-6 py-3">Project</th>
                  <th className="text-left text-xs text-stone-500 uppercase tracking-wider px-6 py-3">Tonnes</th>
                  <th className="text-left text-xs text-stone-500 uppercase tracking-wider px-6 py-3">AI Score</th>
                  <th className="text-left text-xs text-stone-500 uppercase tracking-wider px-6 py-3">Status</th>
                  <th className="text-left text-xs text-stone-500 uppercase tracking-wider px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {credits.map((credit, i) => (
                  <tr key={credit.id} className={`border-b border-stone-800/50 hover:bg-stone-800/30 transition-colors ${i === credits.length - 1 ? 'border-0' : ''}`}>
                    <td className="px-6 py-4 text-emerald-400 font-mono text-sm font-medium">{credit.id}</td>
                    <td className="px-6 py-4 text-stone-200 text-sm">{credit.project}</td>
                    <td className="px-6 py-4 text-stone-300 text-sm">{credit.tonnes.toLocaleString()} t</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-stone-700 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${credit.confidence}%` }} />
                        </div>
                        <span className="text-stone-300 text-xs">{credit.confidence}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${statusStyle[credit.status] || 'bg-stone-500/15 text-stone-400 border-stone-500/30'}`}>
                        {credit.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/audit/${credit.id}`} className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                        View Audit →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}