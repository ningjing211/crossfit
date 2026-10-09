# 04 Callable／事件契約

沒有對外 REST，也沒有 `/api`。

## 本階段

沒有 Callable，沒有 Firestore Trigger，沒有排程。`functions/src/index.ts` 不匯出函式。

這一版的畫面只讀專案裡的 catalog，不呼叫 Firestore 或 Storage。部署用的 rules 仍全部拒絕。

## 客戶端操作

不要把它們做成 HTTP endpoint，也不要做成畫面裡的寫入。

| 操作 | 來源 | 說明 |
| --- | --- | --- |
| `listMovements` / `getMovement` | `catalog.ts` | 動作 |
| `listSessions` / `getSession` | `catalog.ts` | 課表 |

不需要原子扣款、名額或跨文件交易，所以不為它們開 Callable。

## 禁止

- HTTPS `onRequest` 當作 App 的主 API
- Functions import `@app/frontend/*` 或 `shared/frontend`
- 為了推播或聊天預先建立 Callable
