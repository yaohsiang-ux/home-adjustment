# Claude Skill 官方指南 5 大重點｜知識點影片（類 3D 風格）

以單一 HTML 檔製作的動態圖像影片：所有場景用 CSS 3D（perspective、preserve-3d、立體書本 / 書架 / 資料夾）和決定性時間軸驅動，再以 Playwright 逐格截圖、ffmpeg 合成 MP4。

| 檔案 | 用途 |
|---|---|
| `index.html` | 影片本體。直接用瀏覽器打開即可預覽，底部有播放 / 拖曳時間軸 |
| `out/skill-video.mp4` | 成品（1920×1080、30fps、2:48、含環境音樂） |
| `narration.md` | 旁白稿 + 分鏡表 + 官方原文對照（錄配音用） |
| `subtitles.srt` | 字幕檔，時間碼與畫面內建字幕一致，可直接匯入剪輯軟體或 YouTube |
| `render.mjs` | 逐格渲染腳本（Playwright → ffmpeg） |
| `make-music.sh` | 以 ffmpeg 合成背景環境音（可換成自己的音樂） |
| `make-srt.mjs` | 從 `index.html` 的字幕表重新產生 `subtitles.srt` |

## 預覽

直接開啟 `index.html`。頁面會載入 Google Fonts 的 Noto Sans TC；離線環境會退回系統中文字型。

## 重新渲染

```bash
# 需要 Node 18+、ffmpeg、playwright（npm i playwright && npx playwright install chromium）
node render.mjs --workers 4 --fps 30 --music --out out/skill-video.mp4
# 只渲染前 5 秒做測試
node render.mjs --maxsec 5 --workers 2 --out /tmp/test.mp4
# 渲染機器無法連網時，先把 Noto Sans TC 下載成本地 @font-face CSS，再用 --fonts 指定
node render.mjs --fonts /path/to/noto-local.css --music
```

## 加配音

本次環境無法連到語音合成服務，成品僅含畫面字幕與環境音。要加配音：

1. 依 `narration.md` 錄音（或用 TTS），每句對齊 `subtitles.srt` 的時間碼。
2. 混音：`ffmpeg -i out/skill-video.mp4 -i voice.wav -filter_complex "[0:a]volume=0.5[m];[m][1:a]amix=inputs=2:duration=first" -c:v copy out/skill-video-voiced.mp4`

## 改字幕或旁白

字幕表在 `index.html` 的 `const SUBS=[...]`（秒數起訖＋文字），改完執行 `node make-srt.mjs` 同步 SRT，再重新渲染。

## 技術備註

- 動畫全部由 `window.__seek(t)` 計算，同一時間點輸出永遠相同，適合逐格渲染。
- 帶背景色的元素請勿同時加 `transform-style: preserve-3d`，否則會被場景中其他 3D 平面切割而消失（已踩過）。
