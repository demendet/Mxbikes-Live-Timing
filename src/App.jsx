import { useState, useEffect } from 'react'

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  // Floating background orbs
  const backgroundOrbs = [
    { color: 'bg-neon-blue', size: 'w-96 h-96', position: 'top-10 -right-20', delay: '0s' },
    { color: 'bg-neon-pink', size: 'w-72 h-72', position: 'top-1/2 -left-32', delay: '1s' },
    { color: 'bg-neon-purple', size: 'w-80 h-80', position: 'bottom-20 right-10', delay: '2s' },
    { color: 'bg-neon-green', size: 'w-64 h-64', position: 'bottom-10 left-1/4', delay: '1.5s' },
  ]

  // Fetch data from API
  const fetchData = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000'
      const response = await fetch(`${apiUrl}/servers/5121`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const result = await response.json()
      setData(result)
      setError(null)
      setLastUpdate(new Date())
    } catch (err) {
      setError(err.message)
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  // Auto-refresh data every 2 seconds
  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 2000)
    return () => clearInterval(interval)
  }, [])

  // Format time helper
  const formatTime = (seconds) => {
    if (!seconds || seconds === 0) return '--:--:---'
    const minutes = Math.floor(seconds / 60)
    const secs = (seconds % 60).toFixed(3)
    return `${minutes}:${secs.padStart(6, '0')}`
  }

  // Format session time (counts down for timed sessions)
  const formatSessionTime = (currentTime, sessionLength) => {
    // If no time data, show placeholder
    if (currentTime === null || currentTime === undefined) return '--:--'
    
    // If session_length is "5", that means 5 minutes total
    // We need to show REMAINING time (countdown)
    if (sessionLength && sessionLength !== "0") {
      // Parse the session length - it's usually just a number like "5" for 5 minutes
      const totalMinutes = parseInt(sessionLength) || 0
      const totalSeconds = totalMinutes * 60
      
      // Calculate remaining time
      const remainingSeconds = Math.max(0, totalSeconds - currentTime)
      
      const minutes = Math.floor(remainingSeconds / 60)
      const seconds = Math.floor(remainingSeconds % 60)
      const milliseconds = Math.floor((remainingSeconds % 1) * 1000)
      
      return `${minutes}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`
    }
    
    // If no session length defined, just show elapsed time
    return formatTime(currentTime)
  }

  // Format gap helper
  const formatGap = (gap) => {
    if (!gap || gap === '') return '--'
    return gap
  }

  // Get position badge class
  const getPositionClass = (position) => {
    if (position === 1) return 'position-1-modern'
    if (position === 2) return 'position-2-modern' 
    if (position === 3) return 'position-3-modern'
    return 'position-other-modern'
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Orbs */}
        {backgroundOrbs.map((orb, index) => (
          <div 
            key={index}
            className={`floating-orb ${orb.color} ${orb.size} ${orb.position}`}
            style={{ animationDelay: orb.delay }}
          />
        ))}
        
        <div className="text-center z-10 animate-fade-in-up">
          <div className="relative mb-8">
            <div className="w-32 h-32 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="w-24 h-24 border-4 border-neon-pink border-t-transparent rounded-full animate-spin absolute top-4 left-1/2 transform -translate-x-1/2"></div>
          </div>
          <h2 className="main-header mb-4">INITIALIZING</h2>
          <p className="text-primary-blue font-mono text-lg">
            CONNECTING TO LIVE TIMING SERVER...
          </p>
          <div className="mt-6 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-neon-blue rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-neon-pink rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
            <div className="w-3 h-3 bg-neon-purple rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Orbs */}
        {backgroundOrbs.map((orb, index) => (
          <div 
            key={index}
            className={`floating-orb ${orb.color} ${orb.size} ${orb.position}`}
            style={{ animationDelay: orb.delay }}
          />
        ))}
        
        <div className="glass-card max-w-md text-center z-10 animate-scale-in">
          <div className="w-16 h-16 border-4 border-neon-pink border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="text-3xl font-sans font-bold text-error-red mb-6">
            CONNECTION FAILED
          </h2>
          <p className="text-white/80 mb-8 font-futuristic">{error}</p>
          <button 
            onClick={() => {setLoading(true); fetchData()}}
            className="modern-button"
          >
            RETRY CONNECTION
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Orbs */}
      {backgroundOrbs.map((orb, index) => (
        <div 
          key={index}
          className={`floating-orb ${orb.color} ${orb.size} ${orb.position}`}
          style={{ animationDelay: orb.delay }}
        />
      ))}

      {/* Header */}
      <header className="relative z-10 border-b border-neon-blue/30 p-6 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="flex items-center justify-between animate-slide-in-left">
            <div className="flex items-center space-x-6">
              <h1 className="text-3xl md:text-4xl font-sans font-bold text-white">Default MX Server</h1>
            </div>
            <div className="text-right text-sm text-white/80 font-mono">
              <p className="text-primary-blue">SERVER ID: 5121</p>
              <p>LAST UPDATE: {lastUpdate?.toLocaleTimeString() || '--'}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-6 space-y-8 relative z-10">
        {/* Server & Session Info Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in-up">
          {/* Server Info */}
          <div className="modern-card">
            <h2 className="text-2xl font-cyber font-bold mb-6 text-neon-blue">
              SERVER STATUS
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-futuristic">Name:</span>
                <span className="font-cyber text-neon-blue">Default MX Server</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-futuristic">Version:</span>
                <span className="font-cyber text-neon-green">Beta20B</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-futuristic">Location:</span>
                <span className="font-cyber text-neon-purple">Europe</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-futuristic">Players:</span>
                <span className="font-cyber text-neon-yellow">
                  {data?.riders?.length || 0} / 40
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-futuristic">Server ID:</span>
                <span className="font-cyber text-neon-pink">5121</span>
              </div>
            </div>
          </div>

          {/* Session Info */}
          <div className="modern-card">
            <h2 className="text-2xl font-cyber font-bold mb-6 text-neon-blue">
              SESSION DATA
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-futuristic">Track:</span>
                <span className="font-cyber text-neon-blue">{data?.session?.track_name || 'Unknown'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-futuristic">Session:</span>
                <span className="font-cyber text-neon-green">{data?.session?.session_type || 'WAITING'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-futuristic">State:</span>
                <span className="font-cyber text-neon-purple">{data?.session?.session_state || '--'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-futuristic">Length:</span>
                <span className="font-cyber text-neon-yellow">{data?.session?.session_length || '--'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-futuristic">Time:</span>
                <span className="font-cyber text-neon-pink">{formatSessionTime(data?.session?.session_time, data?.session?.session_length)}</span>
              </div>
            </div>
          </div>

          {/* Weather Info */}
          <div className="modern-card">
            <h2 className="text-2xl font-cyber font-bold mb-6 text-neon-blue">
              ENVIRONMENT
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-futuristic">Conditions:</span>
                <span className="font-cyber text-neon-blue">{data?.session?.weather_conditions || 'CLEAR'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-futuristic">Temperature:</span>
                <span className="font-cyber text-neon-green">{data?.session?.air_temperature || 20}°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-futuristic">Track Length:</span>
                <span className="font-cyber text-neon-purple">{data?.session?.track_length || 0}m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-futuristic">Event:</span>
                <span className="font-cyber text-neon-yellow">
                  {data?.session?.event_name || data?.session?.event_type || 'Unknown'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white/70 font-futuristic">Entries:</span>
                <span className="font-cyber text-neon-pink">{data?.session?.total_entries || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Riders Table */}
        <div className="neon-card animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <h2 className="text-3xl font-cyber font-bold mb-6 text-neon-blue">
            LIVE STANDINGS ({data?.riders?.length || 0})
          </h2>
          {data?.riders && data.riders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="cyber-table">
                <thead>
                  <tr>
                    <th>POS</th>
                    <th>#</th>
                    <th>RIDER</th>
                    <th>BIKE</th>
                    <th>STATUS</th>
                    <th>LAP</th>
                    <th>BEST LAP</th>
                    <th>LAST LAP</th>
                    <th>GAP</th>
                    <th>LAPS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.riders
                    .sort((a, b) => (a.position || 999) - (b.position || 999))
                    .map((rider, index) => (
                    <tr key={rider.race_number} className="animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
                      <td>
                        <div className={`position-badge-modern ${getPositionClass(rider.position)}`}>
                          {rider.position || '--'}
                        </div>
                      </td>
                      <td className="font-cyber font-bold text-neon-blue">#{rider.race_number}</td>
                      <td className="font-futuristic font-semibold text-white">{rider.name}</td>
                      <td className="text-sm text-white/70 font-futuristic">{rider.bike_short_name || rider.bike_name}</td>
                      <td>
                        <span className={`px-3 py-1 rounded-full text-xs font-cyber font-bold border ${
                          rider.status === 'TRK' ? 'bg-neon-green/20 text-neon-green border-neon-green/50' :
                          rider.status === 'PIT' ? 'bg-neon-yellow/20 text-neon-yellow border-neon-yellow/50' :
                          rider.status === 'DNS' ? 'bg-gray-600/20 text-gray-400 border-gray-400/50' :
                          rider.status === 'RET' ? 'bg-neon-pink/20 text-neon-pink border-neon-pink/50' :
                          rider.status === 'DSQ' ? 'bg-red-800/20 text-red-400 border-red-400/50' :
                          'bg-white/20 text-white border-white/50'
                        }`}>
                          {rider.status === 'TRK' ? 'On Track' : 
                           rider.status === 'PIT' ? 'In Pit' :
                           rider.status}
                        </span>
                      </td>
                      <td className="font-cyber text-neon-purple">{rider.current_lap || 0}</td>
                      <td>
                        <span className="bg-cyber-light px-3 py-1 rounded font-cyber text-neon-blue">
                          {formatTime(rider.best_lap_time)}
                        </span>
                      </td>
                      <td>
                        <span className="bg-cyber-light px-3 py-1 rounded font-cyber text-neon-green">
                          {formatTime(rider.last_lap_time)}
                        </span>
                      </td>
                      <td className="text-sm font-cyber text-white/80">{formatGap(rider.gap)}</td>
                      <td className="text-center font-cyber text-neon-yellow">{rider.total_laps || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-white/60">
              <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="font-cyber text-xl">NO RIDERS ON TRACK</p>
              <p className="font-futuristic text-sm mt-2">Waiting for live data...</p>
            </div>
          )}
        </div>

        {/* Safety Data Row */}
        <div className="cyber-grid animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          {/* Contacts/Crashes */}
          <div className="modern-card">
            <h2 className="text-xl font-cyber font-bold mb-4 text-neon-pink">
              CONTACTS
            </h2>
            <div className="space-y-4">
              <div className="data-metric data-metric-danger">
                {data?.safety_data?.contacts?.length || 0}
              </div>
              {data?.safety_data?.contacts && data.safety_data.contacts.length > 0 ? (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {data.safety_data.contacts.slice(-5).map((contact, idx) => (
                    <div key={idx} className="bg-cyber-light p-3 rounded-lg border border-neon-pink/30">
                      <div className="font-cyber text-sm text-white">
                        #{contact.rider1_number} vs {contact.rider2_number === -1 ? 'WALL' : `#${contact.rider2_number}`}
                      </div>
                      <div className="font-cyber text-neon-pink font-bold">
                        {contact.impact_velocity.toFixed(1)} m/s
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/60 font-futuristic">No contacts recorded</p>
              )}
            </div>
          </div>

          {/* Penalties */}
          <div className="modern-card">
            <h2 className="text-xl font-cyber font-bold mb-4 text-neon-yellow">
              PENALTIES
            </h2>
            <div className="space-y-4">
              <div className="data-metric data-metric-warning">
                {data?.safety_data?.penalties?.length || 0}
              </div>
              {data?.safety_data?.penalties && data.safety_data.penalties.length > 0 ? (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {data.safety_data.penalties.slice(-5).map((penalty, idx) => (
                    <div key={idx} className="bg-cyber-light p-3 rounded-lg border border-neon-yellow/30">
                      <div className="font-cyber text-sm text-white">#{penalty.race_number}</div>
                      <div className="font-cyber text-neon-yellow font-bold">{penalty.offence}</div>
                      <div className="font-cyber text-xs text-white/70">
                        {penalty.penalty_time}s {penalty.penalty_type}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/60 font-futuristic">No penalties issued</p>
              )}
            </div>
          </div>

          {/* Holeshots */}
          <div className="modern-card">
            <h2 className="text-xl font-cyber font-bold mb-4 text-neon-green">
              HOLESHOTS
            </h2>
            <div className="space-y-4">
              <div className="data-metric data-metric-success">
                {Object.keys(data?.safety_data?.holeshots || {}).length}
              </div>
              {data?.safety_data?.holeshots && Object.keys(data.safety_data.holeshots).length > 0 ? (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {Object.values(data.safety_data.holeshots).map((holeshot, idx) => (
                    <div key={idx} className="bg-cyber-light p-3 rounded-lg border border-neon-green/30">
                      <div className="font-cyber text-sm text-white">#{holeshot.race_number}</div>
                      <div className="font-cyber text-neon-green font-bold">
                        {(holeshot.holeshot_time / 1000).toFixed(3)}s
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/60 font-futuristic">No holeshots recorded</p>
              )}
            </div>
          </div>

          {/* Driver Status */}
          <div className="modern-card">
            <h2 className="text-xl font-cyber font-bold mb-4 text-neon-purple">
              DRIVER STATUS
            </h2>
            <div className="space-y-4">
              <div className="data-metric text-neon-purple">
                {Object.keys(data?.safety_data?.driver_status || {}).length}
              </div>
              {data?.safety_data?.driver_status && Object.keys(data.safety_data.driver_status).length > 0 ? (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {Object.entries(data.safety_data.driver_status).map(([riderNum, status], idx) => (
                    <div key={idx} className="bg-cyber-light p-3 rounded-lg border border-neon-purple/30">
                      <div className="font-cyber text-sm text-white">#{riderNum}</div>
                      <div className={`font-cyber font-bold ${
                        status.status === 'DNS' ? 'text-gray-400' :
                        status.status === 'RET' ? 'text-neon-yellow' :
                        status.status === 'DSQ' ? 'text-neon-pink' :
                        'text-white'
                      }`}>
                        {status.status}
                      </div>
                      {status.reason && (
                        <div className="text-xs text-white/60 font-futuristic">{status.reason}</div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/60 font-futuristic">All riders active</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default App