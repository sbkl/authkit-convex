import { saveSession } from "@workos-inc/authkit-nextjs";
import { WorkOS } from "@workos-inc/node";

import { NextRequest, NextResponse } from "next/server";

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function POST(req: NextRequest) {
  const { email, code } = await req.json();

  const session = await workos.userManagement.authenticateWithMagicAuth({
    clientId: process.env.WORKOS_CLIENT_ID!,
    code,
    email,
  });

  await saveSession(session, req);

  return NextResponse.json({ ok: true });
}
