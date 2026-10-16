# 臨床教學影片學習入口（portal）內容紀錄

## 來源
- 網址：https://clinical-video-learning-portal-2026.workspace-304912.chatgpt.site/portal
- 紀錄日期：2026-10-16
- 取得方式：雲端工作階段的網路政策拒絕連線至 chatgpt.site，且該主機名稱無法公開解析，因此由使用者在瀏覽器另存為 Word 檔後上傳，再轉出文字版。
- Word 檔屬性：由 python-docx 產生，最後修改時間 2026-10-15 05:34 UTC。

## 檔案
| 檔案 | 說明 |
|---|---|
| clinical-teaching-video-designer-skill.docx | 使用者上傳的原始 Word 檔，未修改 |
| clinical-teaching-video-designer-skill.md | 以 pandoc 轉出的 Markdown 文字版，內容逐字保留 |

## 內容摘要
頁面是一份課程教材，供學員練習把 Word 中的工作規範轉換成可重複使用的 AI Skill。文件本身不是已安裝的 Skill。

- **Skill 基本設定**：建議名稱 clinical-teaching-video-designer；功能是引導臨床教師把臨床情境轉成能力導向、具醫學安全把關的教學黃金文本，並產生 NotebookLM／Gemini 影音摘要指令。
- **角色與任務**：臨床醫學教育設計師與生成式 AI 教材轉化專家，使用繁體中文與臺灣臨床術語，重視 CBME、臨床推理、病人安全與跨職類合作。
- **互動總原則**：四階段漏斗式訪談，每回合最多一個主要問題並提供 3～4 個選項；需求確認前不得自行生成整篇教案。
- **四個訪談階段**：教學對象與能力層級、核心情境與主題（提醒去識別化）、核心思辨與觀念盲點、新手常見陷阱。
- **生成前確認**：先摘要受眾、案例、主題、思辨、陷阱與三項學習目標，經使用者確認後才生成。
- **醫學證據與安全**：不得虛構研究、指引、劑量或 SOP；無法查核者標示「待查證」；新增情節標示「教學模擬情境」；產出須經臨床教師審查。
- **學習目標與敘事**：以 Bloom 可觀察動詞設計三項目標；敘事採「臨床情境→關鍵決策→迷思反轉→安全行動→核心記憶點」，單一主講人。
- **輸出 A**：2,500～3,500 字教案專文，四個模組對應 5～6 分鐘影片的時間分配。
- **輸出 B**：200～350 字可貼入 NotebookLM／Gemini 的影音生成指令。
- **輸出 C**：教師審查清單（七項勾選）。
- **輸出品質標準**：準確、適切、真實、連貫、精簡；不誇大戲劇性。

## 衍生文件
- `.claude/skills/video-production-assistant/SKILL.md`：依本教材整理的 Skill。
- `.claude/skills/video-production-assistant/references/script-spec.md`：影片腳本規範與規格，逐條標示可追溯至教材或為製作建議。
