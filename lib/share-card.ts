import { TRIBES, AURAS, type Result } from './night-v6';

function wrap(ctx: CanvasRenderingContext2D, text: string, width: number): string[] {
  const lines: string[] = []; let line = '';
  for (const ch of text) { if (ctx.measureText(line+ch).width > width && line) { lines.push(line); line = ch; } else line += ch; }
  if (line) lines.push(line); return lines;
}

export async function makeStoryCard(result: Result, emblem: SVGSVGElement | null) {
  const profile = result.profile;
  if (!profile) throw new Error('タイプがある結果のみ画像にできます。');
  const c = document.createElement('canvas'); c.width = 1080; c.height = 1920;
  const x = c.getContext('2d'); if (!x) throw new Error('画像の作成に対応していません。');
  const theme = TRIBES[profile.tribe];
  x.fillStyle = '#faf6f0'; x.fillRect(0,0,1080,1920);
  const gradient = x.createRadialGradient(540,510,20,540,510,700);
  gradient.addColorStop(0,theme.soft); gradient.addColorStop(1,'#faf6f0');
  x.fillStyle=gradient; x.fillRect(0,0,1080,1460);
  x.strokeStyle='#d6c9bc'; x.lineWidth=2; x.strokeRect(52,52,976,1816);
  x.fillStyle='#342737'; x.textAlign='center';
  x.font='36px Georgia, serif'; x.fillText('N O B L E',540,153);
  x.font='24px sans-serif'; x.fillStyle='#766874'; x.fillText('Y O R U   T Y P E',540,204);
  if (emblem) {
    const clone=emblem.cloneNode(true) as SVGSVGElement;
    clone.setAttribute('xmlns','http://www.w3.org/2000/svg'); clone.setAttribute('width','560'); clone.setAttribute('height','560'); clone.style.color=theme.color;
    const url=URL.createObjectURL(new Blob([new XMLSerializer().serializeToString(clone)],{type:'image/svg+xml'}));
    try { const img=new Image(); await new Promise<void>((resolve,reject)=>{ img.onload=()=>resolve();img.onerror=()=>reject(new Error('画像を読み込めませんでした。'));img.src=url; }); x.drawImage(img,260,310,560,560); }
    finally { URL.revokeObjectURL(url); }
  }
  x.fillStyle=theme.color; x.font='30px sans-serif'; x.fillText('私の夜タイプ',540,960);
  x.font='126px "Hiragino Mincho ProN", "Noto Serif CJK JP", serif'; x.fillText(profile.name,540,1130,850);
  x.font='36px "Hiragino Sans", sans-serif'; x.fillStyle='#342737';
  wrap(x,profile.catch,820).forEach((line,i)=>x.fillText(line,540,1233+i*60));
  x.font='30px sans-serif';x.fillStyle='#766874';x.fillText(`${theme.label}  /  ${AURAS[profile.aura]}`,540,1400);
  x.textAlign='left';x.fillStyle='#342737';x.font='30px sans-serif';x.fillText('私らしさの配合',105,1530);
  let left=105; const width=870;
  result.mix.forEach(m=>{x.fillStyle=TRIBES[m.key].color;x.fillRect(left,1572,width*m.pct/100,20);left+=width*m.pct/100;});
  result.mix.forEach((m,i)=>{x.fillStyle=TRIBES[m.key].color;x.font='24px sans-serif';x.fillText(`${TRIBES[m.key].label} ${m.pct}%`,105+(i%3)*300,1640+Math.floor(i/3)*48);});
  x.textAlign='center';x.fillStyle='#766874';x.font='25px sans-serif';x.fillText('#夜タイプ診断',540,1790);
  x.font='20px sans-serif';x.fillText('NOBLEの自己理解診断 · 配合は的中率ではありません',540,1830);
  const blob=await new Promise<Blob>((resolve,reject)=>c.toBlob(b=>b?resolve(b):reject(new Error('画像を作れませんでした。')),'image/png'));
  return {blob,dataUrl:c.toDataURL('image/png')};
}
