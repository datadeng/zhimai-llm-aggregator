"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  refCode: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("welcome") === "true") {
      setShowWelcome(true);
      // Clean URL
      router.replace("/dashboard");
    }

    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
        } else {
          router.push("/login");
        }
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  const copyRefLink = () => {
    if (!user) return;
    const link = `${window.location.origin}/ref/${user.refCode}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  const logout = async () => {
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">加载中...</div>
      </div>
    );
  }

  if (!user) return null;

  const refLink = `${typeof window !== "undefined" ? window.location.origin : ""}/ref/${user.refCode}`;

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">ZM</span>
              </div>
              <span className="font-bold text-lg tracking-tight">智迈</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">{user.email}</span>
              <button
                onClick={logout}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                退出
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome Banner */}
        {showWelcome && (
          <div className="mb-8 p-4 rounded-2xl border border-primary/30 bg-gradient-to-r from-primary/10 to-violet-500/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-bold text-lg mb-1">🎉 欢迎加入智迈！</h2>
                <p className="text-sm text-muted-foreground">
                  开始使用 AI 模型，享受开发者友好的 API 服务
                </p>
              </div>
              <button
                onClick={() => setShowWelcome(false)}
                className="text-muted-foreground hover:text-foreground text-xl"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Referral Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "本月佣金", value: "¥0.00", sub: "暂无佣金记录" },
                { label: "累计佣金", value: "¥0.00", sub: "推广用户: 0" },
                { label: "API 调用", value: "0", sub: "本月" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-5 rounded-xl border border-border bg-card"
                >
                  <div className="text-sm text-muted-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>

            {/* Referral Link */}
            <div className="p-6 rounded-2xl border border-border bg-gradient-to-br from-primary/5 to-violet-500/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">🎁 推广赚佣金</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    每成功推广一位用户，享 15% 佣金返利
                  </p>
                </div>
                <span className="text-2xl">💰</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  readOnly
                  value={refLink}
                  className="flex-1 h-10 px-3 rounded-lg border border-border bg-background text-sm font-mono"
                />
                <button
                  onClick={copyRefLink}
                  className="h-10 px-4 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  {copySuccess ? "已复制 ✓" : "复制链接"}
                </button>
              </div>
              <div className="mt-3 flex gap-3">
                <button className="h-9 px-4 rounded-lg border border-border bg-background text-xs font-medium flex items-center gap-2 hover:bg-secondary transition-colors">
                  📤 分享到微信
                </button>
                <button className="h-9 px-4 rounded-lg border border-border bg-background text-xs font-medium flex items-center gap-2 hover:bg-secondary transition-colors">
                  🔗 复制海报
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-bold mb-4">快速操作</h3>
              <div className="space-y-3">
                <Link
                  href="/dashboard/api-keys"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
                >
                  <span className="text-lg">🔑</span>
                  <div>
                    <div className="text-sm font-medium">API 密钥</div>
                    <div className="text-xs text-muted-foreground">
                      管理你的密钥
                    </div>
                  </div>
                </Link>
                <Link
                  href="/dashboard/usage"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
                >
                  <span className="text-lg">📊</span>
                  <div>
                    <div className="text-sm font-medium">用量明细</div>
                    <div className="text-xs text-muted-foreground">
                      查看 API 调用记录
                    </div>
                  </div>
                </Link>
                <Link
                  href="/dashboard/withdraw"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-secondary transition-colors"
                >
                  <span className="text-lg">💸</span>
                  <div>
                    <div className="text-sm font-medium">佣金提现</div>
                    <div className="text-xs text-muted-foreground">
                      满100元即可提现
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Affiliate Info */}
            <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg">💡</span>
                <h3 className="font-bold">推广小贴士</h3>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 分享到技术社区（V2EX/掘金）效果最好</li>
                <li>• 附带你的使用体验更有说服力</li>
                <li>• 佣金将在用户付费后次月结算</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
