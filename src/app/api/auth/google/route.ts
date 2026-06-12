import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import { connectDB } from "@/src/app/lib/db";
import { UserModel } from "@/src/app/lib/models";
import { signToken } from "@/src/app/lib/auth";

export const runtime = "nodejs";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function isAdminEmail(email: string) {
  const adminEmails = String(process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  return adminEmails.includes(email.toLowerCase());
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const credential = body?.credential;

    if (!credential) {
      return NextResponse.json(
        { success: false, message: "Missing Google credential" },
        { status: 400 }
      );
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return NextResponse.json(
        { success: false, message: "Invalid Google token" },
        { status: 401 }
      );
    }

    const email = payload.email?.toLowerCase();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Google email missing" },
        { status: 400 }
      );
    }

    if (!payload.email_verified) {
      return NextResponse.json(
        { success: false, message: "Google email not verified" },
        { status: 401 }
      );
    }

    // Admin restriction
    if (!isAdminEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied: not an approved admin account",
        },
        { status: 403 }
      );
    }

    // Create / update user
    const user = await UserModel.findOneAndUpdate(
      { email },
      {
        $set: {
          email,
          name: payload.name || email.split("@")[0],
          image: payload.picture || "",
          googleId: payload.sub,
          role: "admin",
        },
      },
      { new: true, upsert: true }
    );

    // Sign JWT
    const token = signToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: "admin",
    });

    // Build response
    const response = NextResponse.json({
      success: true,
      message: "Admin login successful",
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        role: "admin",
      },
    });

    // Set cookie (IMPORTANT: must be on response)
    response.cookies.set("kyw_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("GOOGLE_LOGIN_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Google login failed",
      },
      { status: 500 }
    );
  }
}