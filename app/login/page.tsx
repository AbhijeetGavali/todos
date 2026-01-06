"use client";

import { GoogleLoginButton } from "@/components/google-login-button";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="w-full max-w-sm border rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">Login / Sign up</h2>
        <GoogleLoginButton />
      </div>
    </div>
  );
}
