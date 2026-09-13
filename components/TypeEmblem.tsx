import type { Aura, Tribe } from '@/lib/night-v6';

export default function TypeEmblem({ tribe, aura, className = '' }: { tribe: Tribe; aura: Aura; className?: string }) {
  return <svg className={`type-emblem ${className}`} viewBox="0 0 200 200" fill="none" aria-hidden="true">
    <circle cx="100" cy="100" r="77" stroke="currentColor" strokeWidth=".75" opacity=".3" />
    <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth=".75" opacity=".15" />
    <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {aura === 'hanayaka' && Array.from({length:12},(_,i) => <path key={i} d="M100 11v10" transform={`rotate(${i*30} 100 100)`} />)}
      {aura === 'cool' && <path d="M142 24c-33 6-55 36-55 72s22 62 49 73c-47-3-79-33-79-74 0-33 24-60 57-69" opacity=".3" />}
      {aura === 'tennen' && <><path d="M27 140q20 25 47 27M173 140q-20 25-47 27M27 60q20-25 47-27M173 60q-20-25-47-27" /><circle cx="100" cy="21" r="3" /><circle cx="100" cy="179" r="3" /></>}
      {aura === 'doryoku' && <><path d="M100 8l7 15-7 15-7-15zM100 162l7 15-7 15-7-15zM8 100l15-7 15 7-15 7zM162 100l15-7 15 7-15 7z" /></>}
      {tribe === 'hunter' && <><path d="M60 90l13 36h54l13-36-25 12-15-35-15 35zM77 137h46" /><circle cx="60" cy="86" r="3" /><circle cx="100" cy="60" r="3" /><circle cx="140" cy="86" r="3" /></>}
      {tribe === 'queen' && <><path d="M100 53l12 33 35 14-35 13-12 34-12-34-35-13 35-14zM100 75v50M75 100h50" /><circle cx="100" cy="100" r="37" opacity=".35" /></>}
      {tribe === 'healer' && <><path d="M100 146C28 107 64 54 100 90c36-36 72 17 0 56zM100 131V95M100 117l-15-10M100 109l14-9" /><path d="M78 59q22-17 44 0" /></>}
      {tribe === 'brain' && <><path d="M100 53l40 47-40 47-40-47zM100 53l17 47-17 47-17-47zM60 100h80" /><circle cx="100" cy="100" r="8" fill="currentColor" fillOpacity=".08" /></>}
      {tribe === 'muse' && <><path d="M98 81C62 39 29 86 87 105c-49 3-40 48-7 26l20-21 20 21c33 22 42-23-7-26 58-19 25-66-11-24M100 82v51M100 83l-11-20M100 83l11-20" /></>}
    </g>
  </svg>;
}
