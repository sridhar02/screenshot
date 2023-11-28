"use client";

import React from "react";
import Link from "next/link";

export const Navbar = ({ session }: any) => {
  return (
    <div className="flex items-center justify-around bg-blue-400">
      <h1>Screenshot Pro</h1>
      <p className="text-center text-2xl text-white">
        {session && <span>Logged in as {session.user?.name}</span>}
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
