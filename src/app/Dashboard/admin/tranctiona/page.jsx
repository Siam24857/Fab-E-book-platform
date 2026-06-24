import { Historyget } from "@/app/Action/Adminacitons";
import { userseissondata } from "@/app/Action/Userinfo";
import React from "react";

const Tractionos = async () => {
  try {
    // Get token with error handling
    let token;
    try {
      token = await userseissondata();
    } catch (error) {
      console.error("Error getting session token:", error);
      token = null;
    }

    // Fetch transaction history with error handling
    let bookhistory = [];
    try {
      const historyData = await Historyget(token);
      // Check if the response has the expected structure
      if (historyData && historyData.success && Array.isArray(historyData.data)) {
        bookhistory = historyData.data;
      } else if (Array.isArray(historyData)) {
        // Fallback in case the API returns array directly
        bookhistory = historyData;
      } else {
        bookhistory = [];
      }
    } catch (error) {
      console.error("Error fetching transaction history:", error);
      bookhistory = [];
    }

    // Log for debugging (server-side)
    console.log(`Transactions loaded: ${bookhistory.length}`);

    // Check if there's an error with the data structure
    if (bookhistory.length === 0) {
      console.log("No transactions found or unable to load data");
    }

    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <p className="uppercase tracking-widest text-gray-500 text-xs sm:text-sm">
            Finance
          </p>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2">
            All Transactions
          </h1>
          
          {/* Summary Stats */}
          {bookhistory.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-4 text-sm">
              <div className="bg-white px-4 py-2 rounded-lg border shadow-sm">
                <span className="text-gray-500">Total Transactions:</span>
                <span className="font-semibold ml-2">{bookhistory.length}</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg border shadow-sm">
                <span className="text-gray-500">Total Revenue:</span>
                <span className="font-semibold ml-2 text-green-600">
                  ${bookhistory.reduce((sum, item) => sum + Number(item?.amount || 0), 0).toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
          {/* Responsive Table with Horizontal Scroll */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[768px] md:min-w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-gray-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                    TRANSACTION ID
                  </th>

                  <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-gray-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                    EMAIL
                  </th>

                  <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-gray-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                    AMOUNT
                  </th>

                  <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-gray-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                    CURRENCY
                  </th>

                  <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-gray-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                    STATUS
                  </th>

                  <th className="text-left px-3 sm:px-5 py-3 sm:py-4 text-gray-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                    DATE
                  </th>
                </tr>
              </thead>

              <tbody>
                {bookhistory.length > 0 ? (
                  bookhistory.map((item, index) => (
                    <tr
                      key={item?._id || index}
                      className="border-b hover:bg-gray-50 hover:scale-[1.01] transition-all duration-200 cursor-pointer"
                    >
                      {/* Transaction ID */}
                      <td className="px-3 sm:px-5 py-4 sm:py-5 text-gray-600 text-xs sm:text-sm">
                        <span className="font-mono hover:text-blue-600 transition-colors duration-200">
                          {item?.transactionId
                            ? `${item.transactionId.slice(0, 12)}...`
                            : item?._id
                            ? `${item._id.slice(0, 12)}...`
                            : "N/A"}
                        </span>
                      </td>

                      {/* Email */}
                      <td className="px-3 sm:px-5 py-4 sm:py-5 font-medium text-sm sm:text-base">
                        <span className="line-clamp-1 hover:text-blue-600 transition-colors duration-200">
                          {item?.email || "N/A"}
                        </span>
                      </td>

                      {/* Amount */}
                      <td className="px-3 sm:px-5 py-4 sm:py-5 font-bold text-sm sm:text-base">
                        <span className="hover:text-green-600 transition-colors duration-200">
                          ${Number(item?.amount || 0).toFixed(2)}
                        </span>
                      </td>

                      {/* Currency */}
                      <td className="px-3 sm:px-5 py-4 sm:py-5 text-gray-600 text-sm sm:text-base">
                        <span className="uppercase">
                          {item?.currency || "USD"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-3 sm:px-5 py-4 sm:py-5">
                        <span className={`px-2 sm:px-3 py-1 rounded-md font-medium text-xs sm:text-sm transition-all duration-200 hover:scale-105 inline-block ${
                          item?.status === "completed" || item?.status === "paid"
                            ? "bg-green-100 text-green-700 hover:bg-green-200"
                            : item?.status === "pending"
                            ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                            : item?.status === "failed"
                            ? "bg-red-100 text-red-700 hover:bg-red-200"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}>
                          {item?.status || "completed"}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-3 sm:px-5 py-4 sm:py-5 text-gray-600 text-sm sm:text-base">
                        {item?.date || item?.createdAt
                          ? new Date(
                              item?.date || item?.createdAt
                            ).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  // Empty State
                  <tr>
                    <td colSpan="6">
                      <div className="text-center py-16 text-gray-500">
                        <div className="text-6xl mb-4">💳</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                          No Transactions Found
                        </h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                          {bookhistory === null || bookhistory === undefined
                            ? "Unable to load transaction data. Please try again later."
                            : "There are no transactions to display yet."}
                        </p>
                        {bookhistory === null || bookhistory === undefined && (
                          <a
                            href="?refresh=true"
                            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
                          >
                            Retry
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer with pagination info */}
          {bookhistory.length > 0 && (
            <div className="px-3 sm:px-5 py-3 bg-gray-50 border-t text-sm text-gray-500 flex justify-between items-center flex-wrap gap-2">
              <span>
                Showing <span className="font-semibold">{bookhistory.length}</span> transactions
              </span>
              <span className="text-xs">
                Last updated: {new Date().toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    // Global error handler - fallback UI
    console.error("Critical error in Tractionos component:", error);
    
    return (
      <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl border shadow-sm p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Unable to Load Transactions
          </h2>
          <p className="text-gray-600 mb-4">
            There was an error loading the transaction data. Please try again later.
          </p>
          <a
            href="?refresh=true"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            Retry
          </a>
        </div>
      </div>
    );
  }
};

export default Tractionos;