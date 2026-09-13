import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROFILES, getProfile, TRIBES, AURAS } from '@/lib/night-v6';
import TypeEmblem from '@/components/TypeEmblem';
import type { CSSProperties } from 'react';
export function generateStaticParams(){return PROFILES.map(p=>({key:p.key}));}
export async function generateMetadata({params}:{params:Promise<{key:string}>}):Promise<Metadata>{
  const profile=getProfile((await params).key);if(!profile)return {title:'タイプが見つかりません'};
  return {title:profile.name,description:profile.catch,openGraph:{title:`${profile.name}｜夜タイプ診断`,description:profile.catch,locale:'ja_JP',type:'website'}};
}
export default async function TypePage({params}:{params:Promise<{key:string}>}){
  const profile=getProfile((await params).key);if(!profile)notFound();const theme=TRIBES[profile.tribe];
  return <main className="night-app"><header className="site-header"><a href="/">NOBLE<span>YORU TYPE</span></a><span className="version-badge">タイプ図鑑</span></header><article className="type-detail">
    <section className="result-poster" style={{'--type-color':theme.color,'--type-soft':theme.soft} as CSSProperties}><div className="poster-top"><span>NOBLE / YORU TYPE</span><span>No. {String(profile.index+1).padStart(2,'0')}</span></div><TypeEmblem tribe={profile.tribe} aura={profile.aura}/><p className="poster-kicker">20の夜タイプ</p><h1>{profile.name}</h1><p className="poster-catch">{profile.catch}</p><p className="poster-kind">{theme.label}<span>/</span>{AURAS[profile.aura]}</p></section>
    <section className="reading-section"><p className="eyebrow">ABOUT THIS TYPE</p><h2>「{profile.name}」という輪郭。</h2><p>{profile.description}</p></section><p className="quiet">これはタイプの紹介ページです。<br/>診断では、回答に沿ったあなた自身の説明が読めます。</p><a className="primary-button" href="/">自分の夜タイプを見つける →</a><p className="quiet">28問 · NOBLE独自の自己理解診断</p></article><footer className="site-footer"><span>NOBLE / YORU TYPE</span><p>このページに、誰かの回答は含まれていません。</p></footer></main>;
}
