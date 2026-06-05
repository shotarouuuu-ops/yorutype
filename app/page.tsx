import DiagnosisApp from '@/components/DiagnosisApp';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '夜職診断',
  applicationCategory: 'LifestyleApplication',
  operatingSystem: 'Web',
  description: 'あなたに向いている夜職タイプがわかる無料診断アプリ',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY'
  }
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-blush text-plum">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_8%,rgba(217,138,164,0.38),transparent_32rem),radial-gradient(circle_at_84%_18%,rgba(169,139,224,0.26),transparent_28rem),linear-gradient(180deg,#fff8fa_0%,#f8edf2_48%,#201525_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full border border-champagne/20" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[480px] flex-col px-5 py-6">
        <header className="mb-6 flex items-center justify-between text-xs font-bold tracking-[0.28em] text-wine/70">
          <span>NOBLE</span>
          <span>YORU TYPE</span>
        </header>

        <section className="mb-7 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.45em] text-wine/55">Night work personality test</p>
          <h1 className="mt-4 font-serifjp text-[2.45rem] font-semibold leading-tight tracking-[0.04em] text-plum sm:text-5xl">
            夜職診断｜あなたに向いている夜職タイプを無料診断
          </h1>
          <p className="mx-auto mt-5 max-w-sm text-sm leading-8 text-plum/66">
            キャバクラ・クラブなど、夜職で活きる魅力と働きやすい環境を診断。結果はSNSでシェアしたくなるカードで表示します。
          </p>
        </section>

        <DiagnosisApp />

        <footer className="mt-8 pb-5 text-center text-[11px] leading-6 text-white/58">
          <p>この診断は自己理解を目的とした簡易診断です。結果は優劣ではありません。</p>
          <p className="mt-2">© NOBLE Yoru Type</p>
        </footer>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
    </main>
  );
}
