"use client";

import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

export default function ProfilePageClient({ user, roleLabel = "User" }) {
  const firstLetter = user?.name?.charAt(0)?.toUpperCase() || "U";
  const memberSince = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 min-h-screen bg-gray-50"
    >
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
            padding: "16px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: "#10B981",
              secondary: "#fff",
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
          },
        }}
      />

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 md:mb-8"
      >
        <p className="text-xs sm:text-sm uppercase tracking-[4px] text-[#8a6e5c]">
          Account
        </p>

        <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1d2230]">
          Profile
        </h1>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-3xl rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 md:p-10 shadow-sm mx-auto"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6"
        >
          <div className="flex h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 items-center justify-center bg-[#171313] text-4xl sm:text-5xl font-serif font-bold text-white rounded-full">
            {firstLetter}
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#1d2230]">
              {user?.name}
            </h2>

            <p className="mt-1 text-lg sm:text-xl md:text-2xl text-[#8a6e5c]">
              {roleLabel}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 sm:mt-10 space-y-4 sm:space-y-6"
        >
          <div>
            <p className="uppercase tracking-[2px] text-[#8a6e5c] text-xs sm:text-sm">
              Full Name
            </p>

            <p className="mt-2 text-lg sm:text-xl md:text-2xl font-medium break-words">
              {user?.name}
            </p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <p className="uppercase tracking-[2px] text-[#8a6e5c] text-xs sm:text-sm">
              Email
            </p>

            <p className="mt-2 text-lg sm:text-xl md:text-2xl font-medium break-words">
              {user?.email}
            </p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <p className="uppercase tracking-[2px] text-[#8a6e5c] text-xs sm:text-sm">
              Role
            </p>

            <p className="mt-2 text-lg sm:text-xl md:text-2xl font-medium">
              {roleLabel}
            </p>
          </div>

          <hr className="border-gray-200" />

          <div>
            <p className="uppercase tracking-[2px] text-[#8a6e5c] text-xs sm:text-sm">
              Member Since
            </p>

            <p className="mt-2 text-lg sm:text-xl md:text-2xl font-medium">
              {memberSince}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
