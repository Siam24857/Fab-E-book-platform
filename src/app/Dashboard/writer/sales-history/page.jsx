
import { userdata } from "@/app/lib/Action/Userinfo";
import { WriterHistorybook } from "@/app/lib/Action/Writerhistorysales";

import { TrendingUp } from "lucide-react";

const Slaeshistory = async () => {
  const user = await userdata();
  const writerhistory = await WriterHistorybook(user?.id);
  console.log(writerhistory)

  const totalRevenue =
    writerhistory?.reduce(
      (sum, book) => sum + Number(book.amount || 0),
      0
    ) || 0;

  return (
    <div className="min-h-screen bg-[#f8f6f4] p-10">
      {/* Header */}
      <div className="mb-10">
        <p className="uppercase tracking-[4px] text-sm text-gray-500">
          Earnings
        </p>

        <h1 className="text-5xl font-serif font-bold mt-2">
          Sales History
        </h1>
      </div>

      {/* Revenue Card */}
      <div className="w-fit border border-gray-300 bg-[#f3f0ec] px-8 py-6 mb-8">
        <div className="flex items-center gap-4">
          <TrendingUp size={28} />

          <div>
            <p className="uppercase text-sm tracking-[2px] text-gray-500">
              Total Revenue
            </p>

            <h2 className="text-4xl font-serif font-bold">
              ${totalRevenue.toFixed(2)}
            </h2>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl overflow-hidden border shadow-sm">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 px-6 py-5 bg-[#f3f0ec] border-b font-semibold text-gray-600 uppercase">
          <div>Ebook</div>
          <div>Writer</div>
          <div>Amount</div>
          <div>Date</div>
        </div>

        {/* Table Body */}
        {writerhistory?.length > 0 ? (
          writerhistory.map((book) => (
            <div
              key={book._id}
              className="grid grid-cols-4 gap-4 px-6 py-5 items-center border-b"
            >
              <div className="font-medium">{book.booktitle}</div>

              <div>{user.name}</div>

              <div className="font-semibold">
                ${Number(book.amount).toFixed(2)}
              </div>

              <div>{book.date}</div>
            </div>
          ))
        ) : (
          <div className="h-[220px] flex items-center justify-center text-xl text-gray-500">
            No sales yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default Slaeshistory;