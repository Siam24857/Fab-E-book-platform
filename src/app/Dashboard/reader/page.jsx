import { userdata, userhistory } from "@/app/lib/Action/Userinfo";
import Image from "next/image";

const Readerpage = async () => {
  const user = await userdata();
  const history = await userhistory(user.id);

  return (
    <div className="min-h-screen bg-[#f8f6f3] p-8">
      <div className="mb-10">
        <p className="uppercase tracking-[4px] text-sm text-gray-500">
          Reader Dashboard
        </p>

        <h1 className="text-5xl font-bold">
          Welcome, {user.name || "Reader"}!
        </h1>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border p-6">
          <h3 className="text-gray-500 uppercase text-sm">
            Purchased
          </h3>

          <p className="text-4xl font-bold mt-2">
            {history.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl border p-6">
          <h3 className="text-gray-500 uppercase text-sm">
            Purchase History
          </h3>

          <p className="text-4xl font-bold mt-2">
            {history.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl border p-6">
          <h3 className="text-gray-500 uppercase text-sm">
            Total Spent
          </h3>

          <p className="text-4xl font-bold mt-2">
            $
            {history
              .reduce((sum, item) => sum + (item.amount || 0), 0)
              .toFixed(2)}
          </p>
        </div>
      </div>

      {/* Recent Purchases */}
      <div className="mt-10 bg-white rounded-3xl border p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Recent Purchases
          </h2>

          <button>View All</button>
        </div>

        {history.length === 0 ? (
          <p>No purchases found.</p>
        ) : (
          history.map((book, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-4 border-b last:border-b-0"
            >
              <div className="flex items-center gap-4">
                <Image
                  src={book.coverimg}
                  alt={book.booktitle}
                  width={60}
                  height={80}
                  className="rounded-md object-cover"
                />

                <div>
                  <h3 className="font-semibold">
                    {book.booktitle}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {new Date(book.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="font-bold">
                ${book.amount}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Readerpage;