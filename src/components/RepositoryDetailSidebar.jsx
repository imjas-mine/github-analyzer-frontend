import { useEffect, useState } from 'react'

const API_BASE_URL = 'http://localhost:8000/api/v1'

function RepositoryDetailSidebar({ repo, username, onClose }) {
  const [repoDetails, setRepoDetails] = useState(null)
  const [analysis, setAnalysis] = useState(null)
  const [contributionAnalysis, setContributionAnalysis] = useState(null)
  const [loadingDetails, setLoadingDetails] = useState(true)
  const [loadingAnalysis, setLoadingAnalysis] = useState(true)
  const [loadingContributionAnalysis, setLoadingContributionAnalysis] = useState(false)
  const [detailsError, setDetailsError] = useState(null)

  // Check if this is a multi-contributor repo (has more than 1 contributor)
  const isMultiContributorRepo = repo.mentionableUsers && repo.mentionableUsers.totalCount > 1

  useEffect(() => {
    if (repo) {
      fetchData()
    }
  }, [repo])

  const fetchData = async () => {
    const [owner, name] = repo.nameWithOwner.split('/')
    console.log("owner is", owner)
    console.log("name is", name)
    
    // Fetch repository details first
    setLoadingDetails(true)
    setDetailsError(null)
    try {
      const detailsResponse = await fetch(
        `${API_BASE_URL}/users/${username}/repositories/${owner}/${name}`
      )
      if (!detailsResponse.ok) throw new Error('Failed to fetch repository details')
      const detailsData = await detailsResponse.json()
      setRepoDetails(detailsData)
    } catch (err) {
      setDetailsError(err.message)
      console.error('Error fetching repository details:', err)
    } finally {
      setLoadingDetails(false)
    }

    // Fetch AI analysis separately (can take longer)
    setLoadingAnalysis(true)
    try {
      const analysisResponse = await fetch(
        `${API_BASE_URL}/analyze/${owner}/${name}?username=${username}`
      )
      if (!analysisResponse.ok) throw new Error('Failed to fetch AI analysis')
      const analysisData = await analysisResponse.json()
      console.log("Analysis response:", analysisData)
      console.log("technologies:", analysisData.technologies)
      console.log("description:", analysisData.description)
      setAnalysis(analysisData)
    } catch (err) {
      console.error('Error fetching AI analysis:', err)
    } finally {
      setLoadingAnalysis(false)
    }

    // Fetch contribution analysis for multi-contributor repos
    if (repo.mentionableUsers && repo.mentionableUsers.totalCount > 1) {
      setLoadingContributionAnalysis(true)
      setContributionAnalysis(null)
      try {
        const contributionResponse = await fetch(
          `${API_BASE_URL}/analyze/${owner}/${name}/contributions/${username}`
        )
        if (!contributionResponse.ok) throw new Error('Failed to fetch contribution analysis')
        const contributionData = await contributionResponse.json()
        console.log("Contribution analysis response:", contributionData)
        setContributionAnalysis(contributionData)
        console.log("Contribution analysis:", contributionData)
      } catch (err) {
        console.error('Error fetching contribution analysis:', err)
      } finally {
        setLoadingContributionAnalysis(false)
      }
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="fixed top-[88px] right-0 bottom-0 w-full md:w-[550px] lg:w-[600px] bg-gradient-to-b from-gray-900 via-gray-900 to-[#0f172a] border-l border-gray-700/50 z-40 flex flex-col">
      {/* Header - Sticky with gradient */}
      <div className="flex-shrink-0 bg-gradient-to-r from-gray-900 via-gray-800/80 to-gray-900 border-b border-gray-700/50 p-6">
        {/* Close button and title row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold text-white truncate">{repo.name}</h1>
            <a 
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              {repo.nameWithOwner}
            </a>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-gray-700/50 rounded-xl transition-all hover:scale-110"
          >
            <svg className="w-5 h-5 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Stats Row - Stars, Forks, Languages */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Stars */}
          <div className="flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 px-3 py-1.5 rounded-full">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-yellow-400 font-semibold">{repo.stargazerCount}</span>
            <span className="text-gray-500 text-sm">stars</span>
          </div>

          {/* Forks */}
          <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full">
            <svg className="w-4 h-4 text-blue-400" viewBox="0 0 16 16" fill="currentColor">
              <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
            </svg>
            <span className="text-blue-400 font-semibold">{repo.forkCount}</span>
            <span className="text-gray-500 text-sm">forks</span>
          </div>

          {/* Primary Language */}
          {repo.primaryLanguage && (
            <div className="flex items-center gap-2 bg-gray-700/30 border border-gray-600/30 px-3 py-1.5 rounded-full">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: repo.primaryLanguage.color || '#888' }}
              ></div>
              <span className="text-gray-300 font-medium">{repo.primaryLanguage.name}</span>
            </div>
          )}

          {/* Badges */}
          {repo.owner && repo.owner.login.toLowerCase() === username.toLowerCase() && (
            <span className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 text-yellow-400 px-3 py-1.5 rounded-full text-xs font-semibold">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Owner
            </span>
          )}
          {repo.mentionableUsers && repo.mentionableUsers.totalCount > 1 && (
            <span className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-400 px-3 py-1.5 rounded-full text-xs font-semibold">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Team
            </span>
          )}
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {/* Description Card */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/30">
          <p className="text-gray-300 leading-relaxed">
            {repo.description || 'No description provided.'}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 rounded-xl text-white font-medium transition-all hover:scale-[1.02]"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View Repo
          </a>
          <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-xl text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">{formatDate(repo.createdAt)}</span>
          </div>
        </div>

        {/* Tech Stack Section */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/30">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            Tech Stack
          </h3>
          
          {loadingAnalysis ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-gray-400">Detecting technologies...</span>
            </div>
          ) : analysis && analysis.technologies && analysis.technologies.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {analysis.technologies.map((tech, index) => (
                <span 
                  key={index}
                  className="px-3 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 text-blue-300 rounded-xl text-sm font-medium hover:border-blue-400/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No technologies detected</p>
          )}
        </div>

        {/* AI Generated Summary */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/30">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            AI Summary
          </h3>
          
          {loadingAnalysis ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-400">Generating AI summary...</span>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700/50 rounded-lg animate-pulse w-full"></div>
                <div className="h-4 bg-gray-700/50 rounded-lg animate-pulse w-5/6"></div>
                <div className="h-4 bg-gray-700/50 rounded-lg animate-pulse w-4/6"></div>
              </div>
            </div>
          ) : analysis && analysis.description ? (
            <p className="text-gray-300 leading-relaxed">{analysis.description}</p>
          ) : (
            <p className="text-gray-500 text-sm">No AI summary available</p>
          )}
        </div>

        {/* Your Contribution Section - For multi-contributor repos */}
        {isMultiContributorRepo && (
          <div className="bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-5 border border-indigo-500/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              {username}'s Contribution
              <span className="ml-auto text-xs text-indigo-400 font-normal">AI Analysis</span>
            </h3>
            
            {loadingContributionAnalysis ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-gray-400">Analyzing your contributions...</span>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-indigo-700/30 rounded-lg animate-pulse w-full"></div>
                  <div className="h-4 bg-indigo-700/30 rounded-lg animate-pulse w-5/6"></div>
                  <div className="h-4 bg-indigo-700/30 rounded-lg animate-pulse w-4/6"></div>
                </div>
              </div>
            ) : contributionAnalysis ? (
              <div className="space-y-4">
                {/* Contribution Stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-white">
                      {contributionAnalysis.contribution_stats?.commits || 0}
                    </div>
                    <div className="text-xs text-gray-400">Commits</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-white">
                      {contributionAnalysis.contribution_stats?.pull_requests || 0}
                    </div>
                    <div className="text-xs text-gray-400">PRs</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-xl p-3 text-center">
                    <div className="text-2xl font-bold text-white">
                      {contributionAnalysis.contribution_stats?.issues || 0}
                    </div>
                    <div className="text-xs text-gray-400">Issues</div>
                  </div>
                </div>

                {/* Impact Level Badge */}
                {contributionAnalysis.ai_analysis?.impact_level && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-sm">Impact Level:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      contributionAnalysis.ai_analysis.impact_level.toLowerCase() === 'high' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : contributionAnalysis.ai_analysis.impact_level.toLowerCase() === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {contributionAnalysis.ai_analysis.impact_level}
                    </span>
                  </div>
                )}

                {/* Role Summary - Combined field from AI */}
                {contributionAnalysis.ai_analysis?.role_summary && (
                  <div>
                    <span className="text-gray-400 text-sm block mb-2">Role Summary</span>
                    <p className="text-gray-300 leading-relaxed text-sm bg-gray-800/40 rounded-xl p-3">
                      {contributionAnalysis.ai_analysis.role_summary}
                    </p>
                  </div>
                )}

                {/* Key Contributions */}
                {contributionAnalysis.ai_analysis?.key_contributions && 
                 contributionAnalysis.ai_analysis.key_contributions.length > 0 && (
                  <div>
                    <span className="text-gray-400 text-sm block mb-2">Key Contributions</span>
                    <ul className="space-y-2">
                      {contributionAnalysis.ai_analysis.key_contributions.map((contribution, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                          <svg className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {contribution}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Skills Demonstrated */}
                {contributionAnalysis.ai_analysis?.skills_demonstrated && 
                 contributionAnalysis.ai_analysis.skills_demonstrated.length > 0 && (
                  <div>
                    <span className="text-gray-400 text-sm block mb-2">Skills Demonstrated</span>
                    <div className="flex flex-wrap gap-2">
                      {contributionAnalysis.ai_analysis.skills_demonstrated.map((skill, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-lg text-xs font-medium border border-indigo-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Unable to analyze contributions for this repository.</p>
            )}
          </div>
        )}

        {/* README Section */}
        <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/30">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            README.md
          </h3>
          
          {loadingDetails ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-400">Loading README...</span>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-700/50 rounded-lg animate-pulse w-full"></div>
                <div className="h-4 bg-gray-700/50 rounded-lg animate-pulse w-3/4"></div>
              </div>
            </div>
          ) : detailsError ? (
            <p className="text-red-400 text-sm">{detailsError}</p>
          ) : repoDetails && repoDetails.readme ? (
            <div className="bg-gray-900/50 rounded-xl p-4 max-h-80 overflow-y-auto">
              <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                {repoDetails.readme.text}
              </pre>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No README file found</p>
          )}
        </div>

        {/* Additional Details */}
        {repoDetails && (
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-5 border border-gray-700/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              Details
            </h3>
            
            <div className="space-y-4">
              {/* Languages */}
              {repoDetails.languages && repoDetails.languages.edges && repoDetails.languages.edges.length > 0 && (
                <div>
                  <span className="text-gray-500 text-sm block mb-2">Languages</span>
                  <div className="flex flex-wrap gap-2">
                    {repoDetails.languages.edges.map((edge, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-lg text-sm">
                        {edge.node.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Topics */}
              {repoDetails.repositoryTopics && repoDetails.repositoryTopics.nodes && repoDetails.repositoryTopics.nodes.length > 0 && (
                <div>
                  <span className="text-gray-500 text-sm block mb-2">Topics</span>
                  <div className="flex flex-wrap gap-2">
                    {repoDetails.repositoryTopics.nodes.map((node, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm">
                        {node.topic.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                {repoDetails.watchers && (
                  <div>
                    <span className="text-gray-500 text-sm block">Watchers</span>
                    <span className="text-white font-medium">{repoDetails.watchers.totalCount}</span>
                  </div>
                )}
                {repoDetails.defaultBranchRef && (
                  <div>
                    <span className="text-gray-500 text-sm block">Default Branch</span>
                    <span className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-sm font-mono">
                      {repoDetails.defaultBranchRef.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RepositoryDetailSidebar
