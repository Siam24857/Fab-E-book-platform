import { Historyget } from "@/app/lib/Action/Adminacitons";
import { userseissondata } from "@/app/lib/Action/Userinfo";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "react-hot-toast";

const Tractionos = async () => {
  const token = await userseissondata();
  const bookhistory = await Historyget(token);

  // Show toast for empty data (optional)
  if (!bookhistory || bookhistory.length === 0) {
    // Note: This will run on server, toasts should be used on client
    // But we're keeping the structure for client-side usage
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8"
    >
      {/* Toaster Component */}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10B981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#EF4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-6 md:mb-8"
      >
        <p className="uppercase tracking-widest text-gray-500 text-xs sm:text-sm">
          Finance
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
          All Transactions
        </h1>
      </motion.div>

      {/* Table Container */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white rounded-2xl border shadow-sm overflow-hidden"
      >
        {/* Responsive Table with Horizontal Scroll */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[768px] md:min-w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-gray-600 font-semibold text-xs sm:text-sm">
                  TRANSACTION ID
                </th>

                <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-gray-600 font-semibold text-xs sm:text-sm">
                  EMAIL
                </th>

                <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-gray-600 font-semibold text-xs sm:text-sm">
                  AMOUNT
                </th>

                <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-gray-600 font-semibold text-xs sm:text-sm">
                  CURRENCY
                </th>

                <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-gray-600 font-semibold text-xs sm:text-sm">
                  STATUS
                </th>

                <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-gray-600 font-semibold text-xs sm:text-sm">
                  DATE
                </th>
              </tr>
            </thead>

            <tbody>
              <AnimatePresence mode="wait">
                {bookhistory?.map((item, index) => (
                  <motion.tr
                    key={item._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    {/* Transaction ID */}
                    <td className="px-3 sm:px-5 py-4 sm:py-5 text-gray-600 text-xs sm:text-sm">
                      <span className="font-mono">
                        {item?.transactionId
                          ? `${item.transactionId.slice(0, 12)}...`
                          : item?._id?.slice(0, 12) + "..."}
                      </span>
                    </td>

                    {/* Email */}
                    <td className="px-3 sm:px-5 py-4 sm:py-5 font-medium text-sm sm:text-base">
                      <span className="line-clamp-1">{item?.email}</span>
                    </td>

                    {/* Amount */}
                    <td className="px-3 sm:px-5 py-4 sm:py-5 font-bold text-sm sm:text-base">
                      ${Number(item?.amount || 0).toFixed(2)}
                    </td>

                    {/* Currency */}
                    <td className="px-3 sm:px-5 py-4 sm:py-5 text-gray-600 text-sm sm:text-base">
                      {item?.currency || "USD"}
                    </td>

                    {/* Status */}
                    <td className="px-3 sm:px-5 py-4 sm:py-5">
                      <span className={`px-2 sm:px-3 py-1 rounded-md font-medium text-xs sm:text-sm ${
                        item?.status === "completed" || item?.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : item?.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : item?.status === "failed"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {item?.status || "completed"}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-3 sm:px-5 py-4 sm:py-5 text-gray-600 text-sm sm:text-base">
                      {item?.date || item?.createdAt
                        ? new Date(
                            item?.date || item?.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {bookhistory?.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-10 text-gray-500"
          >
            No Transactions Found
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Tractionos;