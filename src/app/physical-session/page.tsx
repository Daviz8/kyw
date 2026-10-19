
"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
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

export default function AlreadyPaidPage() {
  const router = useRouter();
  const [form, setForm] = useState<IntakeForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof IntakeForm>(
    key: K,
    value: IntakeForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (
      !form.fullName.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.mainConcern.trim()
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (!form.consent) {
      setError("Please confirm your consent before submitting.");
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

      const data = await res.json();

      if (!res.ok || !data.success || !data.request?.id) {
        setError(data.message || "Failed to submit your details.");
        return;
      }

      router.push("/success-physical-session");
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f4fffb] px-4 py-10">
        <section className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-xl animate-[fadeSlideIn_0.7s_ease-out]">
          <header className="bg-[#008080] p-6 text-white md:p-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
              <span className="text-[#32CD32]">✓</span>
              Already Paid
            </div>

            <h1 className="text-3xl font-black md:text-4xl">
              Complete Your Details
            </h1>

            <p className="mt-3 max-w-2xl leading-7 text-white/85">
              Thank you for your payment. Please complete this form
              so Dr Christabel Juan Augustine can review your
              information and attend to you soon.
            </p>
          </header>

          <form
            onSubmit={submitForm}
            className="space-y-8 p-6 md:p-8"
          >
            <section>
              <h2 className="text-2xl font-black text-[#008080]">
                Client Information
              </h2>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Input
                  label="Full Name"
                  required
                  value={form.fullName}
                  onChange={(v) => updateField("fullName", v)}
                />

                <Input
                  label="Email Address"
                  type="email"
                  required
                  value={form.email}
                  onChange={(v) => updateField("email", v)}
                />

                <Input
                  label="Phone Number"
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(v) => updateField("phone", v)}
                />

                <Input
                  label="Date of Birth"
                  type="date"
                  value={form.dateOfBirth}
                  onChange={(v) => updateField("dateOfBirth", v)}
                />

                <Select
                  label="Gender"
                  value={form.gender}
                  onChange={(v) => updateField("gender", v)}
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
                  onChange={(v) =>
                    updateField("clientCategory", v as ClientCategory)
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
                  onChange={(v) =>
                    updateField("supportType", v as SupportType)
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
                  onChange={(v) =>
                    updateField("preferredSession", v as PreferredSession)
                  }
                  options={[
                    ["online", "Online"],
                    ["physical", "Physical"],
                    ["either", "Either"],
                  ]}
                />

                <Select
                  label="Previous Counselling?"
                  value={form.previousCounselling}
                  onChange={(v) =>
                    updateField("previousCounselling", v as YesNo)
                  }
                  options={[
                    ["no", "No"],
                    ["yes", "Yes"],
                  ]}
                />

                <Select
                  label="Currently on medication?"
                  value={form.medication}
                  onChange={(v) => updateField("medication", v as YesNo)}
                  options={[
                    ["no", "No"],
                    ["yes", "Yes"],
                  ]}
                />

                <Select
                  label="Any urgent risk concern?"
                  value={form.riskConcern}
                  onChange={(v) => updateField("riskConcern", v as YesNo)}
                  options={[
                    ["no", "No"],
                    ["yes", "Yes"],
                  ]}
                />

                <Select
                  label="Payment Plan"
                  value={form.plan}
                  onChange={(v) => updateField("plan", v as Plan)}
                  options={[
                    ["basic", "Basic Plan ₦50,750"],
                    ["premium", "Premium Plan ₦101,500"],
                  ]}
                />
              </div>

              <label className="mt-4 block">
                <span className="font-bold text-gray-700">
                  Briefly describe your main concern *
                </span>

                <textarea
                  required
                  value={form.mainConcern}
                  onChange={(e) =>
                    updateField("mainConcern", e.target.value)
                  }
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
                  onChange={(v) => updateField("emergencyName", v)}
                />

                <Input
                  label="Phone"
                  type="tel"
                  value={form.emergencyPhone}
                  onChange={(v) => updateField("emergencyPhone", v)}
                />

                <Input
                  label="Relationship"
                  value={form.emergencyRelationship}
                  onChange={(v) =>
                    updateField("emergencyRelationship", v)
                  }
                />
              </div>
            </section>

            <label className="flex items-start gap-3 rounded-2xl bg-[#32CD32]/10 p-4">
              <input
                type="checkbox"
                required
                checked={form.consent}
                onChange={(e) => updateField("consent", e.target.checked)}
                className="mt-1 h-5 w-5 accent-[#32CD32]"
              />

              <span className="text-sm font-semibold leading-6 text-gray-700">
                I confirm that the information provided is accurate
                and I consent to KYW Wellness reviewing my intake request.
              </span>
            </label>

            {error && (
              <div
                role="alert"
                className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#008080] px-6 py-4 text-lg font-black text-white transition duration-300 hover:bg-[#32CD32] hover:text-[#003b3b] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Your Details"}
            </button>
          </form>
        </section>
      </main>
    </>
  );
}

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
};

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

type SelectProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
};

function Select({ label, value, onChange, options }: SelectProps) {
  return (
    <label className="block">
      <span className="font-bold text-gray-700">{label}</span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 outline-none focus:border-[#008080]"
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
