import { useParams } from 'react-router-dom'

const steps = [
  { label: 'Sensed', desc: 'IoT sensor data collected by ESP32-DEMO-001', time: '2026-03-18 08:12:04', done: true },
  { label: 'Anchored', desc: 'Sensor batch anchored to Hedera HCS topic', time: '2026-03-18 08:12:09', done: true },
  { label: 'AI Verified', desc: 'Satellite AI model scored confidence at 92%', time: '2026-03-18 09:00:31', done: true },
  { label: 'Approved', desc: 'Government approver signed off on application', time: '2026-03-18 11:45:22', done: true },
  { label: 'Minted', desc: 'VCC token minted on Hedera HTS — Token ID: 0.0.5821', time: '2026-03-18 11:45:35', done: true },
  { label: 'Traded', desc: 'Credit transferred to buyer wallet 0.0.8823', time: '2026-03-19 14:22:10', done: true },
  { label: 'Retired', desc: 'Credit permanently burned via HTS wipe key', time: null, done: false },
]

export default function AuditTrail() {
  const { creditId } = useParams()

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-emerald-400 text-sm font-medium uppercase tracking-widest mb-1">Provenance</p>
        <h1 className="text-3xl font-bold text-white">Audit Trail</h1>
        <p className="text-stone-400 mt-1">Full lifecycle of credit <span className="font-mono text-emerald-400">{creditId}</span></p>
      </div>

      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-8">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-stone-700" />

          <div className="space-y-8">
            {steps.map((step, i) => (
              <div key={step.label} className="relative flex gap-6 pl-12">
                <div className={`absolute left-0 w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm ${
                  step.done
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : 'bg-stone-800 border-stone-600 text-stone-600'
                }`}>
                  {step.done ? '✓' : '○'}
                </div>

                <div className="flex-1 pb-2">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className={`font-semibold text-sm ${step.done ? 'text-white' : 'text-stone-500'}`}>
                      {step.label}
                    </h3>
                    {i === steps.filter(s => s.done).length - 1 && (
                      <span className="text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full">Current</span>
                    )}
                  </div>
                  <p className={`text-sm ${step.done ? 'text-stone-400' : 'text-stone-600'}`}>{step.desc}</p>
                  {step.time && (
                    <p className="text-xs text-stone-600 font-mono mt-1">{step.time} UTC</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}