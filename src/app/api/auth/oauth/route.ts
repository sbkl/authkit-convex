import { WorkOS } from "@workos-inc/node";
import { saveSession } from "@workos-inc/authkit-nextjs";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const workos = new WorkOS(process.env.WORKOS_API_KEY);

export async function GET(req: NextRequest) {
  const code = new URL(req.url).searchParams.get("code") || "";

  try {
    const response = await workos.userManagement.authenticateWithCode({
      clientId: process.env.WORKOS_CLIENT_ID || "",
      code,
    });
    await saveSession(response, req);
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { error: "Failed to authenticate" },
      { status: 500 }
    );
  }
  redirect(`http://localhost:3000`);
}
