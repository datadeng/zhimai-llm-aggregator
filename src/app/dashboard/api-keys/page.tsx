"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed?: string;
  usageCount: number;
}

export default function ApiKeysPage() {
  const router = useRouter();
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [creating, setCreating] = useState(false);
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/keys")
      .then((res) => res.json())
      .then((data) => {
        if (data.keys) setKeys(data.keys);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const createKey = async () => {
    if (!newKeyName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch("/api/keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newKeyName }),
      });
      const data = await res.json();
      if (data.key) {
        setCreatedKey(data.key);
        setKeys([data.key, ...keys]);
        setNewKeyName("");
      }
    } finally {
      setCreating(false);
    }
  };

  const deleteKey = async (id: string) => {
    setDeletingId(id);
    try {
      await fetch(`/api/keys/${id}`, { method: "DELETE" });
      setKeys(keys.filter((k) => k.id !== id));
    } finally {
      setDeletingId(null);
    }
  };

  const copyKey = (id: string, key: string) => {
    navigator.clipboard.writeText(key).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const maskKey = (key: string) => {
    return key.slice(0, 8) + "••••••••••••" + key.slice(-4);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">加载中...</div>
      </div>
    );
  }

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
              <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground">
                ← 返回
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold">API 密钥</h1>
            <p className="text-sm text-muted-foreground mt-1">
              管理你的 API 密钥，用于程序化调用智迈 AI 模型
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="h-10 px-5 rounded-lg bg-primary text-white text-sm font-medium flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            + 创建密钥
          </button>
        </div>

        {/* Security Notice */}
        <div className="mb-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/5">
          <div className="flex items-start gap-3">
            <span className="text-lg mt-0.5">🔒</span>
            <div>
              <div className="text-sm font-medium text-amber-400 mb-1">
                安全提示
              </div>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• API 密钥明文只显示一次，关闭后无法找回</li>
                <li>• 不要将密钥提交到公开的代码仓库</li>
                <li>• 定期轮换密钥以降低泄露风险</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Keys List */}
        {keys.length === 0 ? (
          <div className="text-center py-20 rounded-2xl border border-dashed border-border">
            <div className="text-4xl mb-4">🔑</div>
            <h3 className="font-bold text-lg mb-2">暂无 API 密钥</h3>
            <p className="text-sm text-muted-foreground mb-6">
              创建你的第一个 API 密钥，开始调用 AI 模型
            </p>
            <button
              onClick={() => setShowCreate(true)}
              className="h-10 px-6 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              创建第一个密钥
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {keys.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl border border-border bg-card hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        活跃
                      </span>
                    </div>
                    <div className="text-sm font-mono text-muted-foreground">
                      {maskKey(item.key)}
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>创建于 {new Date(item.createdAt).toLocaleDateString("zh-CN")}</span>
                      {item.lastUsed && <span>上次使用 {new Date(item.lastUsed).toLocaleDateString("zh-CN")}</span>}
                      <span>调用 {item.usageCount} 次</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => copyKey(item.id, item.key)}
                      className="h-8 px-3 rounded-md border border-border bg-background text-xs font-medium hover:bg-secondary transition-colors"
                    >
                      {copiedId === item.id ? "已复制 ✓" : "复制"}
                    </button>
                    <button
                      onClick={() => deleteKey(item.id)}
                      disabled={deletingId === item.id}
                      className="h-8 px-3 rounded-md border border-destructive/30 text-destructive text-xs font-medium hover:bg-destructive/10 transition-colors disabled:opacity-50"
                    >
                      {deletingId === item.id ? "删除中..." : "删除"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-card rounded-2xl border border-border shadow-2xl">
            {createdKey ? (
              <div className="p-8">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="font-bold text-lg mb-2">密钥创建成功</h3>
                  <p className="text-sm text-muted-foreground">
                    请立即复制保存，明文不再显示
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-muted border border-border mb-4">
                  <div className="text-xs text-muted-foreground mb-1">API Key</div>
                  <div className="font-mono text-sm break-all">{createdKey}</div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(createdKey);
                      setCopiedId("new");
                      setTimeout(() => setCopiedId(null), 2000);
                    }}
                    className="flex-1 h-10 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90"
                  >
                    {copiedId === "new" ? "已复制 ✓" : "复制密钥"}
                  </button>
                  <button
                    onClick={() => { setShowCreate(false); setCreatedKey(null); }}
                    className="flex-1 h-10 rounded-lg border border-border bg-background text-sm font-medium hover:bg-secondary"
                  >
                    完成
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8">
                <h3 className="font-bold text-lg mb-6">创建新密钥</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">密钥名称</label>
                    <input
                      type="text"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      placeholder="例如：我的开发密钥"
                      className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      onKeyDown={(e) => e.key === "Enter" && createKey()}
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => setShowCreate(false)}
                      className="flex-1 h-10 rounded-lg border border-border bg-background text-sm font-medium hover:bg-secondary transition-colors"
                    >
                      取消
                    </button>
                    <button
                      onClick={createKey}
                      disabled={creating || !newKeyName.trim()}
                      className="flex-1 h-10 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                    >
                      {creating ? "创建中..." : "创建"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
