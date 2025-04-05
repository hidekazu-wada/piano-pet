import React from 'react'
import './PetComponent.css'
import { getPetConfigForLevel } from '../config/petConfig'

interface PetComponentProps {
  level: number
  points: number
  totalMinutes: number
}

const PetComponent: React.FC<PetComponentProps> = ({ level, points, totalMinutes }) => {
  // 設定ファイルから現在のレベルに対応するペット情報を取得
  const petConfig = getPetConfigForLevel(level)
  
  // レベルアップの進捗計算
  const minutesPerLevel = 60 // 1レベルに必要な練習時間（分）
  const minutesInCurrentLevel = totalMinutes - ((level - 1) * minutesPerLevel)
  const progressPercent = Math.min((minutesInCurrentLevel / minutesPerLevel) * 100, 100)
  const remainingMinutes = minutesPerLevel - minutesInCurrentLevel

  // ペットのサイズ計算（レベルに応じて大きくなる）
  const petSize = 100 + (level * 5)

  return (
    <div className="pet-wrapper">
      {/* ペット画像 */}
      <div className="pet-image-container" style={{ width: `${petSize}px`, height: `${petSize}px` }}>
        <img 
          src={petConfig.imagePath} 
          alt={`レベル${level}のペット`} 
          className="pet-image"
          onError={(e) => {
            // 画像読み込みエラー時のフォールバック処理
            e.currentTarget.src = '/images/pets/pet-default.png';
          }}
        />
      </div>
      
      {/* レベルアップ進捗バー */}
      <div className="level-progress-container">
        <div className="level-progress-bar" style={{ width: `${progressPercent}%` }}></div>
        <span className="level-progress-text">
          次のレベルまで: あと{remainingMinutes}分
        </span>
      </div>
      
      {/* ポイントの説明 */}
      <div className="points-info">
        <span>ポイント: {points}</span>
        <span className="points-hint">※ポイントを貯めるとペットが成長します</span>
      </div>
      
      {/* ペットの台詞 - 設定ファイルから取得 */}
      <div className="pet-dialog">
        <p>{petConfig.message}</p>
      </div>
    </div>
  )
}

export default PetComponent