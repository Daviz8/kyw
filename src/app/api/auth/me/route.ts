import { NextResponse } from "next/server";
import { getSession } from "@/src/app/lib/auth";

export async function GET() {
  const session = await getSession();

  return NextResponse.json({
    success: true,
    user: session,
  });
}
