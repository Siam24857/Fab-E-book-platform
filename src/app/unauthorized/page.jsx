"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-6">
      <div className="max-w-md text-center">
        <div className="flex justify-center mb-6">
          <ShieldAlert size={90} className="text-red-500" />
        </div>

        <h1 className="text-5xl font-bold text-gray-900">401</h1>
        <h2 className="text-2xl font-semibold mt-3">
          Unauthorized Access
        </h2>

        <p className="text-gray-500 mt-4">
          Sorry, you do not have permission to access this page.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}