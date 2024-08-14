import { Button } from '@/components/ui'
import { useEffect, useState } from 'react'
import AddExperienceModal from './AddExperienceModal'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleChangeTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme', newTheme)
    setTheme(newTheme)
  }

  function handleOpen() {
    setIsOpen(true)
  }

  return (
    <div className="bg-blak w-full h-screen">
      <div className="flex gap-2 w-1/3 h-full items-center justify-center mx-auto">
        <Button buttonType="primary" onClick={handleChangeTheme}>
          Change theme: {theme}
        </Button>
        <Button buttonType="primary" onClick={handleOpen}>
          Open modal
        </Button>
      </div>
      <AddExperienceModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  )
}

export default App
