function RepositoryCard({ repo, username, formatDate, onClick, isSelected }) {
  return (
    <div 
      onClick={onClick}

      className={`bg-gray-800/50 hover:bg-gray-800/70 border rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all cursor-pointer overflow-hidden ${
        isSelected 
          ? 'border-blue-500/50 bg-gray-800/70' 
          : 'border-gray-700/50'
      }`}
    >
      {/* Header Row */}
      <div className="flex flex-col gap-2 sm:gap-3 mb-2 sm:mb-3">
        {/* Title and Date Row */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white group-hover:text-blue-400 transition-colors truncate flex-1 min-w-0">
            {repo.name}
          </h3>
          <span className="text-gray-400 text-xs sm:text-sm whitespace-nowrap flex-shrink-0">{formatDate(repo.createdAt)}</span>
        </div>
        
        {/* Badges Row */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Owner Badge */}
          {repo.owner && repo.owner.login.toLowerCase() === username.toLowerCase() && (
            <span className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border border-yellow-500/30 text-yellow-400 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Owner
            </span>
          )}
          {/* Contribution Badge */}
          {repo.mentionableUsers && repo.mentionableUsers.totalCount > 1 && (
            <span className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Team
            </span>
          )}
        </div>
      </div>
      
      <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-2">{repo.description || 'No description provided.'}</p>
      
      {/* Stats Row */}
      <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm flex-wrap">
        {repo.primaryLanguage && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <div 
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" 
              style={{ backgroundColor: repo.primaryLanguage.color || '#888' }}
            ></div>
            <span className="text-gray-300">{repo.primaryLanguage.name}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 sm:gap-2 text-gray-300">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span>{repo.stargazerCount}</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2 text-gray-300">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
          </svg>
          <span>{repo.forkCount}</span>
        </div>
      </div>
    </div>
  )
}

export default RepositoryCard
