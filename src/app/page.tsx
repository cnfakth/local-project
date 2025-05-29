// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import { User } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      
      // If user is logged in, redirect to dashboard
      if (user) {
        router.push("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // TODO: Implement email/password sign in
    // For now, we'll just simulate a delay
    setTimeout(() => {
      setIsLoading(false);
      // You can implement email/password auth here
      console.log("Email sign in:", email, password);
    }, 1000);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
      // Navigation will be handled by the useEffect above
    } catch (error) {
      console.error("Google sign in failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is logged in, they'll be redirected by useEffect
  // This is just a fallback in case the redirect takes a moment
  if (user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  // Show sign-in form for non-logged-in users
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Logo at top */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center items-center gap-2">
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">M</span>
          </div>
          <span className="text-2xl font-bold text-gray-900">meiling</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          登入您的帳戶
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {/* User Avatar */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-teal-500 rounded-full flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-white" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
          </div>

          {/* Email/Password Form */}
          <form className="space-y-6" onSubmit={handleEmailSignIn}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                信箱
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                密碼
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                placeholder="輸入您的密碼"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "登入中..." : "登入"}
              </button>
            </div>

            <div className="text-center">
              <Link 
                href="/forgot-password" 
                className="text-sm text-teal-600 hover:text-teal-500"
              >
                忘記密碼？
              </Link>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">或</span>
              </div>
            </div>
          </div>

          {/* Google Sign In */}
          <div className="mt-6">
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              使用 Google 登入
            </button>
          </div>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              還沒有帳戶？{" "}
              <Link href="/signup" className="text-teal-600 hover:text-teal-500 font-medium">
                立即註冊
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}