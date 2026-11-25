# 金澤職人夢｜KANAZAWA CRAFT JOURNEY

青年百億海外圓夢基金計畫海外翱翔組 M-2-8 的非官方資訊網站，使用 React、Vite、TypeScript、Tailwind CSS 和 Lucide Icons。網站為靜態前端，資格勾選保存在瀏覽器 localStorage。

## 啟動與建置

在本目錄使用 Node.js 24 執行。

```sh
npm ci
npm run dev -- --host 0.0.0.0
npm run typecheck
npm run build
npm run preview -- --host 0.0.0.0
```

`dev` 預設使用 5173，`preview` 預設使用 4173。正式產物在 `dist/`。

## 更新資料

在 `src/data.ts` 更新計畫、工藝、機構、行程、資格、經費、行前培訓與 FAQ。行程以工藝及機構 ID 建立交叉連結。篩選使用網站整理的階段，第一週為第 1–7 日、第二週為第 8–14 日、成果階段為第 15–17 日，含返程。

原始九頁簡章位於 `public/documents/M-2-8.pdf`。更換簡章時請一併核對行程、外部連結與資格。工藝圖片位於 `public/images/`，為生成式意象插圖。

## 部署至 Vercel

1. 將此專案推送到你有權操作的 GitHub 儲存庫。
2. 在 Vercel 匯入該儲存庫。若專案位於儲存庫的 `kanazawa/` 子目錄，將 Root Directory 設為 `kanazawa`。
3. Framework Preset 選 Vite、Node.js 選 24.x、Build Command 使用 `npm run build`、Output Directory 使用 `dist`。按 Deploy 並使用 Vercel 提供的 HTTPS 網址。
