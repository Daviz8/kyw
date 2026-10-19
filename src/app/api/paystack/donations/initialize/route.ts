
import { randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/app/lib/db";
import { DonationModel } from "@/src/app/lib/models";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const amount = Number(body.amount);

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Enter a valid email address." },
        { status: 400 }
      );
    }

    if (
      !Number.isSafeInteger(amount) ||
      amount <= 0 ||
      !Number.isSafeInteger(amount * 100)
    ) {
      return NextResponse.json(
        { success: false, message: "Enter a valid amount in naira." },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { success: false, message: "Paystack is not configured." },
        { status: 500 }
      );
    }

    await connectDB();

    const reference =
      `KYW-DON-${Date.now()}-${randomBytes(4).toString("hex")}`;

    const donation = await DonationModel.create({
      email,
      amount,
      currency: "NGN",
      reference,
      paymentStatus: "pending",
    });

    const siteUrl = (
      process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin
    ).replace(/\/+$/, "");

    const paystackResponse = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: amount * 100,
          currency: "NGN",
          reference,
          callback_url: `${siteUrl}/donate/callback`,
          metadata: {
            donationId: donation._id.toString(),
            purpose: "kyw_wellness_donation",
          },
        }),
      }
    );

    const data = await paystackResponse.json();

    if (!paystackResponse.ok || !data.status) {
      donation.paymentStatus = "failed";
      await donation.save();

      return NextResponse.json(
        {
          success: false,
          message: data.message || "Could not initialize the donation.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      authorizationUrl: data.data.authorization_url,
      reference,
    });
  } catch (error) {
    console.error("DONATION_INITIALIZE_ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Unable to start your donation." },
      { status: 500 }
    );
  }
}
