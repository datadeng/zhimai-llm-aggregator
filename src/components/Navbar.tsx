"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/docs", label: "API 文档" },
  { href: "/pricing", label: "定价" },
  { href: "/tools", label: "AI 工具" },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-violet-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">ZM</span>
            </div>
            <span className="font-bold text-lg tracking-tight">智迈</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              登录
            </Link>
            <Link
              href="/register"
              className="h-8 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              立即加入
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
