import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 title: { default:'夜タイプ診断｜NOBLE', template:'%s｜夜タイプ診断 NOBLE' },
 description:'28の質問と7つの視点から、接客の顔も素顔も言葉に。20タイプで見る、NOBLE独自の自己理解診断。',
 robots:{index:false,follow:false},
 openGraph:{title:'夜タイプ診断｜NOBLE',description:'接客の顔も、ふと出る素顔も。28問から、あなたらしさを言葉に。',locale:'ja_JP',type:'website'},
 icons:{icon:'/icon.svg'}
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ja"><body>{children}</body></html>;}
