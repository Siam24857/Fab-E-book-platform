export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] overflow-hidden relative">
      <div className="flex justify-center items-center h-screen p-4">
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border-[8px] sm:border-[10px] border-blue-100 rounded-full"></div>

          {/* Animated Ring */}
          <div className="absolute inset-0 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 border-[8px] sm:border-[10px] border-transparent border-t-blue-600 rounded-full animate-spin"></div>

          {/* Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-black shadow-2xl">
              F
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 w-full px-4 text-center">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
          Loading Your Feed...
        </h2>

        <div className="flex justify-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
          <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-bounce"></span>
          <span
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></span>
          <span
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></span>
        </div>
      </div>
    </div>
  );
}