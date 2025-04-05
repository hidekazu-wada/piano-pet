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
  
  // レベルに応じて特徴を追加（30レベルまで対応）
  const petFeatures = {
    glasses: level >= 2,                  // 眼鏡（レベル2から）
    spots: level >= 3,                    // 模様（レベル3から）
    crown: level >= 4,                    // 王冠（レベル4から）
    bow: level >= 5,                      // リボン（レベル5から）
    wings: level >= 6,                    // 羽（レベル6から）
    cape: level >= 7,                     // マント（レベル7から）
    hat: level >= 8,                      // 帽子（レベル8から）
    microphone: level >= 9,               // マイク（レベル9から）
    wand: level >= 10,                    // 魔法の杖（レベル10から）
    glow: level >= 11,                    // 輝き（レベル11から）
    sparkles: level >= 12,                // キラキラエフェクト（レベル12から）
    aura: level >= 13,                    // オーラ（レベル13から）
    halo: level >= 14,                    // 天使の輪（レベル14から）
    jetpack: level >= 15,                 // ジェットパック（レベル15から）
    rainbow: level >= 16,                 // 虹色エフェクト（レベル16から）
    staff: level >= 17,                   // 指揮棒（レベル17から）
    gradientBody: level >= 18,            // グラデーションボディ（レベル18から）
    sunglasses: level >= 19,              // サングラス（レベル19から）
    musicNotes: level >= 20,              // 音符が飛び出す（レベル20から）
    goldShine: level >= 21,               // 金色の輝き（レベル21から）
    diamondVFX: level >= 22,              // ダイヤモンド効果（レベル22から）
    pianistCostume: level >= 23,          // ピアニスト衣装（レベル23から）
    spotlight: level >= 24,               // スポットライト（レベル24から）
    stage: level >= 25,                   // ステージ（レベル25から）
    audience: level >= 26,                // 観客（レベル26から）
    fireworks: level >= 27,               // 花火（レベル27から）
    trophies: level >= 28,                // トロフィー（レベル28から）
    goldenPiano: level >= 29,             // 金のピアノ（レベル29から）
    legendStatus: level >= 30             // 伝説の称号（レベル30）
  }
  
  // レベルに応じて変化する外観要素
  const petStyles = {
    // 表情の変化
    mouth: level >= 3 && level < 6 ? 'happy' : 
           level >= 6 && level < 10 ? 'excited' : 
           level >= 10 && level < 15 ? 'star' : 
           level >= 15 && level < 20 ? 'rainbow' : 
           level >= 20 && level < 25 ? 'musical' : 
           level >= 25 ? 'legendary' : 'normal',
           
    // 目の変化
    eye: level >= 4 && level < 8 ? 'star' : 
         level >= 8 && level < 12 ? 'heart' : 
         level >= 12 && level < 16 ? 'music' : 
         level >= 16 && level < 20 ? 'sparkle' : 
         level >= 20 && level < 25 ? 'rainbow' : 
         level >= 25 ? 'legendary' : 'normal',
         
    // 体の形状変化
    bodyShape: level >= 10 && level < 20 ? 'rounded' : 
               level >= 20 && level < 30 ? 'star' : 
               level >= 30 ? 'legendary' : 'circle',
               
    // アニメーション速度
    animationSpeed: Math.min(0.5 + (level * 0.05), 2.5)
  }
  
  // レベルアップの進捗計算
  const minutesPerLevel = 60 // 1レベルに必要な練習時間（分）
  const minutesInCurrentLevel = totalMinutes - ((level - 1) * minutesPerLevel)
  const progressPercent = Math.min((minutesInCurrentLevel / minutesPerLevel) * 100, 100)
  const remainingMinutes = minutesPerLevel - minutesInCurrentLevel

  return (
    <div className="pet-wrapper">
      {/* 基本のペットの形 */}
      <div 
        className={`pet ${petStyles.bodyShape}`}
        style={{ 
          width: `${petSize}px`, 
          height: `${petSize}px`,
          backgroundColor: petColor,
          animationDuration: `${3 / petStyles.animationSpeed}s`
        }}
      >
        {/* レベル別効果 - 順番に注意 (z-indexによる重なり順) */}
        
        {/* ステージ系（背景） */}
        {petFeatures.spotlight && <div className="spotlight"></div>}
        {petFeatures.stage && <div className="stage"></div>}
        {petFeatures.audience && (
          <div className="audience">
            <div className="audience-member" style={{left: '10%', top: '20%'}}></div>
            <div className="audience-member" style={{left: '30%', top: '40%'}}></div>
            <div className="audience-member" style={{left: '50%', top: '20%'}}></div>
            <div className="audience-member" style={{left: '70%', top: '40%'}}></div>
            <div className="audience-member" style={{left: '90%', top: '20%'}}></div>
          </div>
        )}
        
        {/* バックグラウンド効果 */}
        {petFeatures.fireworks && (
          <div className="fireworks">
            <div className="firework firework-red" style={{left: '20%', top: '10%'}}></div>
            <div className="firework firework-blue" style={{left: '50%', top: '5%'}}></div>
            <div className="firework firework-green" style={{left: '80%', top: '15%'}}></div>
            <div className="firework firework-gold" style={{left: '35%', top: '20%'}}></div>
          </div>
        )}
        
        {/* アイテム系要素（ペットの後ろ） */}
        {/* ジェットパック */}
        {petFeatures.jetpack && (
          <div className="rocket-pack">
            <div className="rocket-body"></div>
            <div className="rocket-flame"></div>
          </div>
        )}
        
        {petFeatures.wings && (
          <div className="wings">
            <div className="wing left"></div>
            <div className="wing right"></div>
          </div>
        )}
        
        {petFeatures.cape && <div className="cape"></div>}
        
        {/* エフェクト系 */}
        {petFeatures.aura && <div className="aura"></div>}
        {petFeatures.glow && <div className="glow"></div>}
        {petFeatures.rainbow && <div className="rainbow-effect"></div>}
        {petFeatures.gradientBody && <div className="gradient-body"></div>}
        {petFeatures.goldShine && <div className="gold-shine"></div>}
        
        {/* 装飾品（ペットの前） */}
        {petFeatures.spots && (
          <div className="spots">
            <div className="spot"></div>
            <div className="spot"></div>
            <div className="spot"></div>
          </div>
        )}
        
        {petFeatures.glasses && (
          <div className="glasses">
            <div className="glasses-bridge"></div>
          </div>
        )}
        
        {petFeatures.crown && <div className="crown"></div>}
        {petFeatures.halo && <div className="halo"></div>}
        {petFeatures.hat && <div className="hat"></div>}
        {petFeatures.bow && <div className="bow"></div>}
        {petFeatures.sunglasses && (
          <div className="sunglasses">
            <div className="sunglasses-bridge"></div>
          </div>
        )}
        
        {/* 目 */}
        <div className="eyes">
          <div className={`eye ${petStyles.eye}`}></div>
          <div className={`eye ${petStyles.eye}`}></div>
        </div>
        
        {/* 口 */}
        <div className={`mouth ${petStyles.mouth}`}></div>
        
        {/* 持ち物 */}
        {petFeatures.microphone && <div className="microphone"></div>}
        {petFeatures.wand && <div className="wand"></div>}
        {petFeatures.staff && <div className="staff"></div>}
        
        {/* 特殊効果（最前面） */}
        {petFeatures.sparkles && (
          <div className="sparkles">
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
            <div className="sparkle"></div>
          </div>
        )}
        
        {petFeatures.diamondVFX && (
          <div className="diamond-vfx">
            <div className="diamond"></div>
            <div className="diamond"></div>
            <div className="diamond"></div>
          </div>
        )}
        
        {petFeatures.musicNotes && (
          <div className="music-notes">
            <div className="note">♪</div>
            <div className="note">♫</div>
            <div className="note">♬</div>
          </div>
        )}
        
        {petFeatures.pianistCostume && <div className="pianist-costume"></div>}
        
        {petFeatures.trophies && (
          <div className="trophies">
            <div className="trophy"></div>
            <div className="trophy"></div>
            <div className="trophy"></div>
            <div className="trophy"></div>
          </div>
        )}
        
        {petFeatures.goldenPiano && <div className="golden-piano"></div>}
        
        {petFeatures.legendStatus && <div className="legend-status">伝説のピアニスト</div>}
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
        {level === 1 && <p>よろしくね♪ 一緒にピアノ頑張ろう！</p>}
        {level === 2 && <p>お！眼鏡をかけて勉強家になったよ！続けてね！</p>}
        {level === 3 && <p>模様と笑顔が出てきたね！どんどん練習しよう♪</p>}
        {level === 4 && <p>王冠と星の目を手に入れたよ！ピアノの王様だぞ！</p>}
        {level === 5 && <p>可愛いリボンが付いたよ！お洒落になってきた♪</p>}
        {level === 6 && <p>羽が生えて飛べるようになったよ！天才ピアニスト！</p>}
        {level === 7 && <p>マントが付いたよ！ピアノのヒーローだ！</p>}
        {level === 8 && <p>素敵な帽子をかぶったよ♪ちょっとオシャレでしょ？</p>}
        {level === 9 && <p>マイクを持ったよ！歌って演奏して最高！</p>}
        {level === 10 && <p>魔法の杖を手に入れた！音楽の魔法をかけちゃおう！</p>}
        {level === 11 && <p>輝きが出てきた！みんなの注目の的だね✨</p>}
        {level === 12 && <p>キラキラエフェクトが出るようになったよ！眩しい〜！</p>}
        {level === 13 && <p>オーラが出てるね！練習の成果が表れてる証拠だよ！</p>}
        {level === 14 && <p>天使の輪が浮かんでる！神聖な演奏ができるね！</p>}
        {level === 15 && <p>ロケットパック装備！演奏が超高速になった！</p>}
        {level === 16 && <p>虹色に輝きだした！七色の音階みたいだね！</p>}
        {level === 17 && <p>指揮棒を手に入れた！オーケストラも指揮できるよ！</p>}
        {level === 18 && <p>体がグラデーションに！鍵盤のようなグラデーションだね！</p>}
        {level === 19 && <p>サングラスをかけてクールに決めたよ！イェーイ！</p>}
        {level === 20 && <p>音符が飛び出すようになった！演奏が目に見えるね！</p>}
        {level === 21 && <p>金色に輝きだした！ゴールドディスク獲得レベル！</p>}
        {level === 22 && <p>ダイヤモンドのようにきらめく！最高級の演奏家だ！</p>}
        {level === 23 && <p>ピアニスト衣装を身につけた！本格的な演奏家だね！</p>}
        {level === 24 && <p>スポットライトを浴びてるよ！注目の的だね！</p>}
        {level === 25 && <p>ステージの上で演奏できるようになった！コンサート開催だ！</p>}
        {level === 26 && <p>ファンがついてきた！みんなが聴きに来てるよ！</p>}
        {level === 27 && <p>花火が上がるほどの大人気！世界中で人気者だ！</p>}
        {level === 28 && <p>トロフィーをたくさん獲得！数えきれないほどの賞だよ！</p>}
        {level === 29 && <p>金のピアノを手に入れた！世界一のピアニストの証！</p>}
        {level === 30 && <p>伝説のピアニストの称号を得た！あなたは最高の先生だよ！</p>}
        {level > 30 && <p>もはや神域のピアニスト！宇宙中の誰もが知ってるよ！</p>}
      </div>
    </div>
  )
}

export default PetComponent