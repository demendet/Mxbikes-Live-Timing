function App() {
  // Floating background orbs
  const backgroundOrbs = [
    { color: 'bg-neon-blue', size: 'w-96 h-96', position: 'top-10 -right-20', delay: '0s' },
    { color: 'bg-neon-pink', size: 'w-72 h-72', position: 'top-1/2 -left-32', delay: '1s' },
    { color: 'bg-neon-purple', size: 'w-80 h-80', position: 'bottom-20 right-10', delay: '2s' },
    { color: 'bg-neon-green', size: 'w-64 h-64', position: 'bottom-10 left-1/4', delay: '1.5s' },
  ]

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
        {/* CBR Logo */}
        <div className="mb-8">
          <img
            src="/cbr-logo.png"
            alt="CBR Logo"
            className="w-32 h-32 mx-auto mb-6 filter drop-shadow-[0_0_20px_rgba(0,255,255,0.3)]"
          />
        </div>

        {/* Coming Soon Text */}
        <h1 className="main-header mb-6">COMING SOON</h1>
        <p className="text-primary-blue font-mono text-xl mb-8">
          NEW PROJECT IN DEVELOPMENT
        </p>

        {/* Simple pulse dots */}
        <div className="flex justify-center space-x-3">
          <div className="w-4 h-4 bg-neon-blue rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-neon-pink rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
          <div className="w-4 h-4 bg-neon-purple rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
        </div>
      </div>
    </div>
  )
}

export default App