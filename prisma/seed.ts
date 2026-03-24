import { prisma } from "../src/lib/prisma";

const PRODUCTS = [
  { name: "GPT-4o", provider: "OpenAI", modelId: "gpt-4o", inputPrice: 0.035, outputPrice: 0.14, rpmLimit: 500, tpmLimit: 120000, status: "available", description: "OpenAI 最强模型" },
  { name: "Claude 3.5 Sonnet", provider: "Anthropic", modelId: "claude-3.5-sonnet", inputPrice: 0.025, outputPrice: 0.125, rpmLimit: 400, tpmLimit: 100000, status: "available", description: "Anthropic 高性价比模型" },
  { name: "MiniMax-Text-01", provider: "MiniMax", modelId: "MiniMax-Text-01", inputPrice: 0.01, outputPrice: 0.1, rpmLimit: 1000, tpmLimit: 200000, status: "available", description: "国产高性价比模型" },
  { name: "DeepSeek-V3", provider: "DeepSeek", modelId: "deepseek-v3", inputPrice: 0.001, outputPrice: 0.01, rpmLimit: 2000, tpmLimit: 500000, status: "available", description: "国产开源最强模型" },
  { name: "Doubao-Pro-32k", provider: "字节跳动", modelId: "doubao-pro-32k", inputPrice: 0.008, outputPrice: 0.08, rpmLimit: 1000, tpmLimit: 300000, status: "available", description: "字节豆包 Pro 32K" },
  { name: "ERNIE-4-8K", provider: "百度文心", modelId: "ernie-4-8k", inputPrice: 0.02, outputPrice: 0.06, rpmLimit: 300, tpmLimit: 80000, status: "limited", description: "百度文心一言 4.0 8K" },
  { name: "Qwen-Max", provider: "阿里通义", modelId: "qwen-max", inputPrice: 0.04, outputPrice: 0.12, rpmLimit: 500, tpmLimit: 100000, status: "available", description: "阿里通义千问最强版" },
  { name: "GLM-4-Plus", provider: "智谱AI", modelId: "glm-4-plus", inputPrice: 0.015, outputPrice: 0.06, rpmLimit: 600, tpmLimit: 150000, status: "available", description: "智谱 GLM-4 Plus" },
];

async function main() {
  console.log("🌱 Seeding API products...");

  for (const p of PRODUCTS) {
    const existing = await prisma.aPIProduct.findFirst({ where: { modelId: p.modelId } });
    if (!existing) {
      await prisma.aPIProduct.create({ data: p });
      console.log(`  + ${p.name}`);
    } else {
      console.log(`  = ${p.name} (already exists)`);
    }
  }

  console.log("✅ Done!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
