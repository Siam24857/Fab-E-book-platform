import { ArrowRight } from "lucide-react";
import { Somebookdata } from "../Action/ALlbooks";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';
import { getSafeBookAuthor, getSafeBookPrice, getSafeBookTitle, getSafeImageSrc } from "../lib/image-utils";

export default async function FeaturedEbooks() {
  const books = await Somebookdata();

   

  return (
    <section className="bg-[#f8f6f4] py-12 sm:py-16 md:py-20">
      {/* Toaster will be rendered on client side */}
      <div id="toaster-container">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#22c55e',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12">
          <div>
            <p className="uppercase tracking-[3px] sm:tracking-[4px] text-xs sm:text-sm text-[#9b7b63] mb-2 sm:mb-3">
              New Arrivals
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#111827]">
              Featured Ebooks
            </h2>
          </div>
          <Link href="/browsersbooks" >
            <button className="flex items-center gap-1.5 sm:gap-2 text-base sm:text-lg font-medium hover:gap-2 sm:hover:gap-3 transition-all text-[#111827]">
              View All
              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
            </button>
          </Link>
        </div>

        {/* Books Grid */}
        {books && books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-7">
            {books.slice(0, 10).map((book) => {
              const bookId = book._id || book.id || book.slug || book.title;
              const coverSrc = getSafeImageSrc(book.cover);
              const title = getSafeBookTitle(book);
              const author = getSafeBookAuthor(book);
              const price = getSafeBookPrice(book);

              return (
                <Link href={`/bookdeattailspage/${bookId}`} key={bookId}>
                  <div className="group cursor-pointer">
                    <div className="overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={coverSrc}
                        alt={title}
                        width={300}
                        height={340}
                        className="w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] xl:h-[340px] object-cover group-hover:scale-105 transition duration-300"
                        priority={false}
                      />
                    </div>

                    <div className="mt-2 sm:mt-3 md:mt-4">
                      <p className="text-[#8b6d56] text-xs sm:text-sm md:text-base truncate">
                        {author}
                      </p>
                      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-black mt-0.5 sm:mt-1 line-clamp-1">
                        {title}
                      </h3>

                      <div className="flex items-center justify-between mt-2 sm:mt-2.5 md:mt-3">
                        <span className="text-base sm:text-lg md:text-xl xl:text-2xl font-medium text-black">
                          ${price.toFixed(2)}
                        </span>
                        <span className="bg-gray-200 px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs md:text-sm font-medium rounded truncate max-w-[60px] sm:max-w-[80px]">
                          {book.genre || "General"}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 md:py-20">
            <p className="text-gray-500 text-base sm:text-lg">No books available at the moment.</p>
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="mt-8 sm:mt-10 md:mt-12 text-center md:hidden">
          <Link href="/browsersbooks"  >
            <button className="w-full sm:w-auto px-6 py-3 bg-[#111827] text-white rounded-lg font-medium hover:bg-[#1f2937] transition-colors">
              View All Ebooks
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}