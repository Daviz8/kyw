

"use client";

import { MenuIcon } from "../../icons/menu";
import { navLinks } from "../../lib";
import Link from "next/link";
import { useEffect, useState } from "react";

type AuthUser = {
  id?: string;
  name?: string;
  email?: string;
  role?: "user" | "admin";
};

type NavItem = {
  name: string;
  url: string;
  slug?: string;
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", {
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((data: { user?: AuthUser | null }) => {
        setUser(data.user || null);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/";
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-[#e8f5e8] bg-white/90 shadow-sm backdrop-blur-xl">
        <nav className="mx-auto flex h-[92px] max-w-[1200px] items-center px-4">
          <Link href="/" className="shrink-0">
            <img
              src="/images/kyw-logo.webp"
              alt="KYW Wellness"
              className="hidden h-20 w-44 object-contain md:block border-[#e8f5e8] bg-white/90"
            />
          </Link>

          <div className="hidden items-center justify-center gap-x-8 lg:mx-auto lg:flex">
            {(navLinks as NavItem[]).map((item) => (
              <Link
                key={item.slug || item.name}
                className="text-lg font-bold text-black transition hover:text-[#008080]"
                href={item.url}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            {user?.role === "admin" ? (
              <>
                <Link
                  href="/admin/dashboard"
                  className="rounded-full border border-[#008080] px-5 py-3 text-sm font-black text-[#008080] transition hover:bg-[#008080] hover:text-white"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-[#008080]"
                >
                  Logout
                </button>
              </>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="ml-auto rounded-xl bg-[#008080] p-3 text-white lg:hidden"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>
        </nav>
      </header>

      {open ? (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 bg-black/50 lg:hidden"
        />
      ) : null}

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-10/12 overflow-auto bg-white p-8 transition-all duration-300 lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between">
          <Link href="/" onClick={() => setOpen(false)}>
            <img
              src="/images/kyw-logo.webp"
              alt="KYW Wellness"
              className="h-20 w-44 object-contain"
            />
          </Link>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full bg-[#f4fffb] px-4 py-2 text-sm font-black text-[#008080]"
          >
            Close
          </button>
        </header>

        <div className="mt-12 space-y-6">
          {(navLinks as NavItem[]).map((item) => (
            <Link
              key={item.slug || item.name}
              onClick={() => setOpen(false)}
              className="block text-xl font-bold text-gray-700 transition hover:text-[#008080]"
              href={item.url}
            >
              {item.name}
            </Link>
          ))}

          {user?.role === "admin" ? (
            <>
              <Link
                href="/admin/dashboard"
                onClick={() => setOpen(false)}
                className="block rounded-full border border-[#008080] px-5 py-4 text-center font-black text-[#008080]"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={logout}
                className="w-full rounded-full bg-black px-5 py-4 font-black text-white"
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
      </aside>
    </>
  );
}