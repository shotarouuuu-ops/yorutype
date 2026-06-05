export type TraitKey =
  | 'approval'
  | 'selfWorth'
  | 'intimacy'
  | 'boundary'
  | 'expression'
  | 'strategy'
  | 'empathy'
  | 'autonomy';

export type NightTypeKey = 'queen' | 'strategist' | 'healer' | 'muse' | 'challenger';
export type AuraKey = 'glow' | 'moon' | 'silk' | 'crystal';

export type Question = {
  id: string;
  text: string;
  trait: TraitKey;
  reverse?: boolean;
};

export type NightType = {
  key: NightTypeKey;
  name: string;
  label: string;
  catch: string;
  shareCatch: string;
  motif: string;
  gradient: string;
  accent: string;
  description: string;
  hiddenTruth: string;
  strengths: string[];
  watchouts: string[];
  fit: string[];
  advice: string;
};

export type Aura = {
  key: AuraKey;
  name: string;
  label: string;
  description: string;
};

export type DiagnosisResult = {
  type: NightType;
  aura: Aura;
  scores: Record<TraitKey, number>;
  matchPercent: number;
  oneLine: string;
  shareText: string;
};

export const questions: Question[] = [
  { id: 'q01', text: '初対面でも、相手の反応を見ながら自分の見せ方を自然に変えられる', trait: 'expression' },
  { id: 'q02', text: '褒められるより「ちゃんと分かってくれている」と感じた時の方が心に残る', trait: 'intimacy' },
  { id: 'q03', text: '期待されると嬉しいけれど、同時に少し重く感じることがある', trait: 'boundary', reverse: true },
  { id: 'q04', text: '頑張ったことを誰にも気づかれないと、平気なふりをしていても少し残る', trait: 'approval' },
  { id: 'q05', text: '場の空気が止まりそうになると、つい自分が動いて整えたくなる', trait: 'empathy' },
  { id: 'q06', text: '感情で押し切るより、相手が何を求めているかを考えて動く方が得意', trait: 'strategy' },
  { id: 'q07', text: '本音を話した後、言いすぎたかもと一人で考えることがある', trait: 'intimacy', reverse: true },
  { id: 'q08', text: '「必要とされている」と感じると、自分でも驚くほど頑張れる', trait: 'approval' },
  { id: 'q09', text: '自分の世界観や雰囲気を、言葉より空気で伝えたいと思う', trait: 'autonomy' },
  { id: 'q10', text: '誰かに合わせすぎると、後から自分だけ疲れていたことに気づく', trait: 'boundary', reverse: true },
  { id: 'q11', text: '注目される場面では緊張しても、どこかでスイッチが入る', trait: 'expression' },
  { id: 'q12', text: '結果が見える目標があると、普段より集中力が上がる', trait: 'selfWorth' },
  { id: 'q13', text: '人の気持ちの変化に気づきすぎて、自分の気分まで左右されることがある', trait: 'empathy' },
  { id: 'q14', text: '急に距離を詰められると、少し引いて様子を見たくなる', trait: 'autonomy' },
  { id: 'q15', text: '自分の価値は、雰囲気や愛嬌だけでなく積み重ねでも証明したい', trait: 'selfWorth' },
  { id: 'q16', text: '言葉にする前に、相手の温度感や空気を読んでから動く', trait: 'strategy' },
  { id: 'q17', text: '断るのが苦手で、気づいたら相手の期待を優先していることがある', trait: 'boundary', reverse: true },
  { id: 'q18', text: '大勢に好かれるより、深く分かってくれる人がいる方が安心する', trait: 'intimacy' }
];

export const nightTypes: Record<NightTypeKey, NightType> = {
  queen: {
    key: 'queen',
    name: '月光クイーン',
    label: '見られるほど輝く主役タイプ',
    catch: '場の空気を上品に明るくする、夜のスポットライト。',
    shareCatch: '見られるほど輝く、夜のスポットライト',
    motif: '✦',
    gradient: 'from-[#3b162a] via-[#9b3562] to-[#e5afbd]',
    accent: '#f2d6a2',
    description:
      'あなたは、注目をただ浴びたい人ではなく、見られることで自分の魅力を整えていく人。緊張していても、いざ場に立つと表情や声の温度を切り替えられる華があります。',
    hiddenTruth:
      '本当は、強く見られるほど「ちゃんと見ていてほしい」という繊細さも持っています。雑に扱われると笑って流せても、心の中ではかなり覚えているタイプです。',
    strengths: ['第一印象で空気を明るくする', '見せ方の切り替えが早い', '期待を力に変えられる'],
    watchouts: ['注目され続けようとして疲れやすい', '弱音を見せるタイミングを逃しやすい'],
    fit: ['華やかさを評価してくれる店', 'フリー客との出会いが多い環境', 'SNSや写真の見せ方を活かせる場所'],
    advice: 'あなたは目立つほど強くなる人。ただし、ずっと完璧に見せなくても魅力は消えません。安心できる場所を一つ持つと、輝きが長続きします。'
  },
  strategist: {
    key: 'strategist',
    name: '夜の軍師',
    label: '空気を読み、言葉で惹きつける知性タイプ',
    catch: '感情に飲まれず、会話の奥行きで印象を残す人。',
    shareCatch: '会話の奥行きで印象を残す、夜の軍師',
    motif: '◇',
    gradient: 'from-[#111827] via-[#334165] to-[#a9c7e8]',
    accent: '#a9c7e8',
    description:
      'あなたは、勢いだけで距離を詰めるより、相手の言葉や沈黙の意味を読んでから動く人。会話の流れを整理し、相手が話しやすい角度を見つけるのが得意です。',
    hiddenTruth:
      '冷静に見える一方で、内側ではかなり細かく考えています。外れている言葉や雑な扱いに敏感で、納得できないまま合わせ続けると急に心が離れることがあります。',
    strengths: ['会話を組み立てる力がある', '相手の意図を読むのが早い', '落ち着いた客層に信頼されやすい'],
    watchouts: ['考えすぎて素直な反応が遅れる', '正しさが前に出ると距離ができる'],
    fit: ['落ち着いた高級感のある店', '会話力が評価される環境', '無理なテンションを求められない場所'],
    advice: 'あなたの知性は、少しの隙や温度が加わると一気に魅力になります。完璧な返しより、短い共感を先に置くと深く刺さります。'
  },
  healer: {
    key: 'healer',
    name: 'シルクヒーラー',
    label: '必要とされるほど力が出る安心タイプ',
    catch: '相手の心をほどき、長く信頼されるやわらかな存在。',
    shareCatch: '長く信頼される、やわらかな安心感',
    motif: '◌',
    gradient: 'from-[#143331] via-[#5fbfad] to-[#f7eadf]',
    accent: '#85decf',
    description:
      'あなたは、派手に奪うより、相手の気持ちをほどいて信頼を育てる人。小さな変化に気づき、言葉にされていない寂しさや疲れを拾う感度があります。',
    hiddenTruth:
      'ただ優しいだけではありません。本当は「私が必要とされている」と感じることで安心するところがあります。だからこそ、期待に応えすぎて自分を後回しにしやすいタイプです。',
    strengths: ['聞き上手で安心感がある', '長い関係を育てやすい', '相手の変化に気づける'],
    watchouts: ['断れずに抱え込みやすい', '自分の希望を言う前に相手を優先しやすい'],
    fit: ['常連を大切にする店', '落ち着いた客層の環境', '長期的な信頼が評価される場所'],
    advice: 'あなたの優しさは価値です。ただし、安売りしなくていいものでもあります。先に線引きを決めるほど、安心感はもっと上品に伝わります。'
  },
  muse: {
    key: 'muse',
    name: 'ミッドナイトミューズ',
    label: '簡単に見せない余白タイプ',
    catch: '語りすぎない余白で、もっと知りたいと思わせる人。',
    shareCatch: '余白で惹きつける、ミッドナイトミューズ',
    motif: '☾',
    gradient: 'from-[#171123] via-[#5b477d] to-[#d8c6ef]',
    accent: '#d8c6ef',
    description:
      'あなたは、最初からすべてを見せるより、少しずつ距離を縮める人。無理に明るく振る舞わなくても、静かな存在感や独自の世界観が印象に残ります。',
    hiddenTruth:
      '自由で平気そうに見えて、本当は自分のペースを乱されることに敏感です。心を開く相手は選びますが、選んだ相手には深く残るタイプです。',
    strengths: ['独自の雰囲気がある', '追わせる余白を作れる', '少数の相手と深い関係を築ける'],
    watchouts: ['冷たく見られることがある', '最初の距離感で誤解されやすい'],
    fit: ['品や静けさが評価される店', '少人数で関係を育てる環境', '過度なノリを求められない場所'],
    advice: 'あなたは全部見せないことで魅力が増す人。ただ、ほんの少しだけ温度を見せると、ミステリアスさが近寄りやすい魅力に変わります。'
  },
  challenger: {
    key: 'challenger',
    name: 'ローズチャレンジャー',
    label: '努力で自分の価値を証明する成長タイプ',
    catch: '焦らず積み上げ、後から強さが花ひらく人。',
    shareCatch: '積み上げて花ひらく、ローズチャレンジャー',
    motif: '✧',
    gradient: 'from-[#40251f] via-[#b26750] to-[#f1c59a]',
    accent: '#f1c59a',
    description:
      'あなたは、一瞬の派手さより「昨日よりできるようになること」に強さを感じる人。誰かに急かされるより、自分で納得しながら積み上げるほど伸びていきます。',
    hiddenTruth:
      '本当は負けず嫌いです。でも、それを前面に出すより、静かに努力して結果で見せたいところがあります。評価が遅いと不安になりますが、積み上げた力は簡単には消えません。',
    strengths: ['継続して磨ける', '改善点を素直に拾える', '信頼が積み上がるほど強くなる'],
    watchouts: ['結果が出る前に自分を責めやすい', '頑張りを見せるのが苦手'],
    fit: ['育成が丁寧な店', '努力が条件に反映される環境', '無理な即戦力扱いをされない場所'],
    advice: 'あなたは時間差で強くなる人。焦って誰かのペースに合わせるより、積み上げが見える環境を選ぶことが一番の近道です。'
  }
};

export const auras: Record<AuraKey, Aura> = {
  glow: { key: 'glow', name: 'グロウ', label: '見せる魅力', description: '第一印象や華やかさを味方にできるオーラ。' },
  moon: { key: 'moon', name: 'ムーン', label: '静かな魅力', description: '落ち着きや余白で深く印象を残すオーラ。' },
  silk: { key: 'silk', name: 'シルク', label: 'やわらかな魅力', description: '安心感と親しみやすさで距離を縮めるオーラ。' },
  crystal: { key: 'crystal', name: 'クリスタル', label: '芯のある魅力', description: '誠実さや透明感で信頼を積み上げるオーラ。' }
};

const typeWeights: Record<NightTypeKey, Partial<Record<TraitKey, number>>> = {
  queen: { expression: 1.2, approval: 0.8, selfWorth: 0.4, autonomy: -0.2 },
  strategist: { strategy: 1.2, autonomy: 0.5, expression: -0.2, empathy: 0.3 },
  healer: { empathy: 1.2, intimacy: 0.7, boundary: -0.4, approval: 0.3 },
  muse: { autonomy: 1.1, intimacy: 0.4, expression: -0.2, boundary: 0.5 },
  challenger: { selfWorth: 1.1, boundary: 0.4, strategy: 0.4, approval: 0.2 }
};

const traitLabels: Record<TraitKey, string> = {
  approval: '承認感度',
  selfWorth: '成長意欲',
  intimacy: '深い距離感',
  boundary: '境界線',
  expression: '自己演出',
  strategy: '観察力',
  empathy: '共感力',
  autonomy: '自分軸'
};

export function getTraitLabel(key: TraitKey) {
  return traitLabels[key];
}

export function scoreAnswers(answers: number[]): Record<TraitKey, number> {
  const totals = Object.fromEntries(Object.keys(traitLabels).map((key) => [key, 0])) as Record<TraitKey, number>;
  const counts = Object.fromEntries(Object.keys(traitLabels).map((key) => [key, 0])) as Record<TraitKey, number>;

  questions.forEach((question, index) => {
    const raw = answers[index] ?? 0;
    const value = question.reverse ? -raw : raw;
    totals[question.trait] += value;
    counts[question.trait] += 1;
  });

  return Object.fromEntries(
    Object.entries(totals).map(([key, value]) => {
      const trait = key as TraitKey;
      const normalized = counts[trait] ? value / (counts[trait] * 3) : 0;
      return [trait, Math.round(((normalized + 1) / 2) * 100)];
    })
  ) as Record<TraitKey, number>;
}

function weightedScore(scores: Record<TraitKey, number>, weights: Partial<Record<TraitKey, number>>) {
  return Object.entries(weights).reduce((sum, [trait, weight]) => {
    const centered = (scores[trait as TraitKey] - 50) / 50;
    return sum + centered * (weight ?? 0);
  }, 0);
}

function pickType(scores: Record<TraitKey, number>): NightTypeKey {
  const ranked = (Object.keys(typeWeights) as NightTypeKey[])
    .map((key) => ({ key, score: weightedScore(scores, typeWeights[key]) }))
    .sort((a, b) => b.score - a.score);
  return ranked[0]?.key ?? 'healer';
}

function pickAura(scores: Record<TraitKey, number>): AuraKey {
  if (scores.expression >= 62 || scores.approval >= 66) return 'glow';
  if (scores.autonomy >= 62 || scores.boundary >= 66) return 'moon';
  if (scores.empathy >= 64 || scores.intimacy >= 64) return 'silk';
  return 'crystal';
}

export function diagnose(answers: number[]): DiagnosisResult {
  const scores = scoreAnswers(answers);
  const type = nightTypes[pickType(scores)];
  const aura = auras[pickAura(scores)];
  const topTraits = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 2)
    .map(([key]) => getTraitLabel(key as TraitKey));
  const highestScore = Math.max(...Object.values(scores));
  const matchPercent = Math.min(97, Math.max(78, Math.round(highestScore * 0.45 + 55)));
  const oneLine = `${type.name} × ${aura.name}｜${topTraits.join('と')}が強いタイプ`;

  return {
    type,
    aura,
    scores,
    matchPercent,
    oneLine,
    shareText: `私の夜職診断は「${type.name}」でした。${type.shareCatch} #夜職診断 #夜タイプ`
  };
}
