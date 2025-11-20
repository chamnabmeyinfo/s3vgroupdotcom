import { NextResponse } from "next/server";
import { submitQuoteAction } from "@/lib/actions/quote";

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const result = await submitQuoteAction(payload);
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    console.error("[api/quote] Failed", error);
    return NextResponse.json(
      { success: false, error: "Unable to submit quote at this time." },
      { status: 400 },
    );
  }
}

