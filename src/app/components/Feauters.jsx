import { ArrowRight } from "lucide-react";
import { Somebookdata } from "../lib/Action/ALlbooks";
import Link from "next/link";
import Image from "next/image";

export default async function FeaturedEbooks() {
  const books = await Somebookdata();

  return (
    <section className="bg-[#f8f6f4] py-20">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-12 flex-wrap gap-4">
          <div>
            <p className="uppercase tracking-[4px] text-sm text-[#9b7b63] mb-3">
              New Arrivals
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#111827]">
              Featured Ebooks
            </h2>
          </div>
          <Link href="/browsersbooks">
            <button className="flex items-center gap-2 text-lg font-medium hover:gap-3 transition-all text-[#111827]">
              View All
              <ArrowRight size={20} />
            </button>
          </Link>
        </div>

        {/* Books Grid */}
        {books && books.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-7">
            {books.map((book) => (
              <Link href={`/bookdeattailspage/${book._id}`} key={book._id}>
                <div className="group cursor-pointer">
                  {/* Cover */}
                  <div className="overflow-hidden rounded-lg">
                    <Image
                      src={book.cover}
                      alt={book.title}
                      width={300}
                      height={340}
                      className="w-full h-[340px] object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="mt-4">
                    <p className="text-[#8b6d56] text-sm md:text-base">
                      {book.author}
                    </p>
                    <h3 className="text-lg md:text-2xl font-semibold text-black mt-1 line-clamp-1">
                      {book.title}
                    </h3>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xl md:text-2xl font-medium text-black">
                        ${book.price}
                      </span>
                      <span className="bg-gray-200 px-3 py-1 text-xs md:text-sm font-medium rounded">
                        {book.genre}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No books available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}