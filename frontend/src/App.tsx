import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary">Clean Architecture To-Do</h1>
        <p className="text-textMuted mt-4">Coming soon...</p>
      </div>
    </div>
  )
}

export default App

