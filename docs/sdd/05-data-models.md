# 05 資料模型

狀態：已確認。型別在 `shared/contracts`。這一版的內容在 `shared/frontend/data-access/src/catalog.ts`，不寫入雲端。

Contracts 不含 Firebase 型別。日期在契約裡是 `YYYY-MM-DD` 字串。

## Firestore `movements/{movementId}`

動作本體。組數、頻率、速度不放在這裡。

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `name` | string | 必填，動作名稱 |
| `imagePath` | string or null | Storage 路徑，沒有圖就是 null |
| `videoPath` | string or null | Storage 路徑，沒有影片就是 null |
| `cues` | string | 施作要點，可空 |
| `execution` | string | 施作方式，可空 |

不建 `createdAt`、標籤、分類、肌群、器材清單。這一版的 id 寫在 catalog，例如 `triple-extension`。

## Firestore `sessions/{sessionId}`

一堂課。區塊嵌在同一份文件裡，不另開 subcollection。

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `title` | string | 例如 `WOD October 7`，可空 |
| `trainedOn` | string | 必填，`YYYY-MM-DD` |
| `location` | string | 上課地點，可空 |
| `equipment` | string | 器材，一段文字，可空 |
| `weather` | string | 天氣，可空 |
| `athleteNote` | string | 學生的感受，可空 |
| `coachNote` | string | 老師的感受，可空 |
| `blocks` | array | 課表區塊 |

`blocks[]`：

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `id` | string | 文件內唯一 |
| `title` | string | 必填，例如 Warm-Up |
| `scheme` | string | 區塊的時間與休息說明，可空 |
| `items` | array | 這個區塊的動作 |

`blocks[].items[]`：

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `id` | string | 文件內唯一 |
| `movementId` | string or null | 連到動作庫；臨時動作可以是 null |
| `name` | string | 必填。寫入當下的動作名稱，之後動作庫改名不回寫舊課 |
| `sets` | string | 組數，例如 `Sets 1-5`，可空 |
| `frequencyAndTime` | string | 頻率與時間，例如 `40`、`10`、`4 to 6`、`EMOM10`，可空 |
| `tempo` | string | 這一堂的速度，可空 |
| `note` | string | 這一項的補充。左右次數先寫在這裡 |

October 7 的對應方式見 `tests/unit/october-7-session.spec.ts`。

## Storage

| 路徑 | 內容 |
| --- | --- |
| `movements/{movementId}/image` | 一張圖片 |
| `movements/{movementId}/video` | 一支影片 |

契約常數是 `movementImagePath` 與 `movementVideoPath`。儲存的是路徑，不是會過期的 download URL。

## 不用的儲存

- Realtime Database：沒有高頻訊息
- 日記欄位不拆成另一個 collection
- 不建 users、coaches、athletes。待登入決策後才能加，而且要先改這份文件
