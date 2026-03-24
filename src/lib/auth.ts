import { prisma } from "@/lib/prisma";

function generateReferralCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email: email.toLowerCase() } });
}

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByReferralCode(code: string) {
  return prisma.user.findUnique({ where: { referralCode: code } });
}

export async function createUser(data: {
  email: string;
  password: string;
  referralCode?: string;
}) {
  const emailLower = data.email.toLowerCase();
  let refCode = generateReferralCode();

  // Ensure uniqueness
  while (await prisma.user.findUnique({ where: { referralCode: refCode } })) {
    refCode = generateReferralCode();
  }

  return prisma.user.create({
    data: {
      email: emailLower,
      passwordHash: data.password, // TODO: bcrypt hash in production
      referralCode: refCode,
      referredBy: data.referralCode || null,
    },
  });
}

export async function generateApiKeyForUser(userId: string, name: string) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "zm_";
  for (let i = 0; i < 32; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return prisma.aPIKey.create({
    data: { userId, name, key },
  });
}
