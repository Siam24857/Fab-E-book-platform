"use client";

import { AlertTriangle } from "lucide-react";

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white shadow-xl rounded-3xl p-10 max-w-lg text-center">
        <AlertTriangle
          size={90}
          className="mx-auto text-red-500 mb-5"
        />

        <h1 className="text-3xl font-bold">
          Something went wrong
        </h1>

        <p className="text-gray-500 mt-4">
          {error?.message || "Unexpected Error"}
        </p>

        <button
          onClick={() => reset()}
          className="mt-8 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}