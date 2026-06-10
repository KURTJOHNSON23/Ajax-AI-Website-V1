import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const data = await req.json();

  const { error } = await supabase.from("contact_submissions").insert({
    full_name: data.fullName,
    business_name: data.businessName,
    email: data.email,
    phone: data.phone,
    challenge: data.challenge,
    source: data.source,
  });

  if (error) {
    console.error("[Supabase error]", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
