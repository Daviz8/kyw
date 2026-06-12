"use client";

import { Suspense, useEffect, useState } from "react";
import { InlineWidget } from "react-calendly";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type SessionRequest = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  paymentStatus: "unpaid" | "paid" | "failed";
  plan: "basic" | "premium";
};

type ApiResponse = {
  success: boolean;
  message?: string;
  request?: SessionRequest;
};

function SessionSchedulingContent() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get("caseId");

  const [request, setRequest] = useState<SessionRequest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRequest() {
      if (!caseId) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/session-requests/${caseId}`, {
          cache: "no-store",
        });

        const data = (await res.json()) as ApiResponse;

        if (!res.ok || !data.success || !data.request) {
          setRequest(null);
          return;
        }

        setRequest(data.request);
      } catch (error) {
        console.error(error);
        setRequest(null);
      } finally {
        setLoading(false);
      }
    }

    loadRequest();
  }, [caseId]);

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f4fffb] px-4">
        <p className="font-bold text-[#008080]">Checking payment access...</p>
      </main>
    );
  }

  if (!caseId || !request) {
    return (
      <AccessBox
        title="Session Not Found"
        text="We could not find your session request. Please complete the intake form first."
        href="/book-a-session"
        buttonText="Book a Session"
      />
    );
  }

  if (request.paymentStatus !== "paid") {
    return (
      <AccessBox
        title="Payment Required"
        text="Please complete payment before scheduling your counselling session."
        href={`/checkout?caseId=${caseId}`}
        buttonText="Continue to Payment"
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#f4fffb] px-4 py-8">
      <section className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-xl">
        <div className="bg-[#008080] px-6 py-8 text-white md:px-10">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#32CD32]">
            Payment Confirmed
          </p>

          <h1 className="mt-3 text-3xl font-black md:text-5xl">
            Schedule Your Session
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-white/80 md:text-base">
            Thank you, {request.fullName}. Your payment has been confirmed.
            Please choose a suitable time for your session below.
          </p>
        </div>

        <div className="min-h-[720px] p-2 md:p-6">
          <InlineWidget
            url="https://calendly.com/kywwellnessplace/30min"
            styles={{
              height: "720px",
              width: "100%",
            }}
            prefill={{
              name: request.fullName,
              email: request.email,
              customAnswers: {
                a1: request.phone,
              },
            }}
          />
        </div>
      </section>
    </main>
  );
}

function AccessBox({
  title,
  text,
  href,
  buttonText,
}: {
  title: string;
  text: string;
  href: string;
  buttonText: string;
}) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f4fffb] px-4">
      <section className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-xl">
        <h1 className="text-3xl font-black text-[#008080]">{title}</h1>

        <p className="mt-4 text-sm leading-6 text-gray-600">{text}</p>

        <Link
          href={href}
          className="mt-8 inline-flex rounded-full bg-[#008080] px-6 py-3 font-black text-white transition hover:bg-[#32CD32]"
        >
          {buttonText}
        </Link>
      </section>
    </main>
  );
}

export default function SessionSchedulingPage() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-[#f4fffb] px-4">
          <p className="font-bold text-[#008080]">Loading scheduler...</p>
        </main>
      }
    >
      <SessionSchedulingContent />
    </Suspense>
  );
}