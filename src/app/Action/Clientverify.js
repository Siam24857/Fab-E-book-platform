"use client";

import { useSession } from "../lib/auth-client";

export const useClientToken = () => {
  const { data: session } = useSession();

  const token = session?.session?.token;

  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};

 