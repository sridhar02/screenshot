"use client";

import React from "react";
import Link from "next/link";
import type { Session } from "next-auth";

export const Navbar = ({ session }: { session: Session | null }) => {
  return (
    <div className="flex items-center justify-around bg-blue-400">
      <p className="text-center text-lg text-white">
        {session && <span>Logged in as {session.user?.email}</span>}
      </p>
      <Link
        href={session ? "/api/auth/signout" : "/api/auth/signin"}
        className="px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
      >
        {session ? "Sign out" : "Sign in"}
      </Link>
    </div>
  );
};
