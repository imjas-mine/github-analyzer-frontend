import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RepositoryCard from '../components/RepositoryCard'
import RepositoryDetailSidebar from '../components/RepositoryDetailSidebar'

const API_BASE_URL = 'http://localhost:8000/api/v1'

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
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center px-4">
        <div className="text-white text-lg sm:text-xl flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          Loading...
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center px-4">
        <div className="text-red-400 text-lg sm:text-xl text-center">Error: {error}</div>
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
