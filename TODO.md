# 智迈 (ZhiMai) - LLM API 聚合平台

**版本：** v2.0  
**更新：** 2026-03-23  
**状态：** 决策完成，开发启动

---

## ✅ 已决策项目

| 决策项 | 决定 |
|--------|------|
| 品牌名 | **智迈 (ZhiMai)** |
| 域名 | **zhimai.cn** |
| 佣金比例 | **15%** |
| 技术栈 | Next.js 15 + Prisma + PostgreSQL + Redis |
| 支付方案 | Stripe（海外）+ 支付宝（企业后接） |
| 首批推广渠道 | V2EX + 掘金 |
| 供应商优先级 | OpenAI Proxy > Claude > 硅基流动 |

---

## 📋 开发待办

### 项目初始化
- [ ] 初始化 Next.js 15 项目（含 TypeScript + Tailwind）
- [ ] 配置 Prisma + PostgreSQL 数据库
- [ ] 配置 NextAuth.js v5 认证
- [ ] 配置 Tailwind + shadcn/ui
- [ ] 配置 ESLint + Prettier

### 首页 & 落地页
- [ ] Navbar 组件
- [ ] Hero Section
- [ ] 功能展示区（3卡片）
- [ ] API 产品表格页
- [ ] Footer

### 用户系统
- [ ] 注册页面（邮箱+密码+推广码）
- [ ] 登录页面
- [ ] JWT Session 管理
- [ ] 用户菜单组件

### 推广系统
- [ ] 推广链接生成（/ref/[code] 路由）
- [ ] 中间件：解析 ref code → 写入 Cookie
- [ ] 注册时绑定推荐人逻辑
- [ ] 佣金计算触发器
- [ ] 佣金记录页面

### 佣金 & 提现
- [ ] 佣金余额展示
- [ ] 佣金记录表格
- [ ] 提现申请表单
- [ ] 提现审批流程（admin）

### API 产品管理
- [ ] 产品列表页（筛选+排序）
- [ ] 产品详情页
- [ ] 管理员：增删改产品

### 部署 & 运维
- [ ] 域名 zhimai.cn 解析
- [ ] Vercel 部署配置
- [ ] 环境变量配置
- [ ] 数据库迁移脚本

---

## 📁 项目结构

```
llm-aggregator/
├── SPEC.md              项目规范
├── TODO.md              待办
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── prisma/
│   └── schema.prisma     数据模型
├── src/
│   ├── app/              Next.js App Router
│   │   ├── page.tsx          首页
│   │   ├── layout.tsx
│   │   ├── login/
│   │   ├── register/
│   │   ├── ref/[code]/       推广落地
│   │   ├── dashboard/        用户中心
│   │   └── api/              API Routes
│   ├── components/       UI 组件
│   ├── lib/              工具函数
│   └── hooks/            React Hooks
└── scripts/             工具脚本
```

---

## 🗓️ 里程碑

| 阶段 | 内容 | 目标 |
|------|------|------|
| M1-W1 | 项目初始化 + 首页框架 | 跑通开发流程 |
| M1-W2 | 用户系统 + 推广追踪 | 完整的注册-推广闭环 |
| M1-W3 | 佣金系统 + 提现申请 | 核心商业逻辑跑通 |
| M1-W4 | 管理员后台 + 部署上线 | Beta 发布 |
| M2 | 内测 50 用户 + 产品迭代 | 收集反馈 |
| M3 | 公开上线 + 社区推广 | 正式运营 |

---

*所有核心决策已在此文档中记录，开发按优先级推进。*
