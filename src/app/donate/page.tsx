
"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function DonatePage() {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleDonate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const numericAmount = Number(amount);

    if (
      !Number.isSafeInteger(numericAmount) ||
      numericAmount <= 0 ||
      !Number.isSafeInteger(numericAmount * 100)
    ) {
      setError("Enter a valid donation amount in naira.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/paystack/donations/initialize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: numericAmount,
            email: email.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success || !data.authorizationUrl) {
        throw new Error(
          data.message || "Unable to initialize your donation."
        );
      }

      window.location.assign(data.authorizationUrl);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-lg">
        <Link
          href="/"
          className="mb-8 inline-block font-semibold text-[#008080] transition hover:text-[#32CD32]"
        >
          ← Back to Home
        </Link>

        <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#008080]/10 text-3xl">
              💚
            </div>

            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#008080]">
              KYW Wellness Place
            </p>

            <h1 className="mb-4 font-fraunces text-3xl font-bold text-[#008080] sm:text-4xl">
              Support Our Mission
            </h1>

            <p className="leading-relaxed text-gray-600">
              Your donation supports our mission to promote mental,
              emotional, and physical wellness. Every contribution
              makes a difference.
            </p>
          </div>

          <form onSubmit={handleDonate} className="space-y-5">
            <div>
              <label
                htmlFor="amount"
                className="mb-2 block font-semibold text-gray-800"
              >
                Donation amount (₦)
              </label>

              <div className="flex items-center rounded-xl border border-gray-300 transition focus-within:border-[#008080] focus-within:ring-2 focus-within:ring-[#008080]/20">
                <span className="border-r border-gray-200 px-4 py-3 text-lg font-bold text-[#008080]">
                  ₦
                </span>

                <input
                  id="amount"
                  name="amount"
                  type="number"
                  min="1"
                  step="1"
                  inputMode="numeric"
                  required
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                  placeholder="Enter any amount"
                  className="w-full rounded-r-xl px-4 py-3 text-gray-900 outline-none"
                />
              </div>

              <p className="mt-2 text-sm text-gray-500">
                Enter the amount you would like to contribute.
              </p>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-semibold text-gray-800"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-[#008080] focus:ring-2 focus:ring-[#008080]/20"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-xl bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#008080] px-6 py-4 font-bold text-white transition duration-300 hover:bg-[#32CD32] hover:text-[#003b3b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Preparing your donation..."
                : "Donate Now"}
            </button>

            <p className="text-center text-xs text-gray-500">
              You will be redirected to Paystack to complete your
              payment securely.
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
