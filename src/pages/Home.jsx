import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleGenerate = () => {
    if (username.trim()) {
      navigate(`/dashboard?username=${username.trim()}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
          <span className="text-white text-lg sm:text-xl font-bold">GitHub Analyzer</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <button onClick={() => navigate('/features')} className="text-gray-300 hover:text-white transition-colors">Features</button>
          <button onClick={() => navigate('/how-it-works')} className="text-gray-300 hover:text-white transition-colors">How it Works</button>
          <button className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors">
            <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800/95 backdrop-blur-md border-b border-gray-700 px-4 py-4 animate-in slide-in-from-top">
          <div className="flex flex-col gap-3">
            <button onClick={() => { navigate('/features'); setMobileMenuOpen(false); }} className="text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-gray-700/50 text-left">Features</button>
            <button onClick={() => { navigate('/how-it-works'); setMobileMenuOpen(false); }} className="text-gray-300 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-gray-700/50 text-left">How it Works</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 md:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight">
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Visualize Your GitHub
          </span>
          <br />
          <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
            Journey.
          </span>
        </h1>

        <p className="text-gray-400 text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed px-2">
          Instantly generate a beautiful, shareable timeline of your contributions, repositories, and milestones from any GitHub profile.
        </p>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 max-w-xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 border border-gray-700/50 shadow-2xl">
          <div className="flex items-center gap-3 flex-1 px-3 sm:px-4">
            <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input
              type="text"
              placeholder="github-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-base sm:text-lg py-3 min-w-0"
            />
          </div>
          <button
            onClick={handleGenerate}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
          >
            Generate
          </button>
        </div>

        {/* Feature Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 mt-8 sm:mt-10 lg:mt-12 flex-wrap px-2">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-xs sm:text-sm">Real-time Analysis</span>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-xs sm:text-sm">AI-Powered Insights</span>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300 text-xs sm:text-sm">Beautiful Visualizations</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
