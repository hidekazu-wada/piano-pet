import React, { useState, useRef } from 'react';

interface ImportExportModalProps {
  onClose: () => void;
  exportData: string;
  onImport: (data: string) => void;
}

const ImportExportModal: React.FC<ImportExportModalProps> = ({ 
  onClose, 
  exportData, 
  onImport 
}) => {
  const [importText, setImportText] = useState('');
  const exportRef = useRef<HTMLDivElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  // テキストをクリップボードにコピーする
  const copyToClipboard = () => {
    if (exportRef.current) {
      // テキストを選択
      const range = document.createRange();
      range.selectNode(exportRef.current);
      window.getSelection()?.removeAllRanges();
      window.getSelection()?.addRange(range);
      
      // クリップボードにコピー
      try {
        document.execCommand('copy');
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // 2秒後にメッセージを消す
      } catch (err) {
        console.error('コピーに失敗しました', err);
      }
      
      // 選択を解除
      window.getSelection()?.removeAllRanges();
    }
  };

  // インポート処理
  const handleImport = () => {
    if (importText.trim()) {
      onImport(importText.trim());
    } else {
      alert('インポートするデータを入力してください');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>データの保存と復元</h2>
          <button className="modal-close" onClick={onClose}>&times;</button>
        </div>
        
        <div className="export-section">
          <h3>データの保存</h3>
          <p>以下のコードをコピーして保存してください。他のデバイスで使用できます。</p>
          <div className="export-data" ref={exportRef}>
            {exportData}
          </div>
          <button 
            className="copy-button" 
            onClick={copyToClipboard}
          >
            {copySuccess ? 'コピーしました！' : 'コピー'}
          </button>
        </div>
        
        <div className="import-section">
          <h3>データの復元</h3>
          <p>保存したコードを貼り付けて復元してください。</p>
          <textarea
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="保存したコードをここに貼り付け..."
          />
          <button 
            className="import-button" 
            onClick={handleImport}
          >
            データを復元
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportExportModal;