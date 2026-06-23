import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";

export async function GET() {
  try {
    const headerList = await headers();
    const session = await auth.api.getSession({ headers: headerList });
    const user = session?.user;
    const token = session?.session?.token;

    if (!user?.id) {
      return Response.json([], { status: 401 });
    }

    const serverUrl = process.env.SERVER_URL;
    if (!serverUrl) {
      return Response.json([], { status: 500 });
    }

    const res = await fetch(`${serverUrl}/readerbookhistory/${user.id}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch history");
    }

    const data = await res.json();
    return Response.json(data || []);
  } catch (error) {
    console.error("Library fetch failed:", error);
    return Response.json([], { status: 500 });
  }
}
