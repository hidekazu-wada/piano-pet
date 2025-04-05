import { useState } from 'react'
import PetComponent from './components/PetComponent'
import PracticeForm from './components/PracticeForm'
import PracticeComplete from './components/PracticeComplete'
import './App.css'

type PracticeStatus = 'planning' | 'practicing' | 'completed'

export interface PracticeSession {
  title: string
  targetMinutes: number
  actualMinutes?: number
}

function App() {
  const [level, setLevel] = useState<number>(1)
  const [points, setPoints] = useState<number>(0)
  const [totalPracticeMinutes, setTotalPracticeMinutes] = useState<number>(0)
  const [practiceStatus, setPracticeStatus] = useState<PracticeStatus>('planning')
  const [currentSession, setCurrentSession] = useState<PracticeSession>({ 
    title: '',
    targetMinutes: 10
  })

  const startPractice = (session: PracticeSession) => {
    setCurrentSession(session)
    setPracticeStatus('practicing')
  }

  const completePractice = (actualMinutes: number) => {
    // Update points and total practice time
    const earnedPoints = actualMinutes
    setPoints(prev => prev + earnedPoints)
    setTotalPracticeMinutes(prev => prev + actualMinutes)
    
    // Check if level up is needed (every 60 minutes of practice)
    const newTotalMinutes = totalPracticeMinutes + actualMinutes
    const newLevel = Math.floor(newTotalMinutes / 60) + 1
    if (newLevel > level) {
      setLevel(newLevel)
    }
    
    // Update current session and status
    setCurrentSession(prev => ({ ...prev, actualMinutes }))
    setPracticeStatus('completed')
  }

  const resetSession = () => {
    setCurrentSession({ title: '', targetMinutes: 10 })
    setPracticeStatus('planning')
  }

  return (
    <div className="container">
      <h1>ピアノペット</h1>
      
      <div className="pet-container">
        <PetComponent level={level} points={points} totalMinutes={totalPracticeMinutes} />
      </div>

      <div className="stats">
        <p>レベル: {level}</p>
        <p>ポイント: {points}</p>
        <p>累計練習時間: {totalPracticeMinutes} 分</p>
      </div>

      <div className="practice-container">
        {practiceStatus === 'planning' && (
          <PracticeForm onStartPractice={startPractice} />
        )}
        
        {practiceStatus === 'practicing' && (
          <div className="practicing">
            <h2>練習中...</h2>
            <p>練習内容: {currentSession.title}</p>
            <p>目標時間: {currentSession.targetMinutes} 分</p>
            <button onClick={() => completePractice(currentSession.targetMinutes)}>練習完了</button>
          </div>
        )}
        
        {practiceStatus === 'completed' && (
          <PracticeComplete 
            session={currentSession} 
            onPracticeAgain={resetSession} 
          />
        )}
      </div>
    </div>
  )
}

export default App
