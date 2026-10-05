# 旁白稿與分鏡｜Claude Skill 官方指南 5 大重點

- 片長：2 分 48 秒（168 秒）｜1920×1080｜30fps｜類 3D 動態圖像風格
- 來源：Anthropic 官方文件〈Skill authoring best practices〉（platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices）
- 配音建議：台灣腔女聲或男聲皆可，語速約每秒 4.5 字；每句旁白的時間碼與 `subtitles.srt` 一致，直接對點即可。

| 時間 | 場景 | 畫面（類 3D） | 旁白 |
|---|---|---|---|
| 00:00–00:10 | 開場鉤子 | 一本 500 頁的紅色厚書從天而降，壓扁小機器人；「思考速度」儀表指針從快掉到慢 | 你塞給 AI 一本 500 頁的說明書，它不會變聰明，只會變慢。 |
| 00:10–00:16 | 片名 | 立體標題「Claude Skill 官方指南 5 大重點」轉入；三顆標籤：不到 3 分鐘、零程式碼、五個重點 + X 實戰 | 不到 3 分鐘、零程式碼，帶你看懂 Anthropic 官方的 Skill 撰寫指南。 |
| 00:16–00:25 | 核心原則 | 玻璃卡片翻入：「Claude 已經很聰明，只教它不知道的事。」三個自問句環繞飄浮 | 指南的核心只有一句話：Claude 已經很聰明，只教它不知道的事。 |
| 00:25–00:38 | Skill 是什麼 | 黃色資料夾 `my-skill/` 掀開，飛出三張卡：說明書 SKILL.md、範本、小程式；出現「教一次，一直用」 | Skill 是什麼？它就像一個資料夾，裝著說明書、範本和小程式。教一次，就能一直用。 |
| 00:38–00:54 | 漸進式揭露 | 一百本書的立體書架，掃光滑過書背；其中一本抽出，依序亮出「① 書背 永遠在」「② 內文 用到才翻」「③ 附錄 需要才讀」 | 平常 Claude 只看每本手冊的書背：名稱，加一句描述。要用時才翻開內文，附錄用到才讀。所以裝上一百個也不會塞爆。 |
| 00:54–00:56 | 章節轉場 | 「官方指南的 5 個重點」＋五色方塊翻入 | 接下來，拆解官方指南的 5 個重點。 |
| 00:56–01:13 | 重點一 寫短 | 「囉嗦版 ≈150 tokens」與「精簡版 ≈50 tokens」並列，剪刀剪掉囉嗦版；500 行進度條；最後三個自問句卡片 | 重點一，寫短。SKILL.md 正文控制在 500 行以內，長了就拆成附錄檔。每一段都問自己：Claude 真的需要這段解釋嗎？不需要，就刪。 |
| 01:13–01:30 | 重點二 把書背寫清楚 | 金色書背 `description:`；拆解成「WHAT 做什麼 ＋ WHEN 什麼時候用」；四個提示標籤；三個反例抖動（幫忙處理文件…） | 重點二，把書背寫清楚。description 要同時寫「做什麼」和「什麼時候用」。Claude 靠這一句從上百個 Skill 裡挑中你。只寫「幫忙處理文件」，它永遠找不到你。 |
| 01:30–01:47 | 重點三 看路況給自由度 | 左：懸崖獨木橋上的機器人小步前進（低自由度，`migrate.py` 指令不可改）；右：草原上的機器人自由漫步（高自由度，程式碼審查四步驟）；自由度滑桿由左滑到右 | 重點三，看路況給自由度。懸崖邊的獨木橋，就給精確指令，一步都不能改。開闊的草原，給方向就好，路讓它自己找。資料庫遷移是前者，程式碼審查是後者。 |
| 01:47–02:04 | 重點四 先出考卷再寫課本 | 白色考卷 `evals.json` 三題逐一打勾；紫色課本「剛好能過關的最少說明」由厚變薄；五步驟標籤：找缺口 → 出 3 題 → 量基準 → 寫最少說明 → 跑評估、迭代 | 重點四，先出考卷再寫課本。先讓 Claude 不帶 Skill 做一次，記下它哪裡做錯。針對缺口出三道考題，再寫剛好能過關的最少說明。解決真問題，不是想像的問題。 |
| 02:04–02:21 | 重點五 讓 Claude 教 Claude | 藍色 Claude A 與粉色 Claude B；SKILL.md v1 從 A 飛向 B；B 卡住「忘了過濾測試帳號」，紅色回饋箭頭回到 A；v2 再飛向 B | 重點五，讓 Claude 教 Claude。Claude A 幫你寫 Skill，Claude B 拿著它做真實任務。B 哪裡卡住，就回頭告訴 A 修。用觀察到的行為迭代，不靠猜。 |
| 02:21–02:39 | X 上的實戰 | 卡片一：Claude Code changelog v2.1.154「lean system prompt」，進度條 100% → 18%，評測無可測量損失；卡片二：行數從 1,600+ 倒數到 183，文件縮成一小截；最後巨大「少即是多」 | X 上的實戰：Anthropic 為新一代模型刪掉八成系統提示，評測沒有可測量的損失。也有人把 Skill 從一千六百多行砍到 183 行，功能完全一樣。到了 Opus 5.5 這一代，少即是多。 |
| 02:39–02:48 | 收尾 | 五張重點卡片立體堆疊落下；「收藏起來，下次寫 Skill 前再看一次。」 | 收藏起來，下次寫 Skill 前再看一次。 |

## 五個重點與官方原文對照

1. **寫短** — Core principles › Concise is key：「The context window is a public good」「Default assumption: Claude is already very smart」；Progressive disclosure：「Keep SKILL.md body under 500 lines」。
2. **把書背寫清楚** — Writing effective descriptions：「should include both what the Skill does and when to use it」「Always write in third person」「Claude uses it to choose the right Skill from potentially 100+ available Skills」。
3. **看路況給自由度** — Set appropriate degrees of freedom：「Narrow bridge with cliffs on both sides」（low freedom，資料庫遷移）vs「Open field with no hazards」（high freedom，程式碼審查）。
4. **先出考卷再寫課本** — Build evaluations first：「Create evaluations BEFORE writing extensive documentation」；五步驟：Identify gaps → Create evaluations（three scenarios）→ Establish baseline → Write minimal instructions → Iterate。
5. **讓 Claude 教 Claude** — Develop Skills iteratively with Claude：Claude A 設計與修訂、Claude B 真實任務測試、觀察後回饋；「Iterate based on these observations rather than assumptions」。

## X 實戰案例的依據

- 「刪掉八成系統提示」：Anthropic 在 Claude Code changelog v2.1.154 以「lean system prompt」描述，為 Opus 5 / Fable 5 世代移除 80% 以上的 Claude Code 系統提示，coding evals 無可測量損失（多家媒體與社群貼文轉述）。
- 「1,600 多行砍到 183 行」：X 社群使用者分享的個案，影片以「也有人」帶過，未指名。
