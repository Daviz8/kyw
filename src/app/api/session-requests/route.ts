import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "../../lib/db";
import { SessionRequestModel } from "../../lib/models";
import { getSession } from "../../lib/auth";

export const runtime = "nodejs";

export async function GET() {
  try {
    await connectDB();

    const session = await getSession();

    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const requests = await SessionRequestModel.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      requests,
    });
  } catch (error) {
    console.error("GET_SESSION_REQUESTS_ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to load requests" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const fullName = String(body.fullName || "").trim();
    const email = String(body.email || "").trim().toLowerCase();
    const phone = String(body.phone || "").trim();
    const supportType = String(body.supportType || "").trim();
    const mainConcern = String(body.mainConcern || "").trim();

    if (!fullName || !email || !phone || !supportType || !mainConcern) {
      return NextResponse.json(
        { success: false, message: "Please complete all required fields" },
        { status: 400 }
      );
    }

    if (!body.consent) {
      return NextResponse.json(
        { success: false, message: "Consent is required" },
        { status: 400 }
      );
    }

    const amount =
      body.plan === "premium"
        ? 101500
        : 50750;

    const session = await getSession();

    const created = await SessionRequestModel.create({
      userId: session?.id || undefined,

      fullName,
      email,
      phone,

      dateOfBirth: String(body.dateOfBirth || ""),
      gender: String(body.gender || ""),

      emergencyName: String(body.emergencyName || ""),
      emergencyPhone: String(body.emergencyPhone || ""),
      emergencyRelationship: String(body.emergencyRelationship || ""),

      supportType,
      clientCategory: String(body.clientCategory || "adult"),
      mainConcern,

      previousCounselling: body.previousCounselling === "yes" ? "yes" : "no",
      medication: body.medication === "yes" ? "yes" : "no",
      riskConcern: body.riskConcern === "yes" ? "yes" : "no",

      preferredSession: String(body.preferredSession || "online"),
      plan: String(body.plan || "basic"),
      amount,

      consent: Boolean(body.consent),
    });

    return NextResponse.json({
      success: true,
      request: {
        id: created._id.toString(),
        amount: created.amount,
      },
    });
  } catch (error) {
    console.error("CREATE_SESSION_REQUEST_ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to submit request" },
      { status: 500 }
    );
  }
}
