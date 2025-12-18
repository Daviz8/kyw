/** @format */
"use client";

import { MenuIcon } from "@/app/icons/menu";
import { navLinks } from "@/lib";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdown] = useState(false);

  return (
    <>
      <header className=" bg-white/20 dark:bg-[#fafff1] 
        backdrop-blur-xl backdrop-saturate-150
        border-b border-white/20 dark:border-[#FDFFF5]
        shadow-lg sticky z-50 top-0 w-full">
        <nav className="max-w-[1200px] px-4 mx-auto flex h-[104px] items-center">
          <img src="/images/kyw-logo.png" alt="logo" className="w-32 h-20 hidden md:block" />

          <div className="hidden lg:flex gap-x-10 items-center justify-center mx-auto">
            {navLinks.map((item) => (
              <>
                <div
                  key={`${item.name}-dropdown`}
                  className="relative cursor-pointer group"
                >
                  <div
                    className="
                      absolute left-0
                      bg-white px-4 py-3.5 rounded-lg w-max space-y-3.5
                      opacity-0 translate-y-2 pointer-events-none
                      group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto
                      transition-all duration-300 ease-out
                    "
                  />
                </div>

                <em> 
                <Link
                  key={`${item.name}-link`}
                  className="text-black hover:font-extrabold hover:text-[#32CD32] font-bold md:text-2xl "
                  href={item.url}
                >
                  {item.name}
                </Link>
                </em>
              </>
            ))}
          </div>

          <button onClick={() => setOpen(true)} className="ml-auto lg:hidden bg-black">
            <MenuIcon />
          </button>
        
        </nav>
      </header>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed top-0 left-0 z-50 md:hidden bg-[rgba(0,0,0,0.5)] h-full w-full"
        />
      )}

      <aside
        className={`bg-white ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:hidden overflow-auto transition-all ease-linear duration-300 p-8 fixed top-0 left-0 w-10/12 h-full z-50`}
      >
        <header>
          <img src="/images/kyw-logo.png" alt="logo" />
        </header>

        <div className="mt-[59px] space-y-[70px]">
          {navLinks.map((item) => (
            <>
              <div key={`${item.name}-mobile-dropdown`}>
                <button
                  onClick={() => setDropdown((prev) => !prev)}
                  className="text-[rgba(105,105,105,1)] flex font-bold items-center"
                >
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    dropdownOpen
                      ? "max-h-[500px] opacity-100 translate-y-0"
                      : "max-h-0 opacity-0 -translate-y-2"
                  } overflow-hidden`}
                />
              </div>

              <Link
                key={`${item.name}-mobile-link`}
                className="text-[rgba(105,105,105,1)] block hover:font-extrabold hover:text-[#32CD32] font-bold text-xl "
                href={item.url}
              >
                {item.name}
              </Link>
            </>
          ))}
        </div>
      </aside>
    </>
  );
}
