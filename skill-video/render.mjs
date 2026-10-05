// 逐格渲染 index.html → MP4
// 用法：node render.mjs [--fps 30] [--workers 4] [--out out/skill-video.mp4] [--fonts /path/to/local-fonts.css] [--music]
// 需求：playwright（含 chromium）、ffmpeg。index.html 以 window.__seek(t) 決定性驅動，每一格都可重現。
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
function loadPlaywright() {
  for (const p of ['playwright', '/opt/node-tools/node_modules/playwright']) {
    try { return require(p); } catch {}
  }
  throw new Error('找不到 playwright，請先 npm i playwright');
}
const { chromium } = loadPlaywright();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map((a, i, arr) => a.startsWith('--') ? [a.slice(2), arr[i + 1] && !arr[i + 1].startsWith('--') ? arr[i + 1] : true] : []).filter(Boolean));
const FPS = +(args.fps || 30);
const WORKERS = +(args.workers || 4);
const OUT = path.resolve(args.out || path.join(__dirname, 'out', 'skill-video.mp4'));
const FONTS_CSS = args.fonts ? path.resolve(args.fonts) : null;
const WITH_MUSIC = !!args.music;
const PAGE = 'file://' + path.join(__dirname, 'index.html') + '?render';
const TMP = path.join(path.dirname(OUT), 'segments');
fs.mkdirSync(TMP, { recursive: true });

function fontStyle() {
  if (!FONTS_CSS) return null;
  const dir = path.dirname(FONTS_CSS);
  return fs.readFileSync(FONTS_CSS, 'utf8').replace(/url\(([^)]+)\)/g, (m, p) => /^https?:|^file:|^data:/.test(p) ? m : `url(file://${path.join(dir, p)})`);
}

async function openPage(browser) {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  await page.goto(PAGE);
  const css = fontStyle();
  if (css) await page.addStyleTag({ content: css });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all(['400', '700', '900'].map(w => document.fonts.load(`${w} 40px "Noto Sans TC"`))));
  await page.waitForTimeout(300);
  return page;
}

async function renderSegment(browser, idx, from, to, total) {
  const page = await openPage(browser);
  const seg = path.join(TMP, `seg_${String(idx).padStart(2, '0')}.mp4`);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '19', '-pix_fmt', 'yuv420p', seg]);
  let ffErr = ''; ff.stderr.on('data', d => ffErr += d);
  const done = new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg: ' + ffErr))));
  const t0 = Date.now();
  for (let f = from; f < to; f++) {
    await page.evaluate(t => window.__seek(t), f / FPS);
    const buf = await page.screenshot({ type: 'jpeg', quality: 94 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - from) % 150 === 0) console.log(`[seg ${idx}] ${f - from}/${to - from} frames  (${((Date.now() - t0) / 1000).toFixed(0)}s)`);
  }
  ff.stdin.end();
  await done;
  await page.close();
  return seg;
}

async function main() {
  const probe = await chromium.launch();
  const p = await openPage(probe);
  const TOTAL = await p.evaluate(() => window.__TOTAL);
  await probe.close();
  const frames = Math.round(Math.min(TOTAL, args.maxsec ? +args.maxsec : TOTAL) * FPS); // --maxsec 可只渲染前幾秒做測試
  console.log(`總長 ${TOTAL}s · ${frames} 格 · ${FPS}fps · ${WORKERS} workers`);

  const per = Math.ceil(frames / WORKERS);
  const jobs = [];
  for (let i = 0; i < WORKERS; i++) {
    const from = i * per, to = Math.min(frames, from + per);
    if (from >= to) break;
    jobs.push((async () => { const b = await chromium.launch(); try { return await renderSegment(b, i, from, to, frames); } finally { await b.close(); } })());
  }
  const segs = await Promise.all(jobs);
  const list = path.join(TMP, 'list.txt');
  fs.writeFileSync(list, segs.map(s => `file '${s}'`).join('\n'));
  const silent = path.join(TMP, 'video_only.mp4');
  await run('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', list, '-c', 'copy', silent]);

  if (WITH_MUSIC) {
    const music = path.join(TMP, 'music.m4a');
    await run('bash', [path.join(__dirname, 'make-music.sh'), String(TOTAL), music]);
    await run('ffmpeg', ['-y', '-loglevel', 'error', '-i', silent, '-i', music, '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-shortest', OUT]);
  } else {
    fs.copyFileSync(silent, OUT);
  }
  console.log('完成：', OUT);
}
function run(cmd, a) { return new Promise((res, rej) => { const c = spawn(cmd, a, { stdio: 'inherit' }); c.on('close', code => code === 0 ? res() : rej(new Error(cmd + ' exit ' + code))); }); }
main().catch(e => { console.error(e); process.exit(1); });
