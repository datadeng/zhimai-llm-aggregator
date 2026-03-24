"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refCode, setRefCode] = useState("");

  useEffect(() => {
    const code = searchParams.get("ref");
    if (code) setRefCode(code);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("两次密码输入不一致");
      return;
    }
    if (form.password.length < 8) {
      setError("密码至少8位");
      return;
    }
    if (!form.agreeTerms) {
      setError("请同意服务条款");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          refCode,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "注册失败");
      } else {
        // Store referral code for display after registration
        if (refCode) {
          localStorage.setItem("pending_ref_code", refCode);
        }
        router.push("/dashboard?welcome=true");
      }
    } catch {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
  };

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
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              已有账号？立即登录
            </Link>
          </div>
        </div>
      </nav>

      {/* Register Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs text-primary mb-4">
              🚀 免费注册，立即开始
            </div>
            <h1 className="text-3xl font-bold mb-2">创建智迈账号</h1>
            <p className="text-muted-foreground">
              加入开发者社区，享首月 API 调用 8 折优惠
            </p>
          </div>

          {refCode && (
            <div className="mb-6 p-4 rounded-xl border border-primary/30 bg-primary/5 text-center">
              <p className="text-sm text-primary">
                🎁 通过推广链接注册，将获得额外奖励
              </p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5 p-8 rounded-2xl border border-border bg-card"
          >
            {error && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                邮箱
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">
                  密码
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="8位以上"
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label
                  className="text-sm font-medium"
                  htmlFor="confirmPassword"
                >
                  确认密码
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  value={form.confirmPassword}
                  onChange={(e) =>
                    setForm({ ...form, confirmPassword: e.target.value })
                  }
                  placeholder="再次输入"
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                />
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                id="agreeTerms"
                type="checkbox"
                checked={form.agreeTerms}
                onChange={(e) =>
                  setForm({ ...form, agreeTerms: e.target.checked })
                }
                className="mt-0.5 h-4 w-4 rounded border-border bg-background text-primary focus:ring-primary/50"
              />
              <label htmlFor="agreeTerms" className="text-sm text-muted-foreground leading-snug">
                我已阅读并同意{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  服务条款
                </Link>{" "}
                和{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  隐私政策
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-gradient-to-r from-primary to-violet-600 text-white font-semibold text-sm flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "创建账号中..." : "创建账号"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-card text-muted-foreground">
                  或
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full h-11 rounded-lg border border-border bg-background text-sm font-medium flex items-center justify-center gap-2 hover:bg-secondary transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              使用 Google 注册
            </button>
          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            已有数千名开发者加入智迈，平均节省 40% API 成本
          </p>
        </div>
      </div>
    </div>
  );
}
