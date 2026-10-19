
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/app/lib/db";
import { DonationModel } from "@/src/app/lib/models";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const reference = new URL(request.url).searchParams.get("reference");

    if (!reference) {
      return NextResponse.json(
        { success: false, message: "Payment reference is required." },
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

    const donation = await DonationModel.findOne({ reference });

    if (!donation) {
      return NextResponse.json(
        { success: false, message: "Donation not found." },
        { status: 404 }
      );
    }

    // Make verification idempotent: do not process a paid donation again.
    if (donation.paymentStatus === "paid") {
      return NextResponse.json({
        success: true,
        paid: true,
        amount: donation.amount,
        currency: donation.currency,
      });
    }

    const paystackResponse = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
        cache: "no-store",
      }
    );

    const result = await paystackResponse.json();

    if (!paystackResponse.ok || !result.status) {
      return NextResponse.json(
        { success: false, message: "Could not verify this payment." },
        { status: 400 }
      );
    }

    const transaction = result.data;

    const amountMatches =
      transaction.amount === donation.amount * 100;

    const currencyMatches =
      transaction.currency === donation.currency;

    const referenceMatches =
      transaction.reference === donation.reference;

    if (!amountMatches || !currencyMatches || !referenceMatches) {
      console.error("DONATION_VERIFICATION_MISMATCH:", reference);

      return NextResponse.json(
        {
          success: false,
          paid: false,
          message: "The transaction details do not match this donation.",
        },
        { status: 400 }
      );
    }

    const paid = transaction.status === "success";

    if (paid) {
      donation.paymentStatus = "paid";
      donation.paidAt = new Date();
      await donation.save();
    }

    return NextResponse.json({
      success: true,
      paid,
      amount: donation.amount,
      currency: donation.currency,
      message: paid
        ? "Thank you for supporting KYW Wellness Place."
        : "Your payment has not been confirmed yet.",
    });
  } catch (error) {
    console.error("DONATION_VERIFY_ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Payment verification failed." },
      { status: 500 }
    );
  }
}
