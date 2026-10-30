
import {
  createHmac,
  timingSafeEqual,
} from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/app/lib/db";
import { SessionRequestModel } from "@/src/app/lib/models";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const secretKey = process.env.PAYSTACK_SECRET_KEY;
    const signature = request.headers.get("x-paystack-signature");

    if (!secretKey) {
      console.error("PAYSTACK_SECRET_KEY is missing.");

      return NextResponse.json(
        { message: "Webhook is not configured." },
        { status: 500 }
      );
    }

    if (!signature || !/^[a-f0-9]{128}$/i.test(signature)) {
      return NextResponse.json(
        { message: "Invalid webhook signature." },
        { status: 401 }
      );
    }

    // Read the raw body before parsing JSON.
    const rawBody = await request.text();

    const expectedSignature = createHmac("sha512", secretKey)
      .update(rawBody)
      .digest("hex");

    const receivedBuffer = Buffer.from(signature, "hex");
    const expectedBuffer = Buffer.from(expectedSignature, "hex");

    if (
      receivedBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(receivedBuffer, expectedBuffer)
    ) {
      return NextResponse.json(
        { message: "Signature verification failed." },
        { status: 401 }
      );
    }

    const event = JSON.parse(rawBody);

    // Acknowledge valid events that are not session payments.
    if (event.event !== "charge.success") {
      return NextResponse.json({ received: true });
    }

    const transaction = event.data;

    if (
      !transaction ||
      typeof transaction.reference !== "string"
    ) {
      return NextResponse.json(
        { message: "Invalid transaction event." },
        { status: 400 }
      );
    }

    await connectDB();

    const session = await SessionRequestModel.findOne({
      reference: transaction.reference,
    });

    // This webhook may also receive successful session payments.
    if (!session) {
      return NextResponse.json({
        received: true,
        ignored: true,
      });
    }

    const amountMatches =
      transaction.amount === session.amount * 100;

    const currencyMatches =
      transaction.currency === session.currency;

    const transactionSucceeded =
      transaction.status === "success";

    if (
      !amountMatches ||
      !currencyMatches ||
      !transactionSucceeded
    ) {
      console.error(
        "session_WEBHOOK_MISMATCH:",
        transaction.reference
      );

      // Acknowledge the event so Paystack does not repeatedly
      // send an event that cannot safely update this session.
      return NextResponse.json({
        received: true,
        processed: false,
      });
    }

    // Idempotency: repeated webhook deliveries must not
    // overwrite the original payment date.
    if (session.paymentStatus !== "paid") {
      session.paymentStatus = "paid";
      session.paidAt = new Date();
      await session.save();
    }

    return NextResponse.json({
      received: true,
      processed: true,
    });
  } catch (error) {
    console.error("PAYSTACK_session_WEBHOOK_ERROR:", error);

    return NextResponse.json(
      { message: "Webhook processing failed." },
      { status: 500 }
    );
  }
}
