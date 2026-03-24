import Link from "next/link";
import { Navbar } from "@/components/Navbar";

// 模拟 API 产品数据
const API_PRODUCTS = [
  {
    name: "GPT-4o",
    provider: "OpenAI",
    inputPrice: 0.035,
    outputPrice: 0.14,
    rpmLimit: 500,
    tpmLimit: 120000,
    status: "available",
    popular: true,
  },
  {
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    inputPrice: 0.025,
    outputPrice: 0.125,
    rpmLimit: 400,
    tpmLimit: 100000,
    status: "available",
    popular: false,
  },
  {
    name: "MiniMax-Text-01",
    provider: "MiniMax",
    inputPrice: 0.01,
    outputPrice: 0.1,
    rpmLimit: 1000,
    tpmLimit: 200000,
    status: "available",
    popular: false,
  },
  {
    name: "DeepSeek-V3",
    provider: "DeepSeek",
    inputPrice: 0.001,
    outputPrice: 0.01,
    rpmLimit: 2000,
    tpmLimit: 500000,
    status: "available",
    popular: false,
  },
  {
    name: "Doubao-Pro-32k",
    provider: "字节跳动",
    inputPrice: 0.008,
    outputPrice: 0.08,
    rpmLimit: 1000,
    tpmLimit: 300000,
    status: "available",
    popular: false,
  },
  {
    name: "ERNIE-4-8K",
    provider: "百度文心",
    inputPrice: 0.02,
    outputPrice: 0.06,
    rpmLimit: 300,
    tpmLimit: 80000,
    status: "limited",
    popular: false,
  },
];

const FEATURES = [
  {
    icon: "⚡",
    title: "智能路由",
    description: "自动选择最优模型，延迟降低 60%，成本节省 30-50%",
  },
  {
    icon: "📊",
    title: "成本可视化",
    description: "实时用量监控，精准成本归因，每一笔花费清晰可见",
  },
  {
    icon: "🔗",
    title: "稳定可靠",
    description: "多供应商冗余备份，SLA 99.9% 可用性保障，故障自动切换",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary/20 via-violet-500/10 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs text-primary mb-6">
              🚀 开发者首选的 LLM 聚合平台
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              智连全球 AI 模型
              <br />
              <span className="bg-gradient-to-r from-primary via-violet-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                成本省 50%
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              聚合 OpenAI、Claude、MiniMax、DeepSeek 等顶级模型，一站式管理，智能调度，让 AI 调用更简单、更便宜。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register"
                className="w-full sm:w-auto h-12 px-8 rounded-lg bg-gradient-to-r from-primary to-violet-600 text-white font-semibold flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                免费开始使用 →
              </Link>
              <Link
                href="/docs"
                className="w-full sm:w-auto h-12 px-8 rounded-lg border border-border bg-card text-foreground font-medium flex items-center justify-center hover:bg-secondary transition-colors"
              >
                查看 API 文档
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              为什么开发者选择智迈？
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              从「能用」到「好用」，我们重新定义 LLM API 聚合体验
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Products Table */}
      <section className="py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              聚合主流 LLM 模型
            </h2>
            <p className="text-muted-foreground">
              一平台接入，实时价格对比，灵活切换
            </p>
          </div>
          <div className="rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-3 px-4 font-medium">模型</th>
                    <th className="text-left py-3 px-4 font-medium">供应商</th>
                    <th className="text-right py-3 px-4 font-medium">
                      输入 (¥/K tok)
                    </th>
                    <th className="text-right py-3 px-4 font-medium">
                      输出 (¥/K tok)
                    </th>
                    <th className="text-right py-3 px-4 font-medium">
                      RPM 限制
                    </th>
                    <th className="text-right py-3 px-4 font-medium">状态</th>
                  </tr>
                </thead>
                <tbody>
                  {API_PRODUCTS.map((product) => (
                    <tr
                      key={product.name}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{product.name}</span>
                          {product.popular && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                              热门
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">
                        {product.provider}
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        ¥{product.inputPrice.toFixed(3)}
                      </td>
                      <td className="py-3 px-4 text-right font-mono">
                        ¥{product.outputPrice.toFixed(3)}
                      </td>
                      <td className="py-3 px-4 text-right text-muted-foreground">
                        {product.rpmLimit.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span
                          className={`inline-flex items-center gap-1 text-xs font-medium ${
                            product.status === "available"
                              ? "text-emerald-500"
                              : "text-amber-500"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              product.status === "available"
                                ? "bg-emerald-500"
                                : "bg-amber-500"
                            }`}
                          />
                          {product.status === "available"
                            ? "正常"
                            : "限流"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link
              href="/register"
              className="text-sm text-primary hover:underline"
            >
              注册后查看完整模型列表 →
            </Link>
          </div>
        </div>
      </section>

      {/* Affiliate CTA */}
      <section className="py-20 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-violet-500/10 p-8 sm:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs text-primary mb-6">
              💰 推广赚佣金
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              分享智迈，最高赚 15% 佣金
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              每当有人通过你的链接注册并使用，你都能获得 15%
              的佣金奖励。推广越多，收益越多。
            </p>
            <Link
              href="/register"
              className="inline-flex h-11 px-8 rounded-lg bg-primary text-primary-foreground font-semibold items-center justify-center hover:opacity-90 transition-opacity"
            >
              获取我的推广链接 →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center">
                <span className="text-white font-bold text-xs">ZM</span>
              </div>
              <span className="font-semibold text-sm">智迈 ZhiMai</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2026 智迈. 保留所有权利.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
