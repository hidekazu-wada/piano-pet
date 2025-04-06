import { useState, useEffect } from 'react'
import PetComponent from './components/PetComponent'
import PracticeForm from './components/PracticeForm'
import PracticeComplete from './components/PracticeComplete'
import ImportExportModal from './components/ImportExportModal'
import PetGallery from './components/PetGallery'
import Confetti from 'react-confetti'
import './App.css'

type PracticeStatus = 'planning' | 'practicing' | 'completed'

export interface PracticeSession {
  title: string
  targetMinutes: number
  actualMinutes?: number
}

interface GameState {
  level: number;
  points: number;
  totalPracticeMinutes: number;
}

function App() {
  // LocalStorageからゲーム状態を読み込む
  const loadGameState = (): GameState => {
    const savedState = localStorage.getItem('pianoPetGameState');
    if (savedState) {
      return JSON.parse(savedState);
    }
    return {
      level: 1,
      points: 0,
      totalPracticeMinutes: 0
    };
  };

  const [level, setLevel] = useState<number>(() => loadGameState().level)
  const [points, setPoints] = useState<number>(() => loadGameState().points)
  const [totalPracticeMinutes, setTotalPracticeMinutes] = useState<number>(() => loadGameState().totalPracticeMinutes)
  const [practiceStatus, setPracticeStatus] = useState<PracticeStatus>('planning')
  const [currentSession, setCurrentSession] = useState<PracticeSession>({ 
    title: '',
    targetMinutes: 10
  })
  const [showImportExport, setShowImportExport] = useState<boolean>(false)
  const [showPetGallery, setShowPetGallery] = useState<boolean>(false)
  const [showConfetti, setShowConfetti] = useState<boolean>(false)
  const [showLevelUpMessage, setShowLevelUpMessage] = useState<boolean>(false)
  const [showMenu, setShowMenu] = useState<boolean>(false)
  const [newLevel, setNewLevel] = useState<number>(1)
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const startPractice = (session: PracticeSession) => {
    setCurrentSession(session)
    setPracticeStatus('practicing')
  }

  // ウィンドウサイズの監視
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // メニューがクリックされた時にドロップダウンの外側をクリックしたら閉じる
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (showMenu && event.target instanceof Element) {
        const menuContainer = document.querySelector('.menu-container');
        if (menuContainer && !menuContainer.contains(event.target)) {
          setShowMenu(false);
        }
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [showMenu]);

  const completePractice = (actualMinutes: number) => {
    // Update points and total practice time
    const earnedPoints = actualMinutes
    setPoints(prev => prev + earnedPoints)
    setTotalPracticeMinutes(prev => prev + actualMinutes)
    
    // Check if level up is needed (every 60 minutes of practice)
    const newTotalMinutes = totalPracticeMinutes + actualMinutes
    const calculatedNewLevel = Math.floor(newTotalMinutes / 60) + 1
    if (calculatedNewLevel > level) {
      setLevel(calculatedNewLevel)
      setNewLevel(calculatedNewLevel)
      
      // レベルアップ時に紙吹雪エフェクトとメッセージを表示
      setShowConfetti(true)
      setShowLevelUpMessage(true)
      
      // 5秒後に紙吹雪エフェクトとメッセージを非表示にする
      setTimeout(() => {
        setShowConfetti(false)
        setShowLevelUpMessage(false)
      }, 5000)
    }
    
    // Update current session and status
    setCurrentSession(prev => ({ ...prev, actualMinutes }))
    setPracticeStatus('completed')
  }

  // ゲーム状態を保存する関数
  const saveGameState = () => {
    const gameState: GameState = {
      level,
      points,
      totalPracticeMinutes
    };
    localStorage.setItem('pianoPetGameState', JSON.stringify(gameState));
  };

  // 状態が変更されたら自動保存
  useEffect(() => {
    saveGameState();
  }, [level, points, totalPracticeMinutes]);

  const resetSession = () => {
    setCurrentSession({ title: '', targetMinutes: 10 })
    setPracticeStatus('planning')
  }
  
  // ゲームをリセットする関数
  const resetGame = () => {
    if (window.confirm('本当にゲームをリセットしますか？すべての進行状況が失われます。')) {
      setLevel(1);
      setPoints(0);
      setTotalPracticeMinutes(0);
      resetSession();
      localStorage.removeItem('pianoPetGameState');
    }
  }

  // データをエクスポートする関数
  const exportGameData = (): string => {
    const gameState: GameState = {
      level,
      points,
      totalPracticeMinutes
    };
    return btoa(JSON.stringify(gameState)); // Base64エンコード
  }

  // データをインポートする関数
  const importGameData = (dataString: string) => {
    try {
      const decodedData = atob(dataString); // Base64デコード
      const gameState: GameState = JSON.parse(decodedData);
      
      setLevel(gameState.level);
      setPoints(gameState.points);
      setTotalPracticeMinutes(gameState.totalPracticeMinutes);
      
      // LocalStorageにも保存
      localStorage.setItem('pianoPetGameState', JSON.stringify(gameState));
      
      setShowImportExport(false); // モーダルを閉じる
      alert('データを正常にインポートしました！');
    } catch (error) {
      alert('データの形式が正しくありません。正確なエクスポートコードを入力してください。');
      console.error('Import error:', error);
    }
  }

  return (
    <div className="container">
      {/* レベルアップ時の紙吹雪エフェクト */}
      {showConfetti && (
        <Confetti 
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.15}
        />
      )}
      
      {/* レベルアップメッセージ */}
      {showLevelUpMessage && (
        <div className="level-up-message">
          <h2>レベルアップ！</h2>
          <p>おめでとう！レベル{newLevel}になりました！</p>
          <p>これからも一緒に頑張りましょう♪</p>
        </div>
      )}
      
      <div className="app-header">
        <h1>ピアノペット</h1>
        <div className="menu-container">
          <button 
            className="menu-button" 
            onClick={() => setShowMenu(!showMenu)}
          >
            メニュー
          </button>
          {showMenu && (
            <div className="menu-dropdown">
              <button onClick={() => {
                setShowPetGallery(true);
                setShowMenu(false);
              }}>
                ペットギャラリー
              </button>
              <button onClick={() => {
                setShowImportExport(true);
                setShowMenu(false);
              }}>
                データの保存/復元
              </button>
              <button onClick={() => {
                resetGame();
                setShowMenu(false);
              }}>
                最初からやり直す
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="pet-container">
        <PetComponent level={level} points={points} totalMinutes={totalPracticeMinutes} />
      </div>

      <div className="stats">
        <p>レベル: {level}</p>
        <p>ポイント: {points}</p>
        <p>累計練習時間: {totalPracticeMinutes} 分</p>
      </div>
      
      
      {showImportExport && (
        <ImportExportModal 
          onClose={() => setShowImportExport(false)}
          exportData={exportGameData()}
          onImport={importGameData}
        />
      )}
      
      {showPetGallery && (
        <PetGallery 
          currentLevel={level}
          onClose={() => setShowPetGallery(false)}
        />
      )}

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
