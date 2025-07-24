"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="w-full p-4 flex justify-between items-center bg-black text-white shadow">
      <div className="text-xl font-bold">MyApp</div>

      <div className="flex gap-4">
        {!session ? (
          <>
            <Link href="/Signup">Sign Up</Link>
            <button onClick={() => signIn(undefined, {callbackUrl:"/"})} className="hover:underline">
              Login
            </button>
          </>
        ) : (
          <button onClick={() => signOut()} className="hover:underline">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
