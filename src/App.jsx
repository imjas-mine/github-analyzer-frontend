import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-12 max-w-2xl w-full mx-4">
        <div className="flex justify-center gap-8 mb-8">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
            <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
            <img src={reactLogo} className="h-24 w-24 animate-spin-slow" alt="React logo" />
          </a>
        </div>
        
        <h1 className="text-5xl font-bold text-white text-center mb-8">
          GitHub Analyzer Frontend
        </h1>
        
        <p className="text-white/90 text-center mb-6 text-lg">
          React + Vite + Tailwind CSS
        </p>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 mb-6">
          <button 
            onClick={() => setCount((count) => count + 1)}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg transform transition-all hover:scale-105 active:scale-95"
          >
            Count is {count}
          </button>
          <p className="text-white/80 text-center mt-4">
            Edit <code className="bg-black/30 px-2 py-1 rounded">src/App.jsx</code> and save to test HMR
          </p>
        </div>
        
        <p className="text-white/70 text-center text-sm">
          ✨ Tailwind CSS is working! Click the button to test interactivity.
        </p>
      </div>
    </div>
  )
}

export default App

