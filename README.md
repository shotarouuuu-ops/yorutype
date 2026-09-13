# 夜タイプ診断 / NOBLE

28問・7つの視点・20タイプの自己理解診断の試作です。独自の質問・採点・結果文を使い、公式MBTI検査や妥当性が実証された心理尺度とは称しません。

## 現在の体験

- 18歳以上の自己申告 → 28問 → 根拠付きの結果文。
- 分からない場面を飛ばせる。回答不足や傾向が拮抗する場合は、タイプを決めつけない。
- 端末への途中保存は本人が選んだ場合だけ。再開・削除が可能。
- ブラウザ内で縦長PNGを生成。タイプ紹介ページの共有リンクには回答を含めない。
- 全20タイプの静的な紹介ページと図鑑。

店舗マッチング・外部AI・回答収集は接続していません。図版はSVG紋章の試作です。検索向け一般公開前のため、robotsはnoindex、sitemapは空です。

詳しい設計と限界は [設計記録](docs/night-28-design.md)、実施した確認は [検証記録](docs/night-28-verification.md) を参照してください。

## Development

```bash
npm install
npm run dev
```

## Checks

```bash
npm run typecheck
npm test
npm run build
```

Node.js 20.9以上が必要です。ビルドはNext.js 16.2.6のwebpackを使い、`out/`に静的ファイルを生成します。ローカルの静的確認には、Pythonがある環境で `python3 -m http.server 4173 --directory out` を使えます。`next start`は静的エクスポートでは使いません。

実行経路は `app/page.tsx` → `components/NightTypeApp.tsx` → `lib/night-v6.ts` です。旧18問実装の `DiagnosisApp.tsx` と `diagnosis.ts` は比較用に残していますが、現在のページからは参照しません。

## 検証範囲

3万件の合成回答による構造テストとTypeScript・ビルドは通過しています。実ユーザーでの妥当性・再受験時の安定性・完走率は未検証です。ブラウザ環境からローカルページに接続できず、画面操作とiPhoneの共有機能は未確認です。一般公開の完成版ではありません。
