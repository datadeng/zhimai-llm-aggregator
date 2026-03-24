import { Suspense } from "react";
import RegisterForm from "./register-form";

export const dynamic = "force-dynamic";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><div className="text-muted-foreground">加载中...</div></div>}>
      <RegisterForm />
    </Suspense>
  );
}
