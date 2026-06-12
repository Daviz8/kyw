"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import MembershipPricing from "../components/Pricing";
import { Navbar } from "../components/structural";
type SupportType =
  | "anxiety"
  | "depression"
  | "addiction"
  | "relationship"
  | "child_psychology"
  | "stress"
  | "grief"
  | "trauma"
  | "other";

type ClientCategory = "adult" | "child" | "teen" | "couple" | "family";
type YesNo = "yes" | "no";
type PreferredSession = "online" | "physical" | "either";
type Plan = "basic" | "premium";

type IntakeForm = {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
  emergencyName: string;
  emergencyPhone: string;
  emergencyRelationship: string;
  supportType: SupportType;
  clientCategory: ClientCategory;
  mainConcern: string;
  previousCounselling: YesNo;
  medication: YesNo;
  riskConcern: YesNo;
  preferredSession: PreferredSession;
  plan: Plan;
  consent: boolean;
};

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
};

type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
};

type CreateRequestResponse = {
  success: boolean;
  message?: string;
  request?: {
    id: string;
    amount: number;
  };
};

const initialForm: IntakeForm = {
  fullName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  emergencyName: "",
  emergencyPhone: "",
  emergencyRelationship: "",
  supportType: "anxiety",
  clientCategory: "adult",
  mainConcern: "",
  previousCounselling: "no",
  medication: "no",
  riskConcern: "no",
  preferredSession: "online",
  plan: "basic",
  consent: false,
};

export default function BookSessionPage() {
  const router = useRouter();
  const [form, setForm] = useState<IntakeForm>(initialForm);
  const [loading, setLoading] = useState(false);

  function updateField<K extends keyof IntakeForm>(
    key: K,
    value: IntakeForm[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.fullName || !form.email || !form.phone || !form.mainConcern) {
      alert("Please complete all required fields.");
      return;
    }

    if (!form.consent) {
      alert("Please confirm your consent.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/session-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await res.json()) as CreateRequestResponse;

      if (!res.ok || !data.success || !data.request?.id) {
        alert(data.message || "Failed to submit request");
        return;
      }

      router.push(`/checkout?caseId=${data.request.id}`);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <Navbar />
    <main className="min-h-screen bg-[#f4fffb] px-4 py-10">
        <MembershipPricing/>
      <section className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-xl">
        <div className="bg-[#008080] p-8 text-white">
          <h1 className="text-4xl font-black">Book a Session</h1>
          <p className="mt-3 max-w-2xl text-white/80">
            Complete this short intake form. Your information will be reviewed
            by the admin before your session is confirmed.
          </p>
        </div>

        <form onSubmit={submitForm} className="space-y-8 p-6 md:p-8">
          <section>
            <h2 className="text-2xl font-black text-[#008080]">
              Client Information
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Input
                label="Full Name"
                required
                value={form.fullName}
                onChange={(value) => updateField("fullName", value)}
              />

              <Input
                label="Email Address"
                type="email"
                required
                value={form.email}
                onChange={(value) => updateField("email", value)}
              />

              <Input
                label="Phone Number"
                required
                value={form.phone}
                onChange={(value) => updateField("phone", value)}
              />

              <Input
                label="Date of Birth"
                type="date"
                value={form.dateOfBirth}
                onChange={(value) => updateField("dateOfBirth", value)}
              />

              <Select
                label="Gender"
                value={form.gender}
                onChange={(value) => updateField("gender", value)}
                options={[
                  ["", "Select gender"],
                  ["female", "Female"],
                  ["male", "Male"],
                  ["prefer_not_to_say", "Prefer not to say"],
                ]}
              />

              <Select
                label="Client Category"
                value={form.clientCategory}
                onChange={(value) =>
                  updateField("clientCategory", value as ClientCategory)
                }
                options={[
                  ["adult", "Adult"],
                  ["teen", "Teen"],
                  ["child", "Child"],
                  ["couple", "Couple"],
                  ["family", "Family"],
                ]}
              />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#008080]">
              Reason for Seeking Support
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Select
                label="Main Area of Support"
                value={form.supportType}
                onChange={(value) =>
                  updateField("supportType", value as SupportType)
                }
                options={[
                  ["anxiety", "Anxiety"],
                  ["depression", "Depression"],
                  ["addiction", "Addiction"],
                  ["relationship", "Relationship"],
                  ["child_psychology", "Child Psychology"],
                  ["stress", "Stress / Burnout"],
                  ["grief", "Grief"],
                  ["trauma", "Trauma"],
                  ["other", "Other"],
                ]}
              />

              <Select
                label="Preferred Session"
                value={form.preferredSession}
                onChange={(value) =>
                  updateField("preferredSession", value as PreferredSession)
                }
                options={[
                  ["online", "Online"],
                  ["physical", "Physical"],
                ]}
              />

              <Select
                label="Previous Counselling?"
                value={form.previousCounselling}
                onChange={(value) =>
                  updateField("previousCounselling", value as YesNo)
                }
                options={[
                  ["no", "No"],
                  ["yes", "Yes"],
                ]}
              />

              <Select
                label="Currently on medication?"
                value={form.medication}
                onChange={(value) => updateField("medication", value as YesNo)}
                options={[
                  ["no", "No"],
                  ["yes", "Yes"],
                ]}
              />

              <Select
                label="Any urgent risk concern?"
                value={form.riskConcern}
                onChange={(value) =>
                  updateField("riskConcern", value as YesNo)
                }
                options={[
                  ["no", "No"],
                  ["yes", "Yes"],
                ]}
              />

              <Select
                label="Payment Plan"
                value={form.plan}
                onChange={(value) => updateField("plan", value as Plan)}
                options={[
                  ["basic", "Basic Plan ₦50,750"],
                  ["premium", "Premium Plan ₦101,500"],
                ]}
              />
            </div>

            <label className="mt-4 block">
              <span className="font-bold text-gray-700">
                Briefly describe your main concern
              </span>
              <textarea
                required
                value={form.mainConcern}
                onChange={(e) => updateField("mainConcern", e.target.value)}
                rows={5}
                className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#008080]"
              />
            </label>
          </section>

          <section>
            <h2 className="text-2xl font-black text-[#008080]">
              Emergency Contact
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <Input
                label="Full Name"
                value={form.emergencyName}
                onChange={(value) => updateField("emergencyName", value)}
              />

              <Input
                label="Phone"
                value={form.emergencyPhone}
                onChange={(value) => updateField("emergencyPhone", value)}
              />

              <Input
                label="Relationship"
                value={form.emergencyRelationship}
                onChange={(value) =>
                  updateField("emergencyRelationship", value)
                }
              />
            </div>
          </section>

          <label className="flex items-start gap-3 rounded-2xl bg-[#eaffea] p-4">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => updateField("consent", e.target.checked)}
              className="mt-1 h-5 w-5 accent-[#32CD32]"
            />

            <span className="text-sm font-semibold leading-6 text-gray-700">
              I confirm that the information provided is accurate and I consent
              to KYW Wellness reviewing my intake request.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#008080] px-6 py-4 text-lg font-black text-white transition hover:bg-[#32CD32] disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Continue to Payment"}
          </button>
        </form>
      </section>
    </main>
    </>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: InputProps) {
  return (
    <label className="block">
      <span className="font-bold text-gray-700">
        {label} {required ? "*" : ""}
      </span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#008080]"
      />
    </label>
  );
}

function Select({ label, value, onChange, options }: SelectProps) {
  return (
    <label className="block">
      <span className="font-bold text-gray-700">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#008080]"
      >
        {options.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </select>
    </label>
  );
}