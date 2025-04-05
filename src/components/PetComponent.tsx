import React from 'react'
import './PetComponent.css'

interface PetComponentProps {
  level: number
  points: number
  totalMinutes: number
}

const PetComponent: React.FC<PetComponentProps> = ({ level, points, totalMinutes }) => {
  // 簡単なペットの表示を実装
  // レベルに応じてペットの見た目が変化する
  
  // レベルに応じて特徴を変更
  const petSize = 100 + (level * 10) // レベルが上がると大きくなる
  const petColor = level <= 2 ? '#8bc34a' : level <= 4 ? '#26a69a' : '#5c6bc0' // レベルに応じて色が変化
  
  // レベルに応じて特徴を追加
  const showSpots = level >= 3
  const showBow = level >= 5
  
  // レベルアップの進捗計算
  const minutesForNextLevel = (level) * 60
  const minutesInCurrentLevel = totalMinutes - ((level - 1) * 60)
  const progressPercent = (minutesInCurrentLevel / 60) * 100

  return (
    <div className="pet-wrapper">
      {/* 基本のペットの形 */}
      <div 
        className="pet" 
        style={{ 
          width: `${petSize}px`, 
          height: `${petSize}px`,
          backgroundColor: petColor 
        }}
      >
        {/* 目 */}
        <div className="eyes">
          <div className="eye"></div>
          <div className="eye"></div>
        </div>
        
        {/* 口 */}
        <div className="mouth"></div>
        
        {/* レベル3以上で表示される模様 */}
        {showSpots && (
          <div className="spots">
            <div className="spot"></div>
            <div className="spot"></div>
            <div className="spot"></div>
          </div>
        )}
        
        {/* レベル5以上で表示されるリボン */}
        {showBow && <div className="bow"></div>}
      </div>
      
      {/* レベルアップ進捗バー */}
      <div className="level-progress-container">
        <div className="level-progress-bar" style={{ width: `${progressPercent}%` }}></div>
        <span className="level-progress-text">
          次のレベルまで: {minutesForNextLevel - minutesInCurrentLevel}分
        </span>
      </div>
      
      <div className="pet-dialog">
        {level === 1 && (
          <p>よろしくね♪ 一緒にピアノ頂張ろう！</p>
        )}
        {level === 2 && (
          <p>あなたの練習で大きくなってるよ！</p>
        )}
        {level === 3 && (
          <p>模様が出てきたね！続けて頂張ろう♪</p>
        )}
        {level === 4 && (
          <p>もう少しで特別なものが着くよ！</p>
        )}
        {level >= 5 && (
          <p>素敵なリボンが付いたよ！ありがとう！</p>
        )}
      </div>
    </div>
  )
}

export default PetComponent