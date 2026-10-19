
"use client";

import Link from "next/link";
import { Navbar } from "../components/structural";

export default function SessionSuccessPage() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[85vh] items-center justify-center bg-[#f4fffb] px-4 py-12">
        <section className="w-full max-w-2xl overflow-hidden rounded-[2rem] bg-white text-center shadow-xl animate-[fadeSlideIn_0.7s_ease-out]">
          <div className="bg-[#008080] px-6 py-12 text-white">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#32CD32] text-4xl font-black text-white shadow-lg">
              ✓
            </div>

            <h1 className="mt-6 text-3xl font-black md:text-4xl">
              Details Submitted Successfully!
            </h1>

            <p className="mx-auto mt-4 max-w-lg leading-7 text-white/85">
              Thank you for taking this important step toward your
              well-being. Your information has been submitted successfully.
            </p>
          </div>

          <div className="px-6 py-10 md:px-10">
            <h2 className="text-2xl font-black text-[#008080]">
              What Happens Next?
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Dr Christabel Juan Augustine has received your information
              and will review it and attend to you soon.
            </p>

            <div className="mt-6 rounded-2xl border border-[#32CD32]/40 bg-[#32CD32]/10 p-5">
              <p className="font-semibold leading-7 text-gray-700">
                In the meantime, take a moment for yourself.
                Explore our blog for helpful insights and resources
                to support your emotional and mental well-being.
              </p>
            </div>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/blog"
                className="rounded-full bg-[#008080] px-7 py-3.5 font-bold text-white transition duration-300 hover:bg-[#32CD32] hover:text-[#003b3b] hover:shadow-lg"
              >
                Explore Our Blog →
              </Link>

              <Link
                href="/"
                className="rounded-full border-2 border-[#008080] px-7 py-3.5 font-bold text-[#008080] transition duration-300 hover:bg-[#008080] hover:text-white"
              >
                Back to Home
              </Link>
            </div>

            <p className="mt-8 text-sm text-gray-400">
              KYW Wellness Place · Your well-being matters.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
