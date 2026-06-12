import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/app/lib/db";
import { SessionRequestModel } from "@/src/app/lib/models";
import { getSession } from "@/src/app/lib/auth";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const item = await SessionRequestModel.findById(id).lean();

    if (!item) {
      return NextResponse.json(
        { success: false, message: "Request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      request: item,
    });
  } catch (error) {
    console.error("GET_SESSION_REQUEST_ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to load request" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const session = await getSession();

    if (!session || session.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const body = await request.json();

    const updated = await SessionRequestModel.findByIdAndUpdate(
      id,
      {
        $set: {
          status: body.status,
        },
      },
      { new: true }
    );

    return NextResponse.json({
      success: true,
      request: updated,
    });
  } catch (error) {
    console.error("UPDATE_SESSION_REQUEST_ERROR:", error);

    return NextResponse.json(
      { success: false, message: "Failed to update request" },
      { status: 500 }
    );
  }
}