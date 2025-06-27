import { WorkOS } from "@workos-inc/node";
import { Resend as ResendAPI } from "resend";
import { NextRequest, NextResponse } from "next/server";

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const { code } = await workos.userManagement.createMagicAuth({
    email,
  });

  // Delete this code if you just let Workos handle your emails
  if (process.env.RESEND_API_KEY) {
    const resend = new ResendAPI(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: `Test <${process.env.EMAIL_FROM}>`,
      to: [email],
      subject: `Sign in to Test`,
      text: `
  Hello,
  
  Your temporary code to access Test is:
  
  ${code}
  
  You can use this code to verify your account and access Test.
  
  This code will expire in 15 minutes.
  
  Best regards,
  The Test Team
  `,
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  // Until here

  return NextResponse.json({ ok: true });
}
