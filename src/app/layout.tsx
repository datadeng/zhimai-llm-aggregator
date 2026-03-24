import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "智迈 - 智连全球 AI 模型",
  description: "智能调度全球顶级 LLM API，帮助开发者降低 AI 调用成本 30-50%",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh" className="dark">
      <body className="antialiased min-h-screen bg-background font-sans">
        {children}
      </body>
    </html>
  );
}
