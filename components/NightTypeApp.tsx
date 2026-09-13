'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import TypeEmblem from './TypeEmblem';
import { AXES, AXIS_LABELS, QUESTIONS, CHOICES, TRIBES, AURAS, PROFILES, VERSION, diagnose, explain, type Answer, type Result, type Tribe } from '@/lib/night-v6';
import { makeStoryCard } from '@/lib/share-card';

const STORAGE_KEY='noble-night-28-v6';
type Saved = {version:string; answers:Answer[]; index:number; view:'questions'|'result'};
function readSaved(): Saved | null {
  try {
    const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return null;const s=JSON.parse(raw);
    if(s.version!==VERSION||!Array.isArray(s.answers)||s.answers.length>28||!s.answers.every((a:unknown)=>a===null||(typeof a==='number'&&Number.isInteger(a)&&a>=-3&&a<=3))||!Number.isInteger(s.index)||s.index<0||s.index>=28||!['questions','result'].includes(s.view))return null;
    if(s.view==='result'&&s.answers.length!==28)return null;
    if(s.view==='questions'&&s.index>s.answers.length)return null;
    return s;
  }catch{return null;}
}
export function TypeAtlas(){
  const [filter,setFilter]=useState<Tribe|null>(null);
  return <section className="atlas-section" id="type-atlas">
    <div className="section-heading"><div><p className="eyebrow">THE 20 TYPES</p><h2>夜の、20の輪郭。</h2></div><span className="quiet">タイプ図鑑</span></div>
    <div className="filter-row" aria-label="素質で絞り込む">
      <button type="button" aria-pressed={filter===null} onClick={()=>setFilter(null)}>すべて</button>
      {(Object.keys(TRIBES) as Tribe[]).map(t=><button type="button" key={t} aria-pressed={filter===t} onClick={()=>setFilter(t)}>{TRIBES[t].label}</button>)}
    </div>
    <div className="atlas-grid">{PROFILES.filter(p=>!filter||p.tribe===filter).map(p=><a className="atlas-card" key={p.key} href={`/types/${p.key}/`} target="_blank" rel="noopener noreferrer" style={{'--type-color':TRIBES[p.tribe].color,'--type-soft':TRIBES[p.tribe].soft} as CSSProperties}>
      <TypeEmblem tribe={p.tribe} aura={p.aura}/><span className="atlas-name">{p.name}</span><span className="atlas-description">{p.catch}</span><span className="atlas-link">タイプを読む <span aria-hidden="true">↗</span></span>
    </a>)}</div>
  </section>;
}

function Method(){return <details className="method"><summary>この診断と、回答の扱いについて</summary><div>
  <p>夜の接客場面での好みや関わり方を、7つの視点から言葉にするNOBLE独自の自己理解診断です。MBTIの公式検査ではありません。</p>
  <p>28問と結果文は現在検証中です。能力、採用、収入を判定するものではありません。タイプはあなたの一面を表す呼び名として楽しんでください。</p>
  <p>回答はブラウザ内で計算します。保存を選んだ場合だけ、この端末のブラウザに残ります。回答を店舗やAIへ送る機能はありません。共有リンクにはタイプ紹介だけが含まれます。</p>
  <p>同じ回答からは同じ結果が出ます。回答が少ない場合や傾向が拮抗する場合は、無理にタイプを決めません。配合は特徴への近さを合計100％で表したもので、人口比や的中率ではありません。</p>
</div></details>;}

function ResultView({result,answers,onEdit,onReset,onDelete,saveEnabled}:{result:Result;answers:Answer[];onEdit:(index:number)=>void;onReset:()=>void;onDelete:()=>void;saveEnabled:boolean}){
  const report=useMemo(()=>explain(result,answers),[result,answers]);
  const emblemRef=useRef<HTMLDivElement>(null);
  const [card,setCard]=useState<{blob:Blob;dataUrl:string}|null>(null);
  const [cardOpen,setCardOpen]=useState(false);
  const [message,setMessage]=useState('');
  const profile=result.profile;
  useEffect(()=>{let cancelled=false; if(profile)makeStoryCard(result,emblemRef.current?.querySelector('svg')??null).then(v=>{if(!cancelled)setCard(v);}).catch(()=>{if(!cancelled)setMessage('画像を作れませんでした。画面のスクリーンショットでも保存できます。');});return()=>{cancelled=true;};},[result,profile]);
  const shareText=profile?`私の夜タイプは「${profile.name}」。${profile.catch} #夜タイプ診断`:'';
  const resultUrl=()=>profile?`${window.location.origin}/types/${profile.key}/`:window.location.origin;
  async function shareImage(){
    if(!card||!profile)return;
    const file=new File([card.blob],`noble-${profile.key}.png`,{type:'image/png'});
    try{if(navigator.canShare?.({files:[file]})){await navigator.share({files:[file],title:'夜タイプ診断',text:shareText});}else{setCardOpen(true);}}
    catch(error){if(error instanceof Error&&error.name==='AbortError')return;setCardOpen(true);}
  }
  async function shareLink(){
    try{if(navigator.share){await navigator.share({title:profile?.name,text:shareText,url:resultUrl()});}else{await navigator.clipboard.writeText(`${shareText}\n${resultUrl()}`);setMessage('タイプ紹介のリンクをコピーしました。');}}
    catch(error){if(error instanceof Error&&error.name==='AbortError')return;setMessage('リンクをコピーできませんでした。タイプ図鑑から紹介ページを開けます。');}
  }
  return <div className="result-view">
    {profile?<>
      <section className="result-poster" style={{'--type-color':TRIBES[profile.tribe].color,'--type-soft':TRIBES[profile.tribe].soft} as CSSProperties}>
        <div className="poster-top"><span>NOBLE / YORU TYPE</span><span>No. {String(profile.index+1).padStart(2,'0')}</span></div>
        <div ref={emblemRef}><TypeEmblem tribe={profile.tribe} aura={profile.aura}/></div>
        <p className="poster-kicker">今回の回答に近い夜タイプは</p><h1>{profile.name}</h1><p className="poster-catch">{profile.catch}</p>
        <p className="poster-kind">{TRIBES[profile.tribe].label}<span>/</span>{AURAS[profile.aura]}</p>
      </section>
      <div className="share-actions"><button className="primary-button" disabled={!card} onClick={shareImage}>{card?'画像を保存・共有':'保存画像を準備しています'}</button><button className="text-button" onClick={shareLink}>タイプ紹介のリンクを共有 <span aria-hidden="true">↗</span></button><p className="micro">画像はストーリー用の縦長サイズ。リンクに回答は含まれません。</p></div>
      {cardOpen&&card&&<div className="image-save-panel"><div className="panel-heading"><h2>画像を長押しして保存</h2><button className="text-button" onClick={()=>setCardOpen(false)}>閉じる</button></div><Image src={card.dataUrl} width={1080} height={1920} unoptimized alt={`${profile.name}の夜タイプ結果カード`}/><a className="secondary-button" href={card.dataUrl} download={`noble-${profile.key}.png`}>画像をダウンロード</a></div>}
    </>:<section className="undecided"><p className="eyebrow">YOUR NIGHT PROFILE</p><h1>{result.kind==='insufficient'?'もう少し、あなたを知るために。':'今は、一つに絞らないあなた。'}</h1><p>{result.kind==='insufficient'?'分からないと答えた場面が多いため、タイプを決める材料が足りません。答えられる質問だけ、振り返ることもできます。':'今回の回答は、一つの方向に強く寄っていません。特定のタイプを当てはめず、場面ごとの自分を見てみましょう。'}</p><button className="primary-button" onClick={()=>onEdit(Math.max(0,answers.findIndex(a=>a===null)))}>回答を振り返る</button></section>}
    {message&&<p className="notice" role="status">{message}</p>}
    {result.kind!=='insufficient'&&<>
      <section className="reading-section"><p className="eyebrow">YOUR INNER STORY</p><h2>あなたらしさの、もう一歩奥へ。</h2><p className="opening-text">{report.opening}</p>
        {report.insight&&<div className="insight"><span className="insight-star" aria-hidden="true">✧</span><h3>{report.insight.title}</h3><p>{report.insight.text}</p></div>}
        <details className="evidence"><summary>回答のどこから、そう読める？</summary><div>{report.evidence.map(e=><div className="evidence-item" key={e.id}><p>{e.text}</p><span>{e.answer}</span><button className="text-button" onClick={()=>onEdit(QUESTIONS.findIndex(q=>q.id===e.id))}>回答を見直す</button></div>)}</div></details>
        {result.nearby&&<p className="nearby">「{result.nearby.name}」も近いタイプです。小さな違いで呼び名が変わる組み合わせなので、下の傾向も一緒に見てください。</p>}
      </section>
      <section className="reading-section"><p className="eyebrow">KEEP THESE WITH YOU</p><h2>覚えておきたい、4つのこと。</h2><div className="takeaway-grid">{report.cards.map((c,i)=><div className="takeaway" key={c.label}><span className="takeaway-number">0{i+1}</span><h3>{c.label}</h3><p>{c.text}</p></div>)}</div></section>
      <section className="reading-section"><p className="eyebrow">IN YOUR EVERYDAY NIGHT</p><h2>いつもの夜に、置き換えると。</h2><div className="story-chapter"><h3>席でのあなた</h3><p>{report.seat}</p></div><div className="story-chapter"><h3>人との距離感</h3><p>{report.relation}</p></div><div className="story-chapter"><h3>気持ちが動くきっかけ</h3><p>{report.motivation}</p></div></section>
    </>}
    <section className="reading-section"><p className="eyebrow">SEVEN PERSPECTIVES</p><h2>7つの視点で見る、あなた。</h2><p className="quiet">回答の中に見える傾向です。能力や順位を表すものではありません。</p><div className="axis-list">{AXES.map(axis=><div className="axis-row" key={axis}><div className="axis-title"><h3>{AXIS_LABELS[axis].name}</h3><span>{result.counts[axis]<3?'回答が少なめ':Math.abs(result.scores[axis])<.2?'どちらにも近い':result.scores[axis]>0?'右寄り':'左寄り'}</span></div><div className="axis-labels"><span>{AXIS_LABELS[axis].low}</span><span>{AXIS_LABELS[axis].high}</span></div><div className="axis-track" role="img" aria-label={`${AXIS_LABELS[axis].name}：${result.counts[axis]<3?'回答が少ないため参考':Math.abs(result.scores[axis])<.2?'どちらにも近い':result.scores[axis]>0?AXIS_LABELS[axis].high:AXIS_LABELS[axis].low}`}><span className="axis-center"/><span className={`axis-point ${result.counts[axis]<3?'faint':''}`} style={{left:`${5+(result.scores[axis]+1)*45}%`}}/></div></div>)}</div>
      {result.mixedAxes.length>0&&<p className="nearby">{result.mixedAxes.map(a=>AXIS_LABELS[a].name).join('・')}は、場面によって回答が分かれています。平均だけでは表しきれない部分です。</p>}
    </section>
    {profile&&<section className="reading-section mix-section"><p className="eyebrow">YOUR BLEND</p><h2>私らしさの配合。</h2><div className="mix-track" aria-hidden="true">{result.mix.map(m=><span key={m.key} style={{width:`${m.pct}%`,background:TRIBES[m.key].color}}/>)}</div><div className="mix-labels">{result.mix.map(m=><div key={m.key}><span className="mix-dot" style={{background:TRIBES[m.key].color}}/><span>{TRIBES[m.key].label}</span><strong>{m.pct}<small>%</small></strong></div>)}</div><p className="micro">5つの特徴への近さを、合計100％にした表現です。的中率や、世の中にいる割合ではありません。</p></section>}
    <div className="result-end"><button className="secondary-button" onClick={()=>onEdit(0)}>回答を見直す</button><button className="text-button" onClick={onReset}>回答を消して、もう一度</button>{saveEnabled&&<button className="text-button" onClick={onDelete}>この端末の保存を削除</button>}<p className="micro">{saveEnabled?'この端末のブラウザに保存しています。':'回答は、このページを閉じると残りません。'}</p></div>
    <TypeAtlas/><Method/>
  </div>;
}

export default function NightTypeApp(){
  const [view,setView]=useState<'home'|'questions'|'result'>('home');
  const [answers,setAnswers]=useState<Answer[]>([]),[index,setIndex]=useState(0);
  const [adult,setAdult]=useState(false),[saveEnabled,setSaveEnabled]=useState(false);
  const [saved,setSaved]=useState<Saved|null>(null),[notice,setNotice]=useState('');
  const [busy,setBusy]=useState(false);const locked=useRef(false),timer=useRef<ReturnType<typeof setTimeout>|null>(null);
  const questionHeading=useRef<HTMLHeadingElement>(null);
  useEffect(()=>{const s=readSaved();if(s){setSaved(s);setSaveEnabled(true);}return()=>{if(timer.current)clearTimeout(timer.current);};},[]);
  useEffect(()=>{if(saveEnabled&&view!=='home'){try{localStorage.setItem(STORAGE_KEY,JSON.stringify({version:VERSION,answers,index,view}));}catch{setSaveEnabled(false);setNotice('このブラウザに保存できませんでした。診断は続けられます。');}}},[saveEnabled,view,answers,index]);
  useEffect(()=>{if(view==='questions')questionHeading.current?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});},[view,index]);
  const result=useMemo(()=>view==='result'&&answers.length===QUESTIONS.length?diagnose(answers):null,[view,answers]);
  function start(){if(!adult)return;setAnswers([]);setIndex(0);setView('questions');setSaved(null);}
  function resume(){if(!adult||!saved)return;setAnswers(saved.answers);setIndex(saved.index);setView(saved.view);}
  function answer(value:Answer){
    if(locked.current)return;locked.current=true;setBusy(true);
    const next=[...answers];next[index]=value;setAnswers(next);
    timer.current=setTimeout(()=>{if(index===QUESTIONS.length-1)setView('result');else setIndex(index+1);locked.current=false;setBusy(false);},180);
  }
  function edit(i:number){setIndex(i);setView('questions');}
  function clearSaved(){try{localStorage.removeItem(STORAGE_KEY);}catch{}setSaveEnabled(false);setSaved(null);setNotice('この端末の保存を削除しました。');}
  function reset(){clearSaved();setAnswers([]);setIndex(0);setView('home');setAdult(false);}
  return <main className="night-app"><header className="site-header"><a href="/" aria-label="夜タイプ診断のホーム">NOBLE<span>YORU TYPE</span></a><span className="version-badge">試作版</span></header>
    {notice&&<p className="notice" role="status">{notice}</p>}
    {view==='home'&&<>
      <section className="landing"><div className="landing-copy"><p className="eyebrow">THE WAY YOU SHINE AT NIGHT</p><h1>夜のあなたは、<br/>どんな人？</h1><p className="landing-lead">接客の顔も、ふと出る素顔も。<br/>28の質問から、あなたらしさを言葉に。</p><div className="landing-meta"><span>28問</span><span>7つの視点</span><span>20タイプ</span></div>
      <div className="start-area"><label className="check-row"><input type="checkbox" checked={adult} onChange={e=>setAdult(e.target.checked)}/><span>18歳以上です</span></label><button className="primary-button" onClick={start} disabled={!adult}>夜タイプを見つける <span aria-hidden="true">→</span></button>{saved&&<button className="secondary-button" onClick={resume} disabled={!adult}>{saved.view==='result'?'保存した結果を見る':`続きから答える（${Math.min(saved.index+1,28)}問目）`}</button>}
        <label className="check-row save-check"><input type="checkbox" checked={saveEnabled} onChange={e=>{setSaveEnabled(e.target.checked);if(!e.target.checked)clearSaved();}}/><span>この端末に途中の回答と結果を保存する</span></label><p className="micro">登録は不要。最近の普段の自分を思い浮かべて答えてください。</p></div></div>
        <div className="landing-art" aria-hidden="true"><div className="art-orbit"/><div className="preview-card card-back" style={{'--type-color':'#316d65'} as CSSProperties}><TypeEmblem tribe="healer" aura="tennen"/><span>聖母</span></div><div className="preview-card card-front" style={{'--type-color':'#79629b'} as CSSProperties}><span className="preview-brand">YORU TYPE / 18</span><TypeEmblem tribe="muse" aura="cool"/><span className="preview-name">夜蝶</span><span className="preview-catch">静かな距離に、自分の輪郭を残す。</span></div><div className="art-caption">ひとつの呼び名。その奥に、あなたの物語。</div></div>
      </section><TypeAtlas/><Method/>
    </>}
    {view==='questions'&&<section className="question-screen"><div className="progress-caption"><span>QUESTION <strong>{String(index+1).padStart(2,'0')}</strong> / 28</span><span>{Math.round(index/28*100)}%</span></div><div className="question-progress" role="progressbar" aria-label="質問の進み具合" aria-valuemin={0} aria-valuemax={28} aria-valuenow={index}><span style={{width:`${index/28*100}%`}}/></div><div className="question-card"><p className="question-hint">最近の、普段のあなたなら。</p><h1 ref={questionHeading} tabIndex={-1} key={index}>{QUESTIONS[index].text}</h1></div><div className="answer-list" aria-label="当てはまり方を選ぶ">{CHOICES.map(c=><button type="button" key={c.value} disabled={busy} className={`answer-option ${answers[index]===c.value?'selected':''}`} aria-pressed={answers[index]===c.value} onClick={()=>answer(c.value)}><span className={`answer-mark intensity-${Math.abs(c.value)}`} aria-hidden="true"/><span>{c.label}</span></button>)}</div><div className="question-controls"><button type="button" className="text-button" disabled={busy||index===0} onClick={()=>setIndex(i=>i-1)}>← 戻る</button><button type="button" className="text-button" disabled={busy} onClick={()=>answer(null)}>この場面は分からない</button></div><p className="micro">分からない場面は飛ばせます。「どちらともいえない」とは分けて扱います。</p></section>}
    {view==='result'&&result&&<ResultView result={result} answers={answers} onEdit={edit} onReset={reset} onDelete={clearSaved} saveEnabled={saveEnabled}/>}
    <footer className="site-footer"><span>NOBLE / YORU TYPE</span><p>自分を決めつけるためではなく、自分を知るきっかけに。</p></footer>
  </main>;
}
