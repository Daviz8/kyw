import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/app/lib/db";
import { SessionRequestModel } from "@/src/app/lib/models";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const caseId = String(body.caseId || "");

    if (!caseId) {
      return NextResponse.json(
        { success: false, message: "caseId is required" },
        { status: 400 }
      );
    }

    const sessionRequest = await SessionRequestModel.findById(caseId);

    if (!sessionRequest) {
      return NextResponse.json(
        { success: false, message: "Session request not found" },
        { status: 404 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { success: false, message: "PAYSTACK_SECRET_KEY is missing" },
        { status: 500 }
      );
    }

    const siteUrl = process.env.PUBLIC_SITE_URL;

    const reference = `KYW-${caseId}-${Date.now()}`;

    const paystackRes = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: sessionRequest.email,
          amount: Number(sessionRequest.amount) * 100,
          reference,
          callback_url: `${siteUrl}/payment/callback?caseId=${caseId}`,
          metadata: {
            caseId,
            fullName: sessionRequest.fullName,
            phone: sessionRequest.phone,
            supportType: sessionRequest.supportType,
            plan: sessionRequest.plan,
          },
        }),
      }
    );

    const data = await paystackRes.json();

    if (!paystackRes.ok || !data.status) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Paystack initialization failed",
        },
        { status: 400 }
      );
    }

    sessionRequest.paystackReference = reference;
    await sessionRequest.save();

    return NextResponse.json({
      success: true,
      authorizationUrl: data.data.authorization_url,
      reference,
    });
  } catch (error) {
    console.error("PAYSTACK_INITIALIZE_ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Payment initialization failed" },
      { status: 500 }
    );
  }
}