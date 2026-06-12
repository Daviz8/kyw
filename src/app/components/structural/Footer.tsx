import { footerLinks } from "../../lib";
import Link from "next/link";

type FooterSubLink = {
  name: string;
  url?: string;
};

type FooterLink = {
  name: string;
  subLinks: FooterSubLink[];
};

export default function Footer() {
  return (
    <section className="bg-[#042f2f] py-10 text-white lg:py-16">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="gap-10 space-y-10 lg:grid lg:grid-cols-6 lg:space-y-0">
          {(footerLinks as FooterLink[]).map((footerLink) => (
            <div key={footerLink.name}>
              <p className="text-xl font-black text-[#32CD32]">
                {footerLink.name}
              </p>

              <div className="my-6 space-y-3">
                {footerLink.subLinks.map((item) => (
                  <Link
                    key={item.name}
                    className="block text-sm text-white/70 transition hover:text-[#32CD32]"
                    href={item.url ?? "/"}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <ul className="flex justify-start space-x-5">
            <li>
              <a
                href="https://www.instagram.com/kyw_wellnessplace?igsh=aHdheHFjaDA2Znc4"
                className="text-white/60 hover:text-[#32CD32]"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <p className="mt-12 text-center text-sm text-white/50">
          Copyright ©2025 KYW Wellness Place. All rights reserved.
        </p>
      </div>
    </section>
  );
}