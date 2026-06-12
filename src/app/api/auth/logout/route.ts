import { NextResponse } from "next/server";
import { clearAuthCookie } from "@/src/app/lib/auth";

export async function POST() {
  await clearAuthCookie();

  return NextResponse.json({
    success: true,
  });
}