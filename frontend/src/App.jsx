import './App.css'
import HomePage from './Pages/HomePage'
import DarkModeToggle from './components/DarkModeToggle.jsx'
function App() {
  return (
    <div className="text-gray-700  dark:text-zinc-200 bg-white dark:bg-[#101010]">
      <div className="absolute right-4 top-5">
        <DarkModeToggle/>
      </div>
    <HomePage/>
    </div>
  )
}

export default App
