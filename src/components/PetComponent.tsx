import React, { useState } from 'react'
import './PetComponent.css'
import { getPetConfigForLevel } from '../config/petConfig'

interface PetComponentProps {
  level: number
  points: number
  totalMinutes: number
}

const PetComponent: React.FC<PetComponentProps> = ({ level, points, totalMinutes }) => {
  // モーダル表示状態を管理
  const [showModal, setShowModal] = useState<boolean>(false)
  
  // 設定ファイルから現在のレベルに対応するペット情報を取得
  const petConfig = getPetConfigForLevel(level)
  
  // レベルアップの進捗計算
  const minutesPerLevel = 60 // 1レベルに必要な練習時間（分）
  const minutesInCurrentLevel = totalMinutes - ((level - 1) * minutesPerLevel)
  const progressPercent = Math.min((minutesInCurrentLevel / minutesPerLevel) * 100, 100)
  const remainingMinutes = minutesPerLevel - minutesInCurrentLevel

  // ペットのサイズ計算（レベルに応じて大きくなる）
  const petSize = 100 + (level * 5)
  
  // モーダルの開閉処理
  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <div className="pet-wrapper">
      {/* ペット画像 */}
      <div 
        className="pet-image-container" 
        style={{ width: `${petSize}px`, height: `${petSize}px` }}
        onClick={openModal}
      >
        <img 
          src={petConfig.imagePath} 
          alt={`レベル${level}のペット`} 
          className="pet-image"
          onError={(e) => {
            // 画像読み込みエラー時のフォールバック処理
            e.currentTarget.src = '/images/pets/pet-default.png';
          }}
        />
        <div className="pet-click-hint">クリックで拡大</div>
      </div>
      
      {/* ペット拡大モーダル */}
      {showModal && (
        <div className="pet-modal-overlay" onClick={closeModal}>
          <div className="pet-modal-content" onClick={e => e.stopPropagation()}>
            <button className="pet-modal-close" onClick={closeModal}>×</button>
            <div className="pet-modal-header">
              <h3>レベル{level}のペット</h3>
            </div>
            <div className="pet-modal-body">
              <img 
                src={petConfig.imagePath}
                alt={`レベル${level}のペット`}
                className="pet-modal-image"
                onError={(e) => {
                  e.currentTarget.src = '/images/pets/pet-default.png';
                }}
              />
              <div className="pet-modal-stats">
                <p>レベル: {level}</p>
                <p>ポイント: {points}</p>
                <p>累計練習時間: {totalMinutes}分</p>
                <p>次のレベルまで: あと{remainingMinutes}分</p>
              </div>
              <div className="pet-modal-message">
                <p>『{petConfig.message}』</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
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