// In lib/auth-client.js
import { createAuthClient } from "better-auth/react";

const appUrl = typeof window !== "undefined"
  ? window.location.origin
  : (process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "http://localhost:3000");

export const authClient = createAuthClient({
    baseURL: appUrl,
});

export const { 
    signIn, 
    signUp, 
    useSession,
    signOut 
} = authClient;