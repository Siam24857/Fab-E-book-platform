// ./src/app/Dashboard/reader/historyboks/PurchaseHistoryPage.jsx
// এখন এটি একটি সার্ভার কম্পোনেন্ট - "use client" সরানো হয়েছে

import { BookOpen, Calendar, DollarSign, User, Clock, Download, Eye } from 'lucide-react';
import Link from "next/link";

const PurchaseHistoryPage = ({ historyData, tokenData, userData }) => {
  const history = historyData || [];
  const user = userData || null;

  return (
    <div className="min-h-screen bg-[#faf8f6] p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="w-4 h-4 text-[#8b6f5a]" />
            <p className="uppercase tracking-[4px] text-xs sm:text-sm text-[#8b6f5a]">
              Activity
            </p>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#1f2430] flex flex-wrap items-center gap-3">
            Purchase History
            <span className="text-base sm:text-lg font-normal text-[#8b6f5a]">
              ({history.length} purchases)
            </span>
          </h1>
        </div>

        {/* Stats Cards - Mobile Friendly */}
        {history.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {[
              { icon: DollarSign, label: 'Total Spent', value: `$${history.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}` },
              { icon: BookOpen, label: 'Total Books', value: history.length },
              { icon: Calendar, label: 'Last Purchase', value: history.length > 0 ? new Date(history[0].timestamp).toLocaleDateString() : 'N/A' },
              { icon: Clock, label: 'Member Since', value: user ? new Date(user.createdAt).getFullYear() : 'N/A' }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100"
              >
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#8b6f5a] mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
                <p className="text-base sm:text-lg font-bold text-[#1f2430]">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Table - Mobile Responsive */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-[#f8f6f3]">
                  <th className="px-4 sm:px-6 py-4 sm:py-5 text-left text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#7b6656]">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      Ebook
                    </div>
                  </th>
                  <th className="px-4 sm:px-6 py-4 sm:py-5 text-left text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#7b6656]">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Author
                    </div>
                  </th>
                  <th className="px-4 sm:px-6 py-4 sm:py-5 text-left text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#7b6656]">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Price
                    </div>
                  </th>
                  <th className="px-4 sm:px-6 py-4 sm:py-5 text-left text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#7b6656]">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Date
                    </div>
                  </th>
                  <th className="px-4 sm:px-6 py-4 sm:py-5 text-left text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#7b6656]">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 py-4 sm:py-5 text-center text-xs sm:text-sm font-semibold uppercase tracking-wide text-[#7b6656]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {history.map((item, index) => (
                  <tr
                    key={item.sessionId || index}
                    className="border-b last:border-b-0 hover:bg-[#faf8f6] transition"
                  >
                    <td className="px-4 sm:px-6 py-4 sm:py-6">
                      <div>
                        <p className="text-base sm:text-lg md:text-xl font-medium text-[#1f2430]">
                          {item.booktitle}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">ID: {item.sessionId?.slice(0, 8) || 'N/A'}</p>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-6 text-gray-500 text-sm">
                      {item.author || '—'}
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-6">
                      <span className="text-base sm:text-lg md:text-xl font-semibold text-[#1f2430]">
                        ${item.amount?.toFixed(2) || '0.00'}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-6 text-gray-600 text-sm">
                      {item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-6">
                      <span className="inline-flex items-center gap-1 rounded-md bg-green-100 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-green-700">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Completed
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-6">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/book-details/${item.productId}`}
                          className="p-1.5 sm:p-2 text-[#8b6f5a] hover:bg-[#f0ebe5] rounded-lg transition inline-block"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/download/${item.productId}`}
                          className="p-1.5 sm:p-2 text-[#8b6f5a] hover:bg-[#f0ebe5] rounded-lg transition inline-block"
                        >
                          <Download className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            {history.map((item, index) => (
              <div
                key={item.sessionId || index}
                className="border-b last:border-b-0 p-4 space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-[#1f2430] text-base">
                      {item.booktitle}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.author || 'Unknown Author'}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-md bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Completed
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <p className="text-gray-500">Amount</p>
                    <p className="font-semibold text-[#1f2430] text-lg">${item.amount?.toFixed(2) || '0.00'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500">Date</p>
                    <p className="text-gray-600">{item.timestamp ? new Date(item.timestamp).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
                  <Link
                    href={`/book-details/${item.productId}`}
                    className="flex items-center gap-1 text-sm text-[#8b6f5a] hover:text-[#5a4a3a] transition"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                  <Link
                    href={`/download/${item.productId}`}
                    className="flex items-center gap-1 text-sm text-[#8b6f5a] hover:text-[#5a4a3a] transition"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {history.length === 0 && (
            <div className="p-8 sm:p-12 text-center">
              <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Purchase History</h3>
              <p className="text-gray-500">Start exploring and purchase your first book today!</p>
              <div className="mt-4">
                <Link
                  href="/browsersbooks"
                  className="inline-block bg-[#8b6f5a] text-white px-6 py-2 rounded-lg hover:bg-[#7b5f4a] transition"
                >
                  Browse Books
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PurchaseHistoryPage;