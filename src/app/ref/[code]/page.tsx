"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function RefLandingPage() {
  const params = useParams();
  const router = useRouter();
  const refCode = params.code as string;

  useEffect(() => {
    // Store ref code in cookie for 30 days
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 30);
    document.cookie = `ref_code=${refCode};expires=${expiry.toUTCString()};path=/`;
  }, [refCode]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <nav className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">ZM</span>
              </div>
              <span className="font-bold text-lg tracking-tight">智迈</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="text-center max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary mb-8">
            🎁 专属推广奖励
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            通过好友链接注册
            <br />
            <span className="bg-gradient-to-r from-primary via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              立即享 15% 佣金返利
            </span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-lg mx-auto">
            智迈是开发者首选的 LLM API 聚合平台，聚合 OpenAI、Claude、MiniMax、DeepSeek 等顶级模型，智能调度，成本节省 30-50%。
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href={`/register?ref=${refCode}`}
              className="w-full sm:w-auto h-12 px-8 rounded-lg bg-gradient-to-r from-primary to-violet-600 text-white font-semibold flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              🆓 免费注册
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto h-12 px-8 rounded-lg border border-border bg-card text-foreground font-medium flex items-center justify-center hover:bg-secondary transition-colors"
            >
              了解更多
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { value: "5000+", label: "开发者" },
              { value: "40%", label: "平均成本节省" },
              { value: "15%", label: "推广佣金" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="text-xs text-muted-foreground">
            © 2026 智迈. 保留所有权利.
          </p>
        </div>
      </footer>
    </div>
  );
}
