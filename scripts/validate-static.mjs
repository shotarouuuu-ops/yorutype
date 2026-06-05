import { readFileSync, existsSync } from 'node:fs';

const checks = [];
const assert = (name, condition) => checks.push({ name, condition });
const read = (path) => readFileSync(path, 'utf8');

const layout = read('app/layout.tsx');
const page = read('app/page.tsx');
const diagnosis = read('lib/diagnosis.ts');
const component = read('components/DiagnosisApp.tsx');
const pkg = JSON.parse(read('package.json'));

assert('Next.js dependency is declared', Boolean(pkg.dependencies?.next));
assert('React dependency is declared', Boolean(pkg.dependencies?.react));
assert('TypeScript dependency is declared', Boolean(pkg.devDependencies?.typescript));
assert('Tailwind dependency is declared', Boolean(pkg.devDependencies?.tailwindcss));
assert('Required SEO title exists', layout.includes('夜職診断｜あなたに向いている夜職タイプがわかる無料診断'));
assert('Required h1 exists', page.includes('夜職診断｜あなたに向いている夜職タイプを無料診断'));
assert('Open Graph metadata exists', layout.includes('openGraph'));
assert('sitemap route exists', existsSync('app/sitemap.ts'));
assert('robots route exists', existsSync('app/robots.ts'));
assert('SNS share support exists', component.includes('navigator.share') && component.includes('navigator.clipboard'));
assert('Diagnosis questions are defined', (diagnosis.match(/id: 'q\d+'/g) ?? []).length >= 18);
assert('Five night type result profiles exist', (diagnosis.match(/key: '(queen|strategist|healer|muse|challenger)'/g) ?? []).length >= 5);

const failed = checks.filter((check) => !check.condition);
for (const check of checks) {
  console.log(`${check.condition ? 'PASS' : 'FAIL'} ${check.name}`);
}

if (failed.length) {
  process.exitCode = 1;
}
