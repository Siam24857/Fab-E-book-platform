import "server-only";

import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/app/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });

  return NextResponse.json(session?.user ?? null);
}
