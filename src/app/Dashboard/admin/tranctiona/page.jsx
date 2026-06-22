import { Historyget } from "@/app/lib/Action/Adminacitons";
import React from "react";

const Tractionos = async () => {
  const bookhistory = await Historyget();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="uppercase tracking-widest text-gray-500 text-sm">
          Finance
        </p>

        <h1 className="text-5xl font-bold mt-2">
          All Transactions
        </h1>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left px-5 py-4 text-gray-600 font-semibold">
                TRANSACTION ID
              </th>

              <th className="text-left px-5 py-4 text-gray-600 font-semibold">
                EMAIL
              </th>

              <th className="text-left px-5 py-4 text-gray-600 font-semibold">
                AMOUNT
              </th>

              <th className="text-left px-5 py-4 text-gray-600 font-semibold">
                CURRENCY
              </th>

              <th className="text-left px-5 py-4 text-gray-600 font-semibold">
                STATUS
              </th>

              <th className="text-left px-5 py-4 text-gray-600 font-semibold">
                DATE
              </th>
            </tr>
          </thead>

          <tbody>
            {bookhistory?.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-50"
              >
                {/* Transaction ID */}
                <td className="px-5 py-5 text-gray-600">
                  {item?.transactionId
                    ? `${item.transactionId.slice(0, 18)}...`
                    : item?._id?.slice(0, 18) + "..."}
                </td>

                {/* Email */}
                <td className="px-5 py-5 font-medium">
                  {item?.email}
                </td>

                {/* Amount */}
                <td className="px-5 py-5 font-bold">
                  ${Number(item?.amount || 0).toFixed(2)}
                </td>

                {/* Currency */}
                <td className="px-5 py-5 text-gray-600">
                  {item?.currency || "USD"}
                </td>

                {/* Status */}
                <td className="px-5 py-5">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md font-medium">
                    {item?.status || "completed"}
                  </span>
                </td>

                {/* Date */}
                <td className="px-5 py-5 text-gray-600">
                  {item?.date
                    ? new Date(
                        item.date
                      ).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {bookhistory?.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No Transactions Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Tractionos;