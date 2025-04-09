// ペットの設定ファイル
// レベルごとのペットの見た目と台詞を管理

export interface PetLevelConfig {
  // レベル番号
  level: number;
  // ペット画像のパス
  imagePath: string;
  // ペットの台詞
  message: string;
}

// ベースパスを設定（GitHub Pagesでの展開を考慮）
const basePath = import.meta.env.BASE_URL || '/';

// レベルごとの設定を配列で管理
export const petLevels: PetLevelConfig[] = [
  {
    level: 1,
    imagePath: `${basePath}images/pets/pet-level-1.png`,
    message: 'よろしくね♪ 一緒にピアノ頑張ろう！',
  },
  {
    level: 2,
    imagePath: `${basePath}images/pets/pet-level-2.png`,
    message: 'あ！帽子をゲットしたよ！ありがとう！',
  },
  {
    level: 3,
    imagePath: `${basePath}images/pets/pet-level-3.png`,
    message: 'わーい！帽子にポンポンがついたー！どんどん練習しよう♪',
  },
  {
    level: 4,
    imagePath: `${basePath}images/pets/pet-level-4.png`,
    message: 'ちょうちょだ！ちょうちょみたいなネクタイゲット！ありがとう!',
  },
  {
    level: 5,
    imagePath: `${basePath}images/pets/pet-level-5.png`,
    message: 'ボクの大好きなホネホネおやつだ！練習を頑張ってくれてありがとう♪',
  },
  {
    level: 6,
    imagePath: `${basePath}images/pets/pet-level-6.png`,
    message: 'みてみて！帽子と服が新しくなったよ！かっこいいでしょ？',
  },
  {
    level: 7,
    imagePath: `${basePath}images/pets/pet-level-7.png`,
    message: 'ついにボクもピアノをゲット！いっぱい練習するぞー！',
  },
];

// 指定されたレベルの設定を取得する関数
export function getPetConfigForLevel(level: number): PetLevelConfig {
  // 指定レベル以下の最大のレベル設定を探す
  const config = petLevels
    .filter((config) => config.level <= level)
    .sort((a, b) => b.level - a.level)[0];

  // 設定が見つからない場合はレベル1の設定を返す
  return config || petLevels[0];
}
