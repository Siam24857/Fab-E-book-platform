import "server-only";

import { headers } from "next/headers";
import { auth } from "../lib/auth";

const serverurl = process.env.SERVER_URL;

export const userdata = async () => {
  const session = await auth.api.getSession({
    headers: headers(),
  });

  return session?.user;
};

export const userseissondata = async () => {
  const usersession = await auth.api.getSession({
    headers: headers(),
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