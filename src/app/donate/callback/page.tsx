
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function DonationCallbackContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState<
    "loading" | "paid" | "pending" | "error"
  >("loading");

  const [message, setMessage] = useState(
    "Please wait while we verify your donation."
  );

  useEffect(() => {
    let cancelled = false;

    async function verifyDonation() {
      if (!reference) {
        setStatus("error");
        setMessage("No payment reference was provided.");
        return;
      }

      try {
        const response = await fetch(
          `/api/paystack/donations/verify?reference=${encodeURIComponent(reference)}`,
          { cache: "no-store" }
        );

        const data = await response.json();

        if (cancelled) return;

        if (!response.ok || !data.success) {
          setStatus("error");
          setMessage(
            data.message || "We could not verify your donation."
          );
          return;
        }

        if (data.paid) {
          setStatus("paid");
          setMessage(
            "Thank you for supporting KYW Wellness Place. Your donation has been confirmed."
          );
        } else {
          setStatus("pending");
          setMessage(
            "Your payment has not been confirmed yet. Please allow some time and check again."
          );
        }
      } catch {
        if (cancelled) return;

        setStatus("error");
        setMessage(
          "We could not verify your payment right now. Please try again."
        );
      }
    }

    verifyDonation();

    return () => {
      cancelled = true;
    };
  }, [reference]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl border border-gray-100 p-8 text-center shadow-xl sm:p-10">
        <div className="mb-5 text-5xl">
          {status === "loading"
            ? "⏳"
            : status === "paid"
              ? "💚"
              : status === "pending"
                ? "🕒"
                : "⚠️"}
        </div>

        <h1 className="mb-4 font-fraunces text-3xl font-bold text-[#008080]">
          {status === "loading"
            ? "Verifying Donation"
            : status === "paid"
              ? "Thank You!"
              : status === "pending"
                ? "Payment Pending"
                : "Verification Issue"}
        </h1>

        <p className="mb-8 leading-relaxed text-gray-600">
          {message}
        </p>

        {status === "pending" || status === "error" ? (
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mb-4 w-full rounded-full bg-[#008080] px-6 py-3 font-bold text-white transition hover:bg-[#32CD32] hover:text-[#003b3b]"
          >
            Check Payment Again
          </button>
        ) : null}

        <Link
          href="/"
          className="inline-block font-semibold text-[#008080] transition hover:text-[#32CD32]"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}

export default function DonationCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-white px-4">
          <p className="text-[#008080]">
            Loading payment confirmation...
          </p>
        </main>
      }
    >
      <DonationCallbackContent />
    </Suspense>
  );
}
