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

// レベルごとの設定を配列で管理
export const petLevels: PetLevelConfig[] = [
  {
    level: 1,
    imagePath: '/images/pets/pet-level-1.png',
    message: 'よろしくね♪ 一緒にピアノ頑張ろう！'
  },
  {
    level: 2,
    imagePath: '/images/pets/pet-level-2.png',
    message: 'お！眼鏡をかけて勉強家になったよ！続けてね！'
  },
  {
    level: 3,
    imagePath: '/images/pets/pet-level-3.png',
    message: '模様と笑顔が出てきたね！どんどん練習しよう♪'
  },
  {
    level: 4,
    imagePath: '/images/pets/pet-level-4.png',
    message: '王冠を手に入れたよ！ピアノの王様だぞ！'
  },
  {
    level: 5,
    imagePath: '/images/pets/pet-level-5.png',
    message: '可愛いリボンが付いたよ！お洒落になってきた♪'
  },
  // 必要なだけレベル設定を追加する
];

// 指定されたレベルの設定を取得する関数
export function getPetConfigForLevel(level: number): PetLevelConfig {
  // 指定レベル以下の最大のレベル設定を探す
  const config = petLevels
    .filter(config => config.level <= level)
    .sort((a, b) => b.level - a.level)[0];
  
  // 設定が見つからない場合はレベル1の設定を返す
  return config || petLevels[0];
}