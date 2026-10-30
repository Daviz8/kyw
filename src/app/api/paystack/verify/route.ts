import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/app/lib/db";
import { SessionRequestModel } from "@/src/app/lib/models";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const reference = searchParams.get("reference");
    const caseId = searchParams.get("caseId");

    if (!reference || !caseId) {
      return NextResponse.json(
        { success: false, message: "reference and caseId are required" },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { success: false, message: "PAYSTACK_SECRET_KEY is missing" },
        { status: 500 }
      );
    }

    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    const data = await paystackRes.json();

    if (!paystackRes.ok || !data.status) {
      return NextResponse.json(
        { success: false, message: "Payment verification failed" },
        { status: 400 }
      );
    }

    const paid = data.data.status === "success";

    const updated = await SessionRequestModel.findByIdAndUpdate(
      caseId,
      {
        $set: {
          paymentStatus: paid ? "paid" : "failed",
          paystackReference: reference,
          paidAt: paid ? new Date() : undefined,
        },
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      paid,
      request: updated,
    });
  } catch (error) {
    console.error("PAYSTACK_VERIFY_ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Payment verification failed" },
      { status: 500 }
    );
  }
}