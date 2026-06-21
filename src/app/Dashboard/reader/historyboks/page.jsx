import { userdata, userhistory } from "@/app/lib/Action/Userinfo";

const PurchaseHistoryPage = async () => {
  const user = await userdata();
  const history = await userhistory(user.id);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <p className="uppercase tracking-[4px] text-sm text-[#8b6f5a]">
          Activity
        </p>

        <h1 className="mt-2 text-5xl font-serif font-bold text-[#1f2430]">
          Purchase History
        </h1>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-[#f8f6f3]">
              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#7b6656]">
                Ebook
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#7b6656]">
                Author
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#7b6656]">
                Price
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#7b6656]">
                Date
              </th>

              <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wide text-[#7b6656]">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {history.map((item) => (
              <tr
                key={item.sessionId}
                className="border-b last:border-b-0"
              >
                <td className="px-6 py-6 text-xl font-medium">
                  {item.booktitle}
                </td>

                <td className="px-6 py-6 text-gray-500">
                  —
                </td>

                <td className="px-6 py-6 text-xl font-semibold">
                  ${item.amount}
                </td>

                <td className="px-6 py-6 text-gray-600">
                  {new Date(item.timestamp).toLocaleDateString()}
                </td>

                <td className="px-6 py-6">
                  <span className="rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                    Completed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {history.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No purchase history found.
          </div>
        )}
      </div>
    </div>
  );
};

export default PurchaseHistoryPage;