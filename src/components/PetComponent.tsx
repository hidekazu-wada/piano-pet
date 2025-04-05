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
  
  // ポイントによって色の明るさが変化（より多くのポイントで鮮やかに）
  const brightnessAdjust = Math.min(points / 100, 0.3); // ポイントによる色の調整（最大30%）
  
  // 基本色の選択（レベルによる）
  let baseColor: string;
  if (level <= 2) baseColor = '#8bc34a';  // 緑色
  else if (level <= 4) baseColor = '#26a69a';  // ティール色
  else baseColor = '#5c6bc0';  // 青色
  
  // 色をHSL形式に変換してポイントに基づいて明るさと彩度を調整
  const colorRegex = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
  const match = baseColor.match(colorRegex);
  let petColor = baseColor;
  
  if (match) {
    const r = parseInt(match[1], 16);
    const g = parseInt(match[2], 16);
    const b = parseInt(match[3], 16);
    
    // RGB to HSL変換
    const max = Math.max(r, g, b) / 255;
    const min = Math.min(r, g, b) / 255;
    const l = (max + min) / 2;
    
    // ポイントが多いほど明るく、彩度が高くなる
    const adjustedL = Math.min(l + brightnessAdjust, 0.7);
    const adjustedS = Math.min(0.6 + brightnessAdjust, 0.9);
    
    // ポイントの多さに応じて色相を少し変える（より華やかに）
    const h = level <= 2 ? 100 : level <= 4 ? 170 : 240;
    
    // HSLからRGBに戻す（簡易的な実装）
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = adjustedL < 0.5 ? adjustedL * (1 + adjustedS) : adjustedL + adjustedS - adjustedL * adjustedS;
    const p = 2 * adjustedL - q;
    
    const newR = Math.round(hue2rgb(p, q, (h / 360) + 1/3) * 255);
    const newG = Math.round(hue2rgb(p, q, h / 360) * 255);
    const newB = Math.round(hue2rgb(p, q, (h / 360) - 1/3) * 255);
    
    petColor = `rgb(${newR}, ${newG}, ${newB})`;
  }
  
  // レベルに応じて特徴を追加
  const showSpots = level >= 3
  const showBow = level >= 5
  const showGlasses = level >= 2
  const showCrown = level >= 4
  const showWings = level >= 6
  
  // レベルに応じて表情を変化
  const mouthStyle = level >= 3 ? 'happy' : 'normal'
  const eyeStyle = level >= 4 ? 'star' : 'normal'
  
  // レベルアップの進捗計算
  const minutesPerLevel = 60 // 1レベルに必要な練習時間（分）
  const minutesInCurrentLevel = totalMinutes - ((level - 1) * minutesPerLevel)
  const progressPercent = Math.min((minutesInCurrentLevel / minutesPerLevel) * 100, 100)
  const remainingMinutes = minutesPerLevel - minutesInCurrentLevel

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
        {/* レベル6以上で表示される羽 */}
        {showWings && (
          <div className="wings">
            <div className="wing left"></div>
            <div className="wing right"></div>
          </div>
        )}
      
        {/* レベル2以上で表示される眼鏡 */}
        {showGlasses && (
          <div className="glasses">
            <div className="glasses-bridge"></div>
          </div>
        )}
        
        {/* レベル4以上で表示される王冠 */}
        {showCrown && <div className="crown"></div>}
        
        {/* 目（レベル4以上で星型に変化） */}
        <div className="eyes">
          <div className={`eye ${eyeStyle}`}></div>
          <div className={`eye ${eyeStyle}`}></div>
        </div>
        
        {/* 口（レベル3以上で笑顔に変化） */}
        <div className={`mouth ${mouthStyle}`}></div>
        
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
          次のレベルまで: あと{remainingMinutes}分
        </span>
      </div>
      
      {/* ポイントの説明 */}
      <div className="points-info">
        <span>ポイント: {points}</span>
        <span className="points-hint">※ポイントが多いほど色が鮮やかになります</span>
      </div>
      
      <div className="pet-dialog">
        {level === 1 && (
          <p>よろしくね♪ 一緒にピアノ頑張ろう！</p>
        )}
        {level === 2 && (
          <p>お！眼鏡をかけて勉強家になったよ！続けてね！</p>
        )}
        {level === 3 && (
          <p>模様と笑顔が出てきたね！どんどん練習しよう♪</p>
        )}
        {level === 4 && (
          <p>王冠と星の目を手に入れたよ！ピアノの王様だぞ！</p>
        )}
        {level === 5 && (
          <p>可愛いリボンが付いたよ！お洒落になってきた♪</p>
        )}
        {level >= 6 && (
          <p>羽が生えて飛べるようになったよ！天才ピアニスト！</p>
        )}
      </div>
    </div>
  )
}

export default PetComponent