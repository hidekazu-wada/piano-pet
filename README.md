# ピアノペット

子どもがピアノの練習を楽しくするための育成ゲームアプリケーション。

## 主な機能

- 練習前に内容と目標時間を設定
- 実際のピアノ練習をアプリ外で行う
- 練習後にポイントを獲得
- 累積練習時間でペットがレベルアップし、見た目が変化
- ポイントを貯めて特典を解放（今後実装予定）

## 使い方

1. 練習内容（例：バイエル25番）と目標時間を入力
2. 「練習開始」ボタンを押す
3. 実際にピアノを練習する
4. 練習完了後、「練習完了」ボタンを押す
5. ポイントを獲得し、ペットが成長

## 開発方法

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## ペットのカスタマイズ方法

レベルごとのペットの見た目とメッセージは簡単にカスタマイズできます。

### ペット画像の追加・変更

1. `/public/images/pets/` ディレクトリに画像ファイルを配置します
   - ファイル名は `pet-level-{レベル番号}.png` の形式を推奨（例: `pet-level-1.png`）
   - 任意のファイル名も使用可能ですが、設定ファイルでパスを正確に指定してください
   - PNG形式を推奨（透過背景対応）

### 設定ファイルの編集

1. `/src/config/petConfig.ts` ファイルを開きます
2. `petLevels` 配列に新しいレベル設定を追加・編集します

```typescript
// 例: レベル6の設定を追加
{
  level: 6,
  imagePath: '/images/pets/pet-level-6.png',
  message: '羽が生えて飛べるようになったよ！天才ピアニスト！'
}
```

### 設定パラメータの説明

- `level`: ペットのレベル（数値）
- `imagePath`: 画像ファイルのパス（publicフォルダからの相対パス）
- `message`: ペットの台詞（レベルごとの励ましメッセージ）

※指定されたレベルの設定がない場合は、そのレベル以下の最高レベルの設定が自動的に適用されます。