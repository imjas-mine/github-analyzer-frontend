import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Home() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]' : 'bg-gradient-to-br from-[#f8fafc] via-[#e2e8f0] to-[#f8fafc]'}`}>
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </div>
          <span className={`text-lg sm:text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>GitHub Analyzer</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <button onClick={() => navigate('/features')} className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>Features</button>
          <button onClick={() => navigate('/how-it-works')} className={`${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>How it Works</button>
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 shadow-md border border-gray-200'} rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110`}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`w-10 h-10 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 shadow-md border border-gray-200'} rounded-lg flex items-center justify-center transition-all duration-300`}
          >
            {isDark ? (
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </button>
          <button
            className={`w-10 h-10 ${isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100 shadow-md border border-gray-200'} rounded-lg flex items-center justify-center transition-colors`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className={`w-5 h-5 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'} backdrop-blur-md border-b px-4 py-4 animate-in slide-in-from-top`}>
          <div className="flex flex-col gap-3">
            <button onClick={() => { navigate('/features'); setMobileMenuOpen(false); }} className={`${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors py-2 px-3 rounded-lg text-left`}>Features</button>
            <button onClick={() => { navigate('/how-it-works'); setMobileMenuOpen(false); }} className={`${isDark ? 'text-gray-300 hover:text-white hover:bg-gray-700/50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} transition-colors py-2 px-3 rounded-lg text-left`}>How it Works</button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-20 md:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 leading-tight">
          <span className={`bg-gradient-to-r ${isDark ? 'from-white via-gray-100 to-gray-300' : 'from-gray-900 via-gray-800 to-gray-600'} bg-clip-text text-transparent`}>
            Visualize Your GitHub
          </span>
          <br />
          <span className={`bg-gradient-to-r ${isDark ? 'from-white via-gray-100 to-gray-300' : 'from-gray-900 via-gray-800 to-gray-600'} bg-clip-text text-transparent`}>
            Journey.
          </span>
        </h1>

        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-base sm:text-lg lg:text-xl mb-8 sm:mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed px-2`}>
          Instantly generate a beautiful, shareable timeline of your contributions, repositories, and milestones from any GitHub profile.
        </p>

        {/* Input Section */}
        <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 max-w-xl mx-auto ${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/80 border-gray-200 shadow-lg'} backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 border shadow-2xl`}>
          <div className="flex items-center gap-3 flex-1 px-3 sm:px-4">
            <svg className={`w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'} flex-shrink-0`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
            <input
              type="text"
              placeholder="github-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
              className={`flex-1 bg-transparent ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-400'} outline-none text-base sm:text-lg py-3 min-w-0`}
            />
          </div>
          <button
            onClick={() => { if (username.trim()) navigate(`/dashboard?username=${username.trim()}`) }}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/30"
          >
            Generate
          </button>
        </div>

        {/* Feature Pills */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 lg:gap-4 mt-8 sm:mt-10 lg:mt-12 flex-wrap px-2">
          <div className={`${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/70 border-gray-200 shadow-sm'} backdrop-blur-sm border rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 flex items-center gap-2`}>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-xs sm:text-sm`}>Real-time Analysis</span>
          </div>
          <div className={`${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/70 border-gray-200 shadow-sm'} backdrop-blur-sm border rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 flex items-center gap-2`}>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-xs sm:text-sm`}>AI-Powered Insights</span>
          </div>
          <div className={`${isDark ? 'bg-gray-800/50 border-gray-700/50' : 'bg-white/70 border-gray-200 shadow-sm'} backdrop-blur-sm border rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 flex items-center gap-2`}>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-xs sm:text-sm`}>Beautiful Visualizations</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
