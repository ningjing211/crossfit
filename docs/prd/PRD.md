# CrossFit Diary PRD

狀態：已確認。這一版是內容站，不是編輯工具。

## 已確認

這是一本上課日記，不是健身社群，也不是館務系統。

- 一位教練、一位選手。
- 使用習慣是每週上一堂。系統不排程、不提醒。
- 一堂課會記下三段內容：暖身、重訓、實作頻率（例如 EMOM）。原文「重訊」先依課表範例讀成重訓。
- 動作要能記錄：名稱、圖片、影片、描述（施作要點）、施作方式與速度、頻率與時間、組數。
- 一堂課要能記錄：學生的感受、老師的感受、上課地點、器材、天氣。
- 參考對象是一般健身／重訓紀錄，但範圍只到上面這些欄位。

### 課表範例

原文日期只有 October 7，沒有年份。示例日期先用 `2026-10-07`。

WOD October 7

- Warm-Up：40 Shoulder Taps、10 Banded Pull Aparts、10 Single Arm Row (5/5)、10 V-Ups
- Movement Prep：Triple Extension、Ascending Scarecrow Pull、Muscle Clean（各有一段做法說明）
- EMOM10：每分鐘一輪，共 10 分鐘。Sets 1–5 為 4 to 6 Single Arm Muscle Clean (3/3)；Sets 6–10 為 4 to 6 Single Arm Push Press (3/3)；該分鐘剩下的時間休息

左右次數（5/5、3/3）與「剩下的時間休息」必須能留在這堂課的紀錄裡。

## 已確認的做法

1. 老師和學生不在 App 裡新增或編輯。開發者把上課內容寫進專案，Web 與 Mobile 只呈現。
2. 內容放在 `shared/frontend/data-access/src/catalog.ts`。畫面不連 Firestore。
3. 動作庫與課表仍是兩種資料。課表項目抄下當時的動作名稱。左右次數寫在該項備註。
4. 圖片與影片有檔案才顯示。Banded Pull Aparts、Single Arm Row、V-Ups、Single Arm Push Press 使用 RepDB 免費版的完成姿勢插畫，畫面標示 Exercise data by RepDB (repdb.co)。Shoulder Taps 使用 Workout Guide 的 Plank Shoulder Tap，署名 Bryl Lim、CC BY-SA 4.0，並註明依 Everkinetic 延伸、線條改為深色。October 7 這堂課的最後另有一張連續動作總覽。其餘動作與所有影片仍沒有檔案。
5. 日記五個欄位若開發者有寫，就顯示；空白欄位不出現，也沒有填寫表單。
6. 不登入。部署用的 Security Rules 維持全部拒絕。

## 明確不做

重量、PR、1RM、身體數據、營養、社群、排行、多學員、多教練、約課、推播、聊天、代幣、付款、對外 REST API。
