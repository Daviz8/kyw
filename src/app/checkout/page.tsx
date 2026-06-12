"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type SessionRequest = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  plan: "basic" | "premium";
  amount: number;
  paymentStatus: "unpaid" | "paid" | "failed";
};

type RequestResponse = {
  success: boolean;
  message?: string;
  request?: SessionRequest;
};

type InitializeResponse = {
  success: boolean;
  message?: string;
  authorizationUrl?: string;
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const caseId = searchParams.get("caseId");

  const [request, setRequest] = useState<SessionRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!caseId) {
      setLoading(false);
      return;
    }

    fetch(`/api/session-requests/${caseId}`)
      .then((res) => res.json())
      .then((data: RequestResponse) => setRequest(data.request || null))
      .catch(() => setRequest(null))
      .finally(() => setLoading(false));
  }, [caseId]);

  async function startPayment() {
    if (!caseId) return;

    try {
      setPaying(true);

      const res = await fetch("/api/paystack/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ caseId }),
      });

      const data = (await res.json()) as InitializeResponse;

      if (!res.ok || !data.success || !data.authorizationUrl) {
        alert(data.message || "Payment failed to start");
        return;
      }

      window.location.href = data.authorizationUrl;
    } catch (error) {
      console.error(error);
      alert("Could not start payment.");
    } finally {
      setPaying(false);
    }
  }

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f4fffb]">
        <p className="font-bold text-[#008080]">Loading checkout...</p>
      </main>
    );
  }

  if (!request) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f4fffb] px-4">
        <section className="rounded-3xl bg-white p-8 text-center shadow-xl">
          <h1 className="text-2xl font-black text-red-600">
            Request not found
          </h1>
        </section>
      </main>
    );
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#f4fffb] px-4">
      <section className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-xl">
        <h1 className="text-center text-3xl font-black text-[#008080]">
          Complete Payment
        </h1>

        <div className="mt-6 rounded-2xl bg-[#eaffea] p-5">
          <p className="font-bold text-gray-600">Client</p>
          <p className="mt-1 text-xl font-black">{request.fullName}</p>

          <p className="mt-4 font-bold text-gray-600">Plan</p>
          <p className="mt-1 capitalize">{request.plan}</p>

          <p className="mt-4 font-bold text-gray-600">Amount</p>
          <p className="mt-1 text-3xl font-black text-[#32CD32]">
            ₦{Number(request.amount || 0).toLocaleString()}
          </p>
        </div>

        <button
          type="button"
          onClick={startPayment}
          disabled={paying || request.paymentStatus === "paid"}
          className="mt-6 w-full rounded-full bg-[#008080] px-6 py-4 text-lg font-black text-white transition hover:bg-[#32CD32] disabled:opacity-60"
        >
          {request.paymentStatus === "paid"
            ? "Payment Completed"
            : paying
            ? "Redirecting..."
            : "Pay"}
        </button>
      </section>
    </main>
  );
}

export default function CheckoutClient() {
  return (
    <Suspense
      fallback={
        <main className="grid min-h-screen place-items-center bg-[#f4fffb]">
          <p className="font-bold text-[#008080]">Loading checkout...</p>
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}