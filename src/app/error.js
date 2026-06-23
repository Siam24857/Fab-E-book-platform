"use client";

import { AlertTriangle } from "lucide-react";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 sm:p-6">
      <div className="bg-white shadow-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 max-w-[95%] sm:max-w-lg w-full text-center">
        <AlertTriangle
          size={70}
          className="sm:size-80 md:size-90 mx-auto text-red-500 mb-4 sm:mb-5"
        />

        <h1 className="text-2xl sm:text-3xl font-bold">
          Something went wrong
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-3 sm:mt-4 break-words">
          {error?.message || "Unexpected Error"}
        </p>

        <button
          onClick={() => reset()}
          className="mt-6 sm:mt-8 bg-red-500 hover:bg-red-600 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl transition text-sm sm:text-base"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}