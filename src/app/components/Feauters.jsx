import { ArrowRight } from "lucide-react";
import { Somebookdata } from "../Action/ALlbooks";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from 'react-hot-toast';
import { getSafeBookAuthor, getSafeBookPrice, getSafeBookTitle, getSafeImageSrc } from "../lib/image-utils";
import { motion } from "framer-motion";

export default async function FeaturedEbooks() {
  const books = await Somebookdata();

  return (
    <section className="bg-[#f8f6f4] py-12 sm:py-16 md:py-20 relative overflow-hidden">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0">
        {/* Main Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/60 to-pink-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 to-cyan-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-50/30 via-pink-50/30 to-blue-50/30 rounded-full blur-3xl" />
        
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(30deg, #8b5cf6 12%, transparent 12.5%, transparent 87%, #8b5cf6 87.5%, #8b5cf6),
              linear-gradient(150deg, #8b5cf6 12%, transparent 12.5%, transparent 87%, #8b5cf6 87.5%, #8b5cf6),
              linear-gradient(30deg, #8b5cf6 12%, transparent 12.5%, transparent 87%, #8b5cf6 87.5%, #8b5cf6),
              linear-gradient(150deg, #8b5cf6 12%, transparent 12.5%, transparent 87%, #8b5cf6 87.5%, #8b5cf6)
            `,
            backgroundSize: '80px 140px',
            backgroundPosition: '0 0, 0 0, 40px 70px, 40px 70px',
          }} />
        </div>

        {/* Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #8b5cf6 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />

        {/* Animated Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                scale: [1, 1.5, 1],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                repeat: Infinity,
                duration: 10 + i * 2,
                delay: i * 1.5,
              }}
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Toaster will be rendered on client side */}
      <div id="toaster-container" className="relative z-10">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                    <div className="overflow-hidden rounded-lg bg-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300">
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

      {/* Bottom Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
    </section>
  );
}