"use client";

import Link from "next/link";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-4 sm:px-6">
      <div className="max-w-[95%] sm:max-w-md w-full text-center">
        <div className="flex justify-center mb-4 sm:mb-6">
          <ShieldAlert size={70} className="sm:size-80 md:size-90 text-red-500" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">401</h1>
        <h2 className="text-xl sm:text-2xl font-semibold mt-2 sm:mt-3">
          Unauthorized Access
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mt-3 sm:mt-4 px-2">
          Sorry, you do not have permission to access this page.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 sm:mt-8 bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl transition text-sm sm:text-base"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}