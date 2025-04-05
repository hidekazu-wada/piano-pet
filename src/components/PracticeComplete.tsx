import React, { useState } from 'react'
import { PracticeSession } from '../App'
import './PracticeComplete.css'

interface PracticeCompleteProps {
  session: PracticeSession
  onPracticeAgain: () => void
}

const PracticeComplete: React.FC<PracticeCompleteProps> = ({ session, onPracticeAgain }) => {
  const [actualMinutes, setActualMinutes] = useState<number>(session.actualMinutes || session.targetMinutes)
  
  // 練習が完了したときのポイント計算
  const earnedPoints = actualMinutes
  
  return (
    <div className="practice-complete-container">
      <h2>練習おつかれさま！</h2>
      
      <div className="practice-summary">
        <p><strong>練習内容:</strong> {session.title}</p>
        <p><strong>目標時間:</strong> {session.targetMinutes}分</p>
        <p><strong>実際の練習時間:</strong> {actualMinutes}分</p>
        <p className="earned-points"><strong>獲得ポイント:</strong> {earnedPoints}ポイント</p>
      </div>
      
      <div className="action-buttons">
        <button onClick={onPracticeAgain} className="practice-again-button">もう一度練習する</button>
      </div>
    </div>
  )
}

export default PracticeComplete