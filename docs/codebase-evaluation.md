# Astroplate 代碼庫評估報告

> 產生時間：2026-03-12

## 一、代碼庫簡介

**Astroplate** 是由 [Zeon Studio](https://zeon.studio/) 開發的開源 Astro starter，採 MIT 授權。

| 項目 | 版本 |
|------|------|
| Astro | v6.0.2 |
| React | v19 |
| Tailwind CSS | v4 |
| TypeScript | Strict 模式 |
| Node.js | v22+ |

---

## 二、作為個人網站的適合度

### ✅ 優點

- **功能完整開箱即用**：部落格、搜尋、深色模式、標籤/分類、RSS、SEO 元標籤、多作者、聯繫表單、語法高亮
- **靜態優先（SSG）**：預設輸出靜態 HTML，無需 Node.js 伺服器即可運行，裸 Nginx 即可部署
- **效能優秀**：PageSpeed 100%（官方 Demo 測試），使用 `sharp` 圖片最佳化、`astro:transitions` 客戶端路由
- **Docker 原生支援**：附完整 `Dockerfile`（多階段建構，最終以 `nginx:alpine` 運行）
- **Cloudflare Workers 部署**：已整合 `wrangler`，只需一個指令即可部署到 CF
- **多語言支援**：內建英文/法文，可擴展
- **15+ 預設頁面**：包含 About、Contact、Blog、404、作者頁等

### ⚠️ 需要自行修改的地方

| 項目 | 說明 |
|------|------|
| `src/config/config.json` | 修改 `base_url`、`title`、版權等 |
| `src/config/social.json` | 替換為你自己的社群連結 |
| `src/content/` | 替換掉示範文章、作者資訊 |
| Disqus 評論 | `disqus.shortname` 需換成你的帳戶（或改用 Giscus） |
| Google Tag Manager | 預設關閉（`enable: false`），需要時才啟用 |
| 公告欄文字 | `src/i18n/en.json` 最後一行為廣告 Astroplate 的連結，可改或刪除 |
| 版權資訊 | 頁腳目前顯示 "Designed And Developed by Zeon Studio"，MIT 授權允許修改 |

---

## 三、🔐 安全 / 惡意程式掃描結果

### 掃描範圍與方法

- 掃描 `scripts/`、`src/` 目錄下所有源碼
- 使用正則查找：`eval`、`exec`、`child_process`、`base64`、`atob`/`btoa`、`Function()`
- 審查所有外部網路連結
- 審查 `package.json` 與 npm scripts
- 審查 `Dockerfile`
- 執行 `yarn audit` 檢查依賴漏洞

### 🟢 結果：程式碼乾淨

| 檢查項目 | 結果 |
|----------|------|
| `eval` / `Function()` 使用 | ✅ 未發現 |
| `child_process` / `exec` | ✅ 未發現 |
| Base64 混淆 payload | ✅ 未發現 |
| 可疑外部 HTTP 請求 | ✅ 未發現（只有靜態設定連結） |
| Dockerfile 後門 | ✅ 乾淨（標準 node:alpine → nginx:alpine 多段建構） |
| npm scripts 注入 | ✅ 全部為正常操作（build, format, preview 等） |
| 未知第三方 CDN | ✅ 未發現（字型由 Astro 原生 Font API 托管） |
| git 歷史（最近 20 筆） | ✅ 全屬正常功能修改/升級 |

**外部 URL 全部為知名服務**：GitHub、Google、Facebook、Twitter/X、LinkedIn、Pinterest、Netlify、w3schools（示範影片）

### 🟡 一個中等漏洞（不影響生產）

- **套件**：`lodash`（原型污染，`_.unset` / `_.omit`）
- **路徑**：`@astrojs/check` → `@astrojs/language-server` → `volar-service-yaml` → `yaml-language-server` → `lodash`
- **影響**：僅在開發環境型別檢查工具中，**不會打包進靜態輸出**，生產部署無風險

---

## 四、部署到 Linux 伺服器的建議

### 方案一：Docker（推薦）

```bash
docker build -t my-site .
docker run -d -p 80:80 my-site
```

最終容器只是 `nginx:alpine` + 靜態檔案，攻擊面最小。

### 方案二：靜態檔案 + Nginx

```bash
yarn build          # 在本機建構，產生 dist/
# 上傳 dist/ 到伺服器，Nginx 指向該目錄
```

### 方案三：Cloudflare Workers（無需管伺服器）

```bash
yarn deploy:cf-workers
```

---

## 五、總結

**推薦使用**。功能豐富、效能優秀、代碼品質良好、無惡意程式碼，MIT 授權可自由修改。

使用前建議：
1. 若不需多語言，執行 `yarn remove-multilang` 簡化架構
2. 更新 `config.json` 中的所有預設值
3. 替換 `src/content/` 中的示範內容
4. 移除 `src/i18n/en.json` 中的 Astroplate 廣告公告
