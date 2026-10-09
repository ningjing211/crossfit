# 01 願景與平台範圍

## 願景

把教練和一位選手的上課內容呈現出來。這一版像內容站：開發者寫內容，讀者看。

## 平台

兩個前端，一套 TypeScript。

| 能力 | Web `apps/web` | Mobile `apps/mobile` |
| --- | --- | --- |
| 執行環境 | 瀏覽器 SPA | Ionic + Capacitor（iOS／Android 同一個 build） |
| 部署 | Firebase Hosting | `www/` → `npx cap sync` |
| 課表與動作 | 只閱讀 | 只閱讀 |
| 圖片與影片 | 有檔案才顯示 | 有檔案才顯示 |
| 日記欄位 | 有內容才顯示 | 有內容才顯示 |
| 新增、編輯、上傳 | 不做 | 不做 |
| 管理後台、多館、多帳號 | 不做 | 不做 |

內容在 `shared/frontend/data-access/src/catalog.ts`。這一版不登入，畫面也不讀寫 Firestore。

## 使用習慣與系統邊界

「每週上一次」是這對師生的習慣，不是行事曆功能。一筆課程文件就是一堂課。

## 不做的產品線

配對、聊天、代幣、推播都不在這份產品裡。Realtime Database 與 FCM 也不為它們預留資料。
