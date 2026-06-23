import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center">
        <SearchX
          size={120}
          className="mx-auto text-blue-500 mb-5"
        />

        <h1 className="text-7xl font-black text-gray-900">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-3">
          Page Not Found
        </h2>

        <p className="text-gray-500 mt-4 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}