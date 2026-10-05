// 從 index.html 的 SUBS 產生 subtitles.srt（給上字幕 / 配音對點用）
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const m = html.match(/const SUBS=\[([\s\S]*?)\];\nwindow\.__SUBS/);
if (!m) throw new Error('找不到 SUBS');
const rows = [...m[1].matchAll(/\[([\d.]+),([\d.]+),'(.*?)'\]/g)].map(r => [+r[1], +r[2], r[3].replace(/<[^>]+>/g, '')]);
const ts = s => { const h = Math.floor(s / 3600), mi = Math.floor(s % 3600 / 60), se = Math.floor(s % 60), ms = Math.round((s % 1) * 1000); return `${String(h).padStart(2,'0')}:${String(mi).padStart(2,'0')}:${String(se).padStart(2,'0')},${String(ms).padStart(3,'0')}`; };
const srt = rows.map((r, i) => `${i + 1}\n${ts(r[0])} --> ${ts(r[1])}\n${r[2]}\n`).join('\n');
fs.writeFileSync(path.join(dir, 'subtitles.srt'), srt);
console.log(`subtitles.srt：${rows.length} 句`);
