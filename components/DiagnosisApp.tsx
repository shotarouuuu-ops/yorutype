'use client';

import { useMemo, useState } from 'react';
import { diagnose, getTraitLabel, questions, type DiagnosisResult, type TraitKey } from '@/lib/diagnosis';

const choices = [
  { value: 3, label: 'とてもそう思う' },
  { value: 2, label: 'そう思う' },
  { value: 1, label: '少しそう思う' },
  { value: 0, label: 'どちらでもない' },
  { value: -1, label: '少し違う' },
  { value: -2, label: '違う' },
  { value: -3, label: 'まったく違う' }
];

function ResultCard({ result }: { result: DiagnosisResult }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/45 bg-white/70 p-5 shadow-card backdrop-blur" aria-label="診断結果カード">
      <div className={`absolute inset-0 bg-gradient-to-br ${result.type.gradient} opacity-95`} />
      <div className="absolute -right-12 -top-16 h-44 w-44 rounded-full bg-white/25 blur-3xl" />
      <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-champagne/25 blur-3xl" />
      <div className="relative min-h-[430px] rounded-[1.5rem] border border-white/35 bg-white/18 px-5 py-7 text-center text-white shadow-glow">
        <p className="text-[10px] uppercase tracking-[0.45em] text-white/75">NOBLE Yoru Type</p>
        <div className="mx-auto mt-8 flex h-28 w-28 items-center justify-center rounded-full border border-white/45 bg-white/18 text-6xl shadow-glow">
          {result.type.motif}
        </div>
        <p className="mt-7 text-xs font-medium tracking-[0.28em] text-white/75">あなたに向いている夜職タイプ</p>
        <h2 className="mt-3 font-serifjp text-5xl font-semibold leading-none tracking-[0.08em] drop-shadow-sm">{result.type.name}</h2>
        <p className="mx-auto mt-5 max-w-[18rem] text-sm leading-7 text-white/88">{result.type.catch}</p>
        <div className="mx-auto mt-6 inline-flex rounded-full border border-white/35 bg-white/20 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
          的中度目安 {result.matchPercent}% ・ {result.aura.label}
        </div>
        <p className="absolute bottom-5 left-0 right-0 text-[11px] tracking-[0.35em] text-white/70">#夜職診断</p>
      </div>
    </section>
  );
}

function ShareActions({ result }: { result: DiagnosisResult }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = typeof window === 'undefined' ? '' : window.location.href;
    const text = `${result.shareText}\n${url}`;

    if (navigator.share) {
      await navigator.share({ title: '夜職診断', text, url });
      return;
    }

    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="rounded-[1.5rem] border border-rose/25 bg-white/85 p-4 text-center shadow-card backdrop-blur">
      <p className="font-serifjp text-lg font-semibold text-wine">この結果カードをストーリーに載せる</p>
      <p className="mt-2 text-xs leading-6 text-plum/60">スクショでもOK。スマホなら共有ボタンからSNSへ送れます。</p>
      <button onClick={share} className="mt-4 w-full rounded-full bg-night px-5 py-4 text-sm font-bold tracking-[0.12em] text-white shadow-glow transition active:scale-[0.98]">
        {copied ? 'コピーしました' : '結果をSNSシェア'}
      </button>
    </div>
  );
}

function ResultView({ result, onRestart }: { result: DiagnosisResult; onRestart: () => void }) {
  const topScores = Object.entries(result.scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5) as [TraitKey, number][];

  return (
    <div className="space-y-5 pb-10">
      <ResultCard result={result} />
      <ShareActions result={result} />

      <section className="rounded-[1.75rem] bg-white/85 p-6 shadow-card backdrop-blur">
        <p className="text-xs font-bold uppercase tracking-[0.35em] text-wine/65">Why this fits you</p>
        <h2 className="mt-3 font-serifjp text-2xl font-semibold text-plum">{result.oneLine}</h2>
        <p className="mt-4 text-sm leading-8 text-plum/70">{result.type.description}</p>
        <div className="mt-5 rounded-2xl bg-blush p-4 text-sm leading-7 text-plum/75">
          <span className="font-bold text-wine">本当は、こういうところない？</span><br />
          {result.type.hiddenTruth}
        </div>
      </section>

      <section className="rounded-[1.75rem] bg-white/85 p-6 shadow-card backdrop-blur">
        <h2 className="font-serifjp text-xl font-semibold text-plum">あなたの魅力バランス</h2>
        <div className="mt-5 space-y-4">
          {topScores.map(([key, score]) => (
            <div key={key}>
              <div className="mb-2 flex items-center justify-between text-xs font-bold text-plum/65">
                <span>{getTraitLabel(key)}</span>
                <span>{score}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-rose/15">
                <div className="h-full rounded-full bg-gradient-to-r from-wine via-rose to-champagne" style={{ width: `${score}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4">
        <div className="rounded-[1.5rem] bg-white/85 p-5 shadow-card">
          <h3 className="font-serifjp text-lg font-semibold text-wine">強み</h3>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-plum/72">
            {result.type.strengths.map((item) => <li key={item}>✦ {item}</li>)}
          </ul>
        </div>
        <div className="rounded-[1.5rem] bg-white/85 p-5 shadow-card">
          <h3 className="font-serifjp text-lg font-semibold text-wine">気をつけたいところ</h3>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-plum/72">
            {result.type.watchouts.map((item) => <li key={item}>☾ {item}</li>)}
          </ul>
        </div>
        <div className="rounded-[1.5rem] bg-white/85 p-5 shadow-card">
          <h3 className="font-serifjp text-lg font-semibold text-wine">向いている環境</h3>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-plum/72">
            {result.type.fit.map((item) => <li key={item}>◇ {item}</li>)}
          </ul>
          <p className="mt-4 rounded-2xl bg-gradient-to-br from-blush to-white p-4 text-sm leading-7 text-plum/75">{result.type.advice}</p>
        </div>
      </section>

      <section className="rounded-[1.75rem] border border-champagne/35 bg-night p-6 text-white shadow-glow">
        <p className="text-xs uppercase tracking-[0.35em] text-champagne/80">Next step</p>
        <h2 className="mt-3 font-serifjp text-2xl font-semibold">店選びで後悔しないために</h2>
        <p className="mt-4 text-sm leading-8 text-white/72">結果は優劣ではありません。あなたの魅力が活きる環境を知るための入口です。焦って応募する必要はなく、まずは働き方や条件を整理するところから始めて大丈夫です。</p>
      </section>

      <button onClick={onRestart} className="w-full rounded-full border border-wine/20 bg-white/80 px-5 py-4 text-sm font-bold tracking-[0.12em] text-wine shadow-card transition active:scale-[0.98]">
        もう一度診断する
      </button>
    </div>
  );
}

export default function DiagnosisApp() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const currentQuestion = questions[index];
  const progress = useMemo(() => Math.round(((index + 1) / questions.length) * 100), [index]);

  function start() {
    setStarted(true);
    setResult(null);
    setIndex(0);
    setAnswers([]);
  }

  function answer(value: number) {
    const nextAnswers = [...answers];
    nextAnswers[index] = value;
    setAnswers(nextAnswers);

    if (index === questions.length - 1) {
      setResult(diagnose(nextAnswers));
      setStarted(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIndex((current) => current + 1);
  }

  if (result) {
    return <ResultView result={result} onRestart={start} />;
  }

  if (!started) {
    return (
      <section className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/75 p-6 text-center shadow-card backdrop-blur">
        <div className="absolute -right-16 -top-20 h-44 w-44 rounded-full bg-rose/30 blur-3xl" />
        <div className="absolute -bottom-24 left-4 h-52 w-52 rounded-full bg-lavender/25 blur-3xl" />
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-wine/60">NOBLE Night Work Type</p>
          <div className="mx-auto mt-7 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-night via-wine to-rose text-5xl text-champagne shadow-glow">☾</div>
          <h2 className="mt-7 font-serifjp text-4xl font-semibold leading-tight tracking-[0.06em] text-plum">夜の魅力を、<br />上品に言語化する。</h2>
          <p className="mx-auto mt-5 max-w-sm text-sm leading-8 text-plum/65">18問で、あなたに向いている夜職タイプを診断。結果はSNSでシェアしやすいカードで表示されます。</p>
          <div className="mt-6 grid grid-cols-3 gap-2 text-xs font-bold text-plum/65">
            <span className="rounded-full bg-blush px-3 py-2">無料</span>
            <span className="rounded-full bg-blush px-3 py-2">約2分</span>
            <span className="rounded-full bg-blush px-3 py-2">SNS共有</span>
          </div>
          <button onClick={start} className="mt-8 w-full rounded-full bg-gradient-to-r from-night via-wine to-rose px-6 py-5 text-sm font-bold tracking-[0.16em] text-white shadow-glow transition active:scale-[0.98]">
            診断をはじめる
          </button>
          <p className="mt-4 text-[11px] leading-5 text-plum/45">個人情報の入力なしで結果を確認できます。</p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] bg-white/80 p-5 shadow-card backdrop-blur">
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs font-bold text-wine/70">
          <span>Q{index + 1} / {questions.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-rose/15">
          <div className="h-full rounded-full bg-gradient-to-r from-wine via-rose to-champagne transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="rounded-[1.5rem] bg-gradient-to-br from-blush to-white p-6 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-plum/35">Question</p>
        <h2 className="mt-4 text-xl font-semibold leading-9 text-plum">{currentQuestion.text}</h2>
      </div>

      <div className="mt-6 space-y-2" role="radiogroup" aria-label="回答を選択">
        {choices.map((choice) => (
          <button
            key={choice.value}
            onClick={() => answer(choice.value)}
            className="w-full rounded-2xl border border-rose/15 bg-white px-4 py-4 text-left text-sm font-semibold text-plum/72 shadow-sm transition hover:border-wine/35 hover:bg-blush active:scale-[0.99]"
            role="radio"
            aria-checked={answers[index] === choice.value}
          >
            {choice.label}
          </button>
        ))}
      </div>

      {index > 0 && (
        <button onClick={() => setIndex((current) => current - 1)} className="mt-4 w-full rounded-full border border-wine/15 px-4 py-3 text-xs font-bold tracking-[0.12em] text-wine">
          前の質問へ戻る
        </button>
      )}
    </section>
  );
}
