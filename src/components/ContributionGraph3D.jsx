import { useEffect, useState, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Html } from '@react-three/drei'
import * as THREE from 'three'

const API_BASE_URL = 'http://127.0.0.1:8000/api/v1'

// Single contribution bar component
function ContributionBar({ position, height, color, date, count, onHover }) {
    const meshRef = useRef()
    const [hovered, setHovered] = useState(false)

    useFrame(() => {
        if (meshRef.current) {
            // Subtle floating animation
            meshRef.current.position.y = position[1] + height / 2 + Math.sin(Date.now() * 0.001 + position[0] + position[2]) * 0.02
        }
    })

    return (
        <mesh
            ref={meshRef}
            position={[position[0], position[1] + height / 2, position[2]]}
            onPointerOver={(e) => {
                e.stopPropagation()
                setHovered(true)
                onHover({ date, count, position: e.point })
            }}
            onPointerOut={() => {
                setHovered(false)
                onHover(null)
            }}
        >
            <boxGeometry args={[0.8, height, 0.8]} />
            <meshStandardMaterial
                color={hovered ? '#60a5fa' : color}
                emissive={hovered ? '#3b82f6' : '#000000'}
                emissiveIntensity={hovered ? 0.3 : 0}
                metalness={0.1}
                roughness={0.3}
            />
        </mesh>
    )
}

// Grid floor
function GridFloor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[26, -0.1, 3]}>
            <planeGeometry args={[60, 12]} />
            <meshStandardMaterial color="#1e293b" transparent opacity={0.5} />
        </mesh>
    )
}

// Week labels (months)
function MonthLabels({ weeks }) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const labels = []
    let lastMonth = -1

    weeks.forEach((week, weekIndex) => {
        if (week.contributionDays && week.contributionDays.length > 0) {
            const date = new Date(week.contributionDays[0].date)
            const month = date.getMonth()
            if (month !== lastMonth) {
                labels.push({ month: months[month], weekIndex })
                lastMonth = month
            }
        }
    })

    return (
        <>
            {labels.map((label, i) => (
                <Text
                    key={i}
                    position={[label.weekIndex, -0.5, -1.5]}
                    fontSize={0.6}
                    color="#94a3b8"
                    anchorX="center"
                >
                    {label.month}
                </Text>
            ))}
        </>
    )
}

// Day labels
function DayLabels() {
    const days = ['Sun', '', 'Tue', '', 'Thu', '', 'Sat']

    return (
        <>
            {days.map((day, i) => (
                day && (
                    <Text
                        key={i}
                        position={[-2.5, 0, i]}
                        fontSize={0.5}
                        color="#64748b"
                        anchorX="right"
                    >
                        {day}
                    </Text>
                )
            ))}
        </>
    )
}

// Tooltip component
function Tooltip({ data }) {
    if (!data) return null

    return (
        <Html position={[data.position.x, data.position.y + 1.5, data.position.z]}>
            <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-2 text-sm whitespace-nowrap shadow-xl">
                <div className="text-white font-semibold">{data.count} contributions</div>
                <div className="text-gray-400">{new Date(data.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })}</div>
            </div>
        </Html>
    )
}

// Main 3D scene
function ContributionScene({ weeks, maxCount }) {
    const [hoveredBar, setHoveredBar] = useState(null)
    const groupRef = useRef()

    // Rotate the scene slowly
    useFrame(() => {
        if (groupRef.current) {
            // groupRef.current.rotation.y += 0.001
        }
    })

    // Color interpolation based on contribution count
    const getColor = (count) => {
        if (count === 0) return '#161b22'
        const intensity = Math.min(count / Math.max(maxCount * 0.5, 1), 1)

        // Green gradient like GitHub
        if (intensity < 0.25) return '#0e4429'
        if (intensity < 0.5) return '#006d32'
        if (intensity < 0.75) return '#26a641'
        return '#39d353'
    }

    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 20, 10]} intensity={0.8} />
            <pointLight position={[-10, 10, -10]} intensity={0.3} color="#60a5fa" />

            {/* Camera controls */}
            <OrbitControls
                enableDamping
                dampingFactor={0.05}
                minDistance={15}
                maxDistance={80}
                maxPolarAngle={Math.PI / 2.2}
                target={[26, 1, 3]}
            />

            <group ref={groupRef}>
                <GridFloor />
                <MonthLabels weeks={weeks} />
                <DayLabels />

                {/* Contribution bars */}
                {weeks.map((week, weekIndex) =>
                    week.contributionDays?.map((day, dayIndex) => {
                        const height = day.contributionCount === 0 ? 0.1 : Math.max(day.contributionCount * 0.3, 0.2)

                        return (
                            <ContributionBar
                                key={`${weekIndex}-${dayIndex}`}
                                position={[weekIndex, 0, dayIndex]}
                                height={height}
                                color={getColor(day.contributionCount)}
                                date={day.date}
                                count={day.contributionCount}
                                onHover={setHoveredBar}
                            />
                        )
                    })
                )}

                {hoveredBar && <Tooltip data={hoveredBar} />}
            </group>
        </>
    )
}

// Loading animation
function LoadingScene() {
    const boxRef = useRef()

    useFrame((state) => {
        if (boxRef.current) {
            boxRef.current.rotation.x = state.clock.elapsedTime
            boxRef.current.rotation.y = state.clock.elapsedTime * 0.5
        }
    })

    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <mesh ref={boxRef}>
                <boxGeometry args={[2, 2, 2]} />
                <meshStandardMaterial color="#3b82f6" wireframe />
            </mesh>
        </>
    )
}

// Main component
function ContributionGraph3D({ username }) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [availableYears, setAvailableYears] = useState([])

    // Cache to store fetched year data - persists across re-renders
    const yearCacheRef = useRef({})

    // Fetch data when username or year changes
    useEffect(() => {
        const fetchData = async () => {
            if (!username) return

            setError(null)

            // Check if data is already cached for this year
            const cacheKey = `${username}-${selectedYear}`
            if (yearCacheRef.current[cacheKey]) {
                console.log(`Loading year ${selectedYear} from cache`)
                setData(yearCacheRef.current[cacheKey])
                setLoading(false)
                return
            }

            setLoading(true)

            try {
                const response = await fetch(
                    `${API_BASE_URL}/users/${username}/contribution-calendar?year=${selectedYear}`
                )
                if (!response.ok) throw new Error('Failed to fetch contribution data')

                const result = await response.json()

                // Store in cache
                yearCacheRef.current[cacheKey] = result
                console.log(`Cached year ${selectedYear} data`)

                setData(result)

                // Calculate available years from account creation year to current year
                if (result.accountCreatedYear && availableYears.length === 0) {
                    const currentYear = new Date().getFullYear()
                    const years = []
                    for (let y = currentYear; y >= result.accountCreatedYear; y--) {
                        years.push(y)
                    }
                    setAvailableYears(years)
                }
            } catch (err) {
                setError(err.message)
                console.error('Error fetching contribution calendar:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [username, selectedYear])

    // Calculate max contribution count for scaling
    const maxCount = useMemo(() => {
        if (!data?.weeks) return 10
        let max = 0
        data.weeks.forEach(week => {
            week.contributionDays?.forEach(day => {
                if (day.contributionCount > max) max = day.contributionCount
            })
        })
        return max || 10
    }, [data])

    return (
        <div className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl sm:rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-700/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-3">
                            <span className="bg-gradient-to-r from-green-500 to-emerald-400 bg-clip-text text-transparent">
                                3D Contribution Graph
                            </span>
                            <span className="text-xs sm:text-sm font-normal text-gray-400 bg-gray-700/50 px-2 py-1 rounded-full">
                                Interactive
                            </span>
                        </h2>
                        {data && (
                            <p className="text-gray-400 text-sm mt-1">
                                {data.totalContributions} contributions in {selectedYear}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Year Selector */}
                        {availableYears.length > 0 && (
                            <div className="flex items-center gap-2">
                                <label className="text-gray-400 text-sm">Year:</label>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                    className="bg-gray-700/50 border border-gray-600 text-white text-sm rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer hover:bg-gray-600/50 transition-colors"
                                    disabled={loading}
                                >
                                    {availableYears.map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {/* Legend */}
                        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
                            <span>Less</span>
                            <div className="flex gap-1">
                                {['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'].map((color, i) => (
                                    <div
                                        key={i}
                                        className="w-3 h-3 rounded-sm"
                                        style={{ backgroundColor: color }}
                                    />
                                ))}
                            </div>
                            <span>More</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3D Canvas */}
            <div className="h-[400px] sm:h-[500px] relative">
                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80">
                        <div className="text-center">
                            <div className="text-red-400 mb-2">Failed to load contribution data</div>
                            <div className="text-gray-500 text-sm">{error}</div>
                        </div>
                    </div>
                )}

                <Canvas
                    camera={{ position: [30, 20, 25], fov: 50 }}
                    style={{ background: 'linear-gradient(to bottom, #0f172a, #1e293b)' }}
                >
                    {loading ? (
                        <LoadingScene />
                    ) : data?.weeks ? (
                        <ContributionScene weeks={data.weeks} maxCount={maxCount} />
                    ) : null}
                </Canvas>

                {/* Instructions overlay */}
                <div className="absolute bottom-4 left-4 text-xs text-gray-500 bg-gray-900/70 px-3 py-2 rounded-lg backdrop-blur-sm">
                    <span className="text-gray-400">🖱️ Drag</span> to rotate •
                    <span className="text-gray-400"> Scroll</span> to zoom •
                    <span className="text-gray-400"> Hover</span> for details
                </div>
            </div>
        </div>
    )
}

export default ContributionGraph3D
