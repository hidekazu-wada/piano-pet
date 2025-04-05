import React, { useState } from 'react'
import { PracticeSession } from '../App'
import './PracticeForm.css'

interface PracticeFormProps {
  onStartPractice: (session: PracticeSession) => void
}

const PracticeForm: React.FC<PracticeFormProps> = ({ onStartPractice }) => {
  const [title, setTitle] = useState('')
  const [targetMinutes, setTargetMinutes] = useState(10)
  
  const predefinedPractices = [
    'ハノン',
    '老いぼれ猫の夢',
    'メヌエット',
    'アリエッタ',
    'ウィンナーワルツ'
  ]
  
  const handlePredefinedSelection = (practice: string) => {
    setTitle(practice)
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (title.trim() === '') {
      alert('練習内容を入力してください')
      return
    }
    
    onStartPractice({
      title: title.trim(),
      targetMinutes
    })
  }
  
  return (
    <div className="practice-form-container">
      <h2>今日の練習計画</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="practice-title">練習内容:</label>
          <input
            id="practice-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例: バイエル25番"
            required
          />
        </div>
        
        <div className="predefined-practices">
          {predefinedPractices.map((practice, index) => (
            <button
              type="button"
              key={index}
              onClick={() => handlePredefinedSelection(practice)}
              className="predefined-practice-btn"
            >
              {practice}
            </button>
          ))}
        </div>
        
        <div className="form-group">
          <label htmlFor="practice-time">目標時間:</label>
          <select
            id="practice-time"
            value={targetMinutes}
            onChange={(e) => setTargetMinutes(Number(e.target.value))}
          >
            <option value="10">10分</option>
            <option value="20">20分</option>
            <option value="30">30分</option>
            <option value="40">40分</option>
            <option value="50">50分</option>
            <option value="60">60分</option>
          </select>
        </div>
        
        <button type="submit" className="start-button">練習開始</button>
      </form>
    </div>
  )
}

export default PracticeForm