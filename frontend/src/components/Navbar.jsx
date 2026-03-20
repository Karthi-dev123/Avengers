import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { path: '/', label: 'Dashboard' },
  { path: '/apply', label: 'Apply' },
  { path: '/approver', label: 'Approver' },
  { path: '/marketplace', label: 'Marketplace' },
  { path: '/retire', label: 'Retire' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-stone-950/90 backdrop-blur border-b border-emerald-900/40">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <span className="text-stone-950 font-black text-sm">V</span>
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            VeriDi<span className="text-emerald-400">Chain</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                pathname === path
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Hedera Testnet
        </div>
      </div>
    </nav>
  )
}