// Singleton in-memory user store - shared across API routes
// Replace with Prisma/PostgreSQL in production

export interface User {
  id: string;
  email: string;
  password: string; // hashed in production
  refCode: string;
  referredBy?: string;
  createdAt: Date;
  commission: number;
  withdrawn: number;
}

// Global singleton store (survives HMR in dev)
declare global {
  var __userStore: Map<string, User> | undefined;
  var __refCodeIndex: Map<string, string> | undefined; // refCode -> userId
}

if (!global.__userStore) {
  global.__userStore = new Map();
}
if (!global.__refCodeIndex) {
  global.__refCodeIndex = new Map();
}

const users = global.__userStore;
const refCodeIndex = global.__refCodeIndex;

export function generateRefCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export function getUserByEmail(email: string): User | undefined {
  return users.get(email.toLowerCase());
}

export function getUserById(id: string): User | undefined {
  for (const u of users.values()) {
    if (u.id === id) return u;
  }
  return undefined;
}

export function getUserByRefCode(code: string): User | undefined {
  const id = refCodeIndex.get(code);
  if (!id) return undefined;
  return users.get(id);
}

export function createUser(data: {
  email: string;
  password: string;
  refCode?: string;
}): User {
  const user: User = {
    id: Math.random().toString(36).substring(2, 10),
    email: data.email.toLowerCase(),
    password: data.password,
    refCode: generateRefCode(),
    referredBy: data.refCode || undefined,
    createdAt: new Date(),
    commission: 0,
    withdrawn: 0,
  };
  users.set(user.email, user);
  refCodeIndex.set(user.refCode, user.id);
  return user;
}
