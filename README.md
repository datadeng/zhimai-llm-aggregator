# 智迈 (ZhiMai) - LLM API 聚合平台

> 智能调度全球顶级 LLM API，帮助开发者降低 AI 调用成本 30-50%

## 🚀 快速开始

```bash
# 1. 安装依赖
npm install

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 填入你的数据库和 API Key

# 3. 初始化数据库
npm run db:push

# 4. 启动开发服务器
npm run dev
```

访问 http://localhost:3000

## 📁 项目结构

```
llm-aggregator/
├── prisma/schema.prisma   # 数据库模型
├── src/app/                # Next.js App Router
│   ├── page.tsx            # 首页
│   ├── register/           # 注册页
│   ├── login/              # 登录页
│   ├── dashboard/          # 用户中心
│   └── api/                # API Routes
└── src/components/         # UI 组件
```

## 🛠️ 技术栈

| 类别 | 技术 |
|------|------|
| 前端 | Next.js 15 + TypeScript + Tailwind CSS |
| 数据库 | PostgreSQL + Prisma ORM |
| 认证 | NextAuth.js v5 |
| 部署 | Vercel + Railway |

## 📋 待完成（MVP）

- [ ] 用户注册/登录
- [ ] 推广链接系统（/ref/[code]）
- [ ] 佣金计算与记录
- [ ] 提现申请
- [ ] API 产品管理后台

## 📄 License

MIT
