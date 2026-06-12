"use client";

import { useState } from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import Link from "next/link";

type GoogleAuthResponse = {
  success: boolean;
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: "admin";
  };
};

export default function AdminSignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleGoogleSuccess(response: CredentialResponse) {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: response.credential,
          adminOnly: true,
        }),
      });

      const data = (await res.json()) as GoogleAuthResponse;

      if (!res.ok || !data.success) {
        setLoading(false);
        alert(data.message || "Admin signup failed");
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (error) {
      setLoading(false);
      alert("Admin signup failed");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4fffb] px-4">
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-white border-t-transparent" />
          <h2 className="mt-6 text-xl font-bold text-white">
            Signing you up...
          </h2>
        </div>
      )}

      <section className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
        <h1 className="text-center text-3xl font-black text-[#008080]">
          Admin Sign Up
        </h1>

        <p className="mt-3 text-center text-sm leading-6 text-gray-500">
          Sign Up and acess the dashboard
        </p>

        <div className="mt-8 flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google signup failed")}
            text="signup_with"
          />
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          Already registered?{" "}
          <Link href="/admin/signin" className="font-black text-[#008080]">
            Sign in
          </Link>
        </p>
      </section>
    </main>
  );
}