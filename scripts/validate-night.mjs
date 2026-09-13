import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import ts from 'typescript';
const path=resolve('lib/night-v6.ts');
const js=ts.transpileModule(readFileSync(path,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020,esModuleInterop:true}}).outputText;
const module={exports:{}};new Function('require','module','exports',js)(createRequire(path),module,module.exports);
const {AXES,QUESTIONS,PROFILES,diagnose,explain}=module.exports;
assert.equal(QUESTIONS.length,28);assert.equal(PROFILES.length,20);
assert.equal(new Set(QUESTIONS.map(q=>q.id)).size,28);
for(const axis of AXES){const qs=QUESTIONS.filter(q=>q.axis===axis);assert.equal(qs.length,4);assert.equal(qs.filter(q=>q.reverse).length,2);}
for(let value=-3;value<=3;value++){const a=Array(28).fill(value);assert.equal(diagnose(a).kind,'balanced');assert.equal(diagnose(a).profile,null);}
assert.equal(diagnose(Array(28).fill(null)).kind,'insufficient');
for(const invalid of [[],Array(27).fill(0),Array(29).fill(0),Array(28),Array(28).fill(NaN),Array(28).fill(4),Array(28).fill(.5),Array(28).fill(undefined)]) assert.throws(()=>diagnose(invalid));
for(let i=0;i<28;i++){const a=Array(28).fill(0);a[i]=3;const r=diagnose(a);assert.notEqual(r.scores[QUESTIONS[i].axis],0);for(const ax of AXES)if(ax!==QUESTIONS[i].axis)assert.equal(r.scores[ax],0);}
const partial=Array(28).fill(0);partial[0]=null;assert.notEqual(diagnose(partial).kind,'insufficient');partial[7]=null;assert.equal(diagnose(partial).kind,'insufficient');
let seed=20260913;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
const counts=Object.fromEntries(PROFILES.map(p=>[p.key,0]));let balanced=0,nearby=0;const samples={};
const ng=/今だけ|毎月.{0,10}損|絶対に稼げ|的中度|ハラスメントフリー|ギフト券/;
for(let i=0;i<30000;i++){
 const answers=Array.from({length:28},()=>Math.floor(rand()*7)-3);
 const r=diagnose(answers);assert.deepEqual(r,diagnose(answers));assert.equal(r.mix.reduce((s,x)=>s+x.pct,0),100);
 for(const x of r.mix)assert.ok(Number.isInteger(x.pct)&&x.pct>=0&&x.pct<=100);
 for(const x of Object.values(r.scores))assert.ok(Number.isFinite(x)&&x>=-1&&x<=1);
 const e=explain(r,answers);assert.ok(!ng.test(JSON.stringify(e)));assert.equal(e.cards.length,4);
 if(r.profile){counts[r.profile.key]++;samples[r.profile.key]??=answers;if(r.nearby)nearby++;}else balanced++;
}
for(const [key,n] of Object.entries(counts))assert.ok(n>0,`Unreachable: ${key}`);
assert.ok(!PROFILES.some(p=>ng.test(p.catch+p.description)));
for(const q of QUESTIONS)assert.ok(!PROFILES.some(p=>q.text.includes(p.name)),`Type label in question ${q.id}`);
assert.ok(existsSync('app/types/[key]/page.tsx'));
assert.ok(!readFileSync('components/NightTypeApp.tsx','utf8').includes('matchPercent'));
console.log(JSON.stringify({status:'PASS',version:'night-28-v6.0',questions:28,axes:7,typesReached:Object.keys(counts).length,seed:20260913,simulations:30000,balanced,nearby,counts,tests:['balanced keys','missing vs neutral','invalid input','all items affect their axis','same answers same result','mix totals 100','all 20 reachable','copy scan'],limitation:'Uniform synthetic answers; not population prevalence or psychometric validation.'},null,2));
if(process.env.NOBLE_WRITE_FIXTURES==='1')process.stdout.write('\nFIXTURES\n'+JSON.stringify(samples)+'\n');
