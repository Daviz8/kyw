"use client";

import { ChangeEvent, useEffect, useState } from "react";

type CaseStatus = "new" | "reviewed" | "contacted" | "scheduled" | "closed";

type SessionRequest = {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  supportType: string;
  mainConcern: string;
  plan: string;
  paymentStatus: "unpaid" | "paid" | "failed";
  status: CaseStatus;
};

type RequestsResponse = {
  success: boolean;
  message?: string;
  requests?: SessionRequest[];
};

type UpdateResponse = {
  success: boolean;
  message?: string;
  request?: SessionRequest;
};

export default function AdminDashboardPage() {
  const [requests, setRequests] = useState<SessionRequest[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadRequests() {
    setLoading(true);

    try {
      const res = await fetch("/api/session-requests", {
        cache: "no-store",
      });

      const data = (await res.json()) as RequestsResponse;

      if (!res.ok) {
        alert(data.message || "Unauthorized");
        window.location.href = "/signin";
        return;
      }

      setRequests(data.requests || []);
    } catch (error) {
      console.error(error);
      alert("Failed to load requests");
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus(id: string, status: CaseStatus) {
    const res = await fetch(`/api/session-requests/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    const data = (await res.json()) as UpdateResponse;

    if (!res.ok || !data.success) {
      alert(data.message || "Failed to update");
      return;
    }

    loadRequests();
  }

  function handleStatusChange(
    event: ChangeEvent<HTMLSelectElement>,
    id: string
  ) {
    updateStatus(id, event.target.value as CaseStatus);
  }

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <main className="min-h-screen bg-[#f4fffb] px-4 py-8">
      <section className="mx-auto max-w-7xl">
        <h1 className="text-3xl md:text-4xl font-black text-[#008080]">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-sm md:text-base text-gray-600">
          View intake forms, payment status, and client support needs.
        </p>

        <div className="mt-8 rounded-[2rem] bg-white p-4 md:p-5 shadow-xl">
          {loading ? (
            <p className="py-10 text-center font-bold text-[#008080]">
              Loading cases...
            </p>
          ) : (
            <>
              {/* Mobile View */}
              <div className="space-y-4 md:hidden">
                {requests.length ? (
                  requests.map((item) => (
                    <div
                      key={item._id}
                      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <div className="mb-4">
                        <h3 className="text-lg font-black text-[#008080]">
                          {item.fullName}
                        </h3>

                        <p className="break-all text-sm text-gray-500">
                          {item.email}
                        </p>

                        <p className="text-sm text-gray-500">
                          {item.phone}
                        </p>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="font-semibold text-gray-700">
                            Support:
                          </span>
                          <p className="capitalize">
                            {item.supportType?.replaceAll("_", " ")}
                          </p>
                        </div>

                        <div>
                          <span className="font-semibold text-gray-700">
                            Concern:
                          </span>

                          <p className="mt-1 text-gray-600">
                            {item.mainConcern}
                          </p>
                        </div>

                        <div>
                          <span className="font-semibold text-gray-700">
                            Plan:
                          </span>{" "}
                          <span className="capitalize">{item.plan}</span>
                        </div>

                        <div>
                          <span className="font-semibold text-gray-700">
                            Payment:
                          </span>{" "}
                          <span
                            className={`inline-block rounded-full px-3 py-1 text-xs font-black ${
                              item.paymentStatus === "paid"
                                ? "bg-green-100 text-green-700"
                                : item.paymentStatus === "failed"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {item.paymentStatus}
                          </span>
                        </div>

                        <div>
                          <span className="font-semibold text-gray-700">
                            Current Status:
                          </span>{" "}
                          <span className="capitalize">
                            {item.status}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="mb-2 block text-sm font-semibold text-gray-700">
                          Update Status
                        </label>

                        <select
                          value={item.status}
                          onChange={(event) =>
                            handleStatusChange(event, item._id)
                          }
                          className="w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-[#008080]"
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="contacted">Contacted</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="py-12 text-center font-bold text-gray-500">
                    No session requests yet.
                  </div>
                )}
              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full min-w-[1000px] text-left">
                  <thead>
                    <tr className="border-b text-sm uppercase text-gray-400">
                      <th className="p-4">Client</th>
                      <th className="p-4">Support</th>
                      <th className="p-4">Concern</th>
                      <th className="p-4">Plan</th>
                      <th className="p-4">Payment</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {requests.map((item) => (
                      <tr key={item._id} className="border-b align-top">
                        <td className="p-4">
                          <p className="font-black">{item.fullName}</p>

                          <p className="text-sm text-gray-500">
                            {item.email}
                          </p>

                          <p className="text-sm text-gray-500">
                            {item.phone}
                          </p>
                        </td>

                        <td className="p-4 capitalize">
                          {item.supportType?.replaceAll("_", " ")}
                        </td>

                        <td className="max-w-sm p-4 text-sm leading-6 text-gray-600">
                          {item.mainConcern}
                        </td>

                        <td className="p-4 capitalize">
                          {item.plan}
                        </td>

                        <td className="p-4">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-black ${
                              item.paymentStatus === "paid"
                                ? "bg-green-100 text-green-700"
                                : item.paymentStatus === "failed"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {item.paymentStatus}
                          </span>
                        </td>

                        <td className="p-4 capitalize">
                          {item.status}
                        </td>

                        <td className="p-4">
                          <select
                            value={item.status}
                            onChange={(event) =>
                              handleStatusChange(event, item._id)
                            }
                            className="rounded-xl border border-gray-300 px-3 py-2 outline-none focus:border-[#008080]"
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="contacted">Contacted</option>
                            <option value="scheduled">Scheduled</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    ))}

                    {!requests.length && (
                      <tr>
                        <td
                          colSpan={7}
                          className="py-12 text-center font-bold text-gray-500"
                        >
                          No session requests yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}