"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

type PaymentState = "verifying" | "success" | "failed";

type VerifyResponse = {
  success: boolean;
  paid?: boolean;
  message?: string;
};

function PaymentCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const reference = searchParams.get("reference");
  const caseId = searchParams.get("caseId");

  const [status, setStatus] = useState<PaymentState>("verifying");
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    async function verify() {
      if (!reference || !caseId) {
        setStatus("failed");
        setMessage("Missing payment reference.");
        return;
      }

      try {
        const res = await fetch(
          `/api/paystack/verify?reference=${reference}&caseId=${caseId}`,
          {
            cache: "no-store",
          }
        );

        const data = (await res.json()) as VerifyResponse;

        if (res.ok && data.success && data.paid) {
          setStatus("success");
          setMessage("Payment successful. Redirecting you to scheduling...");

          setTimeout(() => {
            router.replace(`/session-scheduling?caseId=${caseId}`);
          }, 1200);

          return;
        }

        setStatus("failed");
        setMessage(data.message || "Payment verification failed.");
      } catch (error) {
        console.error(error);
        setStatus("failed");
        setMessage("Payment verification failed.");
      }
    }

    verify();
  }, [reference, caseId, router]);

  return (
    <main className="grid min-h-screen place-items-center bg-[#f4fffb] px-4">
      <section className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-xl">
        <h1
          className={`text-3xl font-black ${
            status === "success"
              ? "text-[#32CD32]"
              : status === "failed"
                ? "text-red-600"
                : "text-[#008080]"
          }`}
        >
          {status === "success"
            ? "Payment Successful"
            : status === "failed"
              ? "Payment Failed"
              : "Please Wait"}
        </h1>

        <p className="mt-4 text-gray-600">{message}</p>

        {status === "success" && caseId ? (
          <Link
            href={`/session-scheduling?caseId=${caseId}`}
            className="mt-8 inline-flex rounded-full bg-[#008080] px-6 py-3 font-black text-white transition hover:bg-[#32CD32]"
          >
            Continue to Scheduling
          </Link>
        ) : null}

        {status === "failed" && caseId ? (
          <Link
            href={`/checkout?caseId=${caseId}`}
            className="mt-8 inline-flex rounded-full bg-[#008080] px-6 py-3 font-black text-white transition hover:bg-[#32CD32]"
          >
            Try Payment Again
          </Link>
        ) : null}
      </section>
    </main>
  );
}

export default function PaymentCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-[#f4fffb] px-4">
          <p className="font-bold text-[#008080]">Verifying payment...</p>
        </main>
      }
    >
      <PaymentCallbackContent />
    </Suspense>
  );
}