import SecurityScorecardMonitor from './components/SecurityScorecardMonitor'
import UptimeMonitor from './components/UptimeMonitor'
// import WebsiteMonitor from './components/WebsiteMonitor'

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <UptimeMonitor />
      <SecurityScorecardMonitor />
      {/* <WebsiteMonitor /> */}
    </div>
  )
}

export default App