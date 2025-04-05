import { useState, useEffect, useRef } from 'react'
import PetComponent from './components/PetComponent'
import PracticeForm from './components/PracticeForm'
import PracticeComplete from './components/PracticeComplete'
import ImportExportModal from './components/ImportExportModal'
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
      <h1>ピアノペット</h1>
      
      <div className="pet-container">
        <PetComponent level={level} points={points} totalMinutes={totalPracticeMinutes} />
      </div>

      <div className="stats">
        <p>レベル: {level}</p>
        <p>ポイント: {points}</p>
        <p>累計練習時間: {totalPracticeMinutes} 分</p>
      </div>
      
      <div className="game-controls">
        <button 
          className="import-export-button" 
          onClick={() => setShowImportExport(true)}
          style={{ minWidth: '120px' }}
        >
          データの保存/復元
        </button>
        <button 
          className="reset-button" 
          onClick={resetGame}
          style={{ minWidth: '120px' }}
        >
          最初からやり直す
        </button>
      </div>
      
      {showImportExport && (
        <ImportExportModal 
          onClose={() => setShowImportExport(false)}
          exportData={exportGameData()}
          onImport={importGameData}
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
