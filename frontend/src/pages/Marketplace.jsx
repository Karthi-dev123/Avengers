import { useState } from 'react'

const credits = [
  { id: 'VCC-001', project: 'Solar Farm Tamil Nadu', type: 'Solar', tonnes: 500, price: 18, confidence: 92, location: 'Tamil Nadu, India' },
  { id: 'VCC-005', project: 'Reforestation Assam', type: 'Forestry', tonnes: 430, price: 22, confidence: 95, location: 'Assam, India' },
  { id: 'VCC-004', project: 'Biogas Plant Pune', type: 'Biogas', tonnes: 210, price: 15, confidence: 85, location: 'Pune, India' },
  { id: 'VCC-006', project: 'Tidal Energy Odisha', type: 'Ocean', tonnes: 180, price: 28, confidence: 90, location: 'Odisha, India' },
  { id: 'VCC-007', project: 'EV Fleet Mumbai', type: 'Transport', tonnes: 95, price: 12, confidence: 80, location: 'Mumbai, India' },
  { id: 'VCC-008', project: 'Green Roof Delhi', type: 'Urban', tonnes: 60, price: 20, confidence: 88, location: 'Delhi, India' },
]

const typeEmoji = { Solar: '☀️', Forestry: '🌳', Biogas: '♻️', Ocean: '🌊', Transport: '⚡', Urban: '🏙️' }
const typeColor = {
  Solar: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  Forestry: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  Biogas: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  Ocean: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  Transport: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  Urban: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
}

export default function Marketplace() {
  const [toast, setToast] = useState(null)
  const [bought, setBought] = useState([])

  const handleBuy = (credit) => {
    setBought((prev) => [...prev, credit.id])
    setToast(`Successfully purchased ${credit.id}!`)
    setTimeout(() => setToast(null), 3000)
  }

  return (
    <div className="w-full px-10 py-10">
      {toast && (
        <div className="fixed top-24 right-6 bg-emerald-500 text-stone-950 font-semibold px-5 py-3 rounded-xl shadow-lg z-50">
          ✓ {toast}
        </div>
      )}

      {/* Header */}
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-emerald-400 text-sm font-medium uppercase tracking-widest mb-1">Trade</p>
          <h1 className="text-4xl font-bold text-white">Credit Marketplace</h1>
          <p className="text-stone-400 mt-2">Buy verified carbon credits from active projects on Hedera</p>
        </div>
        <div className="flex gap-4 text-sm">
          <div className="bg-stone-900 border border-stone-800 rounded-xl px-5 py-3 text-center">
            <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">Listed Credits</p>
            <p className="text-2xl font-bold text-white">{credits.length}</p>
          </div>
          <div className="bg-stone-900 border border-stone-800 rounded-xl px-5 py-3 text-center">
            <p className="text-stone-400 text-xs uppercase tracking-wider mb-1">Purchased</p>
            <p className="text-2xl font-bold text-emerald-400">{bought.length}</p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {credits.map((credit) => (
          <div key={credit.id} className={`bg-stone-900 border rounded-2xl p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/20 ${bought.includes(credit.id) ? 'border-emerald-700/50' : 'border-stone-800 hover:border-emerald-800/50'}`}>
            
            {/* Top */}
            <div>
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{typeEmoji[credit.type]}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${typeColor[credit.type]}`}>
                    {credit.type}
                  </span>
                </div>
                <span className="font-mono text-xs text-stone-500 bg-stone-800 px-2 py-1 rounded-lg">{credit.id}</span>
              </div>

              <h3 className="font-bold text-white text-xl mb-1">{credit.project}</h3>
              <p className="text-stone-500 text-sm mb-1">📍 {credit.location}</p>
              <p className="text-stone-400 text-sm mb-5">{credit.tonnes.toLocaleString()} tonnes CO₂ offset</p>

              {/* AI Score bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-stone-500">AI Confidence Score</span>
                  <span className="text-emerald-400 font-semibold">{credit.confidence}%</span>
                </div>
                <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all"
                    style={{ width: `${credit.confidence}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="flex items-center justify-between mt-6 pt-5 border-t border-stone-800">
              <div>
                <p className="text-stone-500 text-xs mb-1">Price per tonne</p>
                <p className="text-3xl font-bold text-white">${credit.price}
                  <span className="text-sm font-normal text-stone-500 ml-1">USD</span>
                </p>
              </div>
              <button
                onClick={() => handleBuy(credit)}
                disabled={bought.includes(credit.id)}
                className={`font-bold px-8 py-3 rounded-xl text-sm transition-all duration-200 ${
                  bought.includes(credit.id)
                    ? 'bg-emerald-900/30 text-emerald-600 border border-emerald-800/30 cursor-not-allowed'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 hover:scale-105'
                }`}
              >
                {bought.includes(credit.id) ? '✓ Bought' : 'Buy'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}