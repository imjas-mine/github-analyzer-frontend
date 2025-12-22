import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RepositoryCard from '../components/RepositoryCard'
import RepositoryDetailSidebar from '../components/RepositoryDetailSidebar'

const API_BASE_URL = 'https://github-analyzer-backend-tuwe.onrender.com/api/v1'

function Dashboard() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [profile, setProfile] = useState(null)
  const [repositories, setRepositories] = useState([])
  const [selectedRepo, setSelectedRepo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const usernameParam = urlParams.get('username')
    
    if (usernameParam) {
      setUsername(usernameParam)
      fetchUserData(usernameParam)
    } else {
      navigate('/')
    }
  }, [navigate])

  const fetchUserData = async (user) => {
    setLoading(true)
    setError(null)

    try {
      // Fetch user profile
      const profileResponse = await fetch(`${API_BASE_URL}/users/${user}`)
      if (!profileResponse.ok) throw new Error('Failed to fetch user profile')
      const profileData = await profileResponse.json()
      setProfile(profileData)

      // Fetch repositories
      const reposResponse = await fetch(`${API_BASE_URL}/users/${user}/repositories`)
      if (!reposResponse.ok) throw new Error('Failed to fetch repositories')
      const reposData = await reposResponse.json()
      
      // Sort repositories by creation date (descending)
      const sortedRepos = (reposData.nodes || []).sort((a, b) => 
        new Date(b.createdAt) - new Date(a.createdAt)
      )
      
      setRepositories(sortedRepos)
    } catch (err) {
      setError(err.message)
      console.error('Error fetching data:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
        {/* Navigation skeleton */}
        <nav className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-b border-gray-800">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <span className="text-white text-base sm:text-xl font-bold">GitHub Analyzer</span>
            </div>
          </div>
        </nav>

        {/* Loading Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
          {/* Animated Loading Header */}
          <div className="flex flex-col items-center justify-center mb-8 sm:mb-12">
            <div className="relative mb-6">
              {/* Animated GitHub Logo */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-12 h-12 sm:w-14 sm:h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              {/* Spinning ring */}
              <div className="absolute inset-0 w-20 h-20 sm:w-24 sm:h-24 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Analyzing Profile</h2>
            <p className="text-gray-400 text-sm sm:text-base">Fetching repositories and contributions...</p>
          </div>

          {/* Skeleton Profile Card */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 animate-pulse">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
              {/* Avatar skeleton */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-gray-700"></div>
              
              <div className="flex-1">
                {/* Name skeleton */}
                <div className="h-8 sm:h-10 bg-gray-700 rounded-lg w-48 sm:w-64 mb-3"></div>
                {/* Bio skeleton */}
                <div className="h-4 bg-gray-700/50 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-700/50 rounded w-3/4"></div>
              </div>

              {/* Stats skeleton */}
              <div className="flex gap-3 sm:gap-4">
                <div className="bg-gray-700/50 rounded-xl px-4 py-3 w-20 sm:w-24">
                  <div className="h-6 sm:h-8 bg-gray-600 rounded mb-1"></div>
                  <div className="h-3 bg-gray-600/50 rounded w-16"></div>
                </div>
                <div className="bg-gray-700/50 rounded-xl px-4 py-3 w-20 sm:w-24">
                  <div className="h-6 sm:h-8 bg-gray-600 rounded mb-1"></div>
                  <div className="h-3 bg-gray-600/50 rounded w-16"></div>
                </div>
                <div className="bg-gray-700/50 rounded-xl px-4 py-3 w-20 sm:w-24">
                  <div className="h-6 sm:h-8 bg-gray-600 rounded mb-1"></div>
                  <div className="h-3 bg-gray-600/50 rounded w-12"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Skeleton Repository Timeline */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8">
            <div className="h-8 bg-gray-700 rounded-lg w-48 sm:w-64 mb-6 sm:mb-8"></div>
            
            <div className="space-y-4 sm:space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3 sm:gap-6 animate-pulse" style={{ animationDelay: `${i * 150}ms` }}>
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500/50"></div>
                    <div className="w-px flex-1 bg-gray-700 mt-2"></div>
                  </div>
                  <div className="flex-1 pb-6 sm:pb-8">
                    <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                      <div className="h-5 sm:h-6 bg-gray-700 rounded w-40 sm:w-56 mb-3"></div>
                      <div className="h-4 bg-gray-700/50 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-700/50 rounded w-2/3 mb-4"></div>
                      <div className="flex gap-4">
                        <div className="h-4 bg-gray-700/30 rounded w-16"></div>
                        <div className="h-4 bg-gray-700/30 rounded w-12"></div>
                        <div className="h-4 bg-gray-700/30 rounded w-12"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
        {/* Navigation */}
        <nav className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-b border-gray-800">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <span className="text-white text-base sm:text-xl font-bold">GitHub Analyzer</span>
            </div>
          </div>
        </nav>

        {/* Error Content */}
        <div className="flex flex-col items-center justify-center px-4 py-16 sm:py-24">
          {/* Error Icon */}
          <div className="relative mb-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-red-500/30">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            {/* Pulsing ring */}
            <div className="absolute inset-0 w-24 h-24 sm:w-32 sm:h-32 border-2 border-red-500/30 rounded-full animate-ping"></div>
          </div>

          {/* Error Message */}
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-center">
            Oops! Something went wrong
          </h1>
          
          <p className="text-gray-400 text-sm sm:text-base mb-6 text-center max-w-md">
            We couldn't fetch the profile data. This might be a temporary issue.
          </p>

          {/* Error Details */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 sm:px-6 py-3 sm:py-4 mb-8 max-w-lg w-full">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-300 text-sm sm:text-base break-all">{error}</p>
            </div>
          </div>

          {/* Suggestions */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-4 sm:p-6 mb-8 max-w-lg w-full">
            <h3 className="text-white font-semibold mb-3 text-sm sm:text-base">Things you can try:</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Check if the username is spelled correctly
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Make sure the GitHub profile exists and is public
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                Try again in a few moments
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-white rounded-xl transition-all hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Try Again
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-500/30"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Navigation - Sticky */}
      <nav className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-b border-gray-800">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
            <span className="text-white text-base sm:text-xl font-bold hidden xs:inline">GitHub Analyzer</span>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <span className="text-gray-400 text-sm sm:text-base hidden sm:inline">Dashboard</span>
            <button 
              onClick={() => navigate('/')}
              className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2"
            >
              <svg className="w-4 h-4 sm:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Profile Section */}
      {profile && (
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 transition-all duration-300 ${selectedRepo ? 'lg:mr-[700px]' : ''}`}>
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
            {/* Mobile Profile Layout */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
              {/* Avatar and Name */}
              <div className="flex items-center gap-4 sm:block">
                <img 
                  src={profile.avatarUrl} 
                  alt={profile.login}
                  className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full border-4 border-gray-700"
                />
                <div className="sm:hidden">
                  <h1 className="text-2xl font-bold text-white">{profile.name || profile.login}</h1>
                  {profile.location && (
                    <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{profile.location}</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Desktop Name and Bio */}
              <div className="flex-1 hidden sm:block">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">{profile.name || profile.login}</h1>
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4 line-clamp-2">{profile.bio || 'Building the future of software, one line of code at a time.'}</p>
                {profile.location && (
                  <div className="flex items-center gap-2 text-gray-300 text-sm sm:text-base">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="flex gap-3 sm:gap-4 lg:gap-6 mt-2 sm:mt-0">
                <div className="text-center bg-gray-700/30 rounded-xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 flex-1 sm:flex-initial">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{profile.followers?.totalCount || 0}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Followers</div>
                </div>
                <div className="text-center bg-gray-700/30 rounded-xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 flex-1 sm:flex-initial">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{profile.following?.totalCount || 0}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Following</div>
                </div>
                <div className="text-center bg-gray-700/30 rounded-xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 flex-1 sm:flex-initial">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">{repositories.length}</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Repos</div>
                </div>
              </div>
            </div>
            
            {/* Mobile Bio */}
            <p className="text-gray-400 text-sm mt-4 sm:hidden line-clamp-2">{profile.bio || 'Building the future of software, one line of code at a time.'}</p>
          </div>

          {/* Repository Timeline */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-6 lg:mb-8">Repository Timeline</h2>
            
            <div className="space-y-4 sm:space-y-6">
              {repositories.map((repo, index) => {
                const year = new Date(repo.createdAt).getFullYear()
                const showYear = index === 0 || new Date(repositories[index - 1].createdAt).getFullYear() !== year
                
                return (
                  <div key={repo.id || repo.name}>
                    {showYear && (
                      <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="bg-blue-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold">
                          {year}
                        </div>
                        <div className="flex-1 h-px bg-gray-700"></div>
                      </div>
                    )}
                    
                    <div className="flex gap-3 sm:gap-6 group">
                      <div className="flex flex-col items-center">
                        <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full group-hover:scale-150 transition-transform ${
                          selectedRepo?.name === repo.name ? 'bg-blue-400 scale-150' : 'bg-blue-500'
                        }`}></div>
                        {index < repositories.length - 1 && (
                          <div className="w-px flex-1 bg-gray-700 mt-2"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 pb-4 sm:pb-8">
                        <RepositoryCard
                          repo={repo}
                          username={username}
                          formatDate={formatDate}
                          onClick={() => setSelectedRepo(repo)}
                          isSelected={selectedRepo?.name === repo.name}
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Repository Detail Sidebar */}
      {/* Overlay for clicking outside sidebar */}
      {selectedRepo && (
        <div 
          className="fixed inset-0 bg-black/40 z-30 lg:bg-black/20 lg:top-[88px]"
          onClick={() => setSelectedRepo(null)}
        />
      )}

      {/* Repository Detail Sidebar */}
      {selectedRepo && (
        <RepositoryDetailSidebar
          repo={selectedRepo}
          username={username}
          onClose={() => setSelectedRepo(null)}
        />
      )}
    </div>
  )
}

export default Dashboard
