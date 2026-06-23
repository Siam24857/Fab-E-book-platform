import Link from "next/link";
import { SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6">
      <div className="text-center max-w-[95%] sm:max-w-none w-full">
        <SearchX
          size={80}
          className="sm:size-100 md:size-120 mx-auto text-blue-500 mb-4 sm:mb-5"
        />

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900">
          404
        </h1>

        <h2 className="text-2xl sm:text-3xl font-bold mt-2 sm:mt-3">
          Page Not Found
        </h2>

        <p className="text-sm sm:text-base text-gray-500 mt-3 sm:mt-4 max-w-xs sm:max-w-md mx-auto px-2">
          The page you are looking for does not exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 sm:mt-8 px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm sm:text-base"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
}