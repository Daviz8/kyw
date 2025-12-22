/** @format */

import { footerLinks } from "@/lib";
import { Playfair_Display } from "next/font/google";
import Link from "next/link";

const playfair = Playfair_Display({
	subsets: ["latin"],
});

export default function Footer() {
  return (
    <section className="py-7 lg:py-22 bg-[#121521]">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="gap-x-10 space-y-12 lg:grid grid-cols-6">
          <div className="col-span-2 pr-12">
            <img
              className="w-32 hidden lg:inline-block rounded-full"
              src="/images/kyw.png"
              alt="logo"
            />
            <img
              className="max-w-[60px] w-full lg:hidden rounded-full"
              src="/images/kyw.png"
              alt="logo"
            />
          </div>
          {footerLinks.map((footerLink) => {
            return (
              <div key={footerLink.name}>
                <p className={`${playfair.className} font-black text-lg`}>{footerLink.name}</p>
                <div className="my-6 space-y-3">
                  {footerLink.subLinks.map((item) => {
                    return (
                      <Link key={item.name} className="block text-lg" href={item.url ?? "/"}>
                        <span className="text-sm">{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-center mt-20 hidden lg:block">
          Copyright ©2025 kyw wellness place. All rights reserved.
        </p>
      </div>
    </section>
  );
}
