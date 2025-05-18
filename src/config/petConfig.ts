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
  {
    level: 8,
    imagePath: `${basePath}images/pets/pet-level-8.png`,
    message:
      'いっぱいピアノを練習したら、モーツアルトみたいなアタマになっちゃった！',
  },
  {
    level: 9,
    imagePath: `${basePath}images/pets/pet-level-9.png`,
    message: 'こ、こんどは、ベートベン！？かっこいいでしょ？',
  },
  {
    level: 10,
    imagePath: `${basePath}images/pets/pet-level-10.png`,
    message: 'うー、花粉症で鼻がムズムズするよー！キミは平気？',
  },
  {
    level: 11,
    imagePath: `${basePath}images/pets/pet-level-11.png`,
    message: '花粉症が治ったー！あれ？お花が咲いたよ！',
  },
  {
    level: 12,
    imagePath: `${basePath}images/pets/pet-level-12.png`,
    message: 'お花がピンクになったー！お花見しようよ！',
  },
  {
    level: 13,
    imagePath: `${basePath}images/pets/pet-level-13.png`,
    message:
      'ピアノの練習を頑張ったら、ディズニーランドに連れてってもらえたよ！',
  },
  {
    level: 14,
    imagePath: `${basePath}images/pets/pet-level-14.png`,
    message: 'ディズニーランドに行ったら、これを食べなきゃね♪',
  },
  {
    level: 15,
    imagePath: `${basePath}images/pets/pet-level-15.png`,
    message: 'ディズニランドでミッキーぽい服を買ってもらったよ！',
  },
  {
    level: 16,
    imagePath: `${basePath}images/pets/pet-level-16.png`,
    message: 'わっしょいわっしょい！お祭りの衣装を着てみたよ！',
  },
  {
    level: 17,
    imagePath: `${basePath}images/pets/pet-level-17.png`,
    message: 'わたがしポップコーンゲット！あまーい♪',
  },
  {
    level: 18,
    imagePath: `${basePath}images/pets/pet-level-18.png`,
    message: '今日は野球を見に行くよ！ボクもユニフォームを着て応援するよ！',
  },
  {
    level: 19,
    imagePath: `${basePath}images/pets/pet-level-19.png`,
    message: '今日はプールに遊びに来たよ！ボクは犬かきが得意だよ！',
  },
  {
    level: 20,
    imagePath: `${basePath}images/pets/pet-level-20.png`,
    message: '今日は裏山へ、おさんぽ！大きな松ぼっくりを見つけたよ！',
  },
  {
    level: 21,
    imagePath: `${basePath}images/pets/pet-level-21.png`,
    message: '山の上でピクニック中！おにぎりおいしいね！',
  },
  {
    level: 22,
    imagePath: `${basePath}images/pets/pet-level-22.png`,
    message: '森の中でキノコを見つけたよ！でも食べちゃダメだって！',
  },
  {
    level: 23,
    imagePath: `${basePath}images/pets/pet-level-23.png`,
    message: '今日はカメラマン！みんなの写真を撮ってあげるね！',
  },
  {
    level: 24,
    imagePath: `${basePath}images/pets/pet-level-24.png`,
    message: 'バスケットボールに挑戦中！でもボールが大きすぎるよ～！',
  },
  {
    level: 25,
    imagePath: `${basePath}images/pets/pet-level-25.png`,
    message: 'シェフ帽子をかぶって、ホットケーキ作りに挑戦！ふわふわになーれ！',
  },
  {
    level: 26,
    imagePath: `${basePath}images/pets/pet-level-26.png`,
    message: '宇宙飛行士の格好をしてみたよ！宇宙はどんな感じかな？',
  },
  {
    level: 27,
    imagePath: `${basePath}images/pets/pet-level-27.png`,
    message: '消防士の帽子をかぶったよ！みんなを守るぞー！',
  },
  {
    level: 28,
    imagePath: `${basePath}images/pets/pet-level-28.png`,
    message: '絵を描いていたら、自分の鼻に絵の具がついちゃった！',
  },
  {
    level: 29,
    imagePath: `${basePath}images/pets/pet-level-29.png`,
    message: '大きな虹を見つけたよ！七色全部数えられるかな？',
  },
  {
    level: 30,
    imagePath: `${basePath}images/pets/pet-level-30.png`,
    message: 'ついに自転車に乗れるようになったよ！風を感じるって気持ちいい！',
  },
  {
    level: 31,
    imagePath: `${basePath}images/pets/pet-level-31.png`,
    message: '雪だるまを作ったよ！ぼくの分身みたいでしょ？',
  },
  {
    level: 32,
    imagePath: `${basePath}images/pets/pet-level-32.png`,
    message: 'スキーに挑戦！でも転んじゃった～、雪がお鼻に入っちゃった！',
  },
  {
    level: 33,
    imagePath: `${basePath}images/pets/pet-level-33.png`,
    message: '大きな風船を膨らませすぎて、ポーンって割れちゃった！びっくり！',
  },
  {
    level: 34,
    imagePath: `${basePath}images/pets/pet-level-34.png`,
    message: 'マジシャンになったよ！帽子から…あれ？ウサギさんどこ～？',
  },
  {
    level: 35,
    imagePath: `${basePath}images/pets/pet-level-35.png`,
    message: 'ケーキ屋さんでアルバイト！生クリームがおひげみたいについちゃった！',
  },
  {
    level: 36,
    imagePath: `${basePath}images/pets/pet-level-36.png`,
    message: '今日は工作教室！段ボールで秘密基地を作ったよ！',
  },
  {
    level: 37,
    imagePath: `${basePath}images/pets/pet-level-37.png`,
    message: 'シャボン玉を作ってみたよ！風に乗って飛んでいくね～！',
  },
  {
    level: 38,
    imagePath: `${basePath}images/pets/pet-level-38.png`,
    message: '大きな恐竜の博物館に行ったよ！恐竜ってすごく大きいんだね！',
  },
  {
    level: 39,
    imagePath: `${basePath}images/pets/pet-level-39.png`,
    message: 'サッカーをしていたら、ゴールキーパーになっちゃった！ボール来ないで～！',
  },
  {
    level: 40,
    imagePath: `${basePath}images/pets/pet-level-40.png`,
    message: '水族館でイルカショーを見たよ！イルカさん、飛び跳ねてかっこいい！',
  },
  {
    level: 41,
    imagePath: `${basePath}images/pets/pet-level-41.png`,
    message: 'カレー作りに挑戦！スプーンでちょっと味見…辛いよ～！',
  },
  {
    level: 42,
    imagePath: `${basePath}images/pets/pet-level-42.png`,
    message: '大きな望遠鏡で星を見たよ！お星さまってキラキラしてるね！',
  },
  {
    level: 43,
    imagePath: `${basePath}images/pets/pet-level-43.png`,
    message: 'ロケットに乗って、月まで行ってきたよ！…って夢を見たんだ！',
  },
  {
    level: 44,
    imagePath: `${basePath}images/pets/pet-level-44.png`,
    message: '大きな風船をいっぱいつけて、空を飛ぼうとしたよ！でも飛べなかった～！',
  },
  {
    level: 45,
    imagePath: `${basePath}images/pets/pet-level-45.png`,
    message: 'ドラムセットをたたいてみたよ！ドンドンドン！近所迷惑かな？',
  },
  {
    level: 46,
    imagePath: `${basePath}images/pets/pet-level-46.png`,
    message: '大きなパラソルの下で、ビーチでお昼寝…zzz…',
  },
  {
    level: 47,
    imagePath: `${basePath}images/pets/pet-level-47.png`,
    message: 'キャンプに来たよ！マシュマロを焼いたらふくらんじゃった～！',
  },
  {
    level: 48,
    imagePath: `${basePath}images/pets/pet-level-48.png`,
    message: '雨の日だから、カエルさんの傘を借りたよ！ありがとう！',
  },
  {
    level: 49,
    imagePath: `${basePath}images/pets/pet-level-49.png`,
    message: '今日はカラオケに行ったよ！ワンワン！…あれ？歌になってない！',
  },
  {
    level: 50,
    imagePath: `${basePath}images/pets/pet-level-50.png`,
    message: 'ピアノコンサートで演奏したよ！みんな拍手してくれて嬉しかった！',
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
