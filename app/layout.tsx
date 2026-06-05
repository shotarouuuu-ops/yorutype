import type { Metadata } from 'next';
import { Noto_Sans_JP, Shippori_Mincho } from 'next/font/google';
import './globals.css';

const sans = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-sans-jp', weight: ['400', '500', '700', '900'] });
const serif = Shippori_Mincho({ subsets: ['latin'], variable: '--font-serif-jp', weight: ['500', '600', '700'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yoru-shindan.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: '夜職診断｜あなたに向いている夜職タイプがわかる無料診断',
  description: '18問であなたに向いている夜職タイプを診断。キャバクラ・クラブなど夜職で活きる魅力、向いている環境、気をつけたいポイントをスマホで無料チェックできます。',
  keywords: ['夜職 診断', '夜職タイプ', 'キャバクラ 診断', 'ナイトワーク 診断', '向いている夜職'],
  openGraph: {
    title: '夜職診断｜あなたに向いている夜職タイプがわかる無料診断',
    description: 'あなたに向いている夜職タイプを無料診断。結果はInstagramやTikTokでシェアしやすいカードで表示されます。',
    url: '/',
    siteName: 'NOBLE 夜職診断',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/ogp.svg',
        width: 1200,
        height: 630,
        alt: '夜職診断｜あなたに向いている夜職タイプがわかる無料診断'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: '夜職診断｜あなたに向いている夜職タイプがわかる無料診断',
    description: '18問であなたに向いている夜職タイプを無料診断。',
    images: ['/ogp.svg']
  },
  alternates: {
    canonical: '/'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className={`${sans.variable} ${serif.variable} font-sansjp`}>{children}</body>
    </html>
  );
}
