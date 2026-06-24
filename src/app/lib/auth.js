import "server-only";

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUri = process.env.MONGO_DB_URI || "mongodb://127.0.0.1:27017/FabBook";
const client = new MongoClient(mongoUri);
const db = client.db("FabBook");

const googleProvider = process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
  ? {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    }
  : {};

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || process.env.APP_URL || "https://fab-e-book-platform.vercel.app",
  secret: process.env.BETTER_AUTH_SECRET || process.env.AUTH_SECRET || "dev-secret-change-me",
  trustedOrigins: [
    process.env.NEXT_PUBLIC_APP_URL,
    process.env.APP_URL,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ].filter(Boolean),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: googleProvider,
  database: mongodbAdapter(db, {
    client,
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "reader",
      },
    },
  },
});