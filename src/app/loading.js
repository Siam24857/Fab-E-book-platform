export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f0f2f5] overflow-hidden">
      <div className="flex justify-center items-center h-screen">
        <div className="relative">
          {/* Outer Ring */}
          <div className="w-32 h-32 border-[10px] border-blue-100 rounded-full"></div>

          {/* Animated Ring */}
          <div className="absolute inset-0 w-32 h-32 border-[10px] border-transparent border-t-blue-600 rounded-full animate-spin"></div>

          {/* Logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl">
              F
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <h2 className="text-xl font-semibold text-gray-700">
          Loading Your Feed...
        </h2>

        <div className="flex justify-center gap-2 mt-3">
          <span className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></span>
          <span
            className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></span>
          <span
            className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.4s" }}
          ></span>
        </div>
      </div>
    </div>
  );
}