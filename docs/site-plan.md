# Seeker In The Noetic — 網站企劃書

> **域名**：noeticseeker.com
> **品牌定位**：玄學品牌 — 占卜 · 能量療癒 · 內容創作
> **建構技術**：Astroplate（Astro v6 + Tailwind CSS v4 + React）

---

## 一、品牌概述

| 項目 | 內容 |
|------|------|
| 品牌名稱 | Seeker In The Noetic |
| 域名 | noeticseeker.com |
| 核心受眾 | 對靈性探索、玄學、身心靈療癒有興趣的人 |
| 語言 | 中文為主（可保留英文版） |
| 主要收入模式 | 服務預約 + 數位內容 |

---

## 二、核心服務

| 服務 | 說明 |
|------|------|
| 🔮 占卜服務 | 塔羅、星象、紫微、數字學等，線上/線下預約 |
| 🌿 能量療癒 | 靈氣、水晶療癒、脈輪平衡等 |
| 📖 內容創作 | 部落格文章、教學、玄學知識分享 |
| 🛒 未來擴展（選配） | 水晶/道具周邊商品、線上課程 |

---

## 三、網站頁面規劃

| 頁面 | 用途 | 對應現有頁面 |
|------|------|-------------|
| 首頁 | 品牌形象 + 服務入口 + CTA | `/` |
| 關於我 | 個人故事與理念 | `/about` |
| 服務 | 各項服務詳細說明 + 預約按鈕 | 修改 Features 區塊 或新增頁面 |
| 部落格 | 玄學知識、心得分享 | `/blog`（已有，直接用） |
| 聯絡 / 預約 | 諮詢表單 | `/contact` |
| 隱私政策 | 法規合規 | `/privacy-policy`（已有） |

---

## 四、需要修改的檔案清單

### 4.1 設定檔（必改）

**`src/config/config.json`**
```json
{
  "site": {
    "title": "Seeker In The Noetic",
    "base_url": "https://noeticseeker.com",
    "favicon": "/images/favicon.png",      // 換成品牌圖示
    "logo": "/images/logo.png",            // 換成品牌 Logo
    "logo_text": "Seeker In The Noetic"
  },
  "params": {
    "contact_form_action": "<你的表單後端 URL>",
    "copyright": "© Seeker In The Noetic"
  },
  "navigation_button": {
    "label": "預約諮詢",
    "link": "/contact"
  },
  "disqus": {
    "enable": false     // 建議先關閉，改用 Giscus 或無留言
  },
  "metadata": {
    "meta_author": "Seeker In The Noetic",
    "meta_description": "玄學品牌 — 占卜、能量療癒與靈性探索"
  }
}
```

**`src/config/social.json`**
- 替換為你的 Instagram、Facebook、YouTube、Line 等帳號連結

**`src/i18n/en.json`**
- 第 16 行：移除 "Loving Astroplate? Please ⭐️ on Github" 公告，改為品牌公告或直接關閉

### 4.2 首頁內容（必改）

**`src/content/homepage/english/-index.md`**

Hero 區改為：
```yaml
banner:
  title: "在靈性的深淵中，尋找屬於你的光"
  content: "占卜 · 能量療癒 · 靈性探索。陪你看見內在，找到方向。"
  image: "/images/banner.png"   # 換成品牌圖片
  button:
    label: "探索服務"
    link: "/contact"
```

Features 區（三個區塊）改為介紹三項服務：
1. 占卜服務（塔羅、星象等）
2. 能量療癒（靈氣、水晶等）
3. 內容創作（部落格、教學）

### 4.3 關於我頁面（必改）

**`src/content/about/english/-index.md`**
- 替換 "John Doe" 為你的名字與個人故事
- 更換大頭照（放到 `public/images/`）

### 4.4 聯絡頁面（建議改）

**`src/content/contact/english/-index.md`**
- 修改聯絡表單說明文字
- 設定 `contact_form_action` 為實際後端（推薦 [Formspree](https://formspree.io/) 或 [Web3Forms](https://web3forms.com/)，兩者都有免費版）

### 4.5 視覺設計（建議改）

**`src/config/theme.json`**
- 主色調建議改為深紫（`#4B2D7F`）、金色（`#C9A84C`）、暗靛藍（`#1A1A2E`）
- 字型建議：正文用 `Noto Serif TC`，標題用 `Cinzel`（莊重感）

**`public/images/`**
- 替換 `banner.png`、`logo.png`、`og-image.png`

### 4.6 可選移除

```bash
# 不需要多語言時：
yarn remove-multilang

# 不需要深色模式時：
yarn remove-darkmode
```

---

## 五、SEO 與行銷基礎建議

| 項目 | 建議 |
|------|------|
| 關鍵字 | 「塔羅占卜」「能量療癒」「靈性諮詢」「台灣玄學」 |
| Google Analytics | 透過 GTM 設定（config.json 已有入口） |
| Open Graph 圖片 | 製作一張 `1200×630` 品牌圖（`og-image.png`） |
| Sitemap | Astro 已自動生成（`@astrojs/sitemap` 已整合） |
| 聯繫方式 | Instagram / Line 官方帳號（玄學受眾主要在這兩個平台） |

---

## 六、部署建議

| 環境 | 建議方案 |
|------|---------|
| 快速上線（免費） | Cloudflare Pages / Netlify（靜態托管，每次 push 自動部署） |
| 自有 Linux 伺服器 | Docker + nginx:alpine（Dockerfile 已寫好） |
| 域名 SSL | Cloudflare 免費 SSL（建議托管 DNS 在 Cloudflare） |

---

## 七、建議開發優先順序

1. **第一階段**：修改 config.json、i18n、homepage 內容、about 頁面 → 完成品牌化
2. **第二階段**：設定聯絡表單後端、更換 Logo 與圖片 → 基礎可用
3. **第三階段**：調整 theme.json 色調與字型 → 視覺品牌一致
4. **第四階段**：撰寫第一批部落格文章，設定 Google Analytics → SEO 啟動
5. **第五階段**（選配）：整合線上預約系統（Calendly / 自製）
