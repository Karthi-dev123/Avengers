import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import ApplyCredit from './pages/ApplyCredit'
import ApproverView from './pages/ApproverView'
import Marketplace from './pages/Marketplace'
import AuditTrail from './pages/AuditTrail'
import RetireCredit from './pages/RetireCredit'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-stone-950 text-stone-100">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/apply" element={<ApplyCredit />} />
            <Route path="/approver" element={<ApproverView />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/audit/:creditId" element={<AuditTrail />} />
            <Route path="/retire" element={<RetireCredit />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}