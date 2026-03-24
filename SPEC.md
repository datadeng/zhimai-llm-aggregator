# 智迈 (ZhiMai) - LLM API 聚合平台规范文档

## 1. Concept & Vision

**品牌名：** 智迈（ZhiMai）  
**域名：** zhimai.cn / zhimai.com  
**Tagline：** 智能调度 · 迈向未来  
**定位：** 中国开发者首选的 LLM API 智能聚合平台——不只是中间商，更是 AI 调度的智能中枢。

**核心价值：** 帮助开发者降低 AI 调用成本 30-50%，提升 API 可靠性至 99.9%。

**设计风格：** 科技感 + 专业感 + 可信赖。深色主题，渐变点缀，数据可视化面板风格。

---

## 2. Design Language

### 2.1 Aesthetic Direction
- **参考：** Vercel + Linear 风格，融合中文科技感
- **主调：** 深色系（#0a0a0f 深空黑）+ 科技蓝/紫渐变
- **感觉：** 专业、领先、可信赖，像一个"很能打"的开发者工具

### 2.2 Color Palette
```
Primary:      #6366F1 (Indigo 科技蓝)
Secondary:    #8B5CF6 (Violet 紫)
Accent:       #22D3EE (Cyan 青绿)
Success:      #10B981 (翠绿)
Warning:      #F59E0B (琥珀)
Danger:       #EF4444 (红)
Background:   #0A0A0F (深空黑)
Surface:      #111118 (卡片背景)
Border:       #1E1E2E (边框)
Text Primary: #F4F4F5
Text Muted:   #71717A
```

### 2.3 Typography
- **标题:** Inter / MiSans (中文) — 粗体、科技感
- **正文:** Inter / MiSans — 清晰易读
- **代码/数字:** JetBrains Mono — 等宽，技术感

### 2.4 Motion
- 页面切换: fade + slide，200ms ease-out
- 卡片悬停: scale 1.01，box-shadow 增强
- 数据加载: skeleton 骨架屏
- 渐入动画: opacity 0→1，translateY 8px→0，stagger 50ms

---

## 3. Layout & Structure

### 3.1 页面架构
```
/ (首页)
├── /docs          API 文档
├── /pricing       定价方案
├── /tools         AI 工具下载页
├── /login         登录
├── /register      注册
├── /dashboard     用户中心
│   ├── /dashboard/overview      总览
│   ├── /dashboard/apis           API 产品列表
│   ├── /dashboard/commissions   佣金记录
│   ├── /dashboard/withdraw       提现申请
│   ├── /dashboard/referrals      推广链接管理
│   └── /dashboard/settings       账户设置
└── /admin         管理员后台
```

### 3.2 首页结构
1. **Hero Section** — Headline + 核心价值主张 + CTA
2. **核心功能展示** — 3 大特性卡片（智能路由 / 成本可视化 / 稳定可靠）
3. **API 产品表格** — 实时筛选、对比、状态指示
4. **推广赚钱** — 15% 佣金说明 + 立即加入 CTA
5. **Footer** — 链接 + 备案号

---

## 4. Features & Interactions

### 4.1 MVP 功能清单

#### P0（上线必须）
| 功能 | 描述 | 优先级 |
|------|------|--------|
| 首页落地页 | Hero + 功能展示 + 价格表 | P0 |
| 用户注册/登录 | 邮箱 + 密码，JWT token | P0 |
| 推广链接生成 | 用户中心一键生成唯一推广码 | P0 |
| 推广追踪 | 点击→注册→佣金计算，7天归因窗口 | P0 |
| 佣金记录 | 展示每笔佣金来源、金额、时间 | P0 |
| 提现申请 | 填写金额+支付宝账号，人工审批 | P0 |
| API 产品展示 | 表格展示所有模型/供应商/价格 | P0 |

#### P1（第二版）
| 功能 | 描述 |
|------|------|
| 实时状态面板 | 各 API 供应商可用性监控 |
| 成本计算器 | 输入 token 量，估算花费 |
| Python SDK | pip install zhimai-sdk |
| 邮件通知 | 注册成功/佣金到账/提现进度 |
| 管理员后台 | 产品管理、用户管理、审批提现 |

#### P2（后续迭代）
- 智能路由 API（真正的负载均衡 + failover）
- VS Code 插件
- CLI 工具
- 企业级 SLA

### 4.2 交互细节
- **推广链接复制：** 点击复制，Toast 提示"已复制"
- **注册流程：** 邮箱 → 验证码 → 设置密码 → 完成
- **佣金提现：** 填写支付宝账号 → 填写金额 → 提交申请 → 等待审批
- **表格筛选：** 实时筛选，支持按供应商/模型/价格排序
- **空状态：** 推广记录为空时，显示引导文案"还没有推广记录，分享你的链接开始赚钱"

---

## 5. Component Inventory

### 5.1 核心组件
| 组件 | 状态 |
|------|------|
| Navbar | 固定顶部，Logo + 导航 + 登录/用户菜单 |
| Hero | 全宽，渐变背景，Headline + CTA |
| APITable | 筛选框 + 表格 + 分页 |
| PricingCard | 3 层定价卡片 |
| CommissionTable | 佣金记录表格 |
| ReferralLinkBox | 推广链接展示 + 一键复制 |
| WithdrawForm | 提现申请表单 |
| SkeletonLoader | 内容加载骨架屏 |
| Toast | 操作反馈提示 |

---

## 6. Technical Approach

### 6.1 技术栈
```
前端:     Next.js 15 (App Router) + TypeScript + Tailwind CSS + shadcn/ui
后端:     Next.js API Routes (serverless) + Hono RPC
数据库:   PostgreSQL (Supabase 或 Railway)
缓存:     Redis (Upstash 或 Railway)
ORM:     Prisma
认证:     NextAuth.js v5
支付:     Stripe (海外) / 支付宝当面付 (国内-需企业)
邮件:     Resend / SendGrid
部署:     Vercel (前端) + Railway (后端数据库)
```

### 6.2 数据模型

#### User
```prisma
model User {
  id            String   @id @default(cuid())
  email         String   @unique
  passwordHash  String
  nickname      String?
  referralCode  String   @unique  // 用户推广码
  referredBy    String?  // 推荐人用户ID
  commissionBalance Decimal @default(0) // 佣金余额
  totalCommission Decimal @default(0) // 历史佣金总额
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

#### Commission
```prisma
model Commission {
  id          String   @id @default(cuid())
  userId      String   // 推广者ID
  visitorId   String?  // 被推广访客ID
  orderId     String?  // 关联订单ID
  amount      Decimal  // 佣金金额
  rate        Decimal  // 佣金比例 0.15
  status      String   // pending / approved / paid / rejected
  note        String?
  createdAt   DateTime @default(now())
}
```

#### APIProduct
```prisma
model APIProduct {
  id          String   @id @default(cuid())
  name        String   // "GPT-4o"
  provider    String   // "OpenAI"
  modelId     String   // "gpt-4o"
  inputPrice  Decimal  // 元/千tokens
  outputPrice Decimal
  rpmLimit    Int      // 每分钟请求限制
  tpmLimit    Int      // 每分钟token限制
  status      String   // available / limited / down
  updatedAt   DateTime @updatedAt
}
```

#### Withdrawal
```prisma
model Withdrawal {
  id        String   @id @default(cuid())
  userId    String
  amount    Decimal
  account   String   // 支付宝账号
  accountName String // 真实姓名
  status    String   // pending / approved / paid / rejected
  adminNote String?
  createdAt DateTime @default(now())
}
```

### 6.3 API 设计
```
POST   /api/auth/register      注册
POST   /api/auth/login         登录
GET    /api/auth/session       获取当前会话

GET    /api/user/referral-code 获取推广码
GET    /api/user/commissions   获取佣金记录
GET    /api/user/balance       获取余额
POST   /api/user/withdraw      申请提现

GET    /api/products           获取 API 产品列表
GET    /api/products/:id       产品详情

POST   /api/track/visit        记录推广访问（归因）
POST   /api/track/signup        记录推广注册事件
```

### 6.4 推广追踪逻辑
1. 用户 A 分享 `zhimai.cn/ref/abc123`
2. 中间件解析 ref code → 写入 Cookie（7天有效期）
3. 用户 B 访问并注册 → 从 Cookie 读取 ref code
4. 后端查询推荐人，给推荐人增加佣金记录
5. 佣金计算：订单金额 × 15%

---

## 7. 品牌决策记录

| 决策项 | 决定 | 日期 |
|--------|------|------|
| 品牌名 | 智迈 (ZhiMai) | 2026-03-23 |
| 域名 | zhimai.cn | 2026-03-23 |
| 佣金比例 | 15% | 2026-03-23 |
| MVP 技术栈 | Next.js + Prisma + PostgreSQL + Redis | 2026-03-23 |
| 支付方案 | Stripe（海外）+ 支付宝（国内-企业后接） | 2026-03-23 |
| 首批推广渠道 | V2EX + 掘金 | 2026-03-23 |
| 供应商优先级 | OpenAI Proxy > Claude > 硅基流动 | 2026-03-23 |
