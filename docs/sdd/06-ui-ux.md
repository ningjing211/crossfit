# 06 UI／UX

語系是繁體中文。動作名稱維持課表原文。這一版沒有新增或編輯。

空狀態與載入必須用不同句子。

| 狀態 | 文案 |
| --- | --- |
| 載入課表 | 正在讀取課表 |
| 沒有任何一堂課 | 還沒有上課紀錄 |
| 載入動作 | 正在讀取動作 |
| 沒有任何動作 | 還沒有動作 |
| 讀取失敗 | 讀取失敗，請再試一次 |
| 再試一次 | 再試一次 |
| 找不到這堂課 | 找不到這堂課 |
| 找不到這個動作 | 找不到這個動作 |

## 呈現

課表頁顯示區塊標題、訓練方式、動作名稱、頻率與時間、組數、速度、備註。空白欄位不顯示。

動作名稱連到該動作頁。動作頁在有內容時顯示圖片、影片、施作要點、施作方式。

來自 RepDB 的圖，圖下顯示連結：Exercise data by RepDB (repdb.co)。

來自 Workout Guide 的圖，圖下顯示 Bryl Lim、CC BY-SA 4.0，以及依 Everkinetic 延伸、線條改為深色。

有整堂課總覽圖時，放在各動作之後、日記之前，標題為整堂課。

日記只在開發者寫了文字時出現，標籤為：學生的感受、老師的感受、上課地點、器材、天氣。

導覽：課程、動作。Mobile 另有返回。

## Web

不使用 Ionic。頁首連結：課程、動作。

| Route | 畫面 |
| --- | --- |
| `/` | 課程列表 |
| `/sessions/:id` | 這一堂課 |
| `/movements` | 動作列表 |
| `/movements/:id` | 這個動作 |

## Mobile

頁面在 `apps/mobile/src/app/features/`。底部 tabs 在 `apps/mobile/src/app/layout/`。

| Route | 畫面 |
| --- | --- |
| `/sessions` | 課程列表 |
| `/sessions/:id` | 這一堂課 |
| `/movements` | 動作列表 |
| `/movements/:id` | 這個動作 |

## 平台差異

- Web 用較寬的版面。不做 data table 或 admin sidebar。
- Mobile 用 `ion-content` 與底部 tabs。
- 課表與動作的閱讀版面放 `shared/frontend/ui`。
