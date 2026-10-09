# AI 工作規則

規格是唯一權威：`docs/prd/PRD.md` 與 `docs/sdd/`。不要用現有程式反推需求。

流程：PRD／SDD → task → Spec Check → 方案審閱 → 實作 → 測試 → 結果回報 → 合併。

## 硬限制

- 未經人確認，不改 PRD／SDD，不加欄位，不加流程。
- 未寫進規格的功能不做。MVP 只做本次 Acceptance Criteria。不為之後的優先級預留欄位或抽象。
- 不實作登入、Callable、Trigger。部署用的 Security Rules 維持全部拒絕，不得 `firebase deploy`。
- Functions 不可 import `shared/frontend` 或 `@app/frontend/*`。
- Web build 不可輸出到 `www/`。`www/` 不可手寫、不可 commit。
- `apps/web` 不可 import `@ionic/*` 或 `@capacitor/*`。
- 不新增對外 REST／`/api`。
- `tasks/*.md` 不可 commit。只有 `tasks/README.md` 進版控。
- 只有改執行邏輯才建 task。只改 PRD、SDD、README 不必建 task。
- 一個 branch 一個可獨立 review 的功能。merge 後先更新 main，再開下一支。

## 實作前 Spec Check

範圍、Acceptance Criteria、資料模型、API、UI 狀態、測試都要對得上該次 task。缺任何一項就停，回報缺什麼，不要自己補需求。

## 完成回報

```text
實作結果：
測試：
未覆蓋風險：
規格不一致：
```
