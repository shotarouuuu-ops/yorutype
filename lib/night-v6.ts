import signatures from './night-signatures.json';

export const VERSION = 'night-28-v6.0';
export type Axis = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
export type Tribe = 'hunter' | 'queen' | 'healer' | 'brain' | 'muse';
export type Aura = 'hanayaka' | 'cool' | 'tennen' | 'doryoku';
export type Answer = number | null;
export type Question = { id: string; axis: Axis; reverse: boolean; text: string };
export const AXES = signatures.AX as Axis[];
export const AXIS_LABELS: Record<Axis, { name: string; low: string; high: string }> = {
  A: { name: '社交エネルギー', low: '一対一で深く', high: '人の輪で元気に' },
  B: { name: '会話の主導', low: '相手の流れに乗る', high: '自分で流れを作る' },
  C: { name: '目標との向き合い方', low: '過程や心地よさ', high: '見える成果' },
  D: { name: '相手への配慮', low: '自分の都合も守る', high: '相手の気持ちを優先' },
  E: { name: '準備のスタイル', low: 'その場で柔軟に', high: '先に整えておく' },
  F: { name: '自分の見せ方', low: 'いつもの自分', high: '相手に合わせて変える' },
  G: { name: '感情との距離', low: '接客と自分を分ける', high: '自分の気持ちも重ねる' }
};

// Four original items per axis, balanced 2 forward / 2 reverse.
// The interleaved order avoids revealing an axis or type while answering.
export const QUESTIONS: Question[] = [
  { id: 'A1', axis: 'A', reverse: false, text: '初対面の人が多い席でも、会話が増えるほど気分が上がる。' },
  { id: 'B1', axis: 'B', reverse: true, text: '席では、自分から話題を決めるより、相手が話し始めるのを待つほうが心地いい。' },
  { id: 'C1', axis: 'C', reverse: false, text: '目標まであと少しと分かると、もうひと頑張りしたくなる。' },
  { id: 'D1', axis: 'D', reverse: true, text: 'お願いをされたときは、相手の気持ちより先に、自分に余裕があるかを考える。' },
  { id: 'E1', axis: 'E', reverse: false, text: '出勤や約束の予定は、早めに整理しておきたい。' },
  { id: 'F1', axis: 'F', reverse: true, text: '相手が変わっても、話し方や雰囲気はいつもの自分のままでいたい。' },
  { id: 'G1', axis: 'G', reverse: false, text: 'お客様のうれしい話を聞くと、自分のことのように気持ちが動く。' },
  { id: 'A2', axis: 'A', reverse: true, text: 'グループの席より、一対一のほうが無理なく会話を楽しめる。' },
  { id: 'B2', axis: 'B', reverse: false, text: '会話が途切れたら、自分から次の話題を出すほうだ。' },
  { id: 'C2', axis: 'C', reverse: true, text: '目標の数字に届かなくても、納得できる接客ができれば、その日は満足できる。' },
  { id: 'D2', axis: 'D', reverse: false, text: '隣の子が困っていると、自分の段取りを少し変えてでも手を貸したくなる。' },
  { id: 'E2', axis: 'E', reverse: true, text: '準備は先にまとめて済ませるより、必要になったときに進めるほうだ。' },
  { id: 'F2', axis: 'F', reverse: false, text: 'にぎやかな相手と落ち着いた相手では、自分の声のトーンも変わる。' },
  { id: 'G2', axis: 'G', reverse: true, text: '親しく話しているときも、心の中では「接客の時間」と区切っている。' },
  { id: 'A3', axis: 'A', reverse: false, text: '休憩中も、誰かと話しているほうが気分を切り替えやすい。' },
  { id: 'B3', axis: 'B', reverse: true, text: '同伴などの予定は、自分から段取りを決めるより、相手の提案に合わせたい。' },
  { id: 'C3', axis: 'C', reverse: false, text: '前の月より成果が伸びていると分かると、仕事への意欲が増す。' },
  { id: 'D3', axis: 'D', reverse: true, text: '相手が少し残念そうでも、自分の予定を変えてまで合わせることは少ない。' },
  { id: 'E3', axis: 'E', reverse: false, text: '会う予定の相手について、前に話したことを振り返っておくほうだ。' },
  { id: 'F3', axis: 'F', reverse: true, text: '相手に好まれそうなキャラを作るより、素の自分を知ってもらいたい。' },
  { id: 'G3', axis: 'G', reverse: false, text: '仕事で知り合った相手にも、長く接していると個人的な親しみが湧く。' },
  { id: 'A4', axis: 'A', reverse: true, text: 'にぎやかな接客が続いた後は、一人で静かに過ごすと元気が戻る。' },
  { id: 'B4', axis: 'B', reverse: false, text: 'グループで話していると、気づけば自分が会話を進めている。' },
  { id: 'C4', axis: 'C', reverse: true, text: '成績が分かる場面でも、ほかの人との順位はあまり気にならない。' },
  { id: 'D4', axis: 'D', reverse: false, text: '相手が疲れていそうなときは、自分の話を置いて聞き役に回る。' },
  { id: 'E4', axis: 'E', reverse: true, text: '営業の連絡は、決まった時間より、思いついたときにまとめて返すほうだ。' },
  { id: 'F4', axis: 'F', reverse: false, text: '会う相手に合わせて、服やメイクで出す雰囲気を変えたくなる。' },
  { id: 'G4', axis: 'G', reverse: true, text: '仕事の相手に親しみを示すことと、自分が本当に親しみを感じることは分けている。' }
];

export const CHOICES = [
  { value: 3, label: 'とても当てはまる' }, { value: 2, label: '当てはまる' },
  { value: 1, label: '少し当てはまる' }, { value: 0, label: 'どちらともいえない' },
  { value: -1, label: 'あまり当てはまらない' }, { value: -2, label: '当てはまらない' },
  { value: -3, label: 'まったく当てはまらない' }
];

export const TRIBES: Record<Tribe, { label: string; color: string; soft: string; description: string }> = {
  hunter: { label: 'エース', color: '#a74757', soft: '#f8e9e9', description: '目指すものが見えると、自分から動き出す。' },
  queen: { label: '女王', color: '#7b3c64', soft: '#f3e8f0', description: '人の輪の中で、自分らしい流れを作る。' },
  healer: { label: '癒し系', color: '#316d65', soft: '#e7f1ed', description: '相手の気持ちに目を向け、関係を育てる。' },
  brain: { label: '才女', color: '#486c93', soft: '#e9eef6', description: '一歩引いて見ながら、自分なりに整える。' },
  muse: { label: '小悪魔', color: '#79629b', soft: '#f0eaf7', description: '自分の距離感で、印象を残す。' }
};
export const AURAS: Record<Aura, string> = { hanayaka: '華やか', cool: 'クール', tennen: '自然体', doryoku: '積み重ね' };
const COPY: Record<string, [string, string]> = {
  hanayaka_hunter: ['華やかさの奥に、揺れない目標。', '見せ方を整える楽しさと、結果に向かう気持ちが重なるタイプ。華やぐ瞬間にも、自分が目指すものを忘れにくい。'],
  cool_hunter: ['熱い目標は、涼しい顔の内側に。', '目標への熱を、いつも表に出すわけではないタイプ。相手との距離を保ちながら、自分のペースで前へ進みたい。'],
  tennen_hunter: ['飾らないまま、目指す場所へ。', '自然体でいたい気持ちと、結果を出したい気持ちが同居するタイプ。誰かのキャラを借りるより、自分なりの進め方を探す。'],
  doryoku_hunter: ['小さな準備を、自分の自信に。', '目標に向かう気持ちを、日々の段取りに変えるタイプ。大きな一発だけでなく、次の一歩が決まると動きやすい。'],
  hanayaka_queen: ['その場に、自分の色を添える。', '人の輪を楽しむ気持ちと、見せ方を変える感覚が重なるタイプ。にぎやかな場面では、自分から空気を動かしたくなる。'],
  cool_queen: ['流れは作る。心の余白は残す。', '会話の流れを作りながら、自分の内側には余白を持ちたいタイプ。前に出ることと、全部を見せることは別に考える。'],
  tennen_queen: ['気取らない自分で、輪の真ん中へ。', '自然体のまま、人と関わることを楽しむタイプ。作り込んだ役より、いつもの反応や言葉で会話を動かしたい。'],
  doryoku_queen: ['場を動かす、その前に整える。', '人の輪に入る力を、準備でも支えたいタイプ。その場の勢いに任せきらず、先に段取りが見えていると落ち着く。'],
  hanayaka_healer: ['明るさにも、気遣いにも、私らしさ。', '相手への気遣いを、表情や雰囲気にのせたいタイプ。相手に届く見せ方を考えることと、寄り添いたい気持ちが重なる。'],
  cool_healer: ['近くにいても、自分を手放さない。', '相手の気持ちを大切にしつつ、接客と自分の心を分けたいタイプ。気に掛けることと、全部を引き受けることを分けられる距離が心地いい。'],
  tennen_healer: ['飾らない言葉で、そっと寄り添う。', '相手に合わせた演出より、素直な気持ちで向き合いたいタイプ。気取らないやりとりの中で、少しずつ関係を育てたい。'],
  doryoku_healer: ['気遣いを、その日の気分で終わらせない。', '相手を思う気持ちを、準備や振り返りにもつなげるタイプ。前に聞いたことを覚えておくような、小さな積み重ねを大切にする。'],
  hanayaka_brain: ['雰囲気をまとい、自分なりに組み立てる。', '相手に応じた見せ方と、自分なりに考えて整える感覚が重なるタイプ。見える印象の奥で、次の言葉や段取りを考える。'],
  cool_brain: ['少し引いて、次の一手を考える。', '感情との距離を置きながら、状況を整理したいタイプ。すぐ反応するより、自分が納得できる進め方を見つけると落ち着く。'],
  tennen_brain: ['自分の言葉で、ゆっくりほどく。', '作ったキャラより、自分なりの考え方で向き合いたいタイプ。自然体でいることと、物事を丁寧に整えることを両立したい。'],
  doryoku_brain: ['昨日の気づきを、次の会話へ。', '振り返りや準備を重ねて、自分のやり方を作るタイプ。覚えておきたいことを整理すると、次の場面で動きやすくなる。'],
  hanayaka_muse: ['見せる華と、見せきらない余白。', '見せ方を変える楽しさがありながら、距離を縮める速さは自分で選びたいタイプ。華やかに関わることと、心を全部開くことは別。'],
  cool_muse: ['静かな距離に、自分の輪郭を残す。', '大勢の流れに合わせ続けるより、自分のペースを保ちたいタイプ。接客と自分を分けられることが、落ち着いて関わる助けになる。'],
  tennen_muse: ['近づく速さも、私が決める。', '自然体でいたい気持ちと、自分の距離感を守りたい気持ちが重なるタイプ。急いで印象を作るより、少しずつ知ってもらいたい。'],
  doryoku_muse: ['自分のペースを、準備で守る。', '人との距離を自分で選びながら、必要な準備は整えたいタイプ。予定や段取りが見えると、無理に周りへ合わせずに過ごしやすい。']
};
export type Profile = { key: string; name: string; tribe: Tribe; aura: Aura; catch: string; description: string; index: number };
export const PROFILES: Profile[] = Object.entries(signatures.TYPE_NAME).map(([key, name], index) => {
  const [aura, tribe] = key.split('_') as [Aura, Tribe];
  return { key, name, tribe, aura, catch: COPY[key][0], description: COPY[key][1], index };
});
export function getProfile(key: string) { return PROFILES.find(p => p.key === key); }
const unit = (v: number[]) => { const m = Math.hypot(...v); return v.map(x => x / m); };
const dot = (a: number[], b: number[]) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const tribeVectors = Object.fromEntries(Object.entries(signatures.TRIBE_SIG).map(([key, v]) => [key, unit(v)]));
const auraVectors = Object.fromEntries(Object.entries(signatures.AURA_SIG).map(([key, v]) => [key, unit(v)]));
export type Scores = Record<Axis, number>;
export type Mix = { key: Tribe; pct: number };
export type Result = {
  version: string; kind: 'profile' | 'balanced' | 'insufficient'; scores: Scores;
  counts: Record<Axis, number>; profile: Profile | null; nearby: Profile | null;
  mix: Mix[]; answered: number; skipped: number; mixedAxes: Axis[];
};

export function diagnose(answers: Answer[]): Result {
  if (answers.length !== QUESTIONS.length || Array.from(answers).some(a => a !== null && (!Number.isInteger(a) || a < -3 || a > 3))) {
    throw new Error('28問分の有効な回答が必要です。');
  }
  const scores = {} as Scores, counts = {} as Record<Axis, number>;
  const mixedAxes: Axis[] = [];
  for (const axis of AXES) {
    const values = QUESTIONS.flatMap((q, i) => q.axis === axis && answers[i] !== null ? [(answers[i] as number) * (q.reverse ? -1 : 1)] : []);
    counts[axis] = values.length;
    scores[axis] = values.length ? values.reduce((a,b) => a+b, 0) / (values.length * 3) : 0;
    if (values.some(v => v >= 2) && values.some(v => v <= -2)) mixedAxes.push(axis);
  }
  const vector = AXES.map(a => scores[a]);
  const tv = Object.fromEntries(Object.entries(tribeVectors).map(([key, v]) => [key, dot(vector, v)]));
  const av = Object.fromEntries(Object.entries(auraVectors).map(([key, v]) => [key, dot(vector, v)]));
  // Relative resemblance, NOT accuracy, population prevalence or measured trait percentages.
  const raw = Object.entries(tv).map(([key, value]) => ({ key: key as Tribe, value: Math.exp(value * 1.8) }));
  const sum = raw.reduce((s, x) => s+x.value, 0);
  const allocated = raw.map(x => ({ key: x.key, exact: x.value/sum*100, pct: Math.floor(x.value/sum*100) }));
  let remainder = 100 - allocated.reduce((s,x) => s+x.pct,0);
  const fractions = [...allocated].sort((a,b) => (b.exact-b.pct)-(a.exact-a.pct) || a.key.localeCompare(b.key));
  for (let i=0; i<remainder; i++) fractions[i].pct++;
  const mix = allocated.map(({key,pct}) => ({key,pct})).sort((a,b) => b.pct-a.pct || a.key.localeCompare(b.key));
  const ranked = PROFILES.map(profile => ({ profile, score: tv[profile.tribe]+av[profile.aura] })).sort((a,b) => b.score-a.score || a.profile.key.localeCompare(b.profile.key));
  const answered = answers.filter(a => a !== null).length;
  const kind = AXES.some(a => counts[a] < 3) ? 'insufficient' : Math.max(...vector.map(Math.abs)) < 0.17 ? 'balanced' : 'profile';
  return { version: VERSION, kind, scores, counts, profile: kind === 'profile' ? ranked[0].profile : null,
    nearby: kind === 'profile' && ranked[0].score-ranked[1].score < 0.12 ? ranked[1].profile : null,
    mix, answered, skipped: answers.length-answered, mixedAxes };
}

const OPEN: Record<Axis, [string, string]> = {
  A: ['人の輪で楽しめても、回復するのは静かな時間。一人とゆっくり話すほうに、自然と気持ちが向きやすそうです。', '人と話しているうちに、気持ちが動き出す。にぎやかさを避けるより、その中で自分の調子が上がりやすそうです。'],
  B: ['無理に話を引っ張るより、相手の流れを受け取ってから言葉を返す。そのほうが、自分らしく関わりやすそうです。', '誰かが動くのを待つより、自分から流れを作る。会話や予定の進め方を任されると、動きやすそうです。'],
  C: ['数字だけで一日を決めたくない。どんな時間を過ごせたか、自分が納得できたかにも、重さを置いていそうです。', '目標までの距離が見えると、もう少し進みたくなる。「頑張った」だけでなく、成果が見えることが力になりやすそうです。'],
  D: ['相手を気に掛けながらも、自分の余裕を確かめる。無理なお願いに合わせ続けるより、続けられる範囲を大事にしていそうです。', '相手の様子を見て、自分の話や段取りを少し後ろに置く。気遣いが、小さな行動に出やすそうです。'],
  E: ['全部を先に決めるより、その日の状況を見て動く。余白のある進め方のほうが、自分に合っていそうです。', '前に話したこと、次の予定、必要な準備。先に整えておくことで、目の前の時間に入りやすそうです。'],
  F: ['相手ごとに別の自分を作るより、いつもの言葉や雰囲気で知ってもらいたい。自然体でいられることを大切にしていそうです。', '相手が変われば、声も雰囲気も少し変わる。同じ自分の中に、場面ごとの見せ方を持っていそうです。'],
  G: ['親しく接することと、心の内側まで近づけることを分ける。接客の自分と、普段の自分の間に区切りを持っていそうです。', '仕事の相手にも、自分の気持ちが自然に重なる。親しみを示すだけでなく、本当に親しみを感じる場面が多そうです。']
};
type InsightRule = { when: (s: Scores) => boolean; axes: Axis[]; title: string; text: string };
const INSIGHTS: InsightRule[] = [
  { when: s => s.A > .25 && s.G < -.25, axes:['A','G'], title:'人は好き。でも、心まで全部は渡さない。', text:'人と関わると元気になる一方で、接客と自分の心は分けたい。明るく振る舞うことと、誰にでも心を開くことは、あなたの中では別なのかもしれません。' },
  { when: s => s.A < -.25 && s.B > .25, axes:['A','B'], title:'大勢より少人数。任せるより自分で。', text:'にぎやかな輪より一対一が心地いいのに、流れは自分から作りたい。静かさを好むことと、受け身でいることが同じではない組み合わせです。' },
  { when: s => s.C > .25 && s.F < -.25, axes:['C','F'], title:'結果は欲しい。自分らしさも手放さない。', text:'成果が見えると燃えるけれど、そのために別のキャラを作りたいわけではない。自分のやり方で目標に届くことが、納得につながりやすそうです。' },
  { when: s => s.D > .25 && s.G < -.25, axes:['D','G'], title:'寄り添うことと、背負うことは別。', text:'相手への気遣いは行動に出る一方で、心の中では接客と区切っている。距離があるから冷たい、とは言えない組み合わせです。' },
  { when: s => s.C > .25 && s.E < -.25, axes:['C','E'], title:'目標に火はつく。進め方には余白が欲しい。', text:'目標があると意欲は増すけれど、細かく予定を固めるより、その場で動きたい。目標を小さく区切ると、勢いを次の行動に移しやすいかもしれません。' },
  { when: s => s.F > .25 && s.G > .25, axes:['F','G'], title:'見せ方は変わっても、気持ちは本物。', text:'相手に合わせて雰囲気を変えながら、自分の心も動いている。「キャラを変える＝気持ちを作っている」とは限らない、あなたの関わり方が見えます。' },
  { when: s => s.A > .25 && s.B < -.25, axes:['A','B'], title:'輪に入りたい。でも、仕切りたいわけじゃない。', text:'人との時間は好きでも、話の流れを全部決めたいわけではない。相手が作る流れに参加するほうが、気楽に楽しめる場面がありそうです。' },
  { when: s => s.E > .25 && s.C < -.25, axes:['E','C'], title:'準備をする理由は、順位だけじゃない。', text:'先に整えておきたいけれど、数字が一番大事というわけではない。自分が納得できる時間を過ごすために、準備を使っているのかもしれません。' }
];
export type Evidence = { id: string; text: string; answer: string };
export function explain(result: Result, answers: Answer[]) {
  const s = result.scores;
  const dominant = [...AXES].sort((a,b) => Math.abs(s[b])-Math.abs(s[a]));
  const rule = INSIGHTS.find(r => r.when(s));
  const axes = rule?.axes ?? dominant.slice(0,2);
  const evidence: Evidence[] = axes.flatMap(axis => {
    const entries = QUESTIONS.map((q,i) => ({q,value:answers[i]})).filter(x => x.q.axis === axis && x.value !== null);
    entries.sort((a,b) => ((b.value as number)*(b.q.reverse?-1:1)-(a.value as number)*(a.q.reverse?-1:1)) * (s[axis] >= 0 ? 1 : -1));
    return entries.slice(0,1).map(({q,value}) => ({ id:q.id,text:q.text,answer:CHOICES.find(c => c.value === value)?.label ?? '' }));
  });
  const opening = result.kind === 'profile' ? OPEN[dominant[0]][s[dominant[0]] >= 0 ? 1 : 0] : '今回の回答では、一つの方向に強く寄る傾向は見えていません。場面によって変わるところも含めて、下の回答の傾向を見てみてください。';
  const seat = Math.abs(s.A) < .2 || Math.abs(s.B) < .2 ? '人数や相手によって、会話への入り方を変えていそうです。楽に話せた席を思い出すと、自分に合う条件が見つかるかもしれません。' : s.A > 0 ? s.B > 0 ? 'にぎやかな席で、自分から話題を出すような関わり方。自分が回す時間と、誰かの話を楽しむ時間を両方持てると、無理を減らせそうです。' : 'にぎやかな時間を楽しみながら、相手の話や流れに乗る関わり方。毎回まとめ役を引き受けなくても、自分らしく参加できそうです。' : s.B > 0 ? '少人数で、相手を見ながら自分から話を進める関わり方。話す人数と主導する度合いを分けて考えると、心地いい席が見つかりそうです。' : '少人数で、相手の言葉を受け取ってから返す関わり方。すぐに場を盛り上げる役より、落ち着いて話せる時間を好みやすそうです。';
  const relation = Math.abs(s.D) < .2 || Math.abs(s.G) < .2 ? '気遣いと心の距離は、相手や場面によって変わりそうです。「気持ちよく関われた時」と「持ち帰って疲れた時」の違いを確かめてみてもよさそうです。' : s.D > 0 ? s.G > 0 ? '相手に合わせて動く気遣いに、自分の感情も重なりやすい組み合わせ。話を聞ける範囲を先に決めておくことも、関係を大事にする方法の一つです。' : '相手のために動きながら、心の内側には仕事の区切りを持つ関わり方。気遣いの大きさと、心を開く速さを同じにする必要はありません。' : s.G > 0 ? '自分の都合も大切にする一方で、親しくなった相手には気持ちが動きやすい組み合わせ。親しみがあっても予定は守る、という選び方もできます。' : '相手への対応と、自分の予定や気持ちを分けたい関わり方。自分が引き受けられる範囲を言葉にできると、距離感が伝わりやすくなりそうです。';
  const motivation = Math.abs(s.C) < .2 ? '成果も、過ごした時間への納得も、どちらも大事にしていそうです。今はどちらを重く見たいか、月ごとに振り返る余地があります。' : s.C > 0 ? '目標や前回からの伸びが、行動のきっかけになりやすそうです。結果に加えて「自分で動かせたこと」も残しておくと、振り返りが具体的になります。' : '数字以外の手応えも、満足につながりやすそうです。「どんな接客なら納得できるか」を言葉にすると、自分の目標を作りやすくなります。';
  const cards = [
    { label:'活きる場面', text: Math.abs(s.A)<.2 ? '人数より、無理なく関われた条件を手がかりに。' : s.A>0 ? '人とのやりとりが多く、会話に参加できる時間。' : '一人の相手と、落ち着いて話を深められる時間。' },
    { label:'心地よい進め方', text: Math.abs(s.E)<.2 ? '決めておくことと、その場で選ぶことの両方を。' : s.E>0 ? '予定や会話の手がかりを、先に整えておく。' : '動かせる予定を残し、状況に合わせて選ぶ。' },
    { label:'気を使いやすい場面', text: Math.abs(s.F)<.2 ? '自分に合わない見せ方を、ずっと続ける場面。' : s.F>0 ? '相手ごとの切り替えが、休む間もなく続く場面。' : '普段と違うキャラを、強く求められる場面。' },
    { label:'自分を守るヒント', text: Math.abs(s.G)<.2 ? '仕事を持ち帰りたくない日の区切りを決める。' : s.G>0 ? '親しい相手でも、引き受ける範囲は自分で選ぶ。' : '区切りを持ちながら、伝えたい気遣いは言葉にする。' }
  ];
  return {opening, insight:rule ? {title:rule.title,text:rule.text} : null, evidence, seat, relation, motivation, cards};
}
