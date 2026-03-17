# Seeker In The Noetic — UI 與配圖重構規劃

> **日期**：2026-03-12
> **依據**：[site-plan.md](file:///Users/linchunchiao/Documents/GitHub/astroplate/docs/site-plan.md)

---

## 一、現況分析

目前 `public/images/` 中所有圖片皆為 Astroplate 原始科技風格素材（太空人、Dashboard 元件、資料圖表），與品牌定位「**玄學 · 占卜 · 能量療癒**」完全不搭。`theme.json` 配色為黑白灰中性色調、字型為無襯線科技感字型。

### 需替換的圖片

| 檔案 | 目前內容 | 替換目標 |
|------|---------|---------|
| `banner.png` | 太空人用電腦 | Hero 主視覺：深紫夜空、星座、靈性光芒 |
| `service-1.png` | 灰色 Dashboard 元件 | 占卜服務：塔羅牌、星象盤 |
| `service-2.png` | 灰色圖表元件 | 能量療癒：水晶、靈氣光暈 |
| `service-3.png` | 灰色圓環圖元件 | 內容創作：書籍、靈性符號 |
| `call-to-action.png` | 太空人漂浮 | CTA 配圖：水晶球、光之門 |
| `logo.png` / `logo-darkmode.png` | Astroplate 文字 | 品牌 Logo（待設計） |
| `favicon.png` | Astroplate 圖示 | 品牌 Favicon（待設計） |
| `og-image.png` | Astroplate 大圖 | 社群分享圖 1200×630 |
| `avatar.png` / `avatar-sm.png` | 預設頭像 | 個人照片或品牌代表圖 |

---

## 二、配圖風格規範

### 色調

- 深紫 `#4B2D7F` — 品牌主色
- 金色 `#C9A84C` — 點綴 / 高光
- 暗靛藍 `#1A1A2E` — 背景基調

### 氛圍

- 神秘、靈性、溫暖但不陰暗
- 帶有宇宙感與內在探索的意象

### 常用元素

- 星空 / 星座 / 月亮
- 水晶 / 寶石
- 塔羅牌
- 蓮花 / 脈輪
- 柔和光暈 / 光線

### 風格統一原則

- 所有配圖應使用一致的色溫與風格（插畫或攝影擇一）
- 避免過度花俏，保持高質感與可讀性
- 圖片需適配淺色與深色模式

---

## 三、theme.json 調整

### 3.1 配色方案

```diff
 "default": {
   "theme_color": {
-    "primary": "#121212",
-    "body": "#fff",
-    "border": "#eaeaea",
-    "light": "#f6f6f6",
-    "dark": "#040404"
+    "primary": "#4B2D7F",
+    "body": "#FDFBF7",
+    "border": "#E0D5C1",
+    "light": "#F5F0E8",
+    "dark": "#1A1A2E"
   },
   "text_color": {
-    "text": "#444444",
-    "text_dark": "#040404",
-    "text_light": "#717171"
+    "text": "#3D3449",
+    "text_dark": "#1A1A2E",
+    "text_light": "#7A6E8A"
   }
 }
```

深色模式：

```diff
 "darkmode": {
   "theme_color": {
-    "primary": "#fff",
-    "body": "#1c1c1c",
-    "border": "#3E3E3E",
-    "light": "#222222",
-    "dark": "#fff"
+    "primary": "#C9A84C",
+    "body": "#0F0F1A",
+    "border": "#2A2540",
+    "light": "#1A1A2E",
+    "dark": "#F5F0E8"
   },
   "text_color": {
-    "text": "#B4AFB6",
-    "text_dark": "#fff",
-    "text_light": "#B4AFB6"
+    "text": "#C5B8D4",
+    "text_dark": "#F5F0E8",
+    "text_light": "#9A8CAE"
   }
 }
```

### 3.2 字型方案

```diff
 "fonts": {
   "font_family": {
-    "primary": "Heebo:wght@400;600",
-    "primary_type": "sans-serif",
-    "secondary": "Signika:wght@500;700",
-    "secondary_type": "sans-serif"
+    "primary": "Noto Serif TC:wght@400;600",
+    "primary_type": "serif",
+    "secondary": "Cinzel:wght@500;700",
+    "secondary_type": "serif"
   }
 }
```

- **Noto Serif TC**：中文正文，有質感、易閱讀
- **Cinzel**：英文標題，古典莊重，適合玄學調性

---

## 四、首頁內容替換

### Hero 區

```yaml
banner:
  title: "在靈性的深淵中，尋找屬於你的光"
  content: "占卜 · 能量療癒 · 靈性探索。陪你看見內在，找到方向。"
  image: "/images/banner.png"
  button:
    enable: true
    label: "探索服務"
    link: "/contact"
```

### Features 區（三項服務）

1. **占卜服務** — 塔羅、星象、紫微、數字學等，線上/線下預約
2. **能量療癒** — 靈氣、水晶療癒、脈輪平衡等
3. **內容創作** — 部落格文章、教學、玄學知識分享

---

## 五、執行階段

| 階段 | 內容 | 狀態 |
|------|------|------|
| Phase 1 | AI 生成配圖（banner + 3 service + CTA） | 🔜 待執行 |
| Phase 2 | 修改 `theme.json` 配色與字型 | 🔜 待執行 |
| Phase 3 | 替換首頁文案 `homepage/-index.md` | 🔜 待執行 |
| Phase 4 | 啟動 dev server 驗證整體效果 | 🔜 待執行 |

> **備註**：Logo、Favicon、個人照片需由品牌主自行提供或另行設計，本階段先以 AI 配圖 + 文字 Logo 過渡。
