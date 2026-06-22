import { userdata, userhistory } from "@/app/lib/Action/Userinfo";
import Image from "next/image";
import Link from "next/link";

export default async function PurchasedBooks() {
      const user = await userdata();
      const books = await userhistory(user.id);
  return (
    <div className="px-8 py-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-sm uppercase tracking-[4px] text-[#8b6f5a]">
          My Library
        </p>

        <h1 className="mt-2 text-5xl font-serif font-bold text-[#1f2430]">
          Purchased Ebooks
        </h1>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books?.map((book) => (
          <Link
            key={book.sessionId}
            href={`/reader/${book.productId}`}
            className="group"
          >
            <div>
              <div className="overflow-hidden">
                <Image
                  src={book.coverimg}
                  alt={book.booktitle}
                  width={240}
                  height={350}
                  className="h-[280px] w-[210px] object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              <h3 className="mt-4 text-3xl font-serif text-[#1f2430]">
                {book.booktitle}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {books?.length === 0 && (
        <div className="mt-10">
          <p className="text-gray-500">
            You have not purchased any books yet.
          </p>
        </div>
      )}
    </div>
  );
}