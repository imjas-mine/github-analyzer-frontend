import { useNavigate } from 'react-router-dom'

function HowItWorks() {
    const navigate = useNavigate()

    const steps = [
        {
            number: "01",
            title: "Enter Username",
            description: "Simply type any GitHub username into the search bar on the homepage. It works with any public GitHub profile.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            gradient: "from-blue-500 to-cyan-400",
        },
        {
            number: "02",
            title: "Fetch Data",
            description: "We connect to GitHub's GraphQL API to fetch all your repositories, contributions, and profile information in real-time.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
            ),
            gradient: "from-purple-500 to-pink-400",
        },
        {
            number: "03",
            title: "AI Analysis",
            description: "Our AI scans your repositories to detect frameworks, technologies, and generates meaningful descriptions for each project.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            ),
            gradient: "from-amber-500 to-orange-400",
        },
        {
            number: "04",
            title: "Visualize",
            description: "Explore your coding journey through beautiful 3D graphs, interactive timelines, and detailed repository cards.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            gradient: "from-green-500 to-emerald-400",
        },
    ]

    const technologies = [
        { name: "React", description: "Frontend framework", icon: "⚛️" },
        { name: "Three.js", description: "3D graphics", icon: "🎮" },
        { name: "FastAPI", description: "Python backend", icon: "⚡" },
        { name: "GraphQL", description: "GitHub API", icon: "📊" },
        { name: "Redis", description: "Caching layer", icon: "🔴" },
        { name: "OpenAI", description: "AI analysis", icon: "🤖" },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]">
            {/* Navigation */}
            <nav className="sticky top-0 z-50 bg-[#0f172a]/95 backdrop-blur-md border-b border-gray-800">
                <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 sm:py-6 max-w-7xl mx-auto">
                    <div
                        className="flex items-center gap-2 sm:gap-3 cursor-pointer"
                        onClick={() => navigate('/')}
                    >
                        <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </div>
                        <span className="text-white text-lg sm:text-xl font-bold">GitHub Analyzer</span>
                    </div>

                    <button
                        onClick={() => navigate('/')}
                        className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12">
                <div className="text-center mb-16 sm:mb-20">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-6">
                        <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-purple-300 text-sm font-medium">Simple Process</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
                        <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
                            How It Works
                        </span>
                    </h1>

                    <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
                        From username to insights in seconds. Here's the magic behind GitHub Analyzer.
                    </p>
                </div>

                {/* Steps Timeline */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical line */}
                    <div className="absolute left-8 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-green-500 hidden sm:block"></div>

                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`relative flex items-start gap-6 sm:gap-12 mb-12 sm:mb-16 ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                                }`}
                        >
                            {/* Content */}
                            <div className={`flex-1 ${index % 2 === 0 ? 'sm:text-right' : 'sm:text-left'}`}>
                                <div className={`bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 ${index % 2 === 0 ? 'sm:mr-8' : 'sm:ml-8'
                                    }`}>
                                    <div className={`inline-flex items-center gap-3 mb-4 ${index % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}>
                                        <span className={`text-5xl sm:text-6xl font-black bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent opacity-50`}>
                                            {step.number}
                                        </span>
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white`}>
                                            {step.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Center dot */}
                            <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-[#0f172a]"></div>

                            {/* Spacer for alternating layout */}
                            <div className="hidden sm:block flex-1"></div>
                        </div>
                    ))}
                </div>

                {/* Tech Stack Section */}
                <div className="mt-20 sm:mt-28">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Built using Modern Tech
                        </h2>
                        <p className="text-gray-400 text-lg max-w-xl mx-auto">
                            Built with cutting-edge technologies for speed, reliability, and beautiful visuals.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {technologies.map((tech, index) => (
                            <div
                                key={index}
                                className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 text-center hover:border-gray-600/50 transition-all hover:transform hover:-translate-y-1"
                            >
                                <div className="text-3xl mb-2">{tech.icon}</div>
                                <div className="text-white font-semibold text-sm">{tech.name}</div>
                                <div className="text-gray-500 text-xs">{tech.description}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-20 sm:mt-28 text-center">
                    <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10 border border-gray-700/50 rounded-3xl p-8 sm:p-12 lg:p-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                            Ready to Try It?
                        </h2>
                        <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
                            It takes less than 10 seconds. Enter a username and watch the magic happen.
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-8 py-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/30"
                        >
                            Try It Now
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-gray-800 mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                            </div>
                            <span className="text-gray-400 text-sm">GitHub Analyzer</span>
                        </div>
                        <p className="text-gray-500 text-sm">
                            Built with ❤️ by Jasmine
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default HowItWorks
