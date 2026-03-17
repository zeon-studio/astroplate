# 聯絡表單郵件通知設定指南

## 現況分析

目前的聯絡表單設定：

- `contact_form_action` 設置為 `#`（空目標，表單不會提交到任何地方）
- 需要整合第三方服務才能真正發送郵件

---

## 部署環境

- **主機商**：Hetzner 雲端伺服器
- **類型**：靜態網站部署

---

## 方案比較

| 方案              | 費用               | 難度        | 說明                                           |
| ----------------- | ------------------ | ----------- | ---------------------------------------------- |
| **Formspree**     | 免費額度 50 次/月  | ⭐ 簡單     | 最流行的靜態網站表單服務，直接將內容發送到郵箱 |
| **FormCarry**     | 免費額度 100 次/月 | ⭐ 簡單     | 類似 Formspree，提供郵件轉發                   |
| **EmailJS**       | 免費額度 200 次/月 | ⭐ 簡單     | 客戶端直接發送郵件，無需後端                   |
| **Netlify Forms** | 免費               | ⭐ 簡單     | 僅限部署在 Netlify 時使用                      |
| **自建 API**      | 需付費             | ⭐⭐⭐ 複雜 | 需要在 Hetzner 上設定郵件伺服器或雲端函數      |

---

## 推薦方案：Formspree

### 為什麼推薦 Formspree

1. **與部署平台無關** - 不論是 Hetzner、Netlify、Vercel 都可以使用
2. **設定非常簡單** - 只需修改一行設定
3. **免費額度充足** - 每月 50 次表單提交，適合小型網站
4. **付費方案合理** - €0/月起

### 實作步驟

#### Step 1：註冊 Formspree 帳號

1. 前往 [formspree.io](https://formspree.io)
2. 點擊「Sign Up」註冊帳號
3. 可使用 GitHub 或 Google 帳號登入

#### Step 2：建立新表單

1. 登入後，點擊「New Form」
2. 輸入表單名稱（例如：Noetic Seeker Contact）
3. 系統會產生一個 Form ID
4. 表單endpoint格式：`https://formspree.io/f/{your-form-id}`

#### Step 3：設定郵件通知

1. 在 Formspree 控制台，點擊您的表單
2. 前往「Notifications」標籤
3. 新增您希望接收通知的郵箱地址
4. 設定通知方式（即時或匯總）

#### Step 4：修改網站設定

修改 `src/config/config.json`：

```json
{
  "params": {
    "contact_form_action": "https://formspree.io/f/xxxxxxxx",
    "copyright": "© 2026 Seeker In The Noetic. All rights reserved."
  }
}
```

#### Step 5：測試表單

1. 重新構建網站
2. 訪問聯絡頁面
3. 填寫表單並提交
4. 確認收到郵件通知

---

## 替代方案：EmailJS

如果您偏好完全在客戶端處理，可以考慮 EmailJS：

### 優點

- 無需後端伺服器
- 可以自訂郵件模板
- 支援多種郵件服務（Gmail、Outlook、SendGrid 等）

### 實作方式

1. 註冊 [EmailJS](https://www.emailjs.com/) 帳號
2. 建立 EmailJS 服務和郵件模板
3. 在表單頁面加入 JavaScript 程式碼處理提交

---

## 常見問題

### Q：Formspree 免費版有什麼限制？

A：免費版每月 50 次提交，1 個郵箱通知，無自訂域名

### Q：可以不使用第三方服務嗎？

A：可以，但需要在 Hetzner 上部署後端服務（例如 Node.js + Nodemailer），並處理郵件發送

### Q：表單提交後的用戶體驗是什麼？

A：Formspree 預設會顯示感謝頁面，也可以設定 AJAX 提交自訂回饋

---

## 參考資源

- Formspree 官網：https://formspree.io
- Formspree 文檔：https://help.formspree.io
- EmailJS 官網：https://www.emailjs.com
