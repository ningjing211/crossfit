# 07 測試計畫

## 現在就要綠

| 範圍 | 指令 | 內容 |
| --- | --- | --- |
| 目錄邊界 | `npm run check:boundaries` | Web 無 Ionic／Capacitor；Functions 無 frontend；輸出路徑符合架構 |
| 契約 | `npm run test:unit` | collection 名稱、Storage 路徑、October 7 課表能放進 `Session` |
| Web 殼 | `npm run test:web` | App 可以建立並顯示標題 |
| Mobile 殼 | `npm run test:mobile` | 同上 |
| 打包 | `npm run build:web` 與 `npm run build:mobile` | Web 到 `dist/apps/web/browser`，Mobile 到 `www/` |

`npm run check` = 邊界 + 兩個 production build + `npx cap sync`。

## 功能開始後才加

| 改了什麼 | 跑什麼 |
| --- | --- |
| `shared/contracts` 或純函式 | `tests/unit` |
| Security Rules、Callable | `tests/integration`，Firebase emulator |
| Web 頁 | `ng test web` |
| Mobile 頁 | `ng test mobile` |
| 跨端契約 | contracts 的 unit |

日記畫面與 rules 的整合測試現在不寫。rules 仍是拒絕全部，沒有可通過的讀寫案例。

E2E 目錄先留著。第一條 E2E 應該是「建立一堂 October 7 這種課，再打開它看到三個區塊」，而且要等路由確認之後。

覆蓋率門檻等第一個功能 task 再定。骨架不設覆蓋率數字。
