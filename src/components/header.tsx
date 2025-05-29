"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { signInWithGoogle, signOut, onIdTokenChanged } from "@/lib/firebase/auth";
import type { User } from "firebase/auth";
import { setCookie, deleteCookie } from "cookies-next";

function useUserSession(initialUser: SimplifiedUser) {
  useEffect(() => {
    return onIdTokenChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken();
        await setCookie("__session", idToken);

        if (initialUser?.uid !== user.uid) {
          window.location.href = "/dashboard"; // Redirect after login
        }
      } else {
        await deleteCookie("__session");
      }
      if (initialUser?.uid === user?.uid) {
        return;
      }
      window.location.reload();
    });
  }, [initialUser]);

  return initialUser;
}

export type SimplifiedUser = {
  uid: string;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
} | null;

export default function Header({ initialUser }: { initialUser: SimplifiedUser }) {
  const user = useUserSession(initialUser);

  const handleSignOut = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    signOut();
  };

  return (
    <div className="relative">
      {/* Header bar */}
      <header className="w-full h-24 fixed top-0 left-0 bg-white flex items-center justify-between px-6 z-10 shadow-md">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logoPic.png" alt="Logo Pic" className="h-18" />
          <img src="/logoWord.png" alt="Logo Word" className="h-18" />
        </Link>
        
        <div className="flex items-center gap-6">
          {/* Only show auth section if user is logged in */}
          {user && (
            <div className="flex items-center gap-3">
              <img
                src={user.photoURL ?? "/default-avatar.png"}
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="text-gray-800 font-medium">{user.displayName ?? "User"}</span>
              <div
                className="p-2 rounded-lg outline outline-1 outline-offset-[-1px] outline-gray-300 bg-gray-100 text-base text-gray-700 font-normal text-center cursor-pointer hover:bg-gray-200 transition-colors"
                onClick={handleSignOut}
              >
                Log out
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}