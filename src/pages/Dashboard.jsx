import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const API_BASE_URL = 'http://localhost:8000/api/v1'

function Dashboard() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [profile, setProfile] = useState(null)
  const [repositories, setRepositories] = useState([])
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
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center">
        <div className="text-red-400 text-xl">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <span className="text-white text-xl font-bold">GitHub Analyzer</span>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="text-gray-400">Dashboard</span>
          <button 
            onClick={() => navigate('/')}
            className="text-gray-300 hover:text-white transition-colors"
          >
            Back to Home
          </button>
        </div>
      </nav>

      {/* Profile Section */}
      {profile && (
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 mb-8">
            <div className="flex items-start gap-6">
              <img 
                src={profile.avatarUrl} 
                alt={profile.login}
                className="w-24 h-24 rounded-full border-4 border-gray-700"
              />
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2">{profile.name || profile.login}</h1>
                <p className="text-gray-400 text-lg mb-4">{profile.bio || 'Building the future of software, one line of code at a time.'}</p>
                {profile.location && (
                  <div className="flex items-center gap-2 text-gray-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{profile.location}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-6">
                <div className="text-center bg-gray-700/30 rounded-xl px-6 py-4">
                  <div className="text-3xl font-bold text-white">{profile.followers?.totalCount || 0}</div>
                  <div className="text-gray-400 text-sm">Followers</div>
                </div>
                <div className="text-center bg-gray-700/30 rounded-xl px-6 py-4">
                  <div className="text-3xl font-bold text-white">{profile.following?.totalCount || 0}</div>
                  <div className="text-gray-400 text-sm">Following</div>
                </div>
                <div className="text-center bg-gray-700/30 rounded-xl px-6 py-4">
                  <div className="text-3xl font-bold text-white">{repositories.length}</div>
                  <div className="text-gray-400 text-sm">Repositories</div>
                </div>
              </div>
            </div>
          </div>

          {/* Repository Timeline */}
          <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8">Repository Timeline</h2>
            
            <div className="space-y-6">
              {repositories.map((repo, index) => {
                const year = new Date(repo.createdAt).getFullYear()
                //showing year heading or not
                const showYear = index === 0 || new Date(repositories[index - 1].createdAt).getFullYear() !== year
                
                return (
                  <div key={repo.id}>
                    {showYear && (
                      <div className="flex items-center gap-4 mb-6">
                        <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold">
                          {year}
                        </div>
                        <div className="flex-1 h-px bg-gray-700"></div>
                      </div>
                    )}
                    
                    <div className="flex gap-6 group">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full group-hover:scale-150 transition-transform"></div>
                        {index < repositories.length - 1 && (
                          <div className="w-px flex-1 bg-gray-700 mt-2"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 pb-8">
                        <div className="bg-gray-800/50 hover:bg-gray-800/70 border border-gray-700/50 rounded-2xl p-6 transition-all cursor-pointer">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                              {repo.name}
                            </h3>
                            <span className="text-gray-400 text-sm">{formatDate(repo.createdAt)}</span>
                          </div>
                          
                          <p className="text-gray-400 mb-4">{repo.description || 'No description provided.'}</p>
                          
                          <div className="flex items-center gap-6 text-sm">
                            {repo.primaryLanguage && (
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: repo.primaryLanguage.color || '#888' }}
                                ></div>
                                <span className="text-gray-300">{repo.primaryLanguage.name}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-gray-300">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              <span>{repo.stargazerCount}</span>
                            </div>
                            {repo.forkCount > 0 && (
                              <div className="flex items-center gap-2 text-gray-300">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm1-17v4h4l-5 6-5-6h4v-4h2z"/>
                                </svg>
                                <span>{repo.forkCount}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
