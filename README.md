# 量子產業財務儀表板 — 2026 Q2

六家上市純量子公司的季度財務、營收結構與政策資金分配。Vite + React，無其他執行期依賴，圖表為手寫 SVG。

## 本地開發

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # 產出 dist/
npm run preview  # 預覽 build 結果
```

## 部署到 GitHub Pages

repo 裡已含 `.github/workflows/deploy.yml`。推上 `main` 之後：

1. 進 repo 的 **Settings → Pages**，Source 選 **GitHub Actions**（不是 Deploy from a branch）
2. 等 Actions 跑完，網址是 `https://<帳號>.github.io/<repo-name>/`

workflow 會自動把 `BASE_PATH` 設成 `/<repo-name>/`，所以 repo 改名也不用改設定。若要掛自訂網域或部署到 `<帳號>.github.io` 根網域，把 workflow 裡的 `BASE_PATH` 拿掉即可。

## 更新資料

所有數字、註記與待查核標記都在 `src/data.js`，其他檔案不含硬編碼數值。

每一格的結構：

```js
rev: {
  v: 80.1,          // 數值，排序與長條用；未揭露填 null
  d: '$80.1m',      // 顯示字串
  note: '……',       // 滑過該格時顯示的口徑與時點說明
  flag: 'check',    // 'check' 待查核 / 'period' 期別不同 / 'overlap' 口徑重疊 / 省略
}
```

新增指標欄位：在 `METRICS` 加一筆，再到每家公司的 `cells` 補對應 key。欄位順序、排序、長條基準都會自動跟上。

## 互動

- 滑過或 Tab 到任一格 → 下方顯示完整數字與口徑說明
- 點欄位標題 → 依該欄排序，未揭露的一律沉底
- 紅點 = 待查核，橙點 = 期別不同或口徑重疊
- 列印時展開全部，`@media print` 已處理版面
