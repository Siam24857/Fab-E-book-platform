import "server-only";

import { headers } from "next/headers";
import { auth } from "../lib/auth";
import { getBackendUrl } from "../lib/backend-url";

const serverurl = getBackendUrl();

export const userdata = async () => {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  return session?.user;
};

export const userseissondata = async () => {
  const requestHeaders = await headers();
  const usersession = await auth.api.getSession({
    headers: requestHeaders,
  });

  return usersession?.session?.token;
};

export const userhistory = async (token, id) => {
  const res = await fetch(`${serverurl}/readerbookhistory/${id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    cache: "no-store", // ✅ important for Next.js
  });

  if (!res.ok) {
    throw new Error("Failed to fetch history");
  }

  return await res.json();
};