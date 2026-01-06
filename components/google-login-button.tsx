"use client";

import { useEffect } from "react";

export function GoogleLoginButton() {
  useEffect(() => {
    // @ts-ignore
    if (window.google) {
      // @ts-ignore
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID",
        callback: handleCredentialResponse,
      });
    }
  }, []);

  const handleCredentialResponse = (response: any) => {
    console.log("Google ID token:", response.credential);
    // Send token to backend or verify client-side
  };

  const handleLogin = () => {
    // @ts-ignore
    window.google.accounts.id.prompt();
  };

  return (
    <button
      onClick={handleLogin}
      className="w-full py-3 rounded-xl border flex items-center justify-center gap-2"
    >
      Continue with Google
    </button>
  );
}
